// src/Components/GameCard.jsx
import React from "react";

const STAR_PATH =
  "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

function starFillPercent(index, rating) {
  const starValue = Math.max(0, Math.min(1, rating - (index - 1)));
  return Math.round(starValue * 100);
}

export default function GameCard({ game, onEdit, onDelete, onRate }) {
  // Desestructuramos genre además de los demás
  const {
    cover,
    title,
    platform,
    status,
    progress = 0,
    description,
    rating = 0,
    genre = ""
  } = game || {};

  const handleRateClick = (value) => {
    if (onRate) onRate(game, value);
  };

  return (
    <article className="card" aria-label={title}>
      <img
        src={cover || "https://picsum.photos/200/300?random=1"}
        alt={`${title} cover`}
      />
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 0,
            alignItems: "flex-start",
          }}
        >
          <div>
            <h3 className="card-title">{title}</h3>

            {/* Aquí mostramos plataforma, estado y género */}
            <div className="card-meta">
              {platform} • <span style={{ textTransform: "capitalize" }}>{status}</span>
              {genre ? ` • ${genre}` : null}
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div className="stars" aria-label={`Calificación ${rating} de 5`}>
              {[1, 2, 3, 4, 5].map((i) => {
                const percent = starFillPercent(i, Number(rating));
                const gradId = `g-${(title || "x").replace(/\s+/g, "")}-${i}`;
                return (
                  <button
                    key={i}
                    className="star-btn"
                    title={`${i} estrellas`}
                    onClick={() => handleRateClick(i)}
                    aria-label={`Poner ${i} estrellas`}
                  >
                    <svg
                      className="star-svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      role="img"
                      aria-hidden={false}
                    >
                      <defs>
                        <linearGradient id={gradId} x1="0" x2="1">
                          <stop offset={`${percent}%`} stopColor="#ffcc00" />
                          <stop offset={`${percent}%`} stopColor="#555" />
                        </linearGradient>
                      </defs>
                      <path d={STAR_PATH} fill={`url(#${gradId})`} />
                    </svg>
                  </button>
                );
              })}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{rating} / 5</div>
          </div>
        </div>

        <p className="card-desc">{description}</p>

        <div className="progress-wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="progress" aria-hidden>
              <div className="bar" style={{ width: `${progress || 0}%` }} />
            </div>
            <div className="card-meta">{progress || 0}%</div>
          </div>

          <div className="card-actions">
            <button className="small-btn" onClick={() => onEdit && onEdit(game)}>Editar</button>
            <button className="small-btn" onClick={() => onDelete && onDelete(game)}>Eliminar</button>
          </div>
        </div>
      </div>
    </article>
  );
}
