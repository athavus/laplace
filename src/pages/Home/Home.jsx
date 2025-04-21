// Home.jsx
import { useState } from "react";
import FilterBar from "./FilterBar/FilterBar";
import ProjectTable from "./Projects/Table/Table";
import NewProject from "./Projects/NewProject/NewProject";
import Details from "./Projects/Details/Details";
import DeleteSelectedButton from "./DeleteSelected/DeleteSelected";
import { useProjects } from "../../hooks/home/useProjects";
import { useProjectSelection } from "../../hooks/home/useProjectSelection";
import { useProjectModals } from "../../hooks/home/useProjectModals";
import "./Home.css";

function Home() {
	const { 
		projects, 
		loading, 
		error, 
		createProject,
		approveProject, 
		cancelProject, 
		deleteProject,
		deleteMultipleProjects,
		refreshProjects
	} = useProjects();
	
	const [searchTerm, setSearchTerm] = useState("");
	
	const { 
		selectedProjects, 
		handleSelectProject, 
		resetSelection 
	} = useProjectSelection();
	
	const { 
		projectModal, 
		detailsModal, 
		openNewProjectModal, 
		closeNewProjectModal,
		openDetailsModal, 
		closeDetailsModal,
		handleSubmitNewProject 
	} = useProjectModals();

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredProjects = projects.filter(
		(project) =>
			project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.coordinator?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDeleteSelected = async () => {
		if (selectedProjects.length > 0) {
			await deleteMultipleProjects(selectedProjects);
			resetSelection();
		}
	};

	// Wrapper para o handleSubmitNewProject que passa a função createProject
	const handleSubmitProject = async (projectData) => {
		await handleSubmitNewProject(projectData, createProject);
	};

	return (
		<div className="content-container">
			<FilterBar
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				openModal={openNewProjectModal}
			/>

			{error && <div className="error-message">{error}</div>}

			{selectedProjects.length > 0 && (
				<DeleteSelectedButton deleteSelectedProjects={handleDeleteSelected} />
			)}

			{loading ? (
				<div className="loading-indicator">Carregando projetos...</div>
			) : (
				<ProjectTable
					filteredProjects={filteredProjects}
					selectedProjects={selectedProjects}
					handleSelectProject={handleSelectProject}
					approveProject={approveProject}
					cancelProject={cancelProject}
					deleteProject={deleteProject}
					openDetailsModal={openDetailsModal}
				/>
			)}

			{projectModal.isOpen && (
				<NewProject
					isOpen={projectModal.isOpen}
					onClose={closeNewProjectModal}
					newProject={projectModal.data}
					onSubmit={handleSubmitProject}
				/>
			)}

			{detailsModal.isOpen && detailsModal.project && (
				<Details
					project={detailsModal.project}
					isOpen={detailsModal.isOpen}
					onClose={(shouldRefresh) => {
						if (shouldRefresh) {
							refreshProjects();
						}
						closeDetailsModal();
					}}
				/>
			)}
		</div>
	);
}

export default Home;