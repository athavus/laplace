import React from 'react';
import './CreateTask.css';
import Modal from '../../../components/Modal/Modal';
import Task from './Task/Task';
import { ModalFooter } from './Form/Form';
import { useTaskForm } from '../../../hooks/workspace/create-task/useTaskForm';

const CreateTask = ({ isOpen, onClose, onSubmit, columnType }) => {
  const {
    taskData,
    newParticipant,
    setNewParticipant,
    handleChange,
    handleAddParticipant,
    handleRemoveParticipant,
    createTask
  } = useTaskForm(isOpen, columnType);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = createTask();
    if (newTask) {
      onSubmit(newTask);
      onClose();
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Criar Nova Tarefa`}
      footer={
        <ModalFooter 
          onCancel={onClose}
          onSubmit={handleSubmit}
          isDisabled={!taskData.title.trim()}
        />
      }
      maxWidth="550px"
    >
      <Task
        taskData={taskData}
        newParticipant={newParticipant}
        setNewParticipant={setNewParticipant}
        handleChange={handleChange}
        handleAddParticipant={handleAddParticipant}
        handleRemoveParticipant={handleRemoveParticipant}
      />
    </Modal>
  );
};

export default CreateTask;