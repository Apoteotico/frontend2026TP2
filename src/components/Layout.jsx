import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

// Títulos de ruta mostrados en el breadcrumb superior
const ROUTE_TITLES = {
  '/': 'Portada del equipo · Función de gala',
  '/catalogo': 'Catálogo de Maridajes · 24 Registros JSON',
  '/api': 'API Pública · Discos y Bandas Sonoras en Vivo (Apple iTunes API)',
  '/arbol': 'Árbol de Componentes · Jerarquía de React',
  '/bitacora': 'Bitácora de Rodaje · 10 Decisiones de Arquitectura'
};

/**
 * Layout principal de la aplicación.
 * Gestiona el estado del menú lateral responsivo y la persistencia del tema visual en localStorage.
 */
export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tema, setTema] = useState(() => {
    try {
      return localStorage.getItem('pITzza_tema') || 'claro';
    } catch {
      return 'claro';
    }
  });
  const location = useLocation();

  // Restablece el scroll y cierra el drawer móvil en cada cambio de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const cambiarTema = (nuevoTema) => {
    setTema(nuevoTema);
    try {
      localStorage.setItem('pITzza_tema', nuevoTema);
    } catch {}
  };

  const toggleTema = () => {
    cambiarTema(tema === 'claro' ? 'oscuro' : 'claro');
  };

  // Resolución dinámica del título para rutas parametrizadas (/perfil/:slug)
  let currentTitle = ROUTE_TITLES[location.pathname];
  if (!currentTitle && location.pathname.startsWith('/perfil/')) {
    const slug = location.pathname.replace('/perfil/', '');
    const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    currentTitle = `Perfil del equipo · ${formattedName}`;
  }

  return (
    <div className={`app-layout ${tema === 'oscuro' ? 'theme-oscuro' : 'theme-claro'}`}>
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      <div className="app-main">
        <header className="mobile-header">
          <Link to="/" className="mobile-brand">
            <img src="/img/icono-pizza.svg" alt="" width="32" height="32" />
            <span>pIT<strong>zza</strong> y birrAPI</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={toggleTema}
              className="topbar-theme-btn"
              style={{ fontSize: '0.85rem', padding: '0.25rem 0.55rem' }}
              aria-label={`Cambiar a ${tema === 'oscuro' ? 'Modo Día' : 'Modo Noche'}`}
              title={`Cambiar a ${tema === 'oscuro' ? 'Modo Día' : 'Modo Noche'}`}
            >
              {tema === 'oscuro' ? '☀️' : '🌙'}
            </button>
            <button
              type="button"
              className="btn-toggle-menu"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isSidebarOpen}
            >
              {isSidebarOpen ? "✕" : "☰"}
            </button>
          </div>
        </header>

        <div className="desktop-topbar" aria-label="Información de sección">
          <div className="topbar-inner">
            <div className="topbar-breadcrumb">
              <span className="topbar-project-tag">pITzza y birrAPI</span>
              <span className="topbar-sep">/</span>
              <span className="topbar-current-page">{currentTitle || 'Sección'}</span>
            </div>

            <div className="topbar-actions">
              <div className="theme-toggle-pill" role="group" aria-label="Selector de iluminación">
                <button
                  type="button"
                  className={`theme-pill-btn ${tema === 'claro' ? 'is-active' : ''}`}
                  onClick={() => cambiarTema('claro')}
                  aria-pressed={tema === 'claro'}
                  title="Activar Modo Día (Iluminación clara)"
                >
                  ☀️ Día
                </button>
                <button
                  type="button"
                  className={`theme-pill-btn ${tema === 'oscuro' ? 'is-active' : ''}`}
                  onClick={() => cambiarTema('oscuro')}
                  aria-pressed={tema === 'oscuro'}
                  title="Activar Modo Noche (Función de cine de gala)"
                >
                  🌙 Noche
                </button>
              </div>
              <span className="topbar-pill">⚡ Vite + React</span>
              <span className="topbar-pill">🎬 5 Integrantes</span>
              <a
                href="https://github.com/Apoteotico/TP1-FrontEnd-Grupo21"
                target="_blank"
                rel="noopener noreferrer"
                className="topbar-link"
              >
                Repo GitHub ↗
              </a>
            </div>
          </div>
        </div>

        <main className="page-content" id="contenido-principal">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
