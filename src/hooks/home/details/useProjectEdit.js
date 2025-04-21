// hooks/useProjectEdit.js
import { useState } from "react";
import projects from "../../../services/projects";

export function useProjectEdit(project, onClose) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({...project});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    // Reset to original data if canceling edit
    if (isEditing) {
      setEditedProject({...project});
    }
  };

  const handleInputChange = (field, value) => {
    setEditedProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      await projects.updateProject(project.id, editedProject);
      setIsEditing(false);
      // Refresh project data
      onClose(true); // Pass true to indicate a refresh is needed
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Falha ao atualizar o projeto. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isEditing,
    editedProject,
    loading,
    error,
    toggleEdit,
    handleInputChange,
    handleSave
  };
}