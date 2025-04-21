import { useState } from 'react';
import cardsService from '../../services/cards';

export const useDragAndDrop = (cards, setCards) => {
  const [draggedCardId, setDraggedCardId] = useState(null);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id: card.id, column: card.column }));
    e.target.classList.add('dragging');
    setDraggedCardId(card.id);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    setDraggedCardId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    
    // Se o card já estiver na coluna de destino, não fazer nada
    const draggedCard = cards.find(card => card.id === data.id);
    if (draggedCard && draggedCard.column === targetColumn) {
      return;
    }
    
    try {
      await cardsService.updateCardColumn(data.id, targetColumn);
      
      // Atualizar o estado local
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === data.id ? { ...card, column: targetColumn } : card
        )
      );
    } catch (error) {
      console.error("Error updating card column:", error);
      alert("Erro ao mover tarefa");
    }
  };

  return {
    draggedCardId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };
};