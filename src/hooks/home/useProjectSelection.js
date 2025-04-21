// hooks/useProjectSelection.js
import { useState } from "react";

export function useProjectSelection() {
	const [selectedProjects, setSelectedProjects] = useState([]);

	const handleSelectProject = (id) => {
		setSelectedProjects((prevSelected) => {
			if (prevSelected.includes(id)) {
				return prevSelected.filter((projectId) => projectId !== id);
			}
			return [...prevSelected, id];
		});
	};

	const resetSelection = () => {
		setSelectedProjects([]);
	};

	return {
		selectedProjects,
		handleSelectProject,
		resetSelection
	};
}