# 📘 **README -- GameTracker**

## 🎮 GameTracker

GameTracker es una aplicación web diseñada para gestionar tu colección
personal de videojuegos de forma organizada, visual y fácil de usar.\
Permite registrar juegos, calificarlos, escribir reseñas, ver
estadísticas y administrar tu biblioteca como un verdadero gamer.

------------------------------------------------------------------------

## 🚀 **Características principales**

### 📚 **Gestión de Juegos**

-   Agregar nuevos videojuegos con portada.
-   Ver toda tu colección en forma de tarjetas.
-   Marcar juegos como completados.
-   Editar o eliminar juegos existentes.

### ⭐ **Sistema de Reseñas**

-   Escribir reseñas con una calificación en estrellas.
-   Ver reseñas de cada juego.
-   Editarlas o eliminarlas.

### 🔍 **Filtros Inteligentes**

-   Ordenar y filtrar por:
    -   Género\
    -   Plataforma\
    -   Estado (completado / pendiente)\
    -   Puntuación


------------------------------------------------------------------------

## 🛠️ **Tecnologías Utilizadas**

### 🖥️ Backend

  Tecnología   Descripción
  ------------ ----------------------
  Node.js      Entorno de ejecución
  Express      Framework backend
  MongoDB      Base de datos NoSQL
  Mongoose     ODM para MongoDB

### ⚛️ Frontend

  Tecnología       Descripción
  ---------------- ----------------------------
  React            Biblioteca para UI
  CSS / Tailwind   Estilos
  React Hooks      Manejo del estado y lógica

### 🗄️ Base de Datos

-   MongoDB Atlas (cloud)
-   Mongoose para modelos y validaciones

### 📝 CRUD Implementado

-   Juegos
-   Reseñas

------------------------------------------------------------------------

## 🧱 Arquitectura del Backend (MVC + Rutas)

controllers/\
gameController.js\
reviewController.js

models/\
Game.js\
Review.js

routes/\
games.js\
reviews.js

index.js\
.env\
package.json\
seed.js\
test-mongo.js

------------------------------------------------------------------------

## 🔌 Endpoints del Backend

### 🎮 Videojuegos

-   GET /api/juegos
-   GET /api/juegos/:id
-   POST /api/juegos
-   PUT /api/juegos/:id
-   DELETE /api/juegos/:id

### 📝 Reseñas

-   GET /api/reseñas
-   GET /api/reseñas/juego/:juegoId
-   POST /api/reseñas
-   PUT /api/reseñas/:id
-   DELETE /api/reseñas/:id

------------------------------------------------------------------------

## ⚛️ Arquitectura del Frontend

src/\
├── assets/\
├── Components/\
├── hooks/\
├── Pages/\
├── services/ (api.js)\
├── styles/\
├── App.jsx\
└── main.jsx

------------------------------------------------------------------------

## 🎯 Objetivo del Proyecto

El propósito de GameTracker es permitir a los jugadores calificar,
organizar y compartir información sobre videojuegos, ayudando a otros
usuarios a tomar mejores decisiones.

------------------------------------------------------------------------

## 🧑‍💻 Estado Actual

✔ Backend funcional\
✔ Frontend conectado\
✔ CRUD completo\
✔ Sistema de reseñas\
✔ Filtros
