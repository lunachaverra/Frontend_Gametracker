// src/App.jsx
import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import useGames from "./hooks/useGames";

import GameForm from "./Components/GameForm";
import * as api from "./services/api";

import "./styles/variables.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";

export default function App() {
  const { games, loading, refresh, setGames, normalizeGame } = useGames();

  const [displayedGames, setDisplayedGames] = useState([]);

  const [filters, setFilters] = useState({
    genre: "",
    platform: "",
    completed: "any",
    developer: "",
    sort: "none",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDisplayedGames(games);
  }, [games]);

  const openAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const extractId = (game) => {
    if (!game) return null;
    const rawId =
      game.id ??
      game._id ??
      (game.raw && game.raw._id) ??
      (game._id && typeof game._id === "object" && game._id.toString ? game._id.toString() : null);
    return rawId ? String(rawId) : null;
  };

  const openEdit = (game) => {
    const normalized = normalizeGame ? normalizeGame(game) : { ...game, id: extractId(game) };
    setEditing(normalized);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const toId = (id) => (id === undefined || id === null ? id : String(id));

  const handleSearch = (query = "", filters = {}) => {
    const q = (query || "").toLowerCase();

    const {
      genre = "",
      platform = "",
      completed = "any",
      developer = "",
      sort = "none",
    } = filters;

    const filtered = (games || []).filter((g) => {
      const title = String(g.title || "").toLowerCase();
      const dev = String(g.developer || g.studio || "").toLowerCase();
      const gGenre = String(g.genre || "").toLowerCase();
      const gPlatform = String(g.platform || "").toLowerCase();

      const isCompleted =
        (g.progress || 0) >= 100 ||
        String(g.status || "").toLowerCase() === "completado";

      const matchesQuery = !q || title.includes(q) || dev.includes(q);
      const matchesGenre = !genre || gGenre.includes(genre.toLowerCase());
      const matchesPlatform = !platform || gPlatform.includes(platform.toLowerCase());
      const matchesDeveloper = !developer || dev.includes(developer.toLowerCase());
      const matchesCompleted =
        completed === "any" ||
        (completed === "completed" && isCompleted) ||
        (completed === "incomplete" && !isCompleted);

      return (
        matchesQuery &&
        matchesGenre &&
        matchesPlatform &&
        matchesDeveloper &&
        matchesCompleted
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "none") return 0;

      if (sort === "date-desc") {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }

      if (sort === "date-asc") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }

      if (sort === "score-desc") return (b.rating || 0) - (a.rating || 0);
      if (sort === "score-asc") return (a.rating || 0) - (b.rating || 0);

      if (sort === "title-asc")
        return String(a.title || "").localeCompare(String(b.title || ""));

      if (sort === "title-desc")
        return String(b.title || "").localeCompare(String(a.title || ""));

      return 0;
    });

    setDisplayedGames(sorted);
  };

  const handleFiltersApply = (newFilters) => {
    setFilters(newFilters);
    handleSearch("", newFilters);
  };

  const handleSave = async (gamePayload) => {
    setSaving(true);

    if (gamePayload.id) {
      try {
        const updated = await api.updateGame(gamePayload.id, gamePayload);
        const item = updated || gamePayload;
        item.id = toId(item.id ?? item._id ?? gamePayload.id);

        setGames((prev) =>
          prev.map((g) =>
            toId(g.id ?? g._id) === item.id
              ? normalizeGame
                ? normalizeGame(item)
                : item
              : g
          )
        );
        closeModal();
        return item;
      } catch (err) {
        console.error("handleSave (update) error", err);
        closeModal();
        return gamePayload;
      } finally {
        setSaving(false);
      }
    }

    const tempId = `tmp-${Date.now()}`;
    const tempItem = normalizeGame
      ? normalizeGame({ ...gamePayload, id: tempId })
      : { ...gamePayload, id: tempId };

    setGames((prev) => [tempItem, ...prev]);

    try {
      const created = await api.addGame(gamePayload);
      if (created) {
        const real = normalizeGame
          ? normalizeGame(created)
          : { ...created, id: toId(created.id ?? created._id) };

        setGames((prev) =>
          prev.map((g) => (g.id === tempId ? real : g))
        );
        closeModal();
        return real;
      } else {
        closeModal();
        return tempItem;
      }
    } catch (err) {
      console.error("handleSave (create) error", err);
      closeModal();
      return tempItem;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (gameOrId) => {
    const targetId =
      typeof gameOrId === "string" || typeof gameOrId === "number"
        ? String(gameOrId)
        : extractId(gameOrId);

    if (!targetId) return alert("Error al identificar juego");

    if (!confirm("¿Eliminar este juego?")) return;

    setGames((prev) => prev.filter((g) => toId(g.id ?? g._id) !== targetId));

    try {
      await api.deleteGame(targetId);
    } catch {
      await refresh();
    }
  };

  const handleRate = async (game, ratingValue) => {
    const targetId = extractId(game);
    if (!targetId) return;

    setGames((prev) =>
      prev.map((g) =>
        toId(g.id ?? g._id) === targetId ? { ...g, rating: ratingValue } : g
      )
    );

    try {
      const updated = await api.updateGame(targetId, {
        ...game,
        rating: ratingValue,
      });

      if (updated) {
        const updatedId = toId(updated.id ?? updated._id);
        setGames((prev) =>
          prev.map((g) =>
            toId(g.id ?? g._id) === updatedId
              ? normalizeGame(updated)
              : g
          )
        );
      }
    } catch (e) {
      console.error("Error al actualizar rating:", e);
    }
  };

  return (
    <div className="container with-fixed-sidebar">
      <Header onAdd={openAdd} onSearch={handleSearch} />

      <div className="layout">
        <Sidebar
          filters={filters}
          onApply={handleFiltersApply}
          onClear={() => handleFiltersApply({})}
        />

        <main className="main">
          {loading ? (
            <div style={{ padding: 20, color: "var(--muted)" }}>
              Cargando juegos...
            </div>
          ) : (
            <Home
              games={displayedGames}
              onEdit={openEdit}
              onDelete={handleDelete}
              onRate={handleRate}
            />
          )}
        </main>
      </div>

      <Footer />

      {modalOpen && (
        <GameForm
          initial={editing}
          onClose={closeModal}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </div>
  );
}
