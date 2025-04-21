// hooks/useProjects.js
import { useState, useEffect, useCallback } from "react";
import localProjects from "../../services/projects";

export function useProjects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Use useCallback para memoizar a função e evitar recriações desnecessárias
	const loadProjects = useCallback(async () => {
		try {
			setLoading(true);
			const allProjects = await localProjects.getAllProjects();
			setProjects(allProjects);
			setError(null);
		} catch (err) {
			console.error("Error loading projects:", err);
			setError("Falha ao carregar projetos. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadProjects();
	}, [loadProjects]);

	const createProject = async (projectData) => {
		if (projectData.name.trim() === "") return false;

		try {
			setLoading(true);
			await localProjects.createProject(projectData);
			// Recarrega imediatamente os projetos após criar um novo
			await loadProjects();
			return true;
		} catch (error) {
			console.error("Failed to create project:", error);
			setError("Falha ao criar o projeto. Por favor, tente novamente.");
			return false;
		} finally {
			setLoading(false);
		}
	};

	const approveProject = async (id) => {
		try {
			setLoading(true);
			await localProjects.updateProjectStatus(id, "Em andamento");
			await loadProjects();
		} catch (error) {
			console.error("Failed to approve project:", error);
			setError("Falha ao iniciar o projeto. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	const cancelProject = async (id) => {
		try {
			setLoading(true);
			await localProjects.updateProjectStatus(id, "Arquivado");
			await loadProjects();
		} catch (error) {
			console.error("Failed to archive project:", error);
			setError("Falha ao arquivar o projeto. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	const deleteProject = async (id) => {
		try {
			setLoading(true);
			await localProjects.deleteProject(id);
			await loadProjects();
		} catch (error) {
			console.error("Failed to delete project:", error);
			setError("Falha ao excluir o projeto. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	const deleteMultipleProjects = async (projectIds) => {
		try {
			setLoading(true);
			await localProjects.deleteMultipleProjects(projectIds);
			await loadProjects();
		} catch (error) {
			console.error("Failed to delete selected projects:", error);
			setError("Falha ao excluir os projetos selecionados. Por favor, tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	return {
		projects,
		loading,
		error,
		createProject,
		approveProject,
		cancelProject,
		deleteProject,
		deleteMultipleProjects,
		refreshProjects: loadProjects
	};
}