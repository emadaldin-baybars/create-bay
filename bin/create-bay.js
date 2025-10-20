#!/usr/bin/env node

/**
 * create-bay
 * Quick command to create a new Pure JavaScript SPA project
 *
 * Usage:
 *   npx create-bay my-app
 *   npm create bay my-app
 */

import { initProject } from '../lib/commands/init-project.js';

const projectName = process.argv[2];

if (!projectName) {
  console.error('\n❌ Error: Project name is required\n');
  console.log('Usage:');
  console.log('  npx create-bay <project-name>');
  console.log('  npm create bay <project-name>\n');
  console.log('Example:');
  console.log('  npx create-bay my-awesome-app\n');
  process.exit(1);
}

// Parse options from command line
const options = {
  git: !process.argv.includes('--no-git'),
  docker: !process.argv.includes('--no-docker'),
  install: !process.argv.includes('--no-install')
};

// Run init with default options
initProject(projectName, options);
