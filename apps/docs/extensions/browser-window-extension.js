/**
 * BrowserWindow Extension for Antora
 * 
 * Registers custom AsciiDoc block and inline macros for creating
 * browser window displays in Antora documentation.
 * 
 * Usage in AsciiDoc:
 * 
 * Block macro:
 * [browser-window,url="https://example.com",height="400px"]
 * ====
 * Content goes here
 * ====
 * 
 * Inline usage:
 * browser-window::[url="https://example.com",height="300px",content="Hello World"]
 */

function register(registry, context) {
  // Register as a block extension
  registry.blockMacro('browser-window', createBrowserWindowBlockMacro(context))
  
  // Register as an inline macro (optional)
  registry.inlineMacro('browser-window', createBrowserWindowInlineMacro(context))
  
  return registry
}

function createBrowserWindowBlockMacro(context) {
  return function() {
    this.process((parent, reader, attributes) => {
      // Parse attributes
      const url = attributes.url || 'http://localhost:3000'
      const minHeight = attributes.height || attributes['min-height'] || '300px'
      const title = attributes.title || ''
      
      // Get the content between block delimiters
      const content = reader.readLines().join('\n')
      
      // Process the content as AsciiDoc if it contains markup
      let processedContent
      if (content.trim()) {
        const contentDoc = this.parseContent(parent, content, attributes)
        processedContent = contentDoc.getContent()
      } else {
        processedContent = content
      }
      
      // Create the HTML structure
      const browserWindowHtml = createBrowserWindowHtml(processedContent, {
        url,
        minHeight,
        title
      })
      
      // Return as a pass block to preserve HTML
      return this.createPassBlock(parent, browserWindowHtml, attributes)
    })
  }
}

function createBrowserWindowInlineMacro(context) {
  return function() {
    this.process((parent, target, attributes) => {
      const url = attributes.url || target || 'http://localhost:3000'
      const minHeight = attributes.height || attributes['min-height'] || '200px'
      const title = attributes.title || ''
      const content = attributes.content || ''
      
      const browserWindowHtml = createBrowserWindowHtml(content, {
        url,
        minHeight,
        title
      })
      
      return this.createInlinePassNode(parent, browserWindowHtml, attributes)
    })
  }
}

function createBrowserWindowHtml(content, options) {
  const { url, minHeight, title } = options
  
  // Escape HTML attributes
  const escapedUrl = escapeHtml(url)
  const escapedTitle = escapeHtml(title)
  const escapedMinHeight = escapeHtml(minHeight)
  
  return `<div class="browser-window" 
           data-url="${escapedUrl}" 
           data-min-height="${escapedMinHeight}"
           data-title="${escapedTitle}"
           style="min-height: ${escapedMinHeight}">
    <div class="browser-window-header">
      <div class="browser-window-dots">
        <span class="browser-window-dot browser-window-dot-red"></span>
        <span class="browser-window-dot browser-window-dot-yellow"></span>
        <span class="browser-window-dot browser-window-dot-green"></span>
      </div>
      <div class="browser-window-address-bar">${escapedUrl}</div>
      <div class="browser-window-menu-icon">
        <span class="browser-window-menu-bar"></span>
        <span class="browser-window-menu-bar"></span>
        <span class="browser-window-menu-bar"></span>
      </div>
    </div>
    <div class="browser-window-body">
      ${content || '<p>Browser window content</p>'}
    </div>
  </div>`
}

function escapeHtml(text) {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

module.exports = { register }