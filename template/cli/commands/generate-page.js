/**
 * Generate Page Command
 * Creates a new page with automatic route registration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  toPascalCase,
  toKebabCase,
  ensureDirectoryExists,
  log,
  error,
  success,
  info,
  warning
} from '../utils/helpers.js';
import { getPageTemplate } from '../templates/page.template.js';
import { registerRoute } from '../utils/route-register.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate a new page
 * @param {string} name - Page name
 * @param {object} options - Command options
 */
export async function generatePage(name, options) {
  try {
    log('\n📄 Generating new page...\n');

    // Normalize names
    const className = toPascalCase(name);
    const folderName = toKebabCase(name);
    const urlPath = options.path || folderName;

    // Prepare page config
    const pageConfig = {
      className,
      folderName,
      urlPath,
      title: options.title || `${className} Page`,
      description: options.description || `${className} page description`,
      includeSeo: options.seo !== false
    };

    // Create page directory
    const pageDir = path.join(process.cwd(), 'src', 'pages', folderName);

    if (fs.existsSync(pageDir)) {
      error(`❌ Page "${folderName}" already exists at ${pageDir}`);
      process.exit(1);
    }

    ensureDirectoryExists(pageDir);
    info(`📁 Created directory: src/pages/${folderName}`);

    // Generate page file
    const pageContent = getPageTemplate(pageConfig);
    const pageFile = path.join(pageDir, `${folderName}.js`);
    fs.writeFileSync(pageFile, pageContent);
    success(`✅ Created page file: ${folderName}.js`);

    // Register route automatically if not disabled
    if (options.route !== false) {
      info('\n🔗 Registering route...');
      const registered = registerRoute(className, folderName);

      if (registered) {
        success(`✅ Route registered in src/app/global-scope.js`);
        info(`   Import: import { ${className} } from '../pages/${folderName}/${folderName}.js';`);
        info(`   Route: new ${className}()`);
      } else {
        warning('⚠️  Could not auto-register route. Please add manually:');
        warning(`   1. Add import: import { ${className} } from '../pages/${folderName}/${folderName}.js';`);
        warning(`   2. Add to routes: new ${className}()`);
      }
    }

    // Add navigation link suggestion
    info('\n📝 To add navigation link, update src/index.html:');
    info(`   <a href="/${urlPath}" onclick="navigate(event, '${urlPath}')">${className}</a>`);

    // Success summary
    success('\n✨ Page generated successfully!\n');
    log('📦 Files created:');
    log(`   - src/pages/${folderName}/${folderName}.js`);
    log('\n🚀 Next steps:');
    log(`   1. Navigate to: http://localhost:8080/${urlPath}`);
    log(`   2. Edit page content in: src/pages/${folderName}/${folderName}.js`);
    if (options.route === false) {
      log(`   3. Register route manually in src/app/global-scope.js`);
    }
    log('');

  } catch (err) {
    error('\n❌ Failed to generate page:');
    error(err.message);
    console.error(err);
    process.exit(1);
  }
}
