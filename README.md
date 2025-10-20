# create-bay

> Create Pure JavaScript SPA projects with zero dependencies - the fast way!

[![npm version](https://img.shields.io/npm/v/create-bay.svg)](https://www.npmjs.com/package/create-bay)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/create-bay.svg)](https://nodejs.org)

**Create production-ready Single Page Applications using pure JavaScript, HTML, and CSS - no frameworks, no build tools required.**

---

## ✨ Features

- 🚀 **Instant Project Setup** - Create a complete SPA project in seconds
- 🧩 **Component System** - State management, lifecycle methods, reusable components
- 🎨 **150+ Utility Classes** - Tailwind-like utilities for rapid styling
- 📱 **Fully Responsive** - Mobile-first design out of the box
- 🔒 **Security Built-in** - XSS prevention, CSP headers, input sanitization
- 🐳 **Docker Ready** - Docker configuration with hot reload
- 📊 **SEO Optimized** - Dynamic meta tags, structured data, sitemap
- 🎯 **Client-Side Routing** - Fast navigation without page reloads
- 🛠️ **Code Generators** - CLI tools to generate pages, components, and services
- 📚 **Comprehensive Docs** - Guides for components, styling, and implementation

---

## 🚀 Quick Start

### Create a New Project

```bash
# Using npx (recommended)
npx create-bay my-awesome-app

# Using npm
npm create bay my-awesome-app

# Using yarn
yarn create bay my-awesome-app

# Using pnpm
pnpm create bay my-awesome-app
```

That's it! Your project is ready with:
- ✅ Complete project structure
- ✅ Git initialized with initial commit
- ✅ Docker configured and ready
- ✅ Dependencies installed
- ✅ Development server ready to run

### Start Development

```bash
cd my-awesome-app

# Start development server
npm start
# Visit http://localhost:8080

# Or use Docker
docker-compose up

# Or with hot reload
docker-compose watch
```

---

## 📦 What You Get

### Complete Project Structure

```
my-awesome-app/
├── src/                      # Source code
│   ├── index.html           # Main entry point
│   ├── app/                 # Core application
│   │   ├── app.js          # Entry point & navigation
│   │   ├── enhanced-routes.js # Routing with guards
│   │   └── global-scope.js  # Global state
│   ├── components/          # Reusable components
│   │   ├── Component.js    # Base component class
│   │   ├── Button/
│   │   ├── Card/
│   │   └── List/
│   ├── pages/               # Page components
│   │   ├── home/
│   │   ├── cat-fact/
│   │   ├── contact-form/
│   │   └── example/
│   ├── services/            # API services
│   │   └── api-service.js
│   ├── utils/               # Utilities
│   │   ├── seo-manager.js
│   │   ├── form-validator.js
│   │   └── sitemap-generator.js
│   ├── config/
│   │   └── constants.js
│   └── styles/
│       └── main.css        # Global styles + utilities
├── cli/                     # CLI tool (included!)
│   ├── commands/           # Code generators
│   ├── templates/          # Code templates
│   └── utils/              # CLI utilities
├── docker-compose.yml       # Docker Compose config
├── Dockerfile               # Docker image
├── nginx.conf               # Nginx configuration
├── package.json
└── Documentation files      # Comprehensive guides
```

### Built-in Examples

- **Home Page** - Landing page with components
- **Cat Facts** - API integration example
- **Contact Form** - Form validation example
- **Component Examples** - Showcase of all components

### Documentation Included

- **README.md** - Quick start and usage
- **CLI_GUIDE.md** - CLI commands reference
- **COMPONENT_GUIDE.md** - Component system guide
- **STYLING_GUIDE.md** - CSS architecture and best practices
- **IMPLEMENTATION_GUIDE.md** - Feature implementation guide
- **QUICK_REFERENCE.md** - Code snippets and examples

---

## 🛠️ CLI Tools

The created project includes powerful CLI tools for rapid development:

### Generate a New Page (with automatic routing!)

```bash
# Basic page generation
npm run generate:page about

# With custom options
npm run cli -- generate:page team --title "Our Team" --description "Meet the team"
```

**What it does:**
- ✅ Creates page file in `src/pages/`
- ✅ Automatically registers route in `global-scope.js`
- ✅ Includes SEO configuration
- ✅ Ready to use immediately!

### Generate a New Component (with CSS!)

```bash
# Basic component generation
npm run generate:component UserCard

# Without state management
npm run cli -- generate:component StaticWidget --no-state
```

**What it does:**
- ✅ Creates component file in `src/components/`
- ✅ Creates CSS file automatically
- ✅ Registers CSS in `main.css`
- ✅ Includes state management and lifecycle methods

### Generate a New Service (for API calls!)

```bash
# Basic service generation
npm run generate:service user

# With custom base URL
npm run cli -- generate:service product --base-url "https://api.mystore.com/v1"
```

**What it does:**
- ✅ Creates service file in `src/services/`
- ✅ Includes CRUD methods (getAll, getById, create, update, delete)
- ✅ Includes search functionality
- ✅ Uses existing API service for error handling

---

## 🎯 Use Cases

### Perfect For

- ✅ **Learning JavaScript** - Understand how SPAs work without framework magic
- ✅ **Prototypes** - Quickly build and test ideas
- ✅ **Small to Medium Projects** - Blogs, portfolios, landing pages, dashboards
- ✅ **No Build Step** - Deploy directly to any static hosting
- ✅ **Performance-Critical Apps** - Zero framework overhead
- ✅ **Teaching** - Show students how SPAs work under the hood

### Real-World Examples

```bash
# Blog
npx create-bay my-blog

# Portfolio
npx create-bay my-portfolio

# Dashboard
npx create-bay admin-dashboard

# Landing Page
npx create-bay product-landing
```

---

## 🎨 Component System

Create powerful, reusable components with state management:

```javascript
import { Component } from '../Component.js';

export class Counter extends Component {
  constructor(props = {}) {
    super(props);

    this.state = {
      count: 0
    };
  }

  render() {
    const { count } = this.state;

    return `
      <div class="counter">
        <p>Count: ${count}</p>
        <button class="counter__btn">Increment</button>
      </div>
    `;
  }

  attachEventListeners() {
    const btn = this.element.querySelector('.counter__btn');
    btn?.addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
    });
  }
}

// Use in your page
const counter = new Counter();
counter.mount('#app');
```

---

## 🚀 Deployment

### Static Hosting

Your project is ready to deploy to:
- AWS S3
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Just deploy the `src/` folder!

### Docker Production

```bash
# Build production image
docker build -t my-spa:latest .

# Run production container
docker run -p 80:80 my-spa:latest
```

---

## 📖 Advanced Usage

### Create Project Without Features

```bash
# Without Git
npx create-bay my-app --no-git

# Without npm install
npx create-bay my-app --no-install

# Without Docker
npx create-bay my-app --no-docker

# Minimal setup (only files)
npx create-bay my-app --no-git --no-docker --no-install
```

### Using the Full CLI

After creating your project, you have access to the full CLI:

```bash
cd my-app

# List all commands
npm run cli -- list

# Get help for any command
npm run cli -- generate:page --help
npm run cli -- generate:component --help
npm run cli -- generate:service --help

# View project info
npm run cli -- info
```

---

## 🔧 Requirements

- **Node.js** 16+ (for development server and CLI)
- **Docker** (optional, for Docker-based development)
- **Git** (optional, for version control)

---

## 🌟 Why Pure JavaScript?

### Advantages

- ✅ **Zero Dependencies** - No framework to learn, no breaking changes
- ✅ **Fast Performance** - No framework overhead
- ✅ **Full Control** - You own every line of code
- ✅ **Easy Debugging** - Standard JavaScript, no magic
- ✅ **Long-term Stability** - JavaScript won't change drastically
- ✅ **Small Bundle Size** - Ship only what you write
- ✅ **SEO Friendly** - Full control over meta tags and rendering

### When to Use

- Learning JavaScript fundamentals
- Building performance-critical applications
- Projects that need to last years without updates
- When you want full control over your codebase
- Prototypes and MVPs
- Small to medium-sized projects

### When NOT to Use

- Very large applications (100+ pages/components)
- Projects requiring complex state management across many components
- When you need a large ecosystem of plugins
- Team already invested in a specific framework

---

## 📊 Comparison

| Feature | create-bay | React/Vue/Angular |
|---------|----------------|-------------------|
| Bundle Size | ~10KB | 40KB - 100KB+ |
| Learning Curve | Low | Medium - High |
| Setup Time | 30 seconds | 5-10 minutes |
| Build Required | No | Yes |
| Dependencies | 0 (runtime) | Many |
| Performance | Excellent | Good |
| Control | Full | Limited |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT © [Your Name]

---

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/create-bay)
- [NPM Package](https://www.npmjs.com/package/create-bay)
- [Documentation](https://github.com/yourusername/create-bay#readme)
- [Report Issues](https://github.com/yourusername/create-bay/issues)

---

## 🙏 Acknowledgments

- Built with ❤️ using pure JavaScript
- No frameworks, no dependencies
- Inspired by modern SPA best practices

---

**Ready to build something amazing with pure JavaScript?** 🚀

```bash
npx create-bay my-awesome-app
cd my-awesome-app
npm start
```

**Happy Coding!** 🎉
