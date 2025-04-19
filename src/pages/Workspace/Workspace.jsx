import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Workspace.css';
import Card from './Card'; // Import the Card component

const Workspace = ({ id }) => {
  const [cards, setCards] = useState([]);
  const [creatingTask, setCreatingTask] = useState(false);


  const handleDragStart = (e, card) => {
    console.log('Drag started for card:', card);
    e.dataTransfer.setData('application/json', JSON.stringify({ id: card.id, column: card.column }));

  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    console.log('Dropped card:', data, 'into column:', targetColumn);

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === data.id ? { ...card, column: targetColumn } : card
      )
    );
  };
  
    const handleDragOver = (e) => {
    e.preventDefault();

  };
  const [creatingTaskColumn, setCreatingTaskColumn] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  const handleCreateTask = (column) => {
    setCreatingTask(true);
    setCreatingTaskColumn(column);
    setNewTaskText(''); // Clear previous input
  };

    const handleNewTaskTextChange = (e) => {
      setNewTaskText(e.target.value);
  };

  const handleSubmitNewTask = (e, column) => {
    e.preventDefault();
    if (newTaskText.trim() === '') return;

    const newTask = {
      id: Math.random(),
      text: newTaskText,
      column: column,
    };

    setCards([...cards, newTask]);
    setNewTaskText('');
    setCreatingTask(false);
    setCreatingTaskColumn(null);
  };


  const handleDeleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  return (
    <div className="workspace-container">
      <Link to="/" className="back-to-home-link">Back to Home</Link>
      <h2 className="workspace-heading">Workspace {id}</h2>
      <div className="columns-container">
        <div
          className="column"
          onDrop={(e) => handleDrop(e, 'To Do')}
          onDragOver={handleDragOver}
        >
          <h3 className='column-heading'>To Do</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cards
              .filter(card => card.column === 'To Do')
              .map(card => (
                <Card
                  key={card.id}
                  card={card}
                  handleDragStart={handleDragStart}
                  handleDelete={handleDeleteCard}
                />
              ))}
            {creatingTask && creatingTaskColumn === 'To Do' && (
              <form onSubmit={(e) => handleSubmitNewTask(e, 'To Do')}>
                <input type="text" value={newTaskText} onChange={handleNewTaskTextChange} />
                <button type="submit">Add</button>
              </form>
            )}
          </ul>
          <button
            className="create-task-button"
            onClick={() => handleCreateTask('To Do')}
            style={{ display: creatingTask && creatingTaskColumn === 'To Do' ? 'none' : 'block' }}
          type="button"

          >
            + Add Task
          </button>
        </div>
        <div
          className="column"
          onDrop={(e) => handleDrop(e, 'In Progress')}
          onDragOver={handleDragOver}
        >
          <h3 className='column-heading'>In Progress</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cards
              .filter(card => card.column === 'In Progress')
              .map(card => (
                <Card
                  key={card.id}
                  card={card}
                  handleDragStart={handleDragStart}
                  handleDelete={handleDeleteCard}
                />
              ))}
            {creatingTask && creatingTaskColumn === 'In Progress' && (
              <form onSubmit={(e) => handleSubmitNewTask(e, 'In Progress')}>
                <input type="text" value={newTaskText} onChange={handleNewTaskTextChange} />
                <button type="submit">Add</button>
              </form>
            )}
          </ul>
          <button
            className="create-task-button"
            onClick={() => handleCreateTask('In Progress')}
            style={{ display: creatingTask && creatingTaskColumn === 'In Progress' ? 'none' : 'block' }}
          type="button"

          >
            + Add Task
          </button>
        </div>
        <div
          className="column"
          onDrop={(e) => handleDrop(e, 'Done')}
          onDragOver={handleDragOver}
        >
          <h3 className='column-heading'>Done</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cards
              .filter(card => card.column === 'Done')
              .map(card => (
                <Card
                  key={card.id}
                  card={card}
                  handleDragStart={handleDragStart}
                  handleDelete={handleDeleteCard}
                />
              ))}
            {creatingTask && creatingTaskColumn === 'Done' && (
              <form onSubmit={(e) => handleSubmitNewTask(e, 'Done')}>
                <input type="text" value={newTaskText} onChange={handleNewTaskTextChange} />
                <button type="submit">Add</button>
              </form>
            )}
          </ul>
          <button
            className="create-task-button"
            onClick={() => handleCreateTask('Done')}
            style={{ display: creatingTask && creatingTaskColumn === 'Done' ? 'none' : 'block' }}
          type="button"

          >
            + Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Workspace;