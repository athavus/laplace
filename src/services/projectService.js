// src/services/projectService.js

/**
 * Service for managing project data persistence using JSON format
 * Uses localStorage for client-side persistence
 */
class ProjectService {
  constructor() {
    this.storageKey = 'project_management_data';
    this.initialize();
  }

  /**
   * Initialize the service by ensuring storage exists
   */
  initialize() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  /**
   * Retrieve all projects from storage
   * @returns {Array} List of all projects
   */
  getAllProjects() {
    try {
      const projects = JSON.parse(localStorage.getItem(this.storageKey)) || [];
      return projects;
    } catch (error) {
      console.error('Error retrieving projects:', error);
      return [];
    }
  }

  /**
   * Save a new project to storage
   * @param {Object} projectData - Project object to save
   * @returns {Object} Saved project with generated ID
   */
  createProject(projectData) {
    try {
      const projects = this.getAllProjects();
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      
      const newProject = {
        id: newId,
        ...projectData,
        status: "Em análise",
        createdAt: new Date().toISOString(),
        priority: projectData.priority || "Média",
      };
      
      const updatedProjects = [...projects, newProject];
      localStorage.setItem(this.storageKey, JSON.stringify(updatedProjects));
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }

  /**
   * Update an existing project
   * @param {number} id - Project ID to update
   * @param {Object} updatedData - New project data
   * @returns {Object|null} Updated project or null if not found
   */
  updateProject(id, updatedData) {
    try {
      const projects = this.getAllProjects();
      const index = projects.findIndex(project => project.id === id);
      
      if (index === -1) return null;
      
      const updatedProject = { ...projects[index], ...updatedData };
      projects[index] = updatedProject;
      
      localStorage.setItem(this.storageKey, JSON.stringify(projects));
      return updatedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  }

  /**
   * Delete a project by ID
   * @param {number} id - Project ID to delete
   * @returns {boolean} Success status
   */
  deleteProject(id) {
    try {
      const projects = this.getAllProjects();
      const filteredProjects = projects.filter(project => project.id !== id);
      
      localStorage.setItem(this.storageKey, JSON.stringify(filteredProjects));
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }

  /**
   * Delete multiple projects by IDs
   * @param {Array} ids - Array of project IDs to delete
   * @returns {boolean} Success status
   */
  deleteMultipleProjects(ids) {
    try {
      const projects = this.getAllProjects();
      const remainingProjects = projects.filter(project => !ids.includes(project.id));
      
      localStorage.setItem(this.storageKey, JSON.stringify(remainingProjects));
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
   * @returns {Object|null} Updated project or null if not found
   */
  updateProjectStatus(id, status) {
    return this.updateProject(id, { status });
  }

  /**
   * Get project by ID
   * @param {number} id - Project ID to find
   * @returns {Object|null} Project object or null if not found
   */
  getProjectById(id) {
    try {
      const projects = this.getAllProjects();
      return projects.find(project => project.id === id) || null;
    } catch (error) {
      console.error('Error retrieving project:', error);
      return null;
    }
  }

  /**
   * Clear all projects data (mainly for testing)
   */
  clearAllData() {
    localStorage.removeItem(this.storageKey);
    this.initialize();
  }
}

// Create and export a singleton instance
const projectService = new ProjectService();
export default projectService;