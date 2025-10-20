# GitHub Repository Setup Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (gh)

```bash
# Install gh if you haven't
# brew install gh (macOS)
# Or download from https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository
gh repo create create-bay --public --description "CLI tool to create Pure JavaScript SPA projects with zero dependencies"

# Add remote and push
git remote add origin https://github.com/baybars/create-bay.git
git push -u origin main
```

### Option B: Using GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `create-bay`
3. Description: `CLI tool to create Pure JavaScript SPA projects with zero dependencies`
4. Visibility: **Public**
5. Don't initialize with README (we already have one)
6. Click "Create repository"

Then run:
```bash
git remote add origin https://github.com/baybars/create-bay.git
git branch -M main
git push -u origin main
```

---

## Step 2: Configure NPM Token

### Get NPM Token

1. Go to https://www.npmjs.com/
2. Login to your account
3. Click on your profile → "Access Tokens"
4. Click "Generate New Token" → "Classic Token"
5. Select "Automation" (for CI/CD)
6. Copy the token (you won't see it again!)

### Add Token to GitHub

1. Go to your repository: https://github.com/baybars/create-bay
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM token
6. Click "Add secret"

---

## Step 3: Enable GitHub Actions

GitHub Actions should be enabled by default, but verify:

1. Go to your repository
2. Click "Actions" tab
3. If prompted, click "I understand my workflows, go ahead and enable them"

---

## Step 4: Publishing Workflow

The package is now set up to auto-publish when you create a new release tag.

### How to Publish

```bash
# Update version in package.json
npm version patch  # or minor, or major

# This creates a git tag like v1.0.1
# Push the tag to GitHub
git push origin main --tags

# GitHub Actions will automatically:
# 1. Run tests (if any)
# 2. Build the package
# 3. Publish to NPM
# 4. Create a GitHub release
```

### Manual Publishing (if needed)

```bash
# Login to NPM locally
npm login

# Publish manually
npm publish --access public
```

---

## Step 5: Verify Everything Works

1. **Check GitHub Repository**
   - Visit: https://github.com/baybars/create-bay
   - Verify all files are there
   - Check Actions tab for workflows

2. **Check NPM Package** (after first publish)
   - Visit: https://www.npmjs.com/package/create-bay
   - Verify package info is correct
   - Check README displays properly

3. **Test Installation**
   ```bash
   npx create-bay test-app
   cd test-app
   npm start
   ```

---

## Step 6: Add Repository Badges

Add these to your README.md:

```markdown
[![npm version](https://img.shields.io/npm/v/create-bay.svg)](https://www.npmjs.com/package/create-bay)
[![npm downloads](https://img.shields.io/npm/dm/create-bay.svg)](https://www.npmjs.com/package/create-bay)
[![GitHub](https://img.shields.io/github/stars/baybars/create-bay?style=social)](https://github.com/baybars/create-bay)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
```

---

## Troubleshooting

### Action Fails: "npm ERR! need auth"

- Make sure NPM_TOKEN is set in GitHub secrets
- Verify the token has "Automation" permissions
- Check the token hasn't expired

### Package Name Already Taken

- Change package name in package.json
- Update all references in documentation
- Try: `@baybars/create-bay` (scoped package)

### Git Push Rejected

```bash
git pull --rebase origin main
git push origin main
```

---

## Quick Commands

```bash
# Create GitHub repo (using gh CLI)
gh repo create create-bay --public

# Push to GitHub
git remote add origin https://github.com/baybars/create-bay.git
git push -u origin main

# Publish new version
npm version patch
git push origin main --tags

# View on GitHub
gh repo view --web

# View on NPM
npm view create-bay
```

---

## Security Best Practices

1. **Never commit NPM tokens** to git
2. **Use Automation tokens** for CI/CD (not personal tokens)
3. **Enable 2FA** on both GitHub and NPM
4. **Review workflow runs** regularly
5. **Use signed commits** (optional but recommended)

---

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Add NPM token to GitHub secrets
3. ✅ Push code to GitHub
4. ✅ Create first release tag
5. ✅ Verify auto-publish works
6. ✅ Test package installation
7. ✅ Update documentation
8. ✅ Share with community!

---

**Your package is ready to go! 🚀**
