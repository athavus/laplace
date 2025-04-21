import { useState } from "react";

export function useNewProjectForm(newProject, onSubmit) {
  const [formData, setFormData] = useState({
    name: newProject?.name || "",
    description: newProject?.description || "",
    coordinator: newProject?.coordinator || "",
    priority: newProject?.priority || "Média",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    window.location.reload(); // Nota: corrigi de window.reload() para window.location.reload()
  };

  return {
    formData,
    handleChange,
    handleSubmit
  };
}