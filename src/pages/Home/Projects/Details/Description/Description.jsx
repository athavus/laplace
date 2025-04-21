// Description/Description.jsx
import React from "react";
import "./Description.css"; // Make sure you have this CSS file

function Description({ description, isEditing, renderValue }) {
  return (
    <div className="project-description">
      <h3>Descrição</h3>
      <div className={`description-content ${isEditing ? 'editing' : ''}`}>
        {isEditing ? (
          renderValue()
        ) : (
          description || "Sem descrição disponível."
        )}
      </div>
    </div>
  );
}

export default Description;