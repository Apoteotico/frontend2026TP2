import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">
            pIT<span>zza</span> y birrAPI
          </p>
          <p className="footer-tagline">
            Trabajo Práctico Grupal 2 · React + React Router · Frontend sin dependencias pesadas.
          </p>
        </div>

        <nav aria-label="Enlaces del pie" className="footer-nav">
          <Link to="/">Portada</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/api">API Discos y Cine</Link>
          <Link to="/arbol">Árbol</Link>
          <Link to="/bitacora">Bitácora</Link>
        </nav>
      </div>
    </footer>
  );
}
