import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-brand">
            p<span>IT</span>zza y birr<span>API</span>
          </p>
          <p className="footer-tagline">
            Grupo 21 · Cine, música, pizza artesanal, birra y proyectos de código.
          </p>
        </div>

        <nav aria-label="Enlaces del pie" className="footer-nav">
          <Link to="/">Portada</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/api">Discos y Cine</Link>
          <Link to="/arbol">Árbol</Link>
          <Link to="/bitacora">Bitácora</Link>
        </nav>
      </div>
    </footer>
  );
}
