'use strict'

module.exports = (url = 'http://localhost:3000', minHeight = 200) => {
  return {
    url: url,
    minHeight: minHeight,
    render: function(content) {
      return `<div class="browser-window" style="min-height: ${minHeight}px;">
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
          ${content}
        </div>
      </div>`;
    }
  };
};