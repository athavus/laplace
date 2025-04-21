import { FileText, X, Trash, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import "./Table.css";

function ProjectTable({
	filteredProjects,
	selectedProjects,
	handleSelectProject,
	approveProject,
	cancelProject,
	deleteProject,
	openDetailsModal,
}) {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

		if (diffDays === 0) {
			const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
			if (diffHours === 0) {
				const diffMinutes = Math.floor((now - date) / (1000 * 60));
				return `há ${diffMinutes} minutos`;
			}
			return `há ${diffHours} horas`;
		}

		return `há ${diffDays} dias`;
	};

	return (
		<div className="table-container">
			<table className="projects-table">
				<thead>
					<tr>
						<th className="identifier-col">Código</th>
						<th>Criado</th>
						<th>Status</th>
						<th>Título</th>
						<th className="priority-col">Prioridade</th>
						<th className="actions-col">Ações</th>
					</tr>
				</thead>
				<tbody>
					{filteredProjects.length > 0 ? (
						filteredProjects.map((project) => (
							<ProjectTableRow
								key={project.id}
								project={project}
								isSelected={selectedProjects.includes(project.id)}
								onSelect={handleSelectProject}
								onApprove={approveProject}
								onCancel={cancelProject}
								onDelete={deleteProject}
								onViewDetails={openDetailsModal}
								formatDate={formatDate}
							/>
						))
					) : (
						<tr>
							<td colSpan="6" className="empty-table">
								Nenhum projeto encontrado. Crie um novo projeto para começar.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

function ProjectTableRow({
	project,
	isSelected,
	onSelect,
	onApprove,
	onCancel,
	onDelete,
	onViewDetails,
	formatDate,
}) {
	const statusClass =
		project.status?.toLowerCase().replace(/\s+/g, "-") || "em-analise";

	return (
		<tr className={`status-${statusClass} ${isSelected ? "selected-row" : ""}`}>
			<td data-label="Código">
				<div className="id-cell">
					<div className="checkbox-wrapper">
						<input
							type="checkbox"
							id={`project-${project.id}`}
							checked={isSelected}
							onChange={() => onSelect(project.id)}
							className="project-checkbox"
						/>
						<label
							htmlFor={`project-${project.id}`}
							className="checkbox-custom"
						/>
					</div>
					<span className="project-id">
						<span className="id-prefix">{project.name}</span>
						<span className="id-separator">-</span>
						<span className="id-number">{project.id}</span>
					</span>
				</div>
			</td>
			<td data-label="Criado">
				{project.createdAt ? formatDate(project.createdAt) : "N/A"}
			</td>
			<td data-label="Status">
				<StatusBadge status={project.status} />
			</td>
			<td data-label="Título">{project.name}</td>
			<td data-label="Prioridade" className="priority-cell">
				{project.priority || "Média"}
			</td>
			<td data-label="Ações" className="actions-cell">
				<div className="workspace-action">
					<Link
						to={`/workspace/${project.id}`}
						className="workspace-btn"
						title="Abrir workspace do projeto"
					>
						<Layout size={20} />
					</Link>
				</div>

				<button
					className="details-btn"
					onClick={() => onViewDetails(project)}
					title="Ver detalhes do projeto"
					type="button"
				>
					<FileText size={20} />
				</button>

				<div className="action-row">
					<button
						className="approve-btn"
						onClick={() => onApprove(project.id)}
						disabled={["Em andamento", "Arquivado", "Concluído"].includes(
							project.status,
						)}
						type="button"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Iniciar projeto</title>
							<path
								d="M5 13L9 17L19 7"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Iniciar
					</button>

					<button
						className="cancel-btn"
						onClick={() => onCancel(project.id)}
						disabled={["Arquivado", "Concluído"].includes(project.status)}
						type="button"
					>
						<X size={14} />
						Arquivar
					</button>
				</div>

				<button
					className="delete-btn"
					onClick={() => onDelete(project.id)}
					type="button"
				>
					<Trash color="white" size={15} />
				</button>
			</td>
		</tr>
	);
}

function StatusBadge({ status }) {
	return (
		<span className="status-badge">
			<span className="status-dot" />
			{status || "Em análise"}
		</span>
	);
}

export default ProjectTable;
