import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <span style={{ fontSize: '4rem' }}>🍕❓</span>
      <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 0.5rem' }}>404 · Fuera de Cartelera</h1>
      <p style={{ color: 'var(--suave)', fontSize: '1.05rem', marginBottom: '2rem' }}>
        La ruta que buscás no existe o fue movida de la grilla de programación.
      </p>
      <Link to="/" className="btn btn-birra">
        ← Volver a la Portada
      </Link>
    </div>
  );
}
