/**
 * BrowserWindow Component for Antora UI
 * 
 * Creates a browser-like window display for content,
 * similar to Docusaurus BrowserWindow component.
 */

class BrowserWindow {
  constructor() {
    this.init();
  }

  init() {
    // Initialize browser windows when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeWindows());
    } else {
      this.initializeWindows();
    }
  }

  initializeWindows() {
    // Find all browser window containers
    const browserWindows = document.querySelectorAll('.browser-window');
    
    browserWindows.forEach(window => {
      this.setupWindow(window);
    });
  }

  setupWindow(windowElement) {
    // Get configuration from data attributes
    const config = {
      url: windowElement.dataset.url || 'http://localhost:3000',
      minHeight: windowElement.dataset.minHeight || '300px',
      title: windowElement.dataset.title || ''
    };

    // Apply minimum height
    windowElement.style.minHeight = config.minHeight;

    // Update URL in address bar if present
    const addressBar = windowElement.querySelector('.browser-window-address-bar');
    if (addressBar) {
      addressBar.textContent = config.url;
    }

    // Add click handler for dots (optional animation)
    const dots = windowElement.querySelectorAll('.browser-window-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleDotClick(dot, index);
      });
    });
  }

  handleDotClick(dot, index) {
    // Add subtle animation on dot click
    dot.style.transform = 'scale(0.8)';
    setTimeout(() => {
      dot.style.transform = 'scale(1)';
    }, 150);

    // Optional: Add behavior based on dot type
    const actions = ['close', 'minimize', 'maximize'];
    console.log(`Browser window ${actions[index]} clicked`);
  }

  // Static method to create a browser window programmatically
  static create(content, options = {}) {
    const {
      url = 'http://localhost:3000',
      minHeight = '300px',
      title = ''
    } = options;

    const windowHtml = `
      <div class="browser-window" 
           data-url="${url}" 
           data-min-height="${minHeight}"
           data-title="${title}"
           style="min-height: ${minHeight}">
        <div class="browser-window-header">
          <div class="browser-window-dots">
            <span class="browser-window-dot browser-window-dot-red"></span>
            <span class="browser-window-dot browser-window-dot-yellow"></span>
            <span class="browser-window-dot browser-window-dot-green"></span>
          </div>
          <div class="browser-window-address-bar">${url}</div>
          <div class="browser-window-menu-icon">
            <span class="browser-window-menu-bar"></span>
            <span class="browser-window-menu-bar"></span>
            <span class="browser-window-menu-bar"></span>
          </div>
        </div>
        <div class="browser-window-body">
          ${content}
        </div>
      </div>
    `;

    return windowHtml;
  }
}

// Auto-initialize when script loads
new BrowserWindow();

// Export for potential external use
window.BrowserWindow = BrowserWindow;