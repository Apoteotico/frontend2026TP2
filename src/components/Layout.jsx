import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

// Mapeo amigable de rutas para la barra superior
const ROUTE_TITLES = {
  '/': 'Portada del equipo · Función de gala',
  '/catalogo': 'Catálogo de Maridajes · 24 Registros JSON',
  '/api': 'API Pública · Cervecerías en Vivo (Open Brewery DB)',
  '/arbol': 'Árbol de Componentes · Jerarquía de React',
  '/bitacora': 'Bitácora de Rodaje · 8 Decisiones de Arquitectura'
};

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

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

  // Obtener el título dinámico según la ruta
  let currentTitle = ROUTE_TITLES[location.pathname];
  if (!currentTitle && location.pathname.startsWith('/perfil/')) {
    const slug = location.pathname.replace('/perfil/', '');
    const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    currentTitle = `Perfil del equipo · ${formattedName}`;
  }

  return (
    <div className="app-layout">
      {/* Backdrop para cerrar en móvil */}
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Menú lateral compartido */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Contenedor central */}
      <div className="app-main">
        {/* Cabecera superior para móvil (< 900px) */}
        <header className="mobile-header">
          <Link to="/" className="mobile-brand">
            <img src="/img/icono-pizza.svg" alt="" width="32" height="32" />
            <span>pIT<strong>zza</strong> y birrAPI</span>
          </Link>
          <button
            type="button"
            className="btn-toggle-menu"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? "✕" : "☰"}
          </button>
        </header>

        {/* Barra superior de integración para escritorio (conecta la sidebar con el contenido) */}
        <div className="desktop-topbar" aria-label="Información de sección">
          <div className="topbar-inner">
            <div className="topbar-breadcrumb">
              <span className="topbar-project-tag">pITzza y birrAPI</span>
              <span className="topbar-sep">/</span>
              <span className="topbar-current-page">{currentTitle || 'Sección'}</span>
            </div>

            <div className="topbar-actions">
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

        {/* Contenido de la página actual */}
        <main className="page-content" id="contenido-principal">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
