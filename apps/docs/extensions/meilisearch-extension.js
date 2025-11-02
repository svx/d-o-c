const { MeiliSearch } = require('meilisearch')

function createExtension (context) {
  const logger = context.getLogger('meilisearch-extension')
  
  return {
    postProcess: async ({ playbook, contentCatalog, siteCatalog }) => {
      const { meilisearch: meilisearchConfig } = playbook.asciidoc?.attributes || {}
      
      if (!meilisearchConfig) {
        logger.warn('Meilisearch configuration not found in playbook')
        return
      }
      
      let config
      try {
        const configString = typeof meilisearchConfig === 'string' 
          ? meilisearchConfig.replace(/\$\{([^}]+)\}/g, (match, envVar) => {
              const [varName, defaultValue] = envVar.split(':-')
              return process.env[varName] || defaultValue || ''
            })
          : JSON.stringify(meilisearchConfig)
        config = JSON.parse(configString)
      } catch (error) {
        logger.error(`Failed to parse Meilisearch configuration: ${error.message}`)
        return
      }
      
      const client = new MeiliSearch({
        host: config.host || 'http://localhost:7700',
        apiKey: config.apiKey || 'masterKey123'
      })
      
      const indexName = config.index || 'docs'
      
      try {
        // Create or get the index
        const index = client.index(indexName)
        
        // Prepare documents for indexing
        const documents = []
        
        // Process all pages
        for (const page of contentCatalog.getPages()) {
          if (page.out && page.asciidoc) {
            const doc = {
              id: page.out.path,
              title: page.title || page.asciidoc.doctitle || '',
              url: page.pub.url,
              content: extractTextContent(page.contents.toString()),
              component: page.src.component,
              version: page.src.version,
              module: page.src.module,
              family: page.src.family
            }
            documents.push(doc)
          }
        }
        
        if (documents.length > 0) {
          // Clear existing documents and add new ones
          await index.deleteAllDocuments()
          await index.addDocuments(documents)
          
          // Configure searchable attributes
          await index.updateSettings({
            searchableAttributes: ['title', 'content'],
            displayedAttributes: ['id', 'title', 'url', 'component', 'version'],
            rankingRules: [
              'words',
              'typo',
              'proximity',
              'attribute',
              'sort',
              'exactness'
            ]
          })
          
          logger.info(`Indexed ${documents.length} documents to Meilisearch`)
        }
        
        // Generate search configuration for the UI (use container service name for frontend)
        const frontendHost = config.host.includes('meilisearch:7700') 
          ? 'http://localhost:7700' 
          : config.host
          
        const searchConfig = {
          host: frontendHost,
          apiKey: config.searchApiKey || config.apiKey || 'masterKey123',
          index: indexName
        }
        
        // Write search config to the site
        siteCatalog.addFile({
          contents: Buffer.from(`window.meilisearchConfig = ${JSON.stringify(searchConfig)};`),
          out: { path: '_/js/search-config.js' },
          pub: { url: '/_/js/search-config.js' }
        })
        
      } catch (error) {
        logger.error(`Failed to index documents: ${error.message}`)
      }
    }
  }
}

function extractTextContent(html) {
  // Simple text extraction - remove HTML tags and clean up whitespace
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

module.exports = createExtension