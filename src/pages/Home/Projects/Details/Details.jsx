// Details.jsx
import { Row } from "./Row/Row";
import Description from "./Description/Description";
import { useProjectEdit } from "../../../../hooks/home/details/useProjectEdit";
import { useFormattedDate } from "../../../../hooks/home/details/useFormattedDate";
import Modal from "../../../../components/Modal/Modal";
import "./Details.css";

function ProjectDetails({ project, isOpen, onClose }) {
  const { 
    isEditing, 
    editedProject, 
    loading, 
    error, 
    toggleEdit, 
    handleInputChange, 
    handleSave 
  } = useProjectEdit(project, onClose);
  
  const formatDate = useFormattedDate();

  if (!isOpen) return null;

  const renderValue = (field, label, options) => {
    if (isEditing) {
      if (field === "status") {
        return (
          <select
            value={editedProject[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="edit-select"
          >
            <option value="Em análise">Em análise</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Arquivado">Arquivado</option>
          </select>
        );
      }
      if (field === "priority") {
        return (
          <select
            value={editedProject[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="edit-select"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        );
      }
      if (field === "description") {
        return (
          <textarea
            value={editedProject[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className="edit-textarea"
            rows={4}
          />
        );
      }
      return (
        <input
          type="text"
          value={editedProject[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="edit-input"
        />
      );
    }
    
    if (field === "status") {
      return (
        <span className={`status-badge status-${project[field]?.toLowerCase().replace(/\s+/g, "-") || "em-analise"}`}>
          <span className="status-dot"/>
          {project[field] || "Em análise"}
        </span>
      );
    }
    
    return options?.valueRenderer 
      ? options.valueRenderer(project[field]) 
      : (project[field] || options?.defaultValue || "Não especificado");
  };

  const footer = (
    <ModalFooter 
      isEditing={isEditing} 
      loading={loading} 
      error={error} 
      onSave={handleSave} 
      onCancel={toggleEdit} 
      onClose={() => onClose()} 
    />
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalhes do Projeto"
      footer={footer}
      maxWidth="600px"
    >
      <Row
        label="Código"
        value={<ProjectIdField name={project.name} id={project.id} />}
        readOnly={true}
      />
      <Row 
        label="Título" 
        field="name"
        value={renderValue("name", "Título")} 
        isEditing={isEditing}
      />
      <Row 
        label="Coordenador" 
        field="coordinator"
        value={renderValue("coordinator", "Coordenador", { defaultValue: "Não especificado" })} 
        isEditing={isEditing}
      />
      <Row 
        label="Status" 
        field="status"
        value={renderValue("status", "Status")} 
        isEditing={isEditing}
      />
      <Row 
        label="Prioridade" 
        field="priority"
        value={renderValue("priority", "Prioridade", { defaultValue: "Média" })} 
        isEditing={isEditing}
      />
      <Row
        label="Data de Criação"
        value={project.created_at ? formatDate(project.created_at) : "N/A"}
        readOnly={true}
      />
      <Description 
        description={project.description} 
        isEditing={isEditing} 
        renderValue={() => renderValue("description", "Descrição")} 
      />
    </Modal>
  );
}

function ProjectIdField({ name, id }) {
  return (
    <>
      <span className="id-prefix">{name}</span>
      <span className="id-separator">-</span>
      <span className="id-number">{id}</span>
    </>
  );
}

function ModalFooter({ isEditing, loading, error, onSave, onCancel, onClose }) {
  return (
    <>
      {loading && <span className="loading-indicator">Salvando...</span>}
      {error && <span className="error-message">{error}</span>}
      {isEditing ? (
        <>
          <button
            type="button"
            onClick={onSave}
            className="modal-button modal-button-save"
            disabled={loading}
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="modal-button modal-button-cancel"
            disabled={loading}
          >
            Cancelar
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={onCancel}
            className="modal-button modal-button-edit"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="modal-button modal-button-cancel"
          >
            Fechar
          </button>
        </>
      )}
    </>
  );
}

export default ProjectDetails;