
import React from "react";
import GameCard from "./GameCard";

export default function GameGrid({ games = [], onEdit, onDelete, onRate }) {
  return (
    <section className="grid" aria-live="polite">
      {games.map((g, idx) => (
  <GameCard
    key={g.id ? g.id : (g._id ? String(g._id) : `i-${idx}`)}
    game={g}
    onEdit={onEdit}
    onDelete={onDelete}
    onRate={onRate}
  />
))}
    </section>
  );
}
