import React from 'react';
import { X, Users } from 'lucide-react';
import './Participant.css';

export function ParticipantInput({ 
  newParticipant, 
  setNewParticipant, 
  handleAddParticipant 
}) {
  return (
    <div className="participants-input-group">
      <input
        type="text"
        value={newParticipant}
        onChange={(e) => setNewParticipant(e.target.value)}
        placeholder="Nome do participante"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddParticipant(e);
          }
        }}
      />
      <button 
        type="button" 
        onClick={handleAddParticipant}
        className="add-participant-btn"
      >
        Adicionar
      </button>
    </div>
  );
}

export function ParticipantsList({ participants, onRemove }) {
  if (participants.length === 0) return null;
  
  return (
    <div className="participants-list">
      {participants.map((participant, index) => (
        <ParticipantTag 
          key={index} 
          participant={participant}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
}

function ParticipantTag({ participant, onRemove }) {
  return (
    <div className="participant-tag">
      <span>{participant}</span>
      <button 
        type="button" 
        onClick={onRemove}
        className="remove-participant-btn"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ParticipantsSection({
  newParticipant,
  setNewParticipant,
  participants,
  handleAddParticipant,
  handleRemoveParticipant
}) {
  return (
    <div className="form-group">
      <label>
        <Users size={16} className="icon" />
        Participantes
      </label>
      <ParticipantInput
        newParticipant={newParticipant}
        setNewParticipant={setNewParticipant}
        handleAddParticipant={handleAddParticipant}
      />
      <ParticipantsList 
        participants={participants} 
        onRemove={handleRemoveParticipant} 
      />
    </div>
  );
}