import Modal from "../../../../components/Modal/Modal";
import "./ProjectDetails.css";

function ProjectDetails({ project, isOpen, onClose }) {
  if (!isOpen) return null;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const footer = (
    <button
      type="button"
      onClick={onClose}
      className="modal-button modal-button-cancel"
    >
      Fechar
    </button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalhes do Projeto"
      footer={footer}
      maxWidth="600px"
    >
      <DetailRow
        label="Código"
        value={
          <>
            <span className="id-prefix">{project.name}</span>
            <span className="id-separator">-</span>
            <span className="id-number">{project.id}</span>
          </>
        }
      />
      <DetailRow label="Título" value={project.name} />
      <DetailRow
        label="Coordenador"
        value={project.coordinator || "Não especificado"}
      />
      <DetailRow
        label="Status"
        value={
          <span className={`status-badge status-${project.status?.toLowerCase().replace(/\s+/g, "-") || "em-analise"}`}>
            <span className="status-dot"/>
            {project.status || "Em análise"}
          </span>
        }
      />
      <DetailRow
        label="Prioridade"
        value={project.priority || "Média"}
      />
      <DetailRow
        label="Data de Criação"
        value={project.createdAt ? formatDate(project.createdAt) : "N/A"}
      />
      <div className="project-description">
        <h3>Descrição</h3>
        <div className="description-content">
          {project.description || "Sem descrição disponível."}
        </div>
      </div>
    </Modal>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="project-detail-row">
      <span className="detail-label">{label}:</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

export default ProjectDetails;