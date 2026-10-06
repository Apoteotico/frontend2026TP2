import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--tinta-2)',
      color: 'var(--mozzarella)',
      borderTop: '1px solid rgba(232, 167, 43, 0.25)',
      padding: '2rem 2.5rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--fuente-titulo)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--mozzarella)'
          }}>
            pIT<span style={{ color: 'var(--birra)' }}>zza</span> y birrAPI
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(246, 241, 231, 0.65)', marginTop: '0.2rem' }}>
            Trabajo Práctico Grupal 2 · React + React Router · Frontend sin dependencias pesadas.
          </p>
        </div>

        <nav aria-label="Enlaces del pie" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem' }}>
          <Link to="/" style={{ color: 'var(--birra)' }}>Portada</Link>
          <Link to="/catalogo" style={{ color: 'var(--birra)' }}>Catálogo</Link>
          <Link to="/api" style={{ color: 'var(--birra)' }}>API Cervecerías</Link>
          <Link to="/arbol" style={{ color: 'var(--birra)' }}>Árbol</Link>
          <Link to="/bitacora" style={{ color: 'var(--birra)' }}>Bitácora</Link>
        </nav>
      </div>
    </footer>
  );
}
