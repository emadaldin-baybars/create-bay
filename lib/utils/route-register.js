/**
 * Route Registration Utility
 * Automatically registers new pages in global-scope.js
 */

import fs from 'fs';
import path from 'path';
import { readFileSafe, writeFileSafe, warning } from './helpers.js';

/**
 * Register a new route in global-scope.js
 * @param {string} className - Page class name (PascalCase)
 * @param {string} folderName - Page folder name (kebab-case)
 * @returns {boolean} Success status
 */
export function registerRoute(className, folderName) {
  try {
    const globalScopePath = path.join(process.cwd(), 'src', 'app', 'global-scope.js');

    if (!fs.existsSync(globalScopePath)) {
      warning('⚠️  Could not find src/app/global-scope.js');
      return false;
    }

    let content = readFileSafe(globalScopePath);
    if (!content) {
      return false;
    }

    // Check if route already exists
    if (content.includes(`from '../pages/${folderName}/${folderName}.js'`)) {
      warning(`⚠️  Route for ${className} already exists`);
      return false;
    }

    // Find the NotFound import (should be last)
    const notFoundImportMatch = content.match(/import\s+{\s*NotFound\s*}\s+from\s+['"].*not-found.*['"]/);

    if (!notFoundImportMatch) {
      warning('⚠️  Could not find NotFound import to add new route after');
      return false;
    }

    // Add import after NotFound import
    const newImport = `import { ${className} } from '../pages/${folderName}/${folderName}.js';`;
    content = content.replace(
      notFoundImportMatch[0],
      `${notFoundImportMatch[0]}\n${newImport}`
    );

    // Find the routes array and add new route before NotFound
    const routesArrayMatch = content.match(/const\s+routes\s*=\s*new\s+EnhancedRoutes\s*\(\s*\[([^\]]*)\]/s);

    if (!routesArrayMatch) {
      warning('⚠️  Could not find routes array');
      return false;
    }

    const routesContent = routesArrayMatch[1];

    // Add new route before NotFound
    const newRouteEntry = `        new ${className}(),`;
    const updatedRoutes = routesContent.replace(
      /(\s*)(new\s+NotFound\(\))/,
      `\n${newRouteEntry}\n$1$2`
    );

    content = content.replace(routesArrayMatch[0], `const routes = new EnhancedRoutes([${updatedRoutes}]`);

    // Write back to file
    return writeFileSafe(globalScopePath, content);

  } catch (err) {
    console.error('Error registering route:', err.message);
    return false;
  }
}
