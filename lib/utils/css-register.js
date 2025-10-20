/**
 * CSS Registration Utility
 * Automatically registers component CSS in main.css
 */

import fs from 'fs';
import path from 'path';
import { readFileSafe, writeFileSafe, warning } from './helpers.js';

/**
 * Register component CSS in main.css
 * @param {string} componentName - Component name (PascalCase)
 * @returns {boolean} Success status
 */
export function registerComponentCss(componentName) {
  try {
    const mainCssPath = path.join(process.cwd(), 'src', 'styles', 'main.css');

    if (!fs.existsSync(mainCssPath)) {
      warning('⚠️  Could not find src/styles/main.css');
      return false;
    }

    let content = readFileSafe(mainCssPath);
    if (!content) {
      return false;
    }

    const importStatement = `@import url('../components/${componentName}/${componentName}.css');`;

    // Check if already imported
    if (content.includes(importStatement)) {
      warning(`⚠️  CSS for ${componentName} already imported`);
      return false;
    }

    // Find the Component Imports section
    const componentImportsMatch = content.match(/\/\*\s*Component Imports\s*\*\/[\s\S]*?\/\*\s*Import component styles\s*\*\//);

    if (!componentImportsMatch) {
      // If section doesn't exist, add it before Accessibility section
      const accessibilityMatch = content.match(/\/\*\s*=+\s*Accessibility\s*=+\s*\*\//);

      if (accessibilityMatch) {
        content = content.replace(
          accessibilityMatch[0],
          `/* ========================================
   Component Imports
   ======================================== */

/* Import component styles */
${importStatement}

${accessibilityMatch[0]}`
        );
      } else {
        // Add at the end
        content += `\n/* ========================================
   Component Imports
   ======================================== */

/* Import component styles */
${importStatement}\n`;
      }
    } else {
      // Add to existing imports section (after the last import)
      const existingImports = componentImportsMatch[0];
      const lastImportMatch = existingImports.match(/@import url\([^)]+\);[^\n]*/g);

      if (lastImportMatch && lastImportMatch.length > 0) {
        const lastImport = lastImportMatch[lastImportMatch.length - 1];
        content = content.replace(lastImport, `${lastImport}\n${importStatement}`);
      } else {
        // No existing imports, add after comment
        content = content.replace(
          /\/\*\s*Import component styles\s*\*\//,
          `/* Import component styles */\n${importStatement}`
        );
      }
    }

    // Write back to file
    return writeFileSafe(mainCssPath, content);

  } catch (err) {
    console.error('Error registering CSS:', err.message);
    return false;
  }
}
