import React from 'react';
import './Workspace.css';
import CreateTask from './CreateTask/CreateTask';
import { ListTodo, Clock, CheckCircle } from 'lucide-react';
// Importando os hooks personalizados
import { useProjectCards } from '../../hooks/workspace/useProjectCards';
import { useDragAndDrop } from '../../hooks/workspace/useDragAndDrop';
import { useMobileDetection } from '../../hooks/workspace/useMobileDetection';
import { useTaskModal } from '../../hooks/workspace/useTaskModal';
// Importando os componentes
import Header from './Header/Header';
import Column from './Column/Column';
import Tabs from './Tabs/Tabs';
import Loading from './Loading/Loading';
import Error from './Error/Error';

const Workspace = ({ id }) => {
  // Usar os hooks personalizados
  const {
    cards,
    projectDetails,
    loading,
    error,
    handleDeleteCard,
    handleCreateCard,
    handleUpdateCardColumn
  } = useProjectCards(id);
  
  const {
    handleDragStart,
    handleDragEnd,
  } = useDragAndDrop(cards, () => {
    // Este callback será invocado quando useDragAndDrop atualizar os cards
    // Como ele já está sendo gerenciado pelo useProjectCards, podemos deixá-lo vazio
  });
  
  const {
    isMobile,
    activeTab,
    setActiveTab,
    getColumnClassName
  } = useMobileDetection();
  
  const {
    isModalOpen,
    creatingColumn,
    handleOpenModal,
    handleCloseModal,
    handleSubmitNewTask
  } = useTaskModal(handleCreateCard);
  
  // Adaptador para conectar o hook de drag-and-drop com o hook de project-cards
  const handleDropAdapter = async (e, targetColumn) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    await handleUpdateCardColumn(data.id, targetColumn);
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  
  // Definição das colunas para tornar o código mais escalável
  const columns = [
    { type: 'To Do', icon: ListTodo },
    { type: 'In Progress', icon: Clock },
    { type: 'Done', icon: CheckCircle }
  ];
  
  return (
    <div className="workspace-container">
      <Header projectDetails={projectDetails} />
      {projectDetails?.description && (
        <p className="project-description">{projectDetails.description}</p>
      )}
      {isMobile && (
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      <div className="columns-container">
        {columns.map(column => (
          <Column
            key={column.type}
            columnType={column.type}
            cards={cards.filter(card => card.column === column.type)}
            onDrop={handleDropAdapter}
            onAddTask={handleOpenModal}
            onDelete={handleDeleteCard}
            onMove={handleUpdateCardColumn} // Adicione esta linha
            dragHandlers={{ handleDragStart, handleDragEnd }}
            className={getColumnClassName(column.type)}
            isMobile={isMobile} // Adicione esta linha
          />
        ))}
      </div>
      <CreateTask
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewTask}
        columnType={creatingColumn}
      />
    </div>
  );
};

export default Workspace;