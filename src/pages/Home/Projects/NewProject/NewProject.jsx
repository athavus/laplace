// components/NewProject/NewProject.jsx
import Modal from "../../../../components/Modal/Modal";
import { useNewProjectForm } from "../../../../hooks/home/new-project/useProjectForm";
import "./NewProject.css";

function NewProject({ isOpen, onClose, newProject, onSubmit }) {
  const { formData, handleChange, handleSubmit } = useNewProjectForm(newProject, onSubmit);

  const footer = (
    <>
      <button
        type="button"
        className="modal-button modal-button-cancel"
        onClick={onClose}
      >
        Cancelar
      </button>
      <button type="submit" className="modal-button modal-button-primary" form="new-project-form">
        Criar Projeto
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Novo Projeto"
      footer={footer}
      maxWidth="550px"
    >
      <form id="new-project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Título do Projeto*
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="coordinator">
            Coordenador
          </label>
          <input
            type="text"
            className="form-input"
            id="coordinator"
            name="coordinator"
            value={formData.coordinator}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Prioridade
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Descrição
          </label>
          <textarea
            className="form-textarea"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </form>
    </Modal>
  );
}

export default NewProject;