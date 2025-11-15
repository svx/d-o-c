const { createHash } = require('crypto')

function register (registry, context) {
  // Simple inline macro for URLs
  registry.inlineMacro('browser-window', function () {
    this.process((parent, target, attrs) => {
      const url = attrs.url || target || 'http://localhost:3000'
      const height = attrs.height || '300'
      
      const html = `<div class="browser-window" style="min-height: ${height}px;">
        <div class="browser-window-header">
          <div class="browser-window-buttons">
            <span class="browser-window-dot"></span>
            <span class="browser-window-dot"></span>
            <span class="browser-window-dot"></span>
          </div>
          <div class="browser-window-address-bar">${url}</div>
          <div class="browser-window-menu-icon">
            <span class="browser-window-menu-bar"></span>
            <span class="browser-window-menu-bar"></span>
            <span class="browser-window-menu-bar"></span>
          </div>
        </div>
        <div class="browser-window-body">
          <iframe src="${url}" style="width: 100%; height: ${parseInt(height) - 60}px; border: none;" loading="lazy"></iframe>
        </div>
      </div>`
      
      return this.createInlinePass(parent, html, attrs)
    })
  })

  // Block macro for custom content
  registry.blockMacro('browser', function () {
    this.process((parent, target, attrs) => {
      const url = attrs.url || target || 'http://localhost:3000'
      const height = attrs.height || '300'
      
      const html = `<div class="browser-window" style="min-height: ${height}px;">
        <div class="browser-window-header">
          <div class="browser-window-buttons">
            <span class="browser-window-dot"></span>
            <span class="browser-window-dot"></span>
            <span class="browser-window-dot"></span>
          </div>
          <div class="browser-window-address-bar">${url}</div>
          <div class="browser-window-menu-icon">
            <span class="browser-window-menu-bar"></span>
            <span class="browser-window-menu-bar"></span>
            <span class="browser-window-menu-bar"></span>
          </div>
        </div>
        <div class="browser-window-body">
          <iframe src="${url}" style="width: 100%; height: ${parseInt(height) - 60}px; border: none;" loading="lazy"></iframe>
        </div>
      </div>`
      
      return this.createBlock(parent, 'pass', html, attrs)
    })
  })
}

module.exports = { register }