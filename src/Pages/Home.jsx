// src/Pages/Home.jsx
import React from 'react';
import GameGrid from '../Components/GameGrid';

export default function Home({ games, onEdit, onDelete, onRate }) {
  const hasItems = Array.isArray(games) && games.length > 0;

  return (
    <main className="main">
      <section className="hero">
        <div className="top" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <h1 style={{margin:0,fontFamily:'Orbitron, sans-serif',fontSize:20}}>Mi colección</h1>
            <p style={{marginTop:0,color:'var(--muted)'}}>Lista personal de juegos</p>
          </div>
        </div>
      </section>

      {hasItems ? (
        <GameGrid games={games} onEdit={onEdit} onDelete={onDelete} onRate={onRate} />
      ) : (
        <div className="no-results">
          <h3>No se encontraron resultados en tus busqueda</h3>
          <p style={{ color: 'var(--muted)', marginTop: 6 }}>
            Intenta con otros términos, filtros, o borra la búsqueda.
          </p>
        </div>
      )}
    </main>
  );
}
