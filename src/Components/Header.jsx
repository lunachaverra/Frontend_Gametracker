// src/Components/Header.jsx
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle"; 

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
    <header className="app-header" style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* izquierda: marca */}
      <div className="header-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="logo" style={{ width: 44, height: 44, borderRadius: 8, display: "grid", placeItems: "center" }}>
          GT
        </div>
        <h2 className="brand" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
          GameTracker
        </h2>
      </div>

      {/* centro: buscador */}
      <div className="header-center" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchClick();
          }}
          style={{ width: "100%", maxWidth: 820 }}
        >
          <div className="search-bar" style={{ display: "flex", gap: 8, position: "relative" }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Buscar juegos, plataformas..."
              aria-label="Buscar juegos"
              style={{
                flex: 1,
                padding: "10px 40px 10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "var(--card)",
                color: "var(--text)",
                outline: "none",
                minWidth: 120,
              }}
            />

            {/* Botón para limpiar búsqueda (aparece solo si hay texto) */}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  onSearch("");
                }}
                aria-label="Limpiar búsqueda"
                title="Limpiar búsqueda"
                style={{
                  position: "absolute",
                  right: 110,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--muted)",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: 6,
                }}
              >
                ✕
              </button>
            )}

            <button
              type="submit"
              className="btn small"
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "transparent",
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* derecha: acciones */}
      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          className="btn outline"
          onClick={onAdd}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "transparent",
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          Agregar juego
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
