import React from 'react';
import GameGrid from '../Components/GameGrid';

export default function Home({ games, onEdit, onDelete, onRate }) {
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

      <GameGrid games={games} onEdit={onEdit} onDelete={onDelete} onRate={onRate} />
    </main>
  );
}
