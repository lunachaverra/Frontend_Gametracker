// src/hooks/useGames.jsx
import { useEffect, useState } from "react";
import * as api from "../services/api";

/**
 * Normaliza un objeto game para garantizar que tenga la propiedad `id` (string).
 */
function normalizeGame(g) {
  if (!g || typeof g !== "object") return g;
  const rawId =
    g.id ??
    g._id ??
    (g.raw && g.raw._id) ??
    (g._id && typeof g._id === "object" && g._id.toString
      ? g._id.toString()
      : null);
  return { ...g, id: rawId ? String(rawId) : undefined };
}

/**
 * useGames: hook que intenta cargar juegos desde la API.
 * Si falla o la lista queda vacía, usa datos MOCK para mostrar UI.
 */
export default function useGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const MOCK = [
    {
      id: "mock-1",
      title: "Hollow Knight: Silksong",
      cover: "https://picsum.photos/200/300?random=11",
      platform: "PC",
      status: "Jugando",
      progress: 42,
      description: "Explorando cuevas, jefes y secretos."
    },
    {
      id: "mock-2",
      title: "Elden Ring",
      cover: "https://picsum.photos/200/300?random=12",
      platform: "PS5",
      status: "Completado",
      progress: 100,
      description: "Una épica aventura en las Tierras Intermedias."
    },
    {
      id: "mock-3",
      title: "Stardew Valley",
      cover: "https://picsum.photos/200/300?random=13",
      platform: "Switch",
      status: "Pendiente",
      progress: 5,
      description: "Mi granja, mis reglas."
    }
  ];

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await api.fetchGames();
        if (mounted) {
          if (Array.isArray(data) && data.length > 0) {
            const normalized = data.map(normalizeGame);
            setGames(normalized);
          } else {
            setGames(MOCK);
          }
        }
      } catch (e) {
        if (mounted) setGames(MOCK);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await api.fetchGames();
      if (Array.isArray(data) && data.length > 0) {
        setGames(data.map(normalizeGame));
      } else {
        setGames(MOCK);
      }
    } catch {
      setGames(MOCK);
    } finally {
      setLoading(false);
    }
  };

  // Exponer también la utilidad de normalizar si alguien la necesita
  return { games, loading, refresh, setGames, normalizeGame };
}
