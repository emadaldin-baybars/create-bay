#!/usr/bin/env node

/**
 * bay
 * Full CLI tool for managing Pure JavaScript SPA projects
 *
 * Usage:
 *   bay init <project-name>
 *   bay generate:page <name>
 *   bay generate:component <Name>
 *   bay generate:service <name>
 */

import { Command } from 'commander';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';

// Import commands
import { initProject } from '../lib/commands/init-project.js';
import { generatePage } from '../lib/commands/generate-page.js';
import { generateComponent } from '../lib/commands/generate-component.js';
import { generateService } from '../lib/commands/generate-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

const program = new Command();

program
  .name('bay')
  .description('CLI tool to create and manage Pure JavaScript SPA projects')
  .version(packageJson.version);

// Init command
program
  .command('init <project-name>')
  .description('Initialize a new SPA project with all files, Git, and Docker')
  .option('--no-git', 'Skip Git initialization')
  .option('--no-docker', 'Skip Docker setup')
  .option('--no-install', 'Skip npm install')
  .action(initProject);

// Generate page command
program
  .command('generate:page <name>')
  .alias('g:page')
  .description('Generate a new page with automatic routing')
  .option('-p, --path <path>', 'Custom URL path')
  .option('-t, --title <title>', 'Page title')
  .option('-d, --description <description>', 'Page description')
  .option('--no-seo', 'Skip SEO configuration')
  .option('--no-route', 'Skip automatic route registration')
  .action(generatePage);

// Generate component command
program
  .command('generate:component <name>')
  .alias('g:component')
  .description('Generate a new component with CSS')
  .option('--dir <directory>', 'Custom directory (default: src/components)')
  .option('--no-css', 'Skip CSS file generation')
  .option('--no-state', 'Skip state management')
  .option('--no-lifecycle', 'Skip lifecycle methods')
  .action(generateComponent);

// Generate service command
program
  .command('generate:service <name>')
  .alias('g:service')
  .description('Generate a new API service')
  .option('--dir <directory>', 'Custom directory (default: src/services)')
  .option('-b, --base-url <url>', 'Base URL for API (default: https://api.example.com)')
  .action(generateService);

// List command
program
  .command('list')
  .alias('ls')
  .description('List all available commands')
  .action(() => {
    console.log('\n📦 Available Commands:\n');
    console.log('  🚀 Init:        bay init <project-name>');
    console.log('  📄 Pages:       bay generate:page <name>');
    console.log('  🧩 Components:  bay generate:component <name>');
    console.log('  ⚙️  Services:    bay generate:service <name>');
    console.log('\n💡 Use --help with any command for more options\n');
  });

// Info command
program
  .command('info')
  .description('Display project information')
  .action(() => {
    console.log('\n🚀 Pure JavaScript SPA Template - create-bay');
    console.log(`📦 Version: ${packageJson.version}`);
    console.log('📚 Documentation: https://github.com/baybars/create-bay');
    console.log('🔗 Repository: https://github.com/baybars/create-bay\n');
  });

program.parse(process.argv);
