import React from 'react';
import PropTypes from 'prop-types';

/**
 * CardMaridaje — Componente de presentación para cada tarjeta del catálogo.
 * Valida sus contratos de datos mediante PropTypes (Semana M9).
 */
export default function CardMaridaje({ item, onVerDetalle }) {
  return (
    <article
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.5rem',
        background: 'var(--papel)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className="badge badge-codigo">{item.genero}</span>
          <span className="badge badge-birra">{item.tipoBirra}</span>
        </div>

        <h3 style={{ fontSize: '1.25rem', color: 'var(--tinta)', marginBottom: '0.4rem' }}>
          {item.titulo}
        </h3>

        <div style={{ fontSize: '0.9rem', color: 'var(--suave)', marginBottom: '1rem' }}>
          🎬 <strong>{item.pelicula}</strong> ({item.anio}) · {item.director}
        </div>

        <div style={{
          background: 'var(--crema)',
          borderRadius: 'var(--radio-sm)',
          padding: '0.85rem',
          fontSize: '0.88rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          marginBottom: '1rem'
        }}>
          <p>🍕 <strong style={{ color: 'var(--tinta)' }}>Pizza:</strong> {item.pizza}</p>
          <p>🍺 <strong style={{ color: 'var(--tinta)' }}>Birra:</strong> {item.birra}</p>
        </div>
      </div>

      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--linea)'
        }}>
          <span className="badge badge-albahaca">{item.dificultad}</span>
          <button
            type="button"
            className="btn btn-birra btn-sm"
            onClick={() => onVerDetalle(item)}
          >
            Ver maridaje completo 🔍
          </button>
        </div>
      </div>
    </article>
  );
}

CardMaridaje.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    pelicula: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    anio: PropTypes.number.isRequired,
    genero: PropTypes.string.isRequired,
    pizza: PropTypes.string.isRequired,
    birra: PropTypes.string.isRequired,
    tipoBirra: PropTypes.string.isRequired,
    proyectoCodigo: PropTypes.string.isRequired,
    dificultad: PropTypes.string.isRequired,
    tiempoEstimado: PropTypes.string.isRequired,
    sinopsisMaridaje: PropTypes.string.isRequired
  }).isRequired,
  onVerDetalle: PropTypes.func.isRequired
};
