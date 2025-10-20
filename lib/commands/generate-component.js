/**
 * Generate Component Command
 * Creates a new component with CSS file
 */

import fs from 'fs';
import path from 'path';
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
import { getComponentTemplate, getComponentCssTemplate } from '../templates/component.template.js';
import { registerComponentCss } from '../utils/css-register.js';

/**
 * Generate a new component
 * @param {string} name - Component name
 * @param {object} options - Command options
 */
export async function generateComponent(name, options) {
  try {
    log('\n🧩 Generating new component...\n');

    // Normalize names
    const className = toPascalCase(name);
    const folderName = className; // Components use PascalCase folders
    const cssClassName = toKebabCase(name);

    // Component directory
    const componentDir = options.dir
      ? path.join(process.cwd(), options.dir, folderName)
      : path.join(process.cwd(), 'src', 'components', folderName);

    if (fs.existsSync(componentDir)) {
      error(`❌ Component "${folderName}" already exists at ${componentDir}`);
      process.exit(1);
    }

    ensureDirectoryExists(componentDir);
    const relativePath = componentDir.replace(process.cwd() + '/', '');
    info(`📁 Created directory: ${relativePath}`);

    // Component config
    const componentConfig = {
      className,
      cssClassName,
      includeState: options.state !== false,
      includeLifecycle: options.lifecycle !== false
    };

    // Generate component JS file
    const componentContent = getComponentTemplate(componentConfig);
    const componentFile = path.join(componentDir, `${className}.js`);
    fs.writeFileSync(componentFile, componentContent);
    success(`✅ Created component file: ${className}.js`);

    // Generate CSS file if not disabled
    if (options.css !== false) {
      const cssContent = getComponentCssTemplate(cssClassName);
      const cssFile = path.join(componentDir, `${className}.css`);
      fs.writeFileSync(cssFile, cssContent);
      success(`✅ Created CSS file: ${className}.css`);

      // Register CSS in main.css
      info('\n🎨 Registering CSS...');
      const registered = registerComponentCss(className);

      if (registered) {
        success(`✅ CSS registered in src/styles/main.css`);
      } else {
        warning('⚠️  Could not auto-register CSS. Please add manually to src/styles/main.css:');
        warning(`   @import url('../components/${className}/${className}.css');`);
      }
    }

    // Usage example
    info('\n📝 Usage example:');
    info(`   import { ${className} } from '../../components/${className}/${className}.js';`);
    info('');
    info(`   const component = new ${className}({`);
    info(`     // props here`);
    info(`   });`);
    info(`   component.mount('#container');`);

    // Success summary
    success('\n✨ Component generated successfully!\n');
    log('📦 Files created:');
    log(`   - ${relativePath}/${className}.js`);
    if (options.css !== false) {
      log(`   - ${relativePath}/${className}.css`);
    }
    log('\n🚀 Next steps:');
    log(`   1. Customize component in: ${relativePath}/${className}.js`);
    if (options.css !== false) {
      log(`   2. Add styles in: ${relativePath}/${className}.css`);
    }
    log(`   3. Import and use in your pages`);
    log('');

  } catch (err) {
    error('\n❌ Failed to generate component:');
    error(err.message);
    console.error(err);
    process.exit(1);
  }
}
