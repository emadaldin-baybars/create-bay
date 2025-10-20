# Publishing Guide for create-bay

This guide explains how to publish the `create-bay` package to NPM.

---

## 📋 Prerequisites

1. **NPM Account**
   - Create an account at [npmjs.com](https://www.npmjs.com/)
   - Verify your email address

2. **Login to NPM**
   ```bash
   npm login
   # Enter your username, password, and email
   ```

3. **Verify Login**
   ```bash
   npm whoami
   # Should display your NPM username
   ```

---

## 🔍 Pre-Publishing Checklist

### 1. Update Package Information

Edit `package.json` and update:

```json
{
  "name": "create-bay",
  "version": "1.0.0",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/create-bay.git"
  },
  "homepage": "https://github.com/yourusername/create-bay#readme",
  "bugs": {
    "url": "https://github.com/yourusername/create-bay/issues"
  }
}
```

### 2. Test Package Locally

```bash
# In create-bay directory
npm install

# Test the CLI
node bin/create-bay.js test-app --no-install

# Verify project was created
ls test-app/

# Clean up
rm -rf test-app
```

### 3. Check Package Contents

```bash
# Preview what will be published
npm pack --dry-run

# This shows all files that will be included
```

### 4. Verify Files Are Correct

Check that these directories are included:
- ✅ `bin/`
- ✅ `lib/`
- ✅ `template/`
- ✅ `README.md`
- ✅ `LICENSE`
- ✅ `package.json`

And these are excluded:
- ❌ `node_modules/`
- ❌ `.git/`
- ❌ Test files
- ❌ Development files

---

## 📦 Publishing Process

### First Time Publishing

```bash
# Make sure you're in the create-bay directory
cd create-bay

# Check package name availability
npm search create-bay

# If name is available, publish
npm publish
```

### Publishing Updates

```bash
# 1. Update version in package.json
npm version patch  # For bug fixes (1.0.0 -> 1.0.1)
npm version minor  # For new features (1.0.0 -> 1.1.0)
npm version major  # For breaking changes (1.0.0 -> 2.0.0)

# 2. Publish to NPM
npm publish

# 3. Push tags to GitHub
git push origin main --tags
```

---

## 🎯 Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0) - Breaking changes
  - Changed command structure
  - Removed features
  - Changed template structure

- **MINOR** (1.0.0 → 1.1.0) - New features (backwards compatible)
  - Added new CLI commands
  - Added new components to template
  - Enhanced existing features

- **PATCH** (1.0.0 → 1.0.1) - Bug fixes
  - Fixed bugs
  - Updated documentation
  - Performance improvements

---

## 🔒 Publishing Scoped Package (Optional)

If you want to publish under your username/organization:

```bash
# Update package name
{
  "name": "@yourusername/create-bay"
}

# Publish scoped package
npm publish --access public
```

Users would then use:
```bash
npx @yourusername/create-bay my-app
```

---

## 🧪 Testing Before Publishing

### Test with npm link

```bash
# In create-bay directory
npm link

# Try creating a project
create-bay test-app
cd test-app
npm install
npm start

# Unlink when done
npm unlink -g create-bay
```

### Test with Local Tarball

```bash
# Create tarball
npm pack

# This creates: create-bay-1.0.0.tgz

# Install globally from tarball
npm install -g ./create-bay-1.0.0.tgz

# Test
create-bay test-app

# Uninstall
npm uninstall -g create-bay

# Clean up tarball
rm create-bay-1.0.0.tgz
```

---

## 📝 Post-Publishing Tasks

### 1. Verify Package on NPM

Visit: `https://www.npmjs.com/package/create-bay`

Check:
- ✅ README displays correctly
- ✅ Version is correct
- ✅ Keywords are showing
- ✅ Files list is correct

### 2. Test Installation

```bash
# In a different directory
npx create-bay test-from-npm

# Verify it works
cd test-from-npm
npm start
```

### 3. Create GitHub Release

```bash
# Tag the release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Go to GitHub and create a release from the tag
```

### 4. Update Documentation

- Update main project README
- Add link to NPM package
- Update installation instructions

---

## 🚨 Common Issues

### Issue: Package Name Taken

**Solution:** Choose a different name
```bash
# Try variations:
- create-bay
- bay-cli
- vanilla-spa-create
- @yourusername/create-bay (scoped)
```

### Issue: Permission Denied

**Solution:** Re-login to NPM
```bash
npm logout
npm login
```

### Issue: Files Missing After Publishing

**Solution:** Check .npmignore and package.json files array
```json
{
  "files": [
    "bin/",
    "lib/",
    "template/",
    "README.md",
    "LICENSE"
  ]
}
```

### Issue: Wrong Version Published

**Solution:** Unpublish within 72 hours (only for newly published packages)
```bash
npm unpublish create-bay@1.0.0
```

**Note:** After 72 hours, you cannot unpublish. Publish a new version instead.

---

## 🔄 Maintenance Workflow

### Regular Updates

```bash
# 1. Make changes to template or CLI
# 2. Test locally
npm run test-local

# 3. Update version
npm version patch

# 4. Update CHANGELOG.md
# Add what changed

# 5. Commit changes
git add .
git commit -m "Release v1.0.1: Fixed X, Added Y"

# 6. Publish
npm publish

# 7. Push to GitHub
git push origin main --tags
```

### Template Updates

When updating the template in `/template`:

1. Test that new projects are created correctly
2. Bump at least a MINOR version
3. Document changes in CHANGELOG.md
4. Test with: `node bin/create-bay.js test-new-template`

---

## 📊 Monitoring

### Check Download Stats

```bash
npm info create-bay
```

Or visit: `https://www.npmjs.com/package/create-bay`

### Monitor Issues

- Watch GitHub issues: `https://github.com/yourusername/create-bay/issues`
- Respond to NPM feedback

---

## 🎉 Success Checklist

After publishing, users should be able to:

- ✅ Run `npx create-bay my-app`
- ✅ See your package on npmjs.com
- ✅ Install globally: `npm install -g create-bay`
- ✅ Use as: `create-bay my-app`
- ✅ View documentation on NPM
- ✅ Report issues on GitHub
- ✅ See version number: `create-bay --version`

---

## 📚 Resources

- [NPM Publishing Docs](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [NPM CLI Documentation](https://docs.npmjs.com/cli/v8/commands)
- [Package.json Documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

---

## 🔐 Security

### Use 2FA (Two-Factor Authentication)

```bash
npm profile enable-2fa auth-and-writes
```

This requires 2FA for:
- Login
- Publishing packages
- Changing settings

---

**Ready to publish?** 🚀

```bash
cd create-bay
npm login
npm publish
```

**Congratulations!** Your package is now available worldwide! 🎉
