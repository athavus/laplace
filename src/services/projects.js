import CardsService from './cards';

/**
 * Service for managing project data using localStorage
 */
class Projects {
  constructor() {
    this.storageKey = 'projects';
    this._initializeStorage();
  }

  /**
   * Initialize storage if not already done
   * @private
   */
  _initializeStorage() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  /**
   * Get all projects from localStorage
   * @private
   * @returns {Array} All projects
   */
  _getAllProjects() {
    const projectsString = localStorage.getItem(this.storageKey);
    return JSON.parse(projectsString) || [];
  }

  /**
   * Save all projects to localStorage
   * @private
   * @param {Array} projects - Projects to save
   */
  _saveProjects(projects) {
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
  }

  /**
   * Generate a unique ID for new projects
   * @private
   * @returns {number} New unique ID
   */
  _generateId() {
    const projects = this._getAllProjects();
    const maxId = projects.reduce((max, project) => Math.max(max, Number(project.id) || 0), 0);
    return maxId + 1;
  }

  /**
   * Retrieve all projects from localStorage
   * @returns {Promise<Array>} List of all projects
   */
  async getAllProjects() {
    try {
      const projects = this._getAllProjects();
      // Sort by created_at descending (newest first)
      return projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
      console.error('Error retrieving projects:', error);
      return [];
    }
  }

  /**
   * Save a new project to localStorage
   * @param {Object} projectData - Project object to save
   * @returns {Promise<Object>} Saved project with generated ID
   */
  async createProject(projectData) {
    try {
      const projects = this._getAllProjects();
      
      const newProject = {
        id: this._generateId(),
        name: projectData.name,
        description: projectData.description,
        coordinator: projectData.coordinator,
        priority: projectData.priority || 'Média',
        status: 'Em análise',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      projects.push(newProject);
      this._saveProjects(projects);
      
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }
  }

  /**
   * Update an existing project
   * @param {number|string} id - Project ID to update
   * @param {Object} updatedData - New project data
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(id, updatedData) {
    try {
      const projects = this._getAllProjects();
      // Converter id para número
      const numericId = Number(id);
      
      const projectIndex = projects.findIndex(project => Number(project.id) === numericId);
      
      if (projectIndex === -1) {
        throw new Error('Project not found');
      }
      
      // Update only the fields provided in updatedData
      Object.keys(updatedData).forEach(key => {
        projects[projectIndex][key] = updatedData[key];
      });

      // Update timestamp
      projects[projectIndex].updated_at = new Date().toISOString();
      
      this._saveProjects(projects);
      return projects[projectIndex];
    } catch (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }
  }

  /**
   * Delete a project by ID
   * @param {number|string} id - Project ID to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteProject(id) {
    try {
      const projects = this._getAllProjects();
      // Converter id para número
      const numericId = Number(id);
      
      const updatedProjects = projects.filter(project => Number(project.id) !== numericId);
      
      this._saveProjects(updatedProjects);
      
      // Also delete associated cards
      this._deleteAssociatedCards(numericId);
      
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }

  /**
   * Delete cards associated with a project
   * @private
   * @param {number} projectId - Project ID
   */
  _deleteAssociatedCards(projectId) {
    try {
      const cardsKey = 'project_cards';
      const cardsString = localStorage.getItem(cardsKey);
      if (cardsString) {
        const cards = JSON.parse(cardsString);
        const updatedCards = cards.filter(card => Number(card.project_id) !== Number(projectId));
        localStorage.setItem(cardsKey, JSON.stringify(updatedCards));
      }
    } catch (error) {
      console.error('Error deleting associated cards:', error);
    }
  }

  /**
   * Delete multiple projects by IDs
   * @param {Array} ids - Array of project IDs to delete
   * @returns {Promise<boolean>} Success status
   */
  async deleteMultipleProjects(ids) {
    try {
      const projects = this._getAllProjects();
      // Converter todos os ids para números
      const numericIds = ids.map(id => Number(id));
      
      const updatedProjects = projects.filter(project => !numericIds.includes(Number(project.id)));
      
      this._saveProjects(updatedProjects);
      
      // Also delete associated cards for each project
      numericIds.forEach(id => this._deleteAssociatedCards(id));
      
      return true;
    } catch (error) {
      console.error('Error deleting multiple projects:', error);
      throw new Error('Failed to delete projects');
    }
  }

  /**
   * Change project status
   * @param {number|string} id - Project ID
   * @param {string} status - New status value
   * @returns {Promise<Object>} Updated project
   */
  async updateProjectStatus(id, status) {
    return this.updateProject(id, { status });
  }

  /**
   * Get project by ID
   * @param {number|string} id - Project ID to find
   * @returns {Promise<Object>} Project object
   */
  async getProjectById(id) {
    try {
      const projects = this._getAllProjects();
      // Converter id para número
      const numericId = Number(id);
      
      const project = projects.find(project => Number(project.id) === numericId);
      
      // Importante: Verificar se o projeto existe
      if (!project) {
        console.warn(`Project with ID ${id} not found`);
        return null;
      }
      
      return project;
    } catch (error) {
      console.error('Error retrieving project:', error);
      return null;
    }
  }

  /**
   * Get projects by status
   * @param {string} status - Status to filter by
   * @returns {Promise<Array>} List of projects with the specified status
   */
  async getProjectsByStatus(status) {
    try {
      const projects = this._getAllProjects();
      const filteredProjects = projects.filter(project => project.status === status);
      
      // Sort by created_at descending (newest first)
      return filteredProjects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } catch (error) {
      console.error('Error retrieving projects by status:', error);
      return [];
    }
  }

  /**
   * Adiciona alguns projetos de exemplo se o localStorage estiver vazio
   * Útil para demonstração do projeto
   */
  async addSampleProjects() {
    const projects = this._getAllProjects();
    if (projects.length === 0) {
      const sampleProjects = [
        {
          name: "Projeto Exemplo 1",
          description: "Este é um projeto de exemplo para demonstração",
          coordinator: "João Silva",
          priority: "Alta",
          status: "Em análise"
        },
        {
          name: "Projeto Exemplo 2",
          description: "Segundo projeto de exemplo com algumas tarefas",
          coordinator: "Maria Oliveira",
          priority: "Média",
          status: "Em andamento"
        }
      ];
      
      // Criar os projetos de exemplo
      const project1 = await this.createProject(sampleProjects[0]);
      const project2 = await this.createProject(sampleProjects[1]);
      
      // Adicionar alguns cards de exemplo
      const cardsService = new CardsService();
      
      // Cards para o projeto 1
      await cardsService.createCard({
        projectId: project1.id,
        text: "Tarefa 1 do Projeto 1",
        description: "Descrição da tarefa 1",
        column: "To Do"
      });
      
      await cardsService.createCard({
        projectId: project1.id,
        text: "Tarefa 2 do Projeto 1",
        description: "Descrição da tarefa 2",
        column: "In Progress"
      });
      
      // Cards para o projeto 2
      await cardsService.createCard({
        projectId: project2.id,
        text: "Tarefa 1 do Projeto 2",
        description: "Descrição da tarefa 1",
        column: "To Do"
      });
      
      await cardsService.createCard({
        projectId: project2.id,
        text: "Tarefa 2 do Projeto 2",
        description: "Descrição da tarefa 2",
        column: "Done"
      });
      
      return true;
    }
    return false;
  }
}

const projects = new Projects();
export default projects;