import React from 'react';
import PropTypes from 'prop-types';

/**
 * Diálogo modal accesible para consultar la sinopsis, receta y desafío técnico de un maridaje.
 */
export default function DetalleModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(18, 16, 14, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--papel)',
          borderRadius: 'var(--radio)',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--sombra-alta)',
          border: '1px solid var(--linea)',
          padding: '2rem',
          position: 'relative'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'var(--suave)',
            lineHeight: 1
          }}
        >
          ✕
        </button>

        <span className="badge badge-codigo" style={{ marginBottom: '0.5rem' }}>
          {item.integrante} · {item.genero}
        </span>
        <h2 id="modal-titulo" style={{ fontSize: '1.65rem', marginBottom: '0.4rem', color: 'var(--tinta)' }}>
          {item.titulo}
        </h2>
        <p style={{ color: 'var(--suave)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
          🎬 <strong>{item.pelicula}</strong> ({item.anio}) · Dirección: {item.director}
        </p>
        <p style={{ color: 'var(--suave)', fontSize: '0.93rem', marginBottom: '1.5rem' }}>
          💿 <strong>Disco del perfil:</strong> {item.disco}
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--tinta-2)', marginBottom: '0.4rem' }}>Sinopsis del Maridaje</h4>
          <p style={{ fontSize: '0.92rem', color: 'var(--texto)', lineHeight: 1.6, fontStyle: 'italic' }}>
            "{item.sinopsisMaridaje}"
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          background: 'var(--crema)',
          padding: '1.25rem',
          borderRadius: 'var(--radio-sm)',
          marginBottom: '1.5rem'
        }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--tomate-oscuro)' }}>🍕 Pizza Recomendada</h4>
            <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>{item.pizza}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--birra-oscura)' }}>🍺 Cerveza Sugerida</h4>
            <p style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>{item.birra} ({item.tipoBirra})</p>
          </div>
        </div>

        <div style={{
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio-sm)',
          padding: '1.25rem',
          background: 'var(--mozzarella)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--codigo)' }}>💻 Reto de Código para la Semana</h4>
            <span className="badge badge-albahaca">{item.dificultad} · {item.tiempoEstimado}</span>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--texto)' }}>
            {item.proyectoCodigo}
          </p>
        </div>

        <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-birra"
            onClick={onClose}
          >
            Entendido, cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

DetalleModal.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    integrante: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    pelicula: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    anio: PropTypes.number.isRequired,
    genero: PropTypes.string.isRequired,
    disco: PropTypes.string.isRequired,
    pizza: PropTypes.string.isRequired,
    birra: PropTypes.string.isRequired,
    tipoBirra: PropTypes.string.isRequired,
    proyectoCodigo: PropTypes.string.isRequired,
    dificultad: PropTypes.string.isRequired,
    tiempoEstimado: PropTypes.string.isRequired,
    sinopsisMaridaje: PropTypes.string.isRequired
  }),
  onClose: PropTypes.func.isRequired
};
