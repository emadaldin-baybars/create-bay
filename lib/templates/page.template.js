/**
 * Page Template Generator
 */

/**
 * Generate page template content
 * @param {object} config - Page configuration
 * @param {string} config.className - Class name (PascalCase)
 * @param {string} config.folderName - Folder name (kebab-case)
 * @param {string} config.urlPath - URL path
 * @param {string} config.title - Page title
 * @param {string} config.description - Page description
 * @param {boolean} config.includeSeo - Include SEO configuration
 * @returns {string} Page template content
 */
export function getPageTemplate(config) {
  const { className, urlPath, title, description, includeSeo } = config;

  const seoSection = includeSeo
    ? `
  // SEO Configuration
  seoConfig = {
    title: '${title}',
    description: '${description}',
    keywords: '${urlPath}, page, spa',
    type: 'website'
  };
`
    : '';

  return `/**
 * ${className} Page
 * ${description}
 */
export class ${className} {
  // URL paths for this page
  paths = ['${urlPath}'];

  // Page metadata
  title = '${title}';
  description = '${description}';
${seoSection}
  constructor() {
    // Initialize page state if needed
  }

  /**
   * Get page content
   * @returns {Promise<string>} HTML content
   */
  async getPageContent() {
    return \`
      <div class="page-container">
        <header class="page-header">
          <h1>${title}</h1>
          <p class="subtitle">${description}</p>
        </header>

        <section class="content-section">
          <p>Welcome to ${className} page!</p>

          <!-- Add your content here -->

        </section>
      </div>

      <style>
        .content-section {
          margin-top: 2rem;
        }
      </style>

      <script type="module">
        // Add page-specific JavaScript here
        console.log('${className} page loaded');
      </script>
    \`;
  }
}
`;
}
