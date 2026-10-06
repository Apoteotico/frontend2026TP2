import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Al cambiar de ruta, sube el scroll y cierra el menú móvil si estaba abierto
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
        {/* Cabecera superior sólo visible en pantallas pequeñas */}
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

        {/* Contenido de la página actual */}
        <main className="page-content" id="contenido-principal">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
