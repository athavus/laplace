import { useCallback } from "react";

export function useModal(onClose) {
  // Evita que cliques no conteúdo do modal o fechem
  const handleModalClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Fecha o modal ao pressionar Escape
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  // Previne propagação de eventos de teclado
  const handleKeyUp = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return {
    handleModalClick,
    handleKeyDown,
    handleKeyUp
  };
}