
const translations = {
  en: {
    appTitle: "GameTracker",
    addGame: "Add game",
    editGame: "Edit game",
    titleLabel: "Title *",
    platformLabel: "Platform (PC, PS5, Switch...)",
    descriptionLabel: "Description (optional)",
    addButton: "Add game",
    saveButton: "Save changes",
    cancelButton: "Cancel",
    deleteConfirm: "Are you sure you want to delete this game?",
    noGames: "No games yet.",
    loading: "Loading games..."
  },
  es: {
    appTitle: "GameTracker",
    addGame: "Agregar juego",
    editGame: "Editar juego",
    titleLabel: "Título *",
    platformLabel: "Plataforma (PC, PS5, Switch...)",
    descriptionLabel: "Descripción (opcional)",
    addButton: "Agregar juego",
    saveButton: "Guardar cambios",
    cancelButton: "Cancelar",
    deleteConfirm: "¿Seguro que quieres eliminar este juego?",
    noGames: "No hay juegos aún.",
    loading: "Cargando juegos..."
  }
};

// Detecta idioma del navegador
const browserLang =
  typeof navigator !== "undefined" &&
  navigator.language &&
  navigator.language.startsWith("es")
    ? "es"
    : "en";

let currentLang = localStorage.getItem("lang") || browserLang;

export function setLang(lang) {
  currentLang = lang;
  try {
    localStorage.setItem("lang", lang);
  } catch (e) {}
}

export function getLang() {
  return currentLang;
}

export function t(key) {
  const langPack = translations[currentLang] || translations.en;
  return langPack[key] || key;
}
