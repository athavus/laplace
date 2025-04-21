import { useState, useEffect } from 'react';

export function useTaskForm(isOpen, columnType) {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    urgency: 'normal', // low, normal, high, critical
    participants: [],
    theme: '',
    dueDate: ''
  });
  
  const [newParticipant, setNewParticipant] = useState('');
  
  // Reset form when column changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setTaskData({
        title: '',
        description: '',
        urgency: 'normal',
        participants: [],
        theme: '',
        dueDate: ''
      });
      setNewParticipant('');
    }
  }, [isOpen, columnType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };
  
  // Formata o nome do participante
  const formatParticipant = (name) =>
    name.trim().toLowerCase().replace(/\s+/g, "-");

  const handleAddParticipant = (e) => {
    e.preventDefault();
    const formatted = formatParticipant(newParticipant);
    if (!formatted) return;
    // Evita adicionar duplicados
    if (taskData.participants.includes(formatted)) return;
    setTaskData({
      ...taskData,
      participants: [...taskData.participants, formatted]
    });
    setNewParticipant('');
  };
  
  const handleRemoveParticipant = (index) => {
    const updatedParticipants = [...taskData.participants];
    updatedParticipants.splice(index, 1);
    setTaskData({ ...taskData, participants: updatedParticipants });
  };
  
  const createTask = () => {
    if (taskData.title.trim() === '') return null;
    
    return {
      text: taskData.title,
      description: taskData.description,
      urgency: taskData.urgency,
      participants: taskData.participants,
      theme: taskData.theme,
      dueDate: taskData.dueDate,
      column: columnType,
      createdAt: new Date().toISOString()
    };
  };

  return {
    taskData,
    newParticipant,
    setNewParticipant,
    handleChange,
    handleAddParticipant,
    handleRemoveParticipant,
    createTask
  };
}