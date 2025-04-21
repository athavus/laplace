import { useState, useEffect } from 'react';
import projects from '../../services/projects';
import cardsService from '../../services/cards';

export const useProjectCards = (projectId) => {
  const [cards, setCards] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load project details and cards when component mounts
  useEffect(() => {
    const loadProjectDetails = async () => {
      if (!projectId) return;
      
      try {
        setLoading(true);
        const projectData = await projects.getProjectById(projectId);
        
        if (projectData) {
          setProjectDetails(projectData);
          
          // Carregar cards do projeto
          const projectCards = await cardsService.getCardsByProjectId(projectId);
          setCards(projectCards);
        } else {
          setError("Projeto não encontrado");
        }
      } catch (err) {
        console.error("Error loading project details:", err);
        setError("Falha ao carregar detalhes do projeto");
      } finally {
        setLoading(false);
      }
    };

    loadProjectDetails();
  }, [projectId]);

  const handleDeleteCard = async (cardId) => {
    try {
      await cardsService.deleteCard(cardId);
      
      // Atualizar o estado local
      setCards(prevCards => prevCards.filter(card => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Erro ao excluir tarefa");
    }
  };

  const handleCreateCard = async (newCard) => {
    try {
      // Adicionar o projectId ao newCard
      const cardWithProjectId = {
        ...newCard,
        projectId: Number.parseInt(projectId)
      };

      const savedCard = await cardsService.createCard(cardWithProjectId);
      
      // Adicionar a nova tarefa à lista local
      setCards(prevCards => [...prevCards, savedCard]);
      return savedCard;
    } catch (error) {
      console.error("Error creating card:", error);
      alert("Erro ao criar tarefa");
      throw error;
    }
  };

  const handleUpdateCardColumn = async (cardId, targetColumn) => {
    try {
      await cardsService.updateCardColumn(cardId, targetColumn);
      
      // Atualizar o estado local
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === cardId ? { ...card, column: targetColumn } : card
        )
      );
    } catch (error) {
      console.error("Error updating card column:", error);
      alert("Erro ao mover tarefa");
      throw error;
    }
  };

  return {
    cards,
    setCards,
    projectDetails,
    loading,
    error,
    handleDeleteCard,
    handleCreateCard,
    handleUpdateCardColumn
  };
};