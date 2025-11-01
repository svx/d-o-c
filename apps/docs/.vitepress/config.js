import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "d-o-c",
  description: "Documentation Operations Center - Containerized documentation and monitoring infrastructure",
  
  // Ignore dead links during build since we're referencing development URLs
  ignoreDeadLinks: true,
  
  // Configure favicon
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Web', link: '/web/' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Quick Start', link: '/guide/quick-start' }
        ]
      },
      {
        text: 'Applications',
        items: [
          { text: 'API Documentation', link: '/api/' },
          { text: 'Web Frontend', link: '/web/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/svx/d-o-c' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present'
    }
  }
})