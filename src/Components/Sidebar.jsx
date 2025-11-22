// src/Components/Sidebar.jsx
import React from "react";
import Filters from "./Filters";

export default function Sidebar({
  filters,
  onApply = () => {},
  onClear = () => {},
}) {
  return (
    <aside className="sidebar">
      <Filters initial={filters} onApply={onApply} onClear={onClear} />
    </aside>
  );
}
