import React from 'react';
import './Card.css';
import { X } from 'lucide-react'; // Assuming you have lucide-react for icons

const Card = ({ card, onDelete }) => {
    const handleDelete = () => {
        onDelete(card.id);
    };

    return (
        <div className="card" draggable="true">
            <div className="card-content">
                <span>{card.text}</span>
                <button className="delete-card-button" onClick={handleDelete} type='button'><X size={16} /></button>
            </div>
        </div>
    );
};
export default Card;