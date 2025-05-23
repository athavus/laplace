import { ListTodo, Clock, CheckCircle, PlusCircle } from "lucide-react";
import Card from '../Card/Card';
import './Column.css';

const Column = ({
  columnType,
  cards,
  onDrop,
  onAddTask,
  onDelete,
  onMove, // Nova prop para mover cards
  dragHandlers,
  className,
  isMobile // Nova prop para verificar se é mobile
}) => {
  let icon;
  let title;
  switch(columnType) {
    case 'To Do':
      icon = <ListTodo size={16} />;
      title = 'A Fazer';
      break;
    case 'In Progress':
      icon = <Clock size={16} />;
      title = 'Em Progresso';
      break;
    case 'Done':
      icon = <CheckCircle size={16} />;
      title = 'Concluído';
      break;
    default:
      icon = <ListTodo size={16} />;
      title = columnType;
  }
  
  return (
    <div
      className={className}
      onDrop={(e) => onDrop(e, columnType)}
      onDragOver={(e) => e.preventDefault()}
    >
     <h3 className='column-heading'>
       <div className="column-title-with-icon">
        {icon}
        <span>{title}</span>
       </div>
     </h3>
     <ul>
      {cards.map(card => (
        <Card
          key={card.id}
          card={{...card, column: columnType}} // Adicionando a coluna ao card
          handleDragStart={(e) => dragHandlers.handleDragStart(e, card)}
          handleDragEnd={dragHandlers.handleDragEnd}
          onDelete={onDelete}
          onMove={onMove} // Passando a função de mover
          isMobile={isMobile} // Passando a flag de mobile
        />
      ))}
     </ul>
     <button
      className="create-task-button"
      onClick={() => onAddTask(columnType)}
      type="button"
     >
       <PlusCircle size={16} className="add-task-icon" />
       Adicionar Tarefa
     </button>
    </div>
  );
};

export default Column;