# Create GitHub Repository - Step by Step

## 🎯 Quick Setup (5 Minutes)

### Step 1: Create Repository on GitHub

1. **Go to GitHub** → https://github.com/new

2. **Fill in details:**
   - Repository name: `create-bay`
   - Description: `CLI tool to create Pure JavaScript SPA projects with zero dependencies`
   - Visibility: ✅ **Public**
   - ❌ **DO NOT** initialize with README, .gitignore, or license (we already have them)

3. **Click "Create repository"**

---

### Step 2: Push Your Code

Run these commands in your terminal:

```bash
# Make sure you're in the create-bay directory
cd /Users/baybars/Desktop/Trails/spa-with-pure-js/create-bay

# Add GitHub as remote
git remote add origin https://github.com/baybars/create-bay.git

# Push to GitHub
git push -u origin main
```

---

### Step 3: Add NPM Token to GitHub Secrets

#### 3.1 Get Your NPM Token

1. Go to https://www.npmjs.com/
2. Click on your profile picture → "Access Tokens"
3. Click "Generate New Token" → "Classic Token"
4. Token type: **Automation**
5. **Copy the token** (you won't see it again!)

#### 3.2 Add Token to GitHub

1. Go to your repository: https://github.com/baybars/create-bay
2. Click "Settings" tab
3. Click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Name: `NPM_TOKEN`
6. Value: Paste your NPM token
7. Click "Add secret"

---

### Step 4: Publish Your First Version

```bash
# Make sure you're in create-bay directory
cd /Users/baybars/Desktop/Trails/spa-with-pure-js/create-bay

# Create a version tag
git tag v1.0.0

# Push the tag
git push origin v1.0.0
```

**GitHub Actions will automatically:**
- ✅ Install dependencies
- ✅ Publish to NPM
- ✅ Create GitHub release

---

## 🎉 That's It!

After a few minutes, your package will be live at:
- **NPM:** https://www.npmjs.com/package/create-bay
- **GitHub:** https://github.com/baybars/create-bay

### Test It Works

```bash
npx create-bay my-test-app
cd my-test-app
npm start
```

---

## 📊 Monitoring

### Check Publish Status

1. Go to https://github.com/baybars/create-bay/actions
2. You should see a "Publish to NPM" workflow running
3. Wait for it to complete (green checkmark)

### Verify on NPM

1. Go to https://www.npmjs.com/package/create-bay
2. You should see version 1.0.0
3. README should display

---

## 🔄 Future Updates

When you want to publish a new version:

```bash
# Update version (choose one)
npm version patch  # 1.0.0 → 1.0.1 (bug fixes)
npm version minor  # 1.0.0 → 1.1.0 (new features)
npm version major  # 1.0.0 → 2.0.0 (breaking changes)

# Push changes and tags
git push origin main --tags
```

GitHub Actions will automatically publish the new version!

---

## ⚠️ Troubleshooting

### Error: "npm ERR! need auth"

- Check NPM_TOKEN is added to GitHub secrets
- Make sure token has "Automation" permissions
- Verify token hasn't expired

### Error: "Package name already taken"

Option 1: Use scoped package
```json
{
  "name": "@baybars/create-bay"
}
```

Option 2: Choose different name
```json
{
  "name": "create-bay-spa"
}
```

### Error: "Remote already exists"

```bash
git remote remove origin
git remote add origin https://github.com/baybars/create-bay.git
```

---

## 📝 Summary

✅ Repository created on GitHub
✅ Code pushed to GitHub
✅ NPM token added to secrets
✅ GitHub Actions configured
✅ First version published
✅ Package live on NPM

**Your package is ready for the world! 🚀**

---

## 🔗 Quick Links

- **GitHub Repo:** https://github.com/baybars/create-bay
- **NPM Package:** https://www.npmjs.com/package/create-bay
- **Actions:** https://github.com/baybars/create-bay/actions
- **Releases:** https://github.com/baybars/create-bay/releases
