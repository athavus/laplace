import React from 'react';
import { Calendar, AlertCircle, Tag } from 'lucide-react';
import './Form.css';

export function TaskTitle({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="title">Título*</label>
      <input
        type="text"
        id="title"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="Digite o título da tarefa"
        required
        autoFocus
      />
    </div>
  );
}

export function TaskDescription({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="description">Descrição</label>
      <textarea
        id="description"
        name="description"
        value={value}
        onChange={onChange}
        placeholder="Descreva a tarefa em detalhes"
        rows={3}
      />
    </div>
  );
}

export function TaskMetadataRow({ urgency, theme, onChange }) {
  return (
    <div className="form-row">
      <UrgencySelect value={urgency} onChange={onChange} />
      <ThemeInput value={theme} onChange={onChange} />
    </div>
  );
}

function UrgencySelect({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="urgency">
        <AlertCircle size={16} className="icon" />
        Urgência
      </label>
      <select
        id="urgency"
        name="urgency"
        value={value}
        onChange={onChange}
      >
        <option value="low">Baixa</option>
        <option value="normal">Normal</option>
        <option value="high">Alta</option>
        <option value="critical">Crítica</option>
      </select>
    </div>
  );
}

function ThemeInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="theme">
        <Tag size={16} className="icon" />
        Tema
      </label>
      <input
        type="text"
        id="theme"
        name="theme"
        value={value}
        onChange={onChange}
        placeholder="ex: Front-end, API, Design"
      />
    </div>
  );
}

export function DueDateInput({ value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor="dueDate">
        <Calendar size={16} className="icon" />
        Data de Entrega
      </label>
      <input
        type="datetime-local"
        id="dueDate"
        name="dueDate"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function ModalFooter({ onCancel, onSubmit, isDisabled }) {
  return (
    <>
      <button type="button" className="cancel-btn" onClick={onCancel}>
        Cancelar
      </button>
      <button 
        type="button" 
        className="create-btn" 
        onClick={onSubmit}
        disabled={isDisabled}
      >
        Criar Tarefa
      </button>
    </>
  );
}