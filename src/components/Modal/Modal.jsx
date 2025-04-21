// components/Modal/Modal.jsx
import { useModal } from "../../hooks/common/useModal";
import "./Modal.css";

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = "600px"
}) {
  const { handleModalClick, handleKeyDown, handleKeyUp } = useModal(onClose);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal-content"
        onClick={handleModalClick}
        onKeyUp={handleKeyUp}
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