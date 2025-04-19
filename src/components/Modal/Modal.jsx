import { useCallback } from "react";
import "./Modal.css";

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = "600px"
}) {
  if (!isOpen) return null;

  // Evita que cliques no conteúdo do modal o fechem
  const handleModalClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Fecha o modal ao pressionar Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal-content"
        onClick={handleModalClick}
        onKeyUp={(e) => e.stopPropagation()}
        style={{ maxWidth }}
      >
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button 
            onClick={onClose} 
            className="modal-close-button" 
            type="button"
          >
            ×
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;