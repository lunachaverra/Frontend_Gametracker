import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "10px",
        borderRadius: "50%",
        cursor: "pointer",
        color: "var(--text)",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: ".2s",
      }}
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
}
