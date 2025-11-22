// src/Components/Filters.jsx
import React, { useState, useEffect } from "react";

export default function Filters({ initial = {}, onApply = () => {}, onClear = () => {} }) {
  // estados
  const [genre, setGenre] = useState(initial.genre || "");
  const [platform, setPlatform] = useState(initial.platform || "");
  const [completed, setCompleted] = useState(initial.completed || "any");
  const [developer, setDeveloper] = useState(initial.developer || "");
  const [sort, setSort] = useState(initial.sort || "none");

  useEffect(() => {
    setGenre(initial.genre || "");
    setPlatform(initial.platform || "");
    setCompleted(initial.completed || "any");
    setDeveloper(initial.developer || "");
    setSort(initial.sort || "none");
  }, [initial]);

  const apply = () => {
    onApply({ genre, platform, completed, developer, sort });
  };

  const clear = () => {
    setGenre("");
    setPlatform("");
    setCompleted("any");
    setDeveloper("");
    setSort("none");
    onClear();
  };

  return (
    <div className="filters-card fixed-sidebar">
      {/* Título agregado correctamente dentro del JSX */}
      <h2 className="sidebar-title text-white text-xl font-semibold mb-4">
        Filtros de búsqueda
      </h2>

      {/* Género */}
      <label className="field">
        <span className="field-label">Género</span>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos</option>
          <option value="RPG">RPG</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="Indie">Indie</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Simulación">Simulación</option>
        </select>
      </label>

      {/* Plataforma */}
      <label className="field">
        <span className="field-label">Plataforma</span>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="">Todas</option>
          <option value="PC">PC</option>
          <option value="PS5">PlayStation 5</option>
          <option value="PS4">PlayStation 4</option>
          <option value="Switch">Switch</option>
          <option value="Xbox">Xbox</option>
          <option value="Mobile">Mobile</option>
        </select>
      </label>

      {/* Estado */}
      <label className="field">
        <span className="field-label">Estado</span>
        <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
          <option value="any">Todos</option>
          <option value="completed">Completado</option>
          <option value="incomplete">Pendiente</option>
        </select>
      </label>

      {/* Ordenar */}
      <label className="field">
        <span className="field-label">Ordenar por</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Sin ordenar</option>
          <option value="date-desc">Nuevos primero</option>
          <option value="date-asc">Antiguos primero</option>
          <option value="score-desc">Mejor puntuación</option>
          <option value="score-asc">Peor puntuación</option>
          <option value="title-asc">Título A–Z</option>
          <option value="title-desc">Título Z–A</option>
        </select>
      </label>

      {/* Botones */}
      <div className="filters-actions">
        <button className="btn outline small" onClick={clear} type="button">Limpiar</button>
        <button className="btn primary small" onClick={apply} type="button">Aplicar</button>
      </div>
    </div>
  );
}
