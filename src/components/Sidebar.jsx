import React from 'react';
import { NavLink } from 'react-router-dom';
import { integrantes } from '../data/integrantes';

export default function Sidebar({ isOpen, onClose }) {
  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-brand" onClick={handleNavClick}>
          <img src="/img/icono-pizza.svg" alt="Logo de pITzza y birrAPI" width="40" height="40" />
          <div>
            <div className="sidebar-brand-title">pIT<span>zza</span> y birrAPI</div>
            <span className="sidebar-tag">cine · pizza · birra · código</span>
          </div>
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-label">Secciones</span>
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <span className="nav-icon" aria-hidden="true">🎬</span>
          <span>Portada del equipo</span>
        </NavLink>

        <NavLink
          to="/catalogo"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <span className="nav-icon" aria-hidden="true">🍕</span>
          <span>Catálogo (JSON local)</span>
        </NavLink>

        <NavLink
          to="/api"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <span className="nav-icon" aria-hidden="true">🍺</span>
          <span>API Cervecerías</span>
        </NavLink>

        <NavLink
          to="/arbol"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <span className="nav-icon" aria-hidden="true">🌳</span>
          <span>Árbol de Componentes</span>
        </NavLink>

        <NavLink
          to="/bitacora"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={handleNavClick}
        >
          <span className="nav-icon" aria-hidden="true">📜</span>
          <span>Bitácora de Rodaje</span>
        </NavLink>

        <span className="sidebar-label" style={{ marginTop: '0.8rem' }}>Integrantes</span>
        {integrantes.map((miembro) => (
          <NavLink
            key={miembro.id}
            to={`/perfil/${miembro.slug}`}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <img
              src={miembro.avatar}
              alt=""
              style={{
                width: '1.4rem',
                height: '1.4rem',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid rgba(232, 167, 43, 0.4)'
              }}
            />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {miembro.nombre.split(' ')[0]}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p><strong>TP2 Frontend · React</strong></p>
        <p>IFTS 29 · 2do Cuatrimestre 2026</p>
        <a href="https://github.com/Apoteotico/TP1-FrontEnd-Grupo21" target="_blank" rel="noopener noreferrer">
          GitHub del equipo →
        </a>
      </div>
    </aside>
  );
}
