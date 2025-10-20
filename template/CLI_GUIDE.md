# CLI Guide

Complete guide to using the SPA CLI tool for generating pages, components, and services.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Commands](#commands)
4. [Initializing a New Project](#initializing-a-new-project)
5. [Generating Pages](#generating-pages)
6. [Generating Components](#generating-components)
7. [Generating Services](#generating-services)
8. [Examples](#examples)
9. [Troubleshooting](#troubleshooting)

---

## Installation

The CLI tool is included with the SPA template. After cloning the project:

```bash
# Install dependencies (includes commander for CLI)
npm install

# Verify CLI is working
npm run cli -- --help
```

### Global Installation (Optional)

To use `spa-cli` command globally:

```bash
# Link the CLI globally
npm link

# Now you can use spa-cli from anywhere in the project
spa-cli --help
```

---

## Quick Start

```bash
# Create a brand new project (recommended for starting fresh!)
npm run create my-awesome-app

# Or generate components in existing project:

# Generate a new page (with automatic routing)
npm run generate:page my-awesome-page

# Generate a new component (with CSS)
npm run generate:component MyAwesomeComponent

# Generate a new service (for API calls)
npm run generate:service user

# Or use the full CLI syntax
npm run cli -- init my-app
npm run cli -- generate:page about --title "About Us"
npm run cli -- generate:component Button --no-state
npm run cli -- generate:service product --base-url "https://api.example.com"
```

---

## Commands

### List Available Commands

```bash
npm run cli -- list
# or
npm run cli -- ls
```

**Output:**
```
📦 Available Commands:

  🚀 Init:        spa-cli init <project-name>
  📄 Pages:       spa-cli generate:page <name>
  🧩 Components:  spa-cli generate:component <name>
  ⚙️  Services:    spa-cli generate:service <name>

💡 Use --help with any command for more options
```

### Get Help

```bash
# General help
npm run cli -- --help

# Command-specific help
npm run cli -- generate:page --help
npm run cli -- generate:component --help
npm run cli -- generate:service --help
```

### Project Info

```bash
npm run cli -- info
```

**Output:**
```
🚀 Pure JavaScript SPA Template
📦 Version: 1.0.0
📚 Documentation: README.md
🔗 Repository: https://github.com/elidaniel92/spa-with-pure-js.git
```

---

## Initializing a New Project

### Create a Complete New Project

```bash
npm run create <project-name>
# or
npm run cli -- init <project-name>
```

**What it does:**
1. ✅ Creates new project directory
2. ✅ Copies all project files (src/, cli/, docs, etc.)
3. ✅ Updates package.json with your project name
4. ✅ Initializes Git repository
5. ✅ Creates initial commit
6. ✅ Sets up Docker configuration
7. ✅ Installs npm dependencies
8. ✅ Ready to run immediately!

**Example:**

```bash
npm run create my-awesome-app
```

**Creates:**
```
my-awesome-app/
├── src/                    # Complete source code
│   ├── index.html
│   ├── app/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   └── styles/
├── cli/                    # CLI tool included
├── docker-compose.yml      # Docker setup
├── Dockerfile
├── nginx.conf
├── package.json           # Updated with your project name
├── .gitignore
├── .git/                  # Git initialized
└── Documentation files
```

**Result:**
```
🚀 Initializing new SPA project...

📁 Creating project directory: my-awesome-app
📋 Copying project files...
✅ Copied 12 items
📦 Updating package.json...
✅ Updated package.json

🔧 Initializing Git repository...
✅ Git repository initialized
✅ Initial commit created
🐳 Setting up Docker configuration...
✅ Docker configuration ready

📥 Installing dependencies...
   This may take a minute...
✅ Dependencies installed

✨ Project created successfully!

📚 Next steps:

   1. cd my-awesome-app
   2. npm start

🛠️  Or with Docker:
   cd my-awesome-app
   docker-compose up
```

### Init Command Options

```bash
# Basic initialization
npm run cli -- init my-app

# Skip Git initialization
npm run cli -- init my-app --no-git

# Skip Docker setup
npm run cli -- init my-app --no-docker

# Skip npm install (install manually later)
npm run cli -- init my-app --no-install

# Skip everything except file copying
npm run cli -- init my-app --no-git --no-docker --no-install
```

### After Project Creation

Once your project is created, navigate into it and start developing:

```bash
cd my-awesome-app

# Start development server
npm start
# Visit http://localhost:8080

# Or use Docker
docker-compose up
# Or with hot reload
docker-compose watch

# Generate code using CLI
npm run generate:page dashboard
npm run generate:component UserCard
npm run generate:service user
```

---

## Generating Pages

### Basic Page Generation

```bash
npm run generate:page <page-name>
```

**What it does:**
1. ✅ Creates `src/pages/<page-name>/<page-name>.js`
2. ✅ Automatically registers route in `src/app/global-scope.js`
3. ✅ Adds import statement
4. ✅ Adds to routes array (before NotFound)
5. ✅ Includes SEO configuration
6. ✅ Provides navigation link code

**Example:**

```bash
npm run generate:page about
```

**Creates:**
```
src/pages/about/about.js
```

**Registers:**
```javascript
// In src/app/global-scope.js
import { About } from '../pages/about/about.js';

const routes = new EnhancedRoutes([
  new Home(),
  new CatFact(),
  new ContactForm(),
  new Example(),
  new About(),      // ← Automatically added
  new NotFound()
]);
```

### Page Generation Options

```bash
# Custom URL path (different from folder name)
npm run cli -- generate:page team --path "our-team"

# Custom title and description
npm run cli -- generate:page services \
  --title "Our Services" \
  --description "Explore our range of services"

# Skip SEO configuration
npm run cli -- generate:page temp --no-seo

# Skip automatic route registration
npm run cli -- generate:page draft --no-route
```

### Generated Page Structure

```javascript
export class MyPage {
  paths = ['my-page'];
  title = 'My Page';
  description = 'Page description';

  seoConfig = {
    title: 'My Page',
    description: 'Page description',
    keywords: 'my-page, page, spa',
    type: 'website'
  };

  constructor() {}

  async getPageContent() {
    return `
      <div class="page-container">
        <header class="page-header">
          <h1>My Page</h1>
          <p class="subtitle">Page description</p>
        </header>

        <section class="content-section">
          <!-- Add your content here -->
        </section>
      </div>
    `;
  }
}
```

---

## Generating Components

### Basic Component Generation

```bash
npm run generate:component <ComponentName>
```

**What it does:**
1. ✅ Creates `src/components/<ComponentName>/<ComponentName>.js`
2. ✅ Creates `src/components/<ComponentName>/<ComponentName>.css`
3. ✅ Automatically registers CSS in `src/styles/main.css`
4. ✅ Includes state management
5. ✅ Includes lifecycle methods
6. ✅ Extends base Component class

**Example:**

```bash
npm run generate:component Modal
```

**Creates:**
```
src/components/Modal/Modal.js
src/components/Modal/Modal.css
```

**Registers CSS:**
```css
/* In src/styles/main.css */
@import url('../components/Modal/Modal.css');
```

### Component Generation Options

```bash
# Custom directory
npm run cli -- generate:component FormInput --dir "src/components/forms"

# Without CSS file
npm run cli -- generate:component SimpleText --no-css

# Without state management
npm run cli -- generate:component StaticCard --no-state

# Without lifecycle methods
npm run cli -- generate:component BasicButton --no-lifecycle

# Minimal component (no state, no lifecycle)
npm run cli -- generate:component Icon --no-state --no-lifecycle
```

### Generated Component Structure

**JavaScript (with state and lifecycle):**
```javascript
import { Component } from '../Component.js';

export class MyComponent extends Component {
  constructor(props = {}) {
    super({
      title: 'Default Title',
      variant: 'default',
      ...props
    });

    this.state = {
      count: 0
    };
  }

  render() {
    const { title, variant } = this.props;
    const { count } = this.state;

    return `
      <div class="my-component my-component--${variant}">
        <h3>${this.escapeHTML(title)}</h3>
        <p>Count: ${count}</p>
        <button data-action="increment">Increment</button>
      </div>
    `;
  }

  attachEventListeners() {
    const btn = this.element.querySelector('[data-action="increment"]');
    btn?.addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
    });
  }

  onCreate() {
    console.log('MyComponent created');
  }

  onMount() {
    console.log('MyComponent mounted');
  }

  onDestroy() {
    console.log('MyComponent destroyed');
  }
}
```

**CSS:**
```css
.my-component {
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

.my-component__title {
  color: var(--primary-color);
}

/* Variants */
.my-component--primary {
  border-color: var(--accent-color);
}
```

---

## Generating Services

### Basic Service Generation

```bash
npm run generate:service <service-name>
```

**What it does:**
1. ✅ Creates `src/services/<service-name>.js`
2. ✅ Includes CRUD methods (getAll, getById, create, update, delete)
3. ✅ Includes search method
4. ✅ Uses existing API service for requests
5. ✅ Includes proper error handling

**Example:**

```bash
npm run generate:service user
```

**Creates:**
```
src/services/user.js
```

### Service Generation Options

```bash
# Custom directory
npm run cli -- generate:service analytics --dir "src/api"

# Custom base URL
npm run cli -- generate:service product --base-url "https://api.mystore.com/v1"
```

### Generated Service Structure

```javascript
import { apiService } from './api-service.js';

const BASE_URL = 'https://api.example.com';

export const userService = {
  async getAll() {
    try {
      const response = await apiService.get(`${BASE_URL}/user`);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await apiService.get(`${BASE_URL}/user/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  async create(data) {
    try {
      const response = await apiService.post(`${BASE_URL}/user`, data);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async update(id, data) {
    try {
      const response = await apiService.put(`${BASE_URL}/user/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  async delete(id) {
    try {
      await apiService.delete(`${BASE_URL}/user/${id}`);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  async search(query) {
    try {
      const response = await apiService.get(
        `${BASE_URL}/user/search?q=${encodeURIComponent(query)}`
      );
      return response;
    } catch (error) {
      console.error('Error searching user:', error);
      throw error;
    }
  }
};
```

---

## Examples

### Example 1: Create a Blog Feature

```bash
# Generate blog page
npm run generate:page blog --title "Blog Posts"

# Generate blog post component
npm run generate:component BlogPost

# Generate blog service
npm run generate:service blog --base-url "https://api.myblog.com"
```

**Result:**
- ✅ `src/pages/blog/blog.js` (with route registered)
- ✅ `src/components/BlogPost/BlogPost.js`
- ✅ `src/components/BlogPost/BlogPost.css` (registered in main.css)
- ✅ `src/services/blog.js`

### Example 2: Create a Dashboard

```bash
# Generate dashboard page
npm run generate:page dashboard \
  --title "Admin Dashboard" \
  --description "Administrative dashboard"

# Generate dashboard components
npm run generate:component DashboardCard
npm run generate:component StatWidget --no-lifecycle
npm run generate:component ChartContainer

# Generate analytics service
npm run generate:service analytics --base-url "https://api.analytics.com"
```

### Example 3: Create User Management

```bash
# Pages
npm run generate:page users --title "Users"
npm run generate:page user-profile --path "users/:id"

# Components
npm run generate:component UserCard
npm run generate:component UserList
npm run generate:component UserForm

# Service
npm run generate:service user --base-url "https://api.myapp.com/v1"
```

---

## Troubleshooting

### Error: Not in a valid SPA project directory

**Problem:** Running CLI outside project root

**Solution:**
```bash
cd /path/to/spa-with-pure-js
npm run cli -- generate:page about
```

### Error: Page already exists

**Problem:** Trying to create a page that already exists

**Solution:**
```bash
# Use a different name or delete existing page
rm -rf src/pages/about
npm run generate:page about
```

### Error: Could not register route

**Problem:** Auto-registration failed (manual registration needed)

**Solution:**
```javascript
// Manually add to src/app/global-scope.js
import { MyPage } from '../pages/my-page/my-page.js';

const routes = new EnhancedRoutes([
  new Home(),
  new MyPage(),  // Add here
  new NotFound()
]);
```

### Error: Could not register CSS

**Problem:** Auto-registration of CSS failed

**Solution:**
```css
/* Manually add to src/styles/main.css */
@import url('../components/MyComponent/MyComponent.css');
```

### CLI Not Found

**Problem:** `spa-cli` command not found

**Solution:**
```bash
# Make sure you've installed dependencies
npm install

# Use npm script instead
npm run cli -- --help

# Or link globally
npm link
```

---

## Best Practices

### Page Naming

- ✅ **Good:** `about`, `contact-us`, `user-profile`
- ❌ **Bad:** `About`, `CONTACT`, `user_profile`

### Component Naming

- ✅ **Good:** `UserCard`, `BlogPost`, `NavigationMenu`
- ❌ **Bad:** `userCard`, `blog-post`, `navigation_menu`

### Service Naming

- ✅ **Good:** `user`, `blog`, `product`
- ❌ **Bad:** `UserService`, `BlogAPI`, `ProductClient`

### Workflow

1. **Generate Page** → Automatically registers route
2. **Generate Components** → Use in your page
3. **Generate Service** → Fetch data for your page
4. **Test** → Navigate to your new page
5. **Customize** → Edit generated files to your needs

---

## Advanced Usage

### Custom Templates

To customize generated code, edit template files:

- **Pages:** `cli/templates/page.template.js`
- **Components:** `cli/templates/component.template.js`
- **Services:** `cli/templates/service.template.js`

### Extending the CLI

Add new commands in `cli/commands/` and register in `cli/index.js`.

---

**Need Help?**

- Read **[README.md](README.md)** for template documentation
- Read **[COMPONENT_GUIDE.md](COMPONENT_GUIDE.md)** for component details
- Read **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** for code examples

---

**Happy Generating!** 🚀
