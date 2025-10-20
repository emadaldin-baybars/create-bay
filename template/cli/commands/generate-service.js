/**
 * Generate Service Command
 * Creates a new service for API calls
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
  info
} from '../utils/helpers.js';
import { getServiceTemplate } from '../templates/service.template.js';

/**
 * Generate a new service
 * @param {string} name - Service name
 * @param {object} options - Command options
 */
export async function generateService(name, options) {
  try {
    log('\n⚙️  Generating new service...\n');

    // Normalize names
    const className = toPascalCase(name);
    const fileName = toKebabCase(name);

    // Service directory
    const serviceDir = options.dir
      ? path.join(process.cwd(), options.dir)
      : path.join(process.cwd(), 'src', 'services');

    ensureDirectoryExists(serviceDir);

    const serviceFile = path.join(serviceDir, `${fileName}.js`);

    if (fs.existsSync(serviceFile)) {
      error(`❌ Service "${fileName}.js" already exists at ${serviceDir}`);
      process.exit(1);
    }

    // Service config
    const serviceConfig = {
      className,
      fileName,
      baseUrl: options.baseUrl || 'https://api.example.com'
    };

    // Generate service file
    const serviceContent = getServiceTemplate(serviceConfig);
    fs.writeFileSync(serviceFile, serviceContent);

    const relativePath = serviceFile.replace(process.cwd() + '/', '');
    success(`✅ Created service file: ${relativePath}`);

    // Usage example
    info('\n📝 Usage example:');
    info(`   import { ${fileName}Service } from '../../services/${fileName}.js';`);
    info('');
    info(`   // Get data`);
    info(`   const data = await ${fileName}Service.getAll();`);
    info('');
    info(`   // Get by ID`);
    info(`   const item = await ${fileName}Service.getById(123);`);
    info('');
    info(`   // Create`);
    info(`   const newItem = await ${fileName}Service.create({ name: 'Test' });`);
    info('');
    info(`   // Update`);
    info(`   const updated = await ${fileName}Service.update(123, { name: 'Updated' });`);
    info('');
    info(`   // Delete`);
    info(`   await ${fileName}Service.delete(123);`);

    // Success summary
    success('\n✨ Service generated successfully!\n');
    log('📦 Files created:');
    log(`   - ${relativePath}`);
    log('\n🚀 Next steps:');
    log(`   1. Update base URL in: ${relativePath}`);
    log(`   2. Customize API methods as needed`);
    log(`   3. Import and use in your pages`);
    log('');

  } catch (err) {
    error('\n❌ Failed to generate service:');
    error(err.message);
    console.error(err);
    process.exit(1);
  }
}
