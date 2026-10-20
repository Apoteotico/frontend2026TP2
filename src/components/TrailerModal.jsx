import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * TrailerModal — Sala de Proyección Flotante para reproducir el tráiler oficial de una película.
 * Valida sus contratos de props mediante PropTypes (Semana M9).
 */
export default function TrailerModal({ pelicula, onClose }) {
  useEffect(() => {
    if (!pelicula) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pelicula, onClose]);

  if (!pelicula) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-modal-title"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(10, 8, 7, 0.85)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#161210',
          color: '#f6f1e7',
          borderRadius: 'var(--radio)',
          maxWidth: '820px',
          width: '100%',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(232, 167, 43, 0.35)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Cabecera de sala de proyección */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.35rem',
          borderBottom: '1px solid rgba(232, 167, 43, 0.2)',
          background: '#110e0c'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <span className="badge badge-birra" style={{ flexShrink: 0 }}>🎬 Tráiler Oficial</span>
            <div style={{ minWidth: 0 }}>
              <h3 id="trailer-modal-title" style={{
                fontSize: '1.15rem',
                color: '#ffffff',
                margin: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {pelicula.titulo} ({pelicula.anio})
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#baa997', margin: 0 }}>
                Dirección: {pelicula.director}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar tráiler"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(232, 167, 43, 0.3)',
              color: '#f6f1e7',
              width: '2.2rem',
              height: '2.2rem',
              borderRadius: '50%',
              fontSize: '1.05rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            ✕
          </button>
        </div>

        {/* Contenedor 16:9 del reproductor */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          background: '#000000'
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${pelicula.youtubeId}?autoplay=1&rel=0`}
            title={`Tráiler oficial de ${pelicula.titulo}`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Pie del modal */}
        <div style={{
          padding: '0.85rem 1.35rem',
          background: '#110e0c',
          borderTop: '1px solid rgba(232, 167, 43, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#baa997', fontFamily: 'var(--fuente-codigo)' }}>
            Proyección en sala · Presioná ESC para salir
          </span>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <a
              href={`https://www.youtube.com/watch?v=${pelicula.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost"
              style={{ color: 'var(--birra)', borderColor: 'rgba(232, 167, 43, 0.4)' }}
            >
              Abrir en YouTube ↗
            </a>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm btn-birra"
            >
              Cerrar sala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

TrailerModal.propTypes = {
  pelicula: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    anio: PropTypes.number.isRequired,
    poster: PropTypes.string,
    youtubeId: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func.isRequired
};
