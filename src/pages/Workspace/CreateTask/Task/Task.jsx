import React from 'react';
import { 
  TaskTitle,
  TaskDescription,
  TaskMetadataRow,
  DueDateInput
} from '../Form/Form';
import { ParticipantsSection } from '../Participant/Participant';
import './Task.css'

function Task ({
  taskData,
  newParticipant,
  setNewParticipant,
  handleChange,
  handleAddParticipant,
  handleRemoveParticipant
}) {
  return (
    <form className="task-form" onSubmit={(e) => e.preventDefault()}>
      <TaskTitle 
        value={taskData.title} 
        onChange={handleChange} 
      />
      
      <TaskDescription 
        value={taskData.description}
        onChange={handleChange}
      />
      
      <TaskMetadataRow
        urgency={taskData.urgency}
        theme={taskData.theme}
        onChange={handleChange}
      />
      
      <DueDateInput
        value={taskData.dueDate}
        onChange={handleChange}
      />
      
      <ParticipantsSection
        newParticipant={newParticipant}
        setNewParticipant={setNewParticipant}
        participants={taskData.participants}
        handleAddParticipant={handleAddParticipant}
        handleRemoveParticipant={handleRemoveParticipant}
      />
    </form>
  );
}

export default Task;