# BrowserWindow Component for Antora

A browser window component for Antora documentation that mimics the Docusaurus BrowserWindow component. This allows you to create visually appealing browser mockups in your documentation.

## Features

- 🎨 **Authentic browser appearance** with macOS-style window controls
- 📱 **Responsive design** that works on all screen sizes
- 🌙 **Dark mode support** with automatic theme detection
- 🔧 **Multiple usage patterns** - inline macros, block macros, and delimited blocks
- ⚡ **Lightweight** - pure CSS and HTML, no JavaScript dependencies
- 🎯 **Accessible** with proper ARIA labels and semantic HTML

## Installation

1. Copy the extension file to your Antora project:
   ```bash
   cp browser-window-extension.js /path/to/your/docs/lib/
   ```

2. Add the extension to your `antora-playbook.yml`:
   ```yaml
   asciidoc:
     extensions:
       - ./lib/browser-window-extension.js
   ```

3. Add the CSS to your UI bundle (`src/css/doc.css`)

4. Rebuild your documentation:
   ```bash
   antora antora-playbook.yml
   ```

## Usage

### 1. Inline Macro (Simple URL)

For displaying just a URL with an iframe:

```asciidoc
browser-window:https://example.com[]
```

With custom height:
```asciidoc
browser-window:https://example.com[height=400]
```

### 2. Block Macro (URL with iframe)

```asciidoc
browser::https://docs.example.com[height=500]
```

### 3. Delimited Block (Custom Content)

For custom content instead of an iframe:

```asciidoc
[browser-window, url="https://app.example.com", height=350]
--
Your custom content goes here.

It can include:
- Lists
- Code blocks  
- Images
- Any AsciiDoc content
--
```

## Examples

### Basic Website Preview
```asciidoc
browser-window:https://antora.org[]
```

### API Documentation
```asciidoc
[browser-window, url="https://api.example.com/v1/users"]
--
[source,json]
----
{
  "users": [
    {"id": 1, "name": "John Doe"},
    {"id": 2, "name": "Jane Smith"}
  ]
}
----
--
```

### Dashboard Interface
```asciidoc
[browser-window, url="https://dashboard.myapp.com", height=400, title="Analytics Dashboard"]
--
== Dashboard Overview

* 📊 **Total Users**: 1,234
* 📈 **Growth Rate**: +15%
* 💰 **Revenue**: $12,345

image::dashboard-screenshot.png[Dashboard Screenshot]
--
```

## Attributes

| Attribute | Description | Default | Example |
|-----------|-------------|---------|---------|
| `url` | URL shown in address bar | `http://localhost:3000` | `url="https://example.com"` |
| `height` | Minimum height in pixels | `300` | `height=500` |
| `title` | Accessible title | `Browser Window` | `title="My App Dashboard"` |

## Styling

The component uses CSS custom properties for theming. You can customize the appearance by overriding these variables:

```css
:root {
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-white: #ffffff;
}
```

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 60+  
- ✅ Safari 12+
- ✅ Edge 79+

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Docusaurus BrowserWindow](https://github.com/facebook/docusaurus/tree/main/packages/theme-classic/src/theme/BrowserWindow)
- Built for the [Antora](https://antora.org) documentation platform