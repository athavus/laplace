import React from "react";
import "./Card.css";
import { Trash2, AlertCircle, Calendar, Users, Tag } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// card: { text, description, theme, dueDate/created_at, urgency, participants }
const Card = ({
  card,
  handleDragStart,
  handleDragEnd,
  onDelete,
}) => {
  // Urgência visual
  const getUrgencyClass = () => {
    switch (card.urgency) {
      case "low":
        return "urgency-low";
      case "high":
        return "urgency-high";
      case "critical":
        return "urgency-critical";
      default:
        return "urgency-normal";
    }
  };

  // Formata datas
  const formatDueDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yy", { locale: ptBR });
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return dateString;
    }
  };

  // Verifica se participants é um array válido
  const hasParticipants = Array.isArray(card.participants) && card.participants.length > 0;

  return (
    <li
      className={`card ${getUrgencyClass()}`}
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card)}
      onDragEnd={handleDragEnd}
    >
      <div className="card-header">
        <h4 className="card-title">{card.text}</h4>
        <button
          className="delete-button"
          onClick={() => onDelete(card.id)}
          aria-label="Excluir tarefa"
          title="Excluir"
        >
          <Trash2 size={17} />
        </button>
      </div>

      {card.description && (
        <p className="card-description">{card.description}</p>
      )}

      <div className="card-meta">
        {card.theme && (
          <div className="meta-item" title="Tema">
            <Tag size={14} className="meta-icon" />
            <span>{card.theme}</span>
          </div>
        )}
        {card.dueDate && (
          <div className="meta-item" title="Prazo">
            <Calendar size={14} className="meta-icon" />
            <span>Prazo: {formatDueDate(card.dueDate)}</span>
          </div>
        )}
        {card.created_at && (
          <div className="meta-item" title="Criado em">
            <span>Criado: {formatDueDate(card.created_at)}</span>
          </div>
        )}
      </div>

      {hasParticipants && (
        <div className="card-participants">
          <Users size={14} className="participants-icon" />
          <div className="participants-list">
            {card.participants.map((participant, idx) => (
              <span key={idx} className="participant-tag">
                {participant}
              </span>
            ))}
          </div>
        </div>
      )}

      {card.urgency && card.urgency !== "normal" && (
        <div className={`urgency-indicator ${getUrgencyClass()}`}>
          <AlertCircle size={14} className="urgency-icon" />
          <span>
            {card.urgency === "low" && "Baixa"}
            {card.urgency === "high" && "Alta"}
            {card.urgency === "critical" && "Crítica"}
          </span>
        </div>
      )}
    </li>
  );
};

export default Card;