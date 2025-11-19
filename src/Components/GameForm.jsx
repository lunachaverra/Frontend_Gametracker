import React, { useEffect, useState } from "react";

export default function GameForm({
  initial = null,
  onClose = () => {},
  onSave = async () => {},
  saving: parentSaving = false,
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setPlatform(initial.platform || "");
      setStatus(initial.status || "");
      setProgress(initial.progress ?? 0);
      setCover(initial.cover || "");
      setDescription(initial.description || "");
      setRating(initial.rating ?? 0);
    } else {
      setTitle("");
      setPlatform("");
      setStatus("");
      setProgress(0);
      setCover("");
      setDescription("");
      setRating(0);
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return alert("El título es obligatorio");
    if (progress < 0 || progress > 100) return alert("Progress debe estar entre 0 y 100");
    if (rating < 0 || rating > 5) return alert("Rating debe estar entre 0 y 5");

    const payload = {
      ...(initial?.id ? { id: initial.id } : {}),
      title: title.trim(),
      platform: platform.trim() || "PC",
      status: status.trim() || "Pendiente",
      progress: Number(progress),
      cover:
        cover ||
        `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
      description: description || "",
      rating: Number(rating),
    };

    console.log("GameForm submit payload:", payload);

    try {
      setSaving(true);
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error("save error", err);
      alert("Error guardando. Revisa la consola.");
    } finally {
      setSaving(false);
    }
  };

  const isSaving = saving || parentSaving;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header className="modal-header">
          <h3>{initial ? "Editar juego" : "Agregar juego"}</h3>
          <button className="btn" onClick={onClose} aria-label="Cerrar">
            Cerrar
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-body">
          <label className="field">
            <div className="field-label">Título</div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nombre del juego"
              disabled={isSaving}
            />
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <label className="field" style={{ flex: 1 }}>
              <div className="field-label">Plataforma</div>
              <input
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                placeholder="PC, PS5, Switch..."
                disabled={isSaving}
              />
            </label>

            <label className="field" style={{ flex: 1 }}>
              <div className="field-label">Estado</div>
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Jugando, Completado..."
                disabled={isSaving}
              />
            </label>
          </div>

          <label className="field">
            <div className="field-label">Progreso (%)</div>
            <input
              type="number"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              disabled={isSaving}
            />
          </label>

          {/* Campo rating */}
          <label className="field">
            <div className="field-label">Calificación (0-5)</div>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              disabled={isSaving}
            />
          </label>

          <label className="field">
            <div className="field-label">Cover (URL)</div>
            <input
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="https://..."
              disabled={isSaving}
            />
          </label>

          <label className="field">
            <div className="field-label">Descripción</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              disabled={isSaving}
            />
          </label>

          <footer style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" className="btn" onClick={onClose} disabled={isSaving}>
              Cancelar
            </button>
            <button type="submit" className="btn primary" disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
