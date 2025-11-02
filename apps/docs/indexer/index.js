import { MeiliSearch } from 'meilisearch'
import { readFileSync } from 'fs'
import { glob } from 'glob'
import * as cheerio from 'cheerio'
import { join, relative } from 'path'

const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || 'http://localhost:7700'
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || 'masterKey123'
const SITE_DIR = process.env.SITE_DIR || '../build/site'
const INDEX_NAME = process.env.INDEX_NAME || 'docs'

console.log('🔍 Starting Meilisearch indexing...')
console.log(`Host: ${MEILISEARCH_HOST}`)
console.log(`Index: ${INDEX_NAME}`)
console.log(`Site directory: ${SITE_DIR}`)

async function indexDocumentation() {
  try {
    // Initialize Meilisearch client
    const client = new MeiliSearch({
      host: MEILISEARCH_HOST,
      apiKey: MEILISEARCH_API_KEY
    })

    console.log('🔗 Connecting to Meilisearch...')
    
    // Test connection
    const health = await client.health()
    console.log('✅ Meilisearch health:', health.status)

    // Get or create index
    const index = client.index(INDEX_NAME)
    
    console.log('📁 Scanning for HTML files...')
    
    // Find all HTML files in the site
    const htmlFiles = await glob(`${SITE_DIR}/**/*.html`)
    console.log(`Found ${htmlFiles.length} HTML files`)

    const documents = []

    for (const filePath of htmlFiles) {
      try {
        const content = readFileSync(filePath, 'utf-8')
        const $ = cheerio.load(content)
        
        // Extract meaningful content
        const title = $('title').text() || $('h1').first().text() || 'Untitled'
        const bodyText = $('main, .content, article, body').text()
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 2000) // Limit content length
        
        // Create relative URL
        const relativePath = relative(SITE_DIR, filePath)
        const url = '/' + relativePath.replace(/\/index\.html$/, '/')
          .replace(/\.html$/, '')
        
        // Create valid document ID (alphanumeric, hyphens, underscores only)
        const documentId = relativePath
          .replace(/\.html$/, '')
          .replace(/[^a-zA-Z0-9_-]/g, '_')
        
        // Skip if no meaningful content
        if (!bodyText || bodyText.length < 10) {
          console.log(`⚠️  Skipping ${relativePath} - no content`)
          continue
        }

        const document = {
          id: documentId,
          title: title.replace(/\s+/g, ' ').trim(),
          content: bodyText,
          url: url,
          path: relativePath
        }

        documents.push(document)
        console.log(`📄 Processed: ${title} (${url})`)
        
      } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message)
      }
    }

    if (documents.length === 0) {
      console.log('⚠️  No documents to index')
      return
    }

    console.log(`🗂️  Indexing ${documents.length} documents...`)
    
    // Clear existing documents
    console.log('🧹 Clearing existing documents...')
    await index.deleteAllDocuments()
    
    // Add new documents
    const task = await index.addDocuments(documents)
    console.log('📤 Upload task ID:', task.taskUid)
    
    // Wait for indexing to complete
    console.log('⏳ Waiting for indexing to complete...')
    await index.waitForTask(task.taskUid)
    
    // Configure search settings
    console.log('⚙️  Configuring search settings...')
    await index.updateSettings({
      searchableAttributes: ['title', 'content'],
      displayedAttributes: ['id', 'title', 'url', 'path'],
      rankingRules: [
        'words',
        'typo',
        'proximity',
        'attribute',
        'sort',
        'exactness'
      ],
      stopWords: ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'],
      synonyms: {},
      distinctAttribute: 'url',
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 5,
          twoTypos: 9
        }
      }
    })

    console.log('✅ Indexing completed successfully!')
    console.log(`📊 Total documents indexed: ${documents.length}`)
    
    // Test search
    console.log('🔍 Testing search...')
    const searchResults = await index.search('docs', { limit: 3 })
    console.log(`Found ${searchResults.hits.length} results for "docs"`)
    
  } catch (error) {
    console.error('❌ Indexing failed:', error)
    process.exit(1)
  }
}

// Run the indexer
indexDocumentation()