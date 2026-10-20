import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { integrantes } from '../data/integrantes';

// Iconos SVG inline para mantener consistencia visual entre sistemas operativos
const ClapperIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 8h20"/>
    <path d="m6 4 3 4"/>
    <path d="m11 4 3 4"/>
    <path d="m16 4 3 4"/>
  </svg>
);

const PizzaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.2.2 2.3.6 3.4L12 22l9.4-6.6c.4-1.1.6-2.2.6-3.4 0-5.5-4.5-10-10-10z"/>
    <circle cx="10" cy="9" r="1.5" fill="currentColor"/>
    <circle cx="14" cy="13" r="1.5" fill="currentColor"/>
    <circle cx="8" cy="15" r="1.5" fill="currentColor"/>
  </svg>
);

const BeerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 11h1a3 3 0 0 1 0 6h-1"/>
    <path d="M9 2v4"/>
    <path d="M13 2v4"/>
    <path d="M5 8h12v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8z"/>
  </svg>
);

const TreeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1"/>
    <rect x="15" y="15" width="6" height="6" rx="1"/>
    <rect x="3" y="15" width="6" height="6" rx="1"/>
    <path d="M6 9v3a3 3 0 0 0 3 3h6"/>
  </svg>
);

const LogIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const secciones = [
    { to: '/', label: 'Portada del equipo', badge: 'Inicio', icon: <ClapperIcon />, end: true },
    { to: '/catalogo', label: 'Catálogo de Maridajes', badge: '20', icon: <PizzaIcon /> },
    { to: '/api', label: 'Discos y Cine', badge: 'Audio', icon: <BeerIcon /> },
    { to: '/arbol', label: 'Árbol de Componentes', badge: '', icon: <TreeIcon /> },
    { to: '/bitacora', label: 'Bitácora de Rodaje', badge: '', icon: <LogIcon /> }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
      <div className="sidebar-header">
        <NavLink to="/" className="sidebar-brand" onClick={handleNavClick}>
          <div className="sidebar-logo-badge">
            <img src="/img/icono-pizza.svg" alt="" width="36" height="36" />
          </div>
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-title">pIT<span>zza</span> y birrAPI</span>
            <span className="sidebar-brand-sub">Cine · Pizza · Birra · Dev</span>
          </div>
        </NavLink>
        <div className="sidebar-film-rail" aria-hidden="true" />
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-group">
          <span className="sidebar-group-title">
            <span>Secciones Principales</span>
            <span className="sidebar-group-counter">05</span>
          </span>

          <div className="sidebar-links-list">
            {secciones.map((sec) => (
              <NavLink
                key={sec.to}
                to={sec.to}
                end={sec.end}
                className={({ isActive }) => `sidebar-link ${isActive ? 'is-active' : ''}`}
                onClick={handleNavClick}
              >
                <span className="sidebar-link-icon">{sec.icon}</span>
                <span className="sidebar-link-label">{sec.label}</span>
                {sec.badge && (
                  <span className="sidebar-link-badge">{sec.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="sidebar-group" style={{ marginTop: '0.75rem' }}>
          <span className="sidebar-group-title">
            <span>Elenco · Integrantes</span>
            <span className="sidebar-group-counter">05</span>
          </span>

          <div className="sidebar-cast-list">
            {integrantes.map((miembro) => {
              const isCurrentProfile = location.pathname === `/perfil/${miembro.slug}`;
              return (
                <NavLink
                  key={miembro.id}
                  to={`/perfil/${miembro.slug}`}
                  className={`cast-item ${isCurrentProfile ? 'is-active' : ''}`}
                  onClick={handleNavClick}
                >
                  <div className="cast-avatar-wrap">
                    <img
                      src={miembro.avatar}
                      alt={miembro.nombre}
                      className="cast-avatar"
                      loading="lazy"
                    />
                    {isCurrentProfile && <span className="cast-active-dot" aria-hidden="true" />}
                  </div>
                  <div className="cast-info">
                    <span className="cast-name">{miembro.nombre}</span>
                    <span className="cast-role">{miembro.rol.split('&')[0].trim()}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <div className="system-status">
            <span className="status-indicator-dot" />
            <span className="status-indicator-text">Grupo 21 · Cartelera Activa</span>
          </div>
          <div className="footer-meta-row">
            <span>IFTS 29 · 2C 2026</span>
            <a
              href="https://github.com/Apoteotico/TP1-FrontEnd-Grupo21"
              target="_blank"
              rel="noopener noreferrer"
              className="github-pill"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
