#!/usr/bin/env node

/**
 * SPA CLI Tool
 * Command-line interface for generating pages, components, and services
 */

import { Command } from 'commander';
import { generatePage } from './commands/generate-page.js';
import { generateComponent } from './commands/generate-component.js';
import { generateService } from './commands/generate-service.js';
import { initProject } from './commands/init-project.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJson = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
);

const program = new Command();

program
  .name('spa-cli')
  .description('CLI tool for Pure JavaScript SPA template')
  .version(packageJson.version);

// Init project command
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
  .option('-p, --path <path>', 'Custom URL path (defaults to name)')
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
  .option('-d, --dir <directory>', 'Component directory (default: src/components)')
  .option('--no-css', 'Skip CSS file generation')
  .option('--no-state', 'Generate component without state')
  .option('--no-lifecycle', 'Skip lifecycle methods')
  .action(generateComponent);

// Generate service command
program
  .command('generate:service <name>')
  .alias('g:service')
  .description('Generate a new service')
  .option('-d, --dir <directory>', 'Service directory (default: src/services)')
  .option('-b, --base-url <url>', 'API base URL')
  .action(generateService);

// List command to show what can be generated
program
  .command('list')
  .alias('ls')
  .description('List all available commands')
  .action(() => {
    console.log('\n📦 Available Commands:\n');
    console.log('  🚀 Init:        spa-cli init <project-name>');
    console.log('  📄 Pages:       spa-cli generate:page <name>');
    console.log('  🧩 Components:  spa-cli generate:component <name>');
    console.log('  ⚙️  Services:    spa-cli generate:service <name>');
    console.log('\n💡 Use --help with any command for more options\n');
  });

// Info command
program
  .command('info')
  .description('Display project information')
  .action(() => {
    console.log('\n🚀 Pure JavaScript SPA Template');
    console.log(`📦 Version: ${packageJson.version}`);
    console.log('📚 Documentation: README.md');
    console.log('🔗 Repository: ' + packageJson.repository.url);
    console.log('\n');
  });

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
