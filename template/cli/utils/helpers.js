/**
 * CLI Helper Utilities
 */

import fs from 'fs';
import path from 'path';

/**
 * Convert string to PascalCase
 * @param {string} str - Input string
 * @returns {string} PascalCase string
 */
export function toPascalCase(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (char) => char.toUpperCase());
}

/**
 * Convert string to kebab-case
 * @param {string} str - Input string
 * @returns {string} kebab-case string
 */
export function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to camelCase
 * @param {string} str - Input string
 * @returns {string} camelCase string
 */
export function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Ensure directory exists, create if it doesn't
 * @param {string} dirPath - Directory path
 */
export function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Console logging with colors
 */
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

export function log(message) {
  console.log(message);
}

export function error(message) {
  console.log(`${colors.red}${message}${colors.reset}`);
}

export function success(message) {
  console.log(`${colors.green}${message}${colors.reset}`);
}

export function info(message) {
  console.log(`${colors.cyan}${message}${colors.reset}`);
}

export function warning(message) {
  console.log(`${colors.yellow}${message}${colors.reset}`);
}

/**
 * Read file safely
 * @param {string} filePath - File path
 * @returns {string|null} File content or null
 */
export function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    return null;
  }
}

/**
 * Write file safely
 * @param {string} filePath - File path
 * @param {string} content - File content
 * @returns {boolean} Success status
 */
export function writeFileSafe(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Check if running in project root
 * @returns {boolean} True if in project root
 */
export function isInProjectRoot() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const srcPath = path.join(process.cwd(), 'src');

  return fs.existsSync(packageJsonPath) && fs.existsSync(srcPath);
}

/**
 * Validate project structure
 * @throws {Error} If not in valid project
 */
export function validateProject() {
  if (!isInProjectRoot()) {
    throw new Error(
      'Not in a valid SPA project directory. Please run this command from the project root.'
    );
  }
}
