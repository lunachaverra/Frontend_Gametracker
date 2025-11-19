// src/Components/Filters.jsx
import React, { useState, useEffect } from "react";

/**
 * Props:
 * - initial: objeto con filter inicial
 * - onApply(filters)
 * - onClear()
 */
export default function Filters({ initial = {}, onApply = () => {}, onClear = () => {} }) {
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
    <div className="filters-card">
      <h4>Filtros y búsqueda</h4>

      <label className="field">
        <div className="field-label">Género</div>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="RPG">RPG</option>
          <option value="Acción">Acción</option>
          <option value="Aventura">Aventura</option>
          <option value="Indie">Indie</option>
          <option value="Estrategia">Estrategia</option>
          <option value="Simulación">Simulación</option>
        </select>
      </label>

      <label className="field">
        <div className="field-label">Plataforma</div>
        <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
          <option value="">Seleccione</option>
          <option value="PC">PC</option>
          <option value="PS5">PlayStation</option>
          <option value="PS4">PlayStation 4</option>
          <option value="Switch">Switch</option>
          <option value="Xbox">Xbox</option>
          <option value="Mobile">Mobile</option>
        </select>
      </label>

      <label className="field">
        <div className="field-label">Estado</div>
        <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
          <option value="any">Seleccione</option>
          <option value="completed">Completado</option>
          <option value="incomplete">Por completar</option>
        </select>
      </label>

      <label className="field">
        <div className="field-label">Desarrollador</div>
        <input value={developer} onChange={(e) => setDeveloper(e.target.value)} placeholder="Buscar por desarrollador" />
      </label>

      <label className="field">
        <div className="field-label">Ordenar por</div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="none">Seleccione</option>
          <option value="date-desc">Fecha (recientes)</option>
          <option value="date-asc">Fecha (antiguos)</option>
          <option value="score-desc">Puntuación (mayor)</option>
          <option value="score-asc">Puntuación (menor)</option>
          <option value="title-asc">Título A–Z</option>
          <option value="title-desc">Título Z–A</option>
        </select>
      </label>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
        <button className="btn outline small" onClick={clear}>Limpiar</button>
        <button className="btn primary small" onClick={apply}>Aplicar</button>
      </div>
    </div>
  );
}
