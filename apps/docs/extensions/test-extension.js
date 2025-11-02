function createExtension (context) {
  const logger = context.getLogger('test-extension')
  
  return {
    postProcess: async ({ playbook, contentCatalog, siteCatalog }) => {
      logger.info('Test extension is running!')
      console.log('Test extension executed')
      
      // Create a simple test file
      siteCatalog.addFile({
        contents: Buffer.from('console.log("Test file created");'),
        out: { path: '_/js/test.js' },
        pub: { url: '/_/js/test.js' }
      })
    }
  }
}

module.exports = createExtension