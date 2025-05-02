import { useState } from "react";
import "../index.css";
import { Search } from "lucide-react";

export default function SearchFilter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm, {
      educationLevel,
      experienceYears,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setEducationLevel("");
    setExperienceYears("");
    onSearch("", {});
  };

  return (
    <div className="search-filter">
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Buscar por nombre, email, educación o experiencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {searchTerm && (
            <button
              className="clear-button"
              onClick={() => {
                setSearchTerm("");
                handleSearch();
              }}
            >
              ✕
            </button>
          )}
        </div>
        <button className="button button-primary" onClick={handleSearch}>
          <Search style={{ width: "18px", height: "18px" }} /> Buscar
        </button>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="educationLevel">Nivel de Educación</label>
          <select
            id="educationLevel"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            className="select-input"
          >
            <option value="">Seleccionar nivel</option>
            <option value="all">Todos</option>
            <option value="licenciatura">Licenciatura</option>
            <option value="maestría">Maestría</option>
            <option value="doctorado">Doctorado</option>
            <option value="técnico">Técnico</option>
            <option value="bachillerato">Bachillerato</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="experienceYears">Años de Experiencia Mínimos</label>
          <select
            id="experienceYears"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            className="select-input"
          >
            <option value="">Seleccionar años</option>
            <option value="all">Todos</option>
            <option value="1">1+ año</option>
            <option value="2">2+ años</option>
            <option value="3">3+ años</option>
            <option value="5">5+ años</option>
            <option value="10">10+ años</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="button button-outline" onClick={handleReset}>
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}
