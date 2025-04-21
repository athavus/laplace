import { useState, useEffect } from 'react';
import projects from '../../services/projects';
import cardsService from '../../services/cards';

export const useWorkspace = (projectId) => {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingTaskColumn, setCreatingTaskColumn] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('To Do'); // Para navegação móvel
  const [isMobile, setIsMobile] = useState(false);

  // Detectar tamanho de tela
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Load project details and cards when component mounts
  useEffect(() => {
    const loadProjectDetails = async () => {
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

    if (projectId) {
      loadProjectDetails();
    }
  }, [projectId]);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id: card.id, column: card.column }));
    const dragElement = e.target;
    dragElement.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    const dragElement = e.target;
    dragElement.classList.remove('dragging');
  };

  const handleDrop = async (e, targetColumn) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    
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
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOpenModal = (column) => {
    setCreatingTaskColumn(column);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewTask = async (newTask) => {
    try {
      // Adicionar o projectId ao newTask
      const taskWithProjectId = {
        ...newTask,
        projectId: Number.parseInt(projectId)
      };

      const savedTask = await cardsService.createCard(taskWithProjectId);
      
      // Adicionar a nova tarefa à lista local
      setCards(prevCards => [...prevCards, savedTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Erro ao criar tarefa");
    }
  };

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

  // Helper function to get column class name
  const getColumnClassName = (columnName) => {
    const baseClass = 'column';
    const specificClass = columnName.toLowerCase().replace(' ', '-');
    const hiddenClass = isMobile && activeTab !== columnName ? 'hidden-mobile' : '';
    return `${baseClass} column-${specificClass} ${hiddenClass}`;
  };

  // Retorna os métodos e estados necessários para o componente
  return {
    // Estados
    cards,
    projectDetails,
    loading,
    error,
    isModalOpen,
    creatingTaskColumn,
    activeTab,
    isMobile,
    
    // Métodos de drag and drop
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    
    // Métodos para gerenciamento do modal
    handleOpenModal,
    handleCloseModal,
    handleSubmitNewTask,
    
    // Outros métodos
    handleDeleteCard,
    getColumnClassName,
    setActiveTab
  };
};