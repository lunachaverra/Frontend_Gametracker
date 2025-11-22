// src/Components/GameForm.jsx
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

  // preview / validación
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewValid, setPreviewValid] = useState(null); // null = no probado, true/false = resultado
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setPlatform(initial.platform || "");
      setStatus(initial.status || "");
      setProgress(initial.progress ?? 0);
      setCover(initial.cover || "");
      setDescription(initial.description || "");
      setRating(initial.rating ?? 0);
      setPreviewUrl(initial.cover || "");
      setPreviewValid(initial.cover ? true : null);
    } else {
      setTitle("");
      setPlatform("");
      setStatus("");
      setProgress(0);
      setCover("");
      setDescription("");
      setRating(0);
      setPreviewUrl("");
      setPreviewValid(null);
    }
  }, [initial]);

  // Valida si la URL apunta a una imagen cargable
  const validateImageUrl = (url) => {
    if (!url) {
      setPreviewUrl("");
      setPreviewValid(null);
      return;
    }

    setPreviewLoading(true);
    const img = new Image();
    img.onload = () => {
      setPreviewUrl(url);
      setPreviewValid(true);
      setPreviewLoading(false);
    };
    img.onerror = () => {
      setPreviewUrl("");
      setPreviewValid(false);
      setPreviewLoading(false);
    };

    // Forzar el intento de carga
    img.src = url;
  };

  // handler cuando cambia el input cover
  const handleCoverChange = (value) => {
    setCover(value);
    validateImageUrl(value.trim());
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) return alert("El título es obligatorio");
    if (progress < 0 || progress > 100) return alert("Progreso debe estar entre 0 y 100");
    if (rating < 0 || rating > 5) return alert("Calificación debe estar entre 0 y 5");

    const payload = {
      ...(initial?.id ? { id: initial.id } : {}),
      title: title.trim(),
      platform: platform.trim() || "PC",
      status: status.trim() || "Pendiente",
      progress: Number(progress),
      cover: cover || (previewValid ? previewUrl : ""),
      description: description || "",
      rating: Number(rating),
    };

    if (cover && previewValid === false) {
      const ok = confirm(
        "La URL de la imagen parece no cargar correctamente. ¿Deseas guardar de todos modos?"
      );
      if (!ok) return;
    }

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

  // cerrar al presionar Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // bloquear scroll del body mientras el modal esté abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, []);

  // cerrar si el usuario hace click fuera del modal
  const handleOverlayMouseDown = (e) => {
    // detecta clicks en el overlay por su data-attribute
    if (e.target && e.target.dataset && e.target.dataset.modalOverlay) {
      onClose();
    }
  };

  return (
    <div
      // añadimos data-modal-overlay para una detección robusta de clicks
      data-modal-overlay="true"
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className="modal"
        role="document"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header
          className="modal-header"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <h3 style={{ margin: 0 }}>{initial ? "Editar juego" : "Agregar juego"}</h3>
          <button className="btn" onClick={onClose} aria-label="Cerrar">
            Cerrar
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-body" style={{ marginTop: 12 }}>
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

          <label className="field">
            <div className="field-label">Cover (URL)</div>
            <input
              value={cover}
              onChange={(e) => handleCoverChange(e.target.value)}
              placeholder="https://... (usa 'abrir imagen en nueva pestaña' para obtener URL directa)"
              disabled={isSaving}
            />
            {/* Previsualización */}
            <div style={{ marginTop: 8 }}>
              {previewLoading && <div style={{ color: "var(--muted)" }}>Comprobando imagen...</div>}
              {previewValid === true && (
                <img src={previewUrl} alt="Preview cover" style={{ width: 120, borderRadius: 8 }} />
              )}
              {previewValid === false && (
                <div style={{ color: "#ff6b6b", fontSize: 13 }}>
                  No se pudo cargar la imagen desde esa URL. Asegúrate de usar la URL directa.
                </div>
              )}
            </div>
          </label>

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
            <div className="field-label">Descripción</div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              disabled={isSaving}
            />
          </label>

          <footer style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
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