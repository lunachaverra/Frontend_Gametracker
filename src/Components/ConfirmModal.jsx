// src/Components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({
  open,
  title = "Confirmar",
  message = "",
  previewUrl = null,
  danger = false,
  onClose = () => {},
  onConfirm = () => {},
}) {
  if (!open) return null;

  return (
    <div className="confirm-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="confirm-modal" role="document">
        <header className="confirm-header">
          <h3 id="confirm-title">{title}</h3>
        </header>

        <div className="confirm-body">
          {previewUrl && (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <img
                src={previewUrl}
                alt="Vista previa"
                style={{ width: 120, height: 76, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(255,255,255,0.04)" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          )}

          <p style={{ margin: 0, color: "var(--muted)" }}>{message}</p>
        </div>

        <footer className="confirm-actions">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button
            className={danger ? "btn btn-danger" : "btn btn-primary"}
            onClick={() => onConfirm()}
          >
            {danger ? 'Eliminar' : 'Confirmar'}
          </button>
        </footer>
      </div>
    </div>
  );
}
