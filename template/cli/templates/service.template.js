/**
 * Service Template Generator
 */

/**
 * Generate service template content
 * @param {object} config - Service configuration
 * @param {string} config.className - Class name (PascalCase)
 * @param {string} config.fileName - File name (kebab-case)
 * @param {string} config.baseUrl - API base URL
 * @returns {string} Service template content
 */
export function getServiceTemplate(config) {
  const { className, fileName, baseUrl } = config;

  return `/**
 * ${className} Service
 * Service for ${fileName} API endpoints
 */
import { apiService } from './api-service.js';

/**
 * Base URL for ${fileName} API
 */
const BASE_URL = '${baseUrl}';

/**
 * ${className} Service
 * Handles all ${fileName}-related API calls
 */
export const ${fileName}Service = {
  /**
   * Get all ${fileName} items
   * @returns {Promise<Array>} Array of items
   */
  async getAll() {
    try {
      const response = await apiService.get(\`\${BASE_URL}/${fileName}\`);
      return response;
    } catch (error) {
      console.error('Error fetching ${fileName}:', error);
      throw error;
    }
  },

  /**
   * Get ${fileName} item by ID
   * @param {number|string} id - Item ID
   * @returns {Promise<Object>} Item data
   */
  async getById(id) {
    try {
      const response = await apiService.get(\`\${BASE_URL}/${fileName}/\${id}\`);
      return response;
    } catch (error) {
      console.error(\`Error fetching ${fileName} \${id}:\`, error);
      throw error;
    }
  },

  /**
   * Create new ${fileName} item
   * @param {Object} data - Item data
   * @returns {Promise<Object>} Created item
   */
  async create(data) {
    try {
      const response = await apiService.post(\`\${BASE_URL}/${fileName}\`, data);
      return response;
    } catch (error) {
      console.error('Error creating ${fileName}:', error);
      throw error;
    }
  },

  /**
   * Update ${fileName} item
   * @param {number|string} id - Item ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated item
   */
  async update(id, data) {
    try {
      const response = await apiService.put(\`\${BASE_URL}/${fileName}/\${id}\`, data);
      return response;
    } catch (error) {
      console.error(\`Error updating ${fileName} \${id}:\`, error);
      throw error;
    }
  },

  /**
   * Delete ${fileName} item
   * @param {number|string} id - Item ID
   * @returns {Promise<void>}
   */
  async delete(id) {
    try {
      await apiService.delete(\`\${BASE_URL}/${fileName}/\${id}\`);
    } catch (error) {
      console.error(\`Error deleting ${fileName} \${id}:\`, error);
      throw error;
    }
  },

  /**
   * Search ${fileName} items
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  async search(query) {
    try {
      const response = await apiService.get(\`\${BASE_URL}/${fileName}/search?q=\${encodeURIComponent(query)}\`);
      return response;
    } catch (error) {
      console.error('Error searching ${fileName}:', error);
      throw error;
    }
  }
};
`;
}
