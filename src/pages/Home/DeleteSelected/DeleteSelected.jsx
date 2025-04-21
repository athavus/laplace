// Projects/DeleteSelectedButton.jsx
import './DeleteSelected.css'

function DeleteSelected({ deleteSelectedProjects }) {
	return (
		<div className="selected-container">
			<button
				onClick={deleteSelectedProjects}
				className="delete-selected-button"
				type="button"
			>
				<div className="delete-selected-button-text">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="feather feather-trash-2"
					>
						<title>Delete selected projects</title>
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
						<line x1="10" y1="11" x2="10" y2="17" />
						<line x1="14" y1="11" x2="14" y2="17" />
					</svg>
					Delete Selected
				</div>
			</button>
		</div>
	);
}

export default DeleteSelected;