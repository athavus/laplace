import { Plus } from "lucide-react";
import "./FilterBar.css";

function FilterBar({ searchTerm, handleSearch, openModal }) {
  return (
    <div className="filter-bar">
      <div className="search-container">
        <label htmlFor="search-input">Filtro:</label>
        <div className="search-input-wrapper">
          <input
            id="search-input"
            type="text"
            placeholder="Nome do projeto ou pesquisador"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <button type="button" onClick={openModal} className="add-button">
        <Plus size={16} />
        <span>Novo Projeto</span>
      </button>
    </div>
  );
}

export default FilterBar;