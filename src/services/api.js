// src/services/api.js
// Usar import.meta.env para Vite; si no existe, usar localhost por defecto.
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function handleRes(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => null);
    const err = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  // intentar json, si falla devolver null
  try { return await res.json(); } catch { return null; }
}

export async function fetchGames() {
  try {
    const res = await fetch(`${API_BASE}/api/games`);
    return await handleRes(res);
  } catch (e) {
    console.error('fetchGames error', e);
    return [];
  }
}

export async function addGame(game) {
  try {
    const res = await fetch(`${API_BASE}/api/games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });
    return await handleRes(res);
  } catch (e) {
    console.error('addGame error', e);
    return null;
  }
}

export async function deleteGame(id) {
  try {
    const res = await fetch(`${API_BASE}/api/games/${id}`, { method: 'DELETE' });
    return await handleRes(res); // puede devolver {} o info del servidor
  } catch (e) {
    console.error('deleteGame error', e);
    return null;
  }
}

export async function updateGame(id, updates) {
  try {
    const res = await fetch(`${API_BASE}/api/games/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return await handleRes(res);
  } catch (e) {
    console.error('updateGame error', e);
    return null;
  }
}
