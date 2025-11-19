// src/Components/Header.jsx
import React, { useState } from "react";

export default function Header({ onAdd = () => {}, onSearch = () => {} }) {
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    onSearch(query.trim());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <h2 className="brand">GameTracker</h2>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Buscar juegos, plataformas, desarrollador..."
            aria-label="Buscar juegos"
          />
          <button className="btn small" onClick={handleSearchClick}>
            Buscar
          </button>
        </div>
      </div>

      <div className="header-right">
        <button className="btn outline" onClick={onAdd}>
          Agregar juego
        </button>
      </div>
    </header>
  );
}
