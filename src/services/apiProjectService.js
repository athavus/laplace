// src/services/apiProjectService.js

/**
 * Service for managing project data persistence using a REST API
 */
class ApiProjectService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || 'http://localhost:3001/api';
    this.projectsEndpoint = `${this.baseUrl}/projects`;
  }

  /**
   * Retrieve all projects from the API
   * @returns {Promise<Array>} List of all projects
   */
  async getAllProjects() {
    try {
      const response = await fetch(this.projectsEndpoint);
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error retrieving projects:', error);
      return [];
    }
  }

  /**
   * Save a new project to the API
   * @param {Object} projectData - Project object to save
   * @returns {Promise<Object>} Saved project with generated ID
   */
  async createProject(projectData) {
    try {
      const newProject = {
        ...projectData,
        status: "Em análise",
        createdAt: new Date().toISOString(),
        priority: projectData.priority || "Média",
      };
      
      const response = await fetch(this.projectsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }

  /**
   * Update an existing project
   * @param {number} id - Project ID to update
   * @param {Object} updatedData - New project data
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(id, updatedData) {
    try {
      const response = await fetch(`${this.projectsEndpoint}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  }

  /**
   * Delete a project by ID
   * @param {number} id - Project ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteProject(id) {
    try {
      const response = await fetch(`${this.projectsEndpoint}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }

  /**
   * Delete multiple projects by IDs
   * @param {Array} ids - Array of project IDs to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteMultipleProjects(ids) {
    try {
      const response = await fetch(`${this.projectsEndpoint}/batch`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      });
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting multiple projects:', error);
      throw new Error('Failed to delete projects');
    }
  }

  /**
   * Change project status
   * @param {number} id - Project ID
   * @param {string} status - New status value
   * @returns {Promise<Object>} Updated project
   */
  async updateProjectStatus(id, status) {
    return this.updateProject(id, { status });
  }

  /**
   * Get project by ID
   * @param {number} id - Project ID to find
   * @returns {Promise<Object>} Project object
   */
  async getProjectById(id) {
    try {
      const response = await fetch(`${this.projectsEndpoint}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error retrieving project:', error);
      return null;
    }
  }
}

export default ApiProjectService;