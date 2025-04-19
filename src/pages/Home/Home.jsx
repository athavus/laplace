import { useState, useEffect } from "react";
import FilterBar from "./FilterBar/FilterBar";
import ProjectTable from "./Projects/ProjectTable/ProjectTable";
import NewProject from "./Projects/NewProject/NewProject";
import ProjectDetailsModal from "./Projects/ProjectDetails/ProjectDetails";
import projectService from "../../services/projectService";
import "./Home.css";

function Home() {
	const [projects, setProjects] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProject, setNewProject] = useState({ name: "", description: "" });
	const [selectedProjects, setSelectedProjects] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [detailsModalOpen, setDetailsModalOpen] = useState(false);
	const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);

	// Load projects on component mount
	useEffect(() => {
		loadProjects();
	}, []);

	const loadProjects = () => {
		const allProjects = projectService.getAllProjects();
		setProjects(allProjects);
	};

	const openModal = () => setIsModalOpen(true);

	const closeModal = () => {
		setIsModalOpen(false);
		setNewProject({ name: "", description: "" });
	};

	const openDetailsModal = (project) => {
		setSelectedProjectDetails(project);
		setDetailsModalOpen(true);
	};

	const closeDetailsModal = () => {
		setDetailsModalOpen(false);
		setSelectedProjectDetails(null);
	};

	const handleSubmit = (projectData) => {
		if (projectData.name.trim() === "") return;
		
		try {
			// Use the service to create the project
			projectService.createProject(projectData);
			// Reload projects from storage
			loadProjects();
			closeModal();
		} catch (error) {
			console.error("Failed to create project:", error);
			// Could show an error message to the user here
		}
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredProjects = projects.filter(
		(project) =>
			project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.coordinator?.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const approveProject = (id) => {
		try {
			projectService.updateProjectStatus(id, "Em andamento");
			loadProjects();
		} catch (error) {
			console.error("Failed to approve project:", error);
		}
	};

	const cancelProject = (id) => {
		try {
			projectService.updateProjectStatus(id, "Arquivado");
			loadProjects();
		} catch (error) {
			console.error("Failed to archive project:", error);
		}
	};

	const deleteProject = (id) => {
		try {
			projectService.deleteProject(id);
			loadProjects();
		} catch (error) {
			console.error("Failed to delete project:", error);
		}
	};

	const handleSelectProject = (id) => {
		setSelectedProjects((prevSelected) => {
			if (prevSelected.includes(id)) {
				return prevSelected.filter((projectId) => projectId !== id);
			}
			return [...prevSelected, id];
		});
	};

	const deleteSelectedProjects = () => {
		if (selectedProjects.length > 0) {
			try {
				projectService.deleteMultipleProjects(selectedProjects);
				loadProjects();
				setSelectedProjects([]);
			} catch (error) {
				console.error("Failed to delete selected projects:", error);
			}
		}
	};

	return (
		<div className="content-container">
			<FilterBar
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				openModal={openModal}
			/>

			{selectedProjects.length > 0 && (
				<DeleteSelectedButton deleteSelectedProjects={deleteSelectedProjects} />
			)}

			<ProjectTable
				filteredProjects={filteredProjects}
				selectedProjects={selectedProjects}
				handleSelectProject={handleSelectProject}
				approveProject={approveProject}
				cancelProject={cancelProject}
				deleteProject={deleteProject}
				openDetailsModal={openDetailsModal}
			/>

			{isModalOpen && (
				<NewProject
					isOpen={isModalOpen}
					onClose={closeModal}
					newProject={newProject}
					onSubmit={handleSubmit}
				/>
			)}

			{detailsModalOpen && selectedProjectDetails && (
				<ProjectDetailsModal
					project={selectedProjectDetails}
					isOpen={detailsModalOpen}
					onClose={closeDetailsModal}
				/>
			)}
		</div>
	);
}

function DeleteSelectedButton({ deleteSelectedProjects }) {
	return (
		<div className="selected-container">
			<button
				onClick={deleteSelectedProjects}
				className="delete-selected-button"
				type="button"
			>
				<div className="delete-selected-button-text">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-trash-2"
					>
						<title>Delete selected projects</title>
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
						<line x1="10" y1="11" x2="10" y2="17" />
						<line x1="14" y1="11" x2="14" y2="17" />
					</svg>
					Delete Selected
				</div>
			</button>
		</div>
	);
}

export default Home;