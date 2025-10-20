# create-bay - Usage Examples

Real-world examples of using create-bay to build different types of projects.

---

## 📝 Blog

Create a blog in 30 seconds:

```bash
# Create project
npx create-bay my-blog
cd my-blog

# Generate blog structure
npm run generate:page blog --title "Blog Posts"
npm run generate:page post --path "blog/:id" --title "Blog Post"
npm run generate:component BlogCard
npm run generate:component BlogHeader
npm run generate:service blog --base-url "https://api.myblog.com"

# Start development
npm start
```

**Result:** Complete blog with:
- Blog listing page
- Individual post pages
- Blog card component
- Blog API service
- SEO optimized
- Ready to customize

---

## 💼 Portfolio

Create a professional portfolio:

```bash
# Create project
npx create-bay my-portfolio
cd my-portfolio

# Generate portfolio pages
npm run generate:page about --title "About Me"
npm run generate:page projects --title "My Projects"
npm run generate:page contact --title "Contact Me"

# Generate portfolio components
npm run generate:component ProjectCard
npm run generate:component SkillBadge
npm run generate:component Timeline
npm run generate:component ContactForm

# No backend needed - static portfolio!
npm start
```

**Result:** Portfolio with:
- About page
- Projects showcase
- Contact form
- Professional components
- Fully responsive

---

## 🛒 E-Commerce Store

Create an e-commerce frontend:

```bash
# Create project
npx create-bay my-store
cd my-store

# Generate store pages
npm run generate:page products --title "Products"
npm run generate:page product --path "products/:id" --title "Product Details"
npm run generate:page cart --title "Shopping Cart"
npm run generate:page checkout --title "Checkout"

# Generate store components
npm run generate:component ProductCard
npm run generate:component ProductGrid
npm run generate:component CartItem
npm run generate:component PriceTag

# Generate API services
npm run generate:service product --base-url "https://api.mystore.com/v1"
npm run generate:service cart --base-url "https://api.mystore.com/v1"
npm run generate:service checkout --base-url "https://api.mystore.com/v1"

# Start development
npm start
```

**Result:** E-commerce frontend with:
- Product listing
- Product details
- Shopping cart
- Checkout flow
- Complete API integration

---

## 📊 Dashboard

Create an admin dashboard:

```bash
# Create project
npx create-bay admin-dashboard
cd admin-dashboard

# Generate dashboard pages
npm run generate:page dashboard --title "Dashboard"
npm run generate:page users --title "User Management"
npm run generate:page analytics --title "Analytics"
npm run generate:page settings --title "Settings"

# Generate dashboard components
npm run generate:component StatsCard
npm run generate:component ChartWidget
npm run generate:component DataTable
npm run generate:component UserCard
npm run generate:component Sidebar
npm run generate:component TopBar

# Generate services
npm run generate:service user --base-url "https://api.example.com/v1"
npm run generate:service analytics --base-url "https://api.example.com/v1"

# Start development
npm start
```

**Result:** Admin dashboard with:
- Main dashboard
- User management
- Analytics page
- Settings
- Reusable widgets

---

## 🎓 Landing Page

Create a product landing page:

```bash
# Create project
npx create-bay product-landing
cd product-landing

# Generate landing page sections
npm run generate:page home --title "Product Name - Amazing Solution"
npm run generate:page pricing --title "Pricing Plans"
npm run generate:page features --title "Features"

# Generate landing page components
npm run generate:component Hero
npm run generate:component FeatureCard
npm run generate:component PricingCard
npm run generate:component Testimonial
npm run generate:component FAQ
npm run generate:component CTA

# Generate form service for leads
npm run generate:service leads --base-url "https://api.example.com/v1"

# Start development
npm start
```

**Result:** Landing page with:
- Hero section
- Features showcase
- Pricing table
- Testimonials
- FAQ section
- Lead capture form

---

## 📱 Mobile-First App

Create a mobile-first web app:

```bash
# Create project
npx create-bay mobile-app
cd mobile-app

# Generate app pages
npm run generate:page feed --title "Feed"
npm run generate:page profile --title "Profile"
npm run generate:page messages --title "Messages"
npm run generate:page notifications --title "Notifications"

# Generate mobile components
npm run generate:component BottomNav
npm run generate:component SwipeCard
npm run generate:component InfiniteScroll
npm run generate:component PullToRefresh

# Generate services
npm run generate:service feed --base-url "https://api.app.com/v1"
npm run generate:service user --base-url "https://api.app.com/v1"

# Start development
npm start
```

**Result:** Mobile-first app with:
- Touch-optimized UI
- Bottom navigation
- Swipe gestures
- Infinite scroll
- Pull to refresh

---

## 🎨 Design System

Create a component library/design system:

```bash
# Create project
npx create-bay design-system
cd design-system

# Generate documentation pages
npm run generate:page home --title "Design System"
npm run generate:page components --title "Components"
npm run generate:page colors --title "Colors"
npm run generate:page typography --title "Typography"

# Generate all UI components
npm run generate:component Button
npm run generate:component Input
npm run generate:component Select
npm run generate:component Checkbox
npm run generate:component Radio
npm run generate:component Toggle
npm run generate:component Modal
npm run generate:component Tooltip
npm run generate:component Alert
npm run generate:component Badge
npm run generate:component Spinner

# Start development
npm start
```

**Result:** Design system with:
- Component showcase
- Color palette
- Typography guide
- Reusable components
- Copy-paste examples

---

## 🔐 SaaS App

Create a SaaS application frontend:

```bash
# Create project
npx create-bay saas-app
cd saas-app

# Generate auth pages
npm run generate:page login --title "Login"
npm run generate:page register --title "Sign Up"
npm run generate:page forgot-password --title "Forgot Password"

# Generate app pages
npm run generate:page dashboard --title "Dashboard"
npm run generate:page projects --title "Projects"
npm run generate:page team --title "Team"
npm run generate:page billing --title "Billing"
npm run generate:page settings --title "Settings"

# Generate components
npm run generate:component AuthForm
npm run generate:component ProjectCard
npm run generate:component TeamMember
npm run generate:component BillingPlan
npm run generate:component SettingsPanel

# Generate services
npm run generate:service auth --base-url "https://api.saas.com/v1"
npm run generate:service project --base-url "https://api.saas.com/v1"
npm run generate:service team --base-url "https://api.saas.com/v1"
npm run generate:service billing --base-url "https://api.saas.com/v1"

# Start development
npm start
```

**Result:** SaaS frontend with:
- Authentication flow
- Dashboard
- Project management
- Team collaboration
- Billing integration

---

## 🎬 Deployment Examples

### Deploy to Netlify

```bash
# Create project
npx create-bay my-app
cd my-app

# Build for production (already done - just src/)
# Deploy
netlify deploy --dir=src --prod
```

### Deploy to Vercel

```bash
# Create project
npx create-bay my-app
cd my-app

# Deploy
vercel --prod
```

### Deploy with Docker

```bash
# Create project
npx create-bay my-app
cd my-app

# Build Docker image
docker build -t my-app:latest .

# Run on production
docker run -p 80:80 my-app:latest
```

### Deploy to AWS S3

```bash
# Create project
npx create-bay my-app
cd my-app

# Upload to S3
aws s3 sync src/ s3://my-bucket --delete
aws s3 website s3://my-bucket --index-document index.html
```

---

## 🚀 Quick Prototypes

### 15-Minute MVP

```bash
# 1. Create project (30 seconds)
npx create-bay mvp
cd mvp

# 2. Generate structure (30 seconds)
npm run generate:page landing --title "Landing Page"
npm run generate:component Hero
npm run generate:component Features
npm run generate:service contact

# 3. Customize content (10 minutes)
# Edit src/pages/landing/landing.js
# Edit src/components/Hero/Hero.js

# 4. Deploy (3 minutes)
netlify deploy --dir=src --prod

# Total: 15 minutes ✅
```

---

## 💡 Pro Tips

### Rapid Development Workflow

```bash
# Create base project
npx create-bay my-app
cd my-app

# Generate all pages at once
npm run generate:page home
npm run generate:page about
npm run generate:page contact

# Generate all components at once
npm run generate:component Header
npm run generate:component Footer
npm run generate:component Sidebar

# Generate all services at once
npm run generate:service user
npm run generate:service product
npm run generate:service order

# Start dev server
npm start

# In another terminal, start Docker (with hot reload)
docker-compose watch
```

### Team Collaboration

```bash
# Team lead creates base project
npx create-bay team-project
cd team-project
git remote add origin https://github.com/team/project.git
git push -u origin main

# Team members clone
git clone https://github.com/team/project.git
cd project
npm install

# Each team member generates their features
npm run generate:page my-feature
npm run generate:component MyComponent

# Push changes
git add .
git commit -m "Add my feature"
git push
```

---

## 📚 Learning Path

### Beginner: Simple Blog

```bash
npx create-bay learning-blog
cd learning-blog
npm run generate:page posts
npm run generate:component PostCard
npm start
```

### Intermediate: Full SPA

```bash
npx create-bay full-app
cd full-app
# Generate multiple pages, components, services
# Implement routing, state management, API calls
```

### Advanced: Enterprise App

```bash
npx create-bay enterprise
cd enterprise
# Complex architecture
# Multiple features
# Advanced components
# Full API integration
```

---

**More examples coming soon!**

Have a cool project built with create-bay? Share it with us!
