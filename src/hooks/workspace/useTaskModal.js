import { useState } from 'react';

export const useTaskModal = (handleCreateCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingTaskColumn, setCreatingTaskColumn] = useState(null);

  const handleOpenModal = (column) => {
    setCreatingTaskColumn(column);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCreatingTaskColumn(null);
  };

  const handleSubmitNewTask = async (newTask) => {
    try {
      // Verificar se a coluna foi definida
      if (!creatingTaskColumn) {
        throw new Error("Coluna não especificada");
      }
      
      // Adicionar a coluna ao newTask
      const taskWithColumn = {
        ...newTask,
        column: creatingTaskColumn
      };

      // Chamar a função de criação de cartão
      await handleCreateCard(taskWithColumn);
      
      // Fechar o modal após a criação com sucesso
      handleCloseModal();
      return true;
    } catch (error) {
      console.error("Error submitting new task:", error);
      return false;
    }
  };

  return {
    isModalOpen,
    creatingTaskColumn,
    handleOpenModal,
    handleCloseModal,
    handleSubmitNewTask
  };
};