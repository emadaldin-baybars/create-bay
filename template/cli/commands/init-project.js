/**
 * Init Project Command
 * Creates a complete new SPA project with all files, Git, and Docker
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
  toKebabCase,
  ensureDirectoryExists,
  log,
  error,
  success,
  info,
  warning
} from '../utils/helpers.js';

/**
 * Initialize a new SPA project
 * @param {string} projectName - Project name
 * @param {object} options - Command options
 */
export async function initProject(projectName, options) {
  try {
    log('\n🚀 Initializing new SPA project...\n');

    // Normalize project name
    const folderName = toKebabCase(projectName);
    const targetDir = path.join(process.cwd(), folderName);

    // Check if directory already exists
    if (fs.existsSync(targetDir)) {
      error(`❌ Directory "${folderName}" already exists!`);
      process.exit(1);
    }

    // Create project directory
    info(`📁 Creating project directory: ${folderName}`);
    ensureDirectoryExists(targetDir);

    // Get template directory (where this CLI is located)
    // The CLI is in <template>/cli/commands/init-project.js
    // So we need to go up 2 levels to get to template root
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const templateDir = path.join(__dirname, '..', '..');

    // Copy project structure
    info('📋 Copying project files...');
    copyProjectFiles(templateDir, targetDir, folderName);

    // Update package.json with project name
    info('📦 Updating package.json...');
    updatePackageJson(targetDir, projectName, folderName);

    // Initialize Git if not disabled
    if (options.git !== false) {
      info('\n🔧 Initializing Git repository...');
      initializeGit(targetDir);
    }

    // Initialize Docker if not disabled
    if (options.docker !== false) {
      info('🐳 Setting up Docker configuration...');
      // Docker files are already copied, just verify
      verifyDockerSetup(targetDir);
    }

    // Install dependencies if not skipped
    if (options.install !== false) {
      info('\n📥 Installing dependencies...');
      installDependencies(targetDir);
    }

    // Success message
    success('\n✨ Project created successfully!\n');

    // Display next steps
    displayNextSteps(folderName, options);

  } catch (err) {
    error('\n❌ Failed to initialize project:');
    error(err.message);
    console.error(err);
    process.exit(1);
  }
}

/**
 * Copy all project files to target directory
 */
function copyProjectFiles(templateDir, targetDir, projectName) {
  // Files and directories to copy
  const itemsToCopy = [
    'src',
    'docker-compose.yml',
    'Dockerfile',
    'nginx.conf',
    'package.json',
    '.gitignore',
    'favicon.svg',
    'README.md',
    'COMPONENT_GUIDE.md',
    'STYLING_GUIDE.md',
    'IMPLEMENTATION_GUIDE.md',
    'QUICK_REFERENCE.md',
    'CLI_GUIDE.md'
  ];

  // Items to exclude from copying
  const excludeItems = [
    'node_modules',
    '.git',
    'cli',
    'CLI_IMPLEMENTATION_SUMMARY.md',
    'README_VALIDATION.md'
  ];

  let copiedCount = 0;

  itemsToCopy.forEach(item => {
    const sourcePath = path.join(templateDir, item);
    const targetPath = path.join(targetDir, item);

    if (fs.existsSync(sourcePath)) {
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDirectory(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
      copiedCount++;
    }
  });

  // Copy CLI directory
  const cliSource = path.join(templateDir, 'cli');
  const cliTarget = path.join(targetDir, 'cli');
  if (fs.existsSync(cliSource)) {
    copyDirectory(cliSource, cliTarget);
    copiedCount++;
  }

  success(`✅ Copied ${copiedCount} items`);
}

/**
 * Recursively copy directory
 */
function copyDirectory(source, target) {
  ensureDirectoryExists(target);

  const files = fs.readdirSync(source);

  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}

/**
 * Update package.json with new project name
 */
function updatePackageJson(targetDir, projectName, folderName) {
  const packageJsonPath = path.join(targetDir, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    // Update project details
    packageJson.name = folderName;
    packageJson.version = '0.1.0';
    packageJson.description = `${projectName} - A Single Page Application built with Pure JavaScript`;
    packageJson.author = '';

    // Update repository
    if (packageJson.repository) {
      packageJson.repository.url = '';
    }

    // Update homepage
    packageJson.homepage = '';

    // Update bugs
    if (packageJson.bugs) {
      packageJson.bugs.url = '';
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    success('✅ Updated package.json');
  }
}

/**
 * Initialize Git repository
 */
function initializeGit(targetDir) {
  try {
    // Initialize git
    execSync('git init', { cwd: targetDir, stdio: 'ignore' });
    success('✅ Git repository initialized');

    // Create initial commit
    try {
      execSync('git add .', { cwd: targetDir, stdio: 'ignore' });
      execSync('git commit -m "Initial commit: SPA project scaffolded"', {
        cwd: targetDir,
        stdio: 'ignore'
      });
      success('✅ Initial commit created');
    } catch (err) {
      warning('⚠️  Could not create initial commit (configure git user first)');
      info('   Run: git config user.name "Your Name"');
      info('   Run: git config user.email "your@email.com"');
    }
  } catch (err) {
    warning('⚠️  Git initialization failed. Install git or run manually.');
  }
}

/**
 * Verify Docker setup
 */
function verifyDockerSetup(targetDir) {
  const dockerFiles = ['Dockerfile', 'docker-compose.yml', 'nginx.conf'];
  let allPresent = true;

  dockerFiles.forEach(file => {
    if (!fs.existsSync(path.join(targetDir, file))) {
      allPresent = false;
    }
  });

  if (allPresent) {
    success('✅ Docker configuration ready');
    info('   Run: docker-compose up (to start with Docker)');
  } else {
    warning('⚠️  Some Docker files are missing');
  }
}

/**
 * Install npm dependencies
 */
function installDependencies(targetDir) {
  try {
    info('   This may take a minute...');
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' });
    success('✅ Dependencies installed');
  } catch (err) {
    warning('⚠️  Failed to install dependencies. Run manually:');
    warning(`   cd ${path.basename(targetDir)} && npm install`);
  }
}

/**
 * Display next steps to user
 */
function displayNextSteps(folderName, options) {
  log('📚 Next steps:\n');
  log(`   1. cd ${folderName}`);

  if (options.install === false) {
    log('   2. npm install');
    log('   3. npm start');
  } else {
    log('   2. npm start');
  }

  log('\n🛠️  Or with Docker:');
  log(`   cd ${folderName}`);
  log('   docker-compose up');

  log('\n📖 Documentation:');
  log('   - README.md - Quick start and usage');
  log('   - CLI_GUIDE.md - CLI commands reference');
  log('   - COMPONENT_GUIDE.md - Component system guide');

  log('\n🎨 Generate code with CLI:');
  log('   npm run generate:page <name>');
  log('   npm run generate:component <Name>');
  log('   npm run generate:service <name>');

  log('\n💡 Tips:');
  log('   - Visit http://localhost:8080 after starting');
  log('   - Use CLI generators for rapid development');
  log('   - Check documentation for detailed guides');

  log('\n🚀 Happy coding!\n');
}
