// hooks/useProjectModals.js
import { useState } from "react";

export function useProjectModals() {
	// Não use useProjects aqui para evitar dependência circular
	const [projectModal, setProjectModal] = useState({
		isOpen: false,
		data: { name: "", description: "" }
	});
	
	const [detailsModal, setDetailsModal] = useState({
		isOpen: false,
		project: null
	});

	// New Project Modal functions
	const openNewProjectModal = () => {
		setProjectModal({
			isOpen: true,
			data: { name: "", description: "" }
		});
	};

	const closeNewProjectModal = () => {
		setProjectModal({
			isOpen: false,
			data: { name: "", description: "" }
		});
	};

	// Este método não deve chamar createProject diretamente
	const handleSubmitNewProject = async (projectData, createProjectFn) => {
		if (projectData.name.trim() === "") return false;
		
		const success = await createProjectFn(projectData);
		if (success) {
			closeNewProjectModal();
		}
		return success;
	};

	// Details Modal functions
	const openDetailsModal = (project) => {
		setDetailsModal({
			isOpen: true,
			project
		});
	};

	const closeDetailsModal = () => {
		setDetailsModal({
			isOpen: false,
			project: null
		});
	};

	return {
		projectModal,
		detailsModal,
		openNewProjectModal,
		closeNewProjectModal,
		openDetailsModal,
		closeDetailsModal,
		handleSubmitNewProject
	};
}