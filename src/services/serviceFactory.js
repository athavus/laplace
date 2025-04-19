// src/services/serviceFactory.js

import projectService from './projectService';

/**
 * Service factory to manage different types of data persistence
 * This can be expanded to support different backends (localStorage, API, IndexedDB)
 */
class ServiceFactory {
  constructor() {
    this.services = {
      project: projectService
    };
    
    // Configuration for the service
    this.config = {
      // Could be 'localStorage', 'indexedDB', 'api', etc.
      storageType: 'localStorage',
      apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api'
    };
  }
  
  /**
   * Get project service instance
   * @returns {Object} Project service
   */
  getProjectService() {
    return this.services.project;
  }
  
  /**
   * Set the storage type to use
   * @param {string} type - Storage type ('localStorage', 'api', etc.)
   */
  setStorageType(type) {
    if (['localStorage', 'api', 'indexedDB'].includes(type)) {
      this.config.storageType = type;
      // Would need to reinitialize services based on new type
    } else {
      console.error(`Unsupported storage type: ${type}`);
    }
  }
  
  /**
   * Set API base URL for API storage type
   * @param {string} url - Base API URL
   */
  setApiBaseUrl(url) {
    this.config.apiBaseUrl = url;
  }
}

// Create and export a singleton instance
const serviceFactory = new ServiceFactory();
export default serviceFactory;