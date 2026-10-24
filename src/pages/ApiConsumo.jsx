import React, { useState, useEffect, useCallback, useRef } from 'react';
import { integrantes } from '../data/integrantes';

/**
 * Configuración de consulta en iTunes para cada uno de los 12 discos y 12 películas del equipo.
 * Garantiza que cada opción de los menús en cascada consulte únicamente el álbum o banda sonora correspondiente.
 */
const DISCOS_CONFIG = {
  // Florencia
  'Currents': { tipo: 'lookup', id: 1440838039 },
  'Bocanada': { tipo: 'lookup', id: 304792998 },
  'Rumours': { tipo: 'lookup', id: 651871544 },
  // Sonia
  'The Dark Side of the Moon': { tipo: 'lookup', id: 1665303755 },
  'Artaud': { tipo: 'lookup', id: 321645242 },
  'Random Access Memories': { tipo: 'lookup', id: 1673536063 },
  // Eitel
  'Ok Computer': { tipo: 'lookup', id: 1097861387 },
  'Canción Animal': { tipo: 'lookup', id: 321882757 },
  'Ten': { tipo: 'lookup', id: 425465247 },
  // Guillermo
  'The Doors in Concert': { tipo: 'lookup', id: 213622982 },
  'The Rolling Stones Rock and Roll Circus': { tipo: 'lookup', id: 1460293808 },
  'Abbey Road': { tipo: 'lookup', id: 1474833332 }
};

const PELICULAS_CONFIG = {
  // Florencia
  'El Gran Hotel Budapest': { tipo: 'lookup', id: 1440789547 },
  'Amélie': { tipo: 'search', term: 'Yann Tiersen Amelie' },
  'Inception': { tipo: 'lookup', id: 380349905 },
  // Sonia
  'Interstellar': { tipo: 'lookup', id: 1533983552 },
  'Cinema Paradiso': { tipo: 'lookup', id: 830673047 },
  'Whiplash': { tipo: 'lookup', id: 1571408218 },
  // Eitel
  'Matrix': { tipo: 'lookup', id: 1443853659 },
  'Fight Club': {
    tipo: 'queries',
    terms: [
      'Pixies Where Is My Mind',
      'The Dust Brothers Fight Club',
      'Placebo Every You Every Me'
    ]
  },
  'Blade Runner 2049': { tipo: 'lookup', id: 1291056782 },
  // Guillermo
  'Reservoir Dogs': { tipo: 'lookup', id: 1440847276 },
  'Pulp Fiction': { tipo: 'lookup', id: 1469583186 },
  'Kill Bill Vol. 1 & 2': {
    tipo: 'queries',
    terms: [
      'Tomoyasu Hotei Battle Without Honor Or Humanity',
      'Nancy Sinatra Bang Bang My Baby Shot Me Down',
      'Santa Esmeralda Dont Let Me Be Misunderstood',
      'Gheorghe Zamfir The Lonely Shepherd'
    ]
  }
};

function formatDuration(ms) {
  if (!ms) return '0:30';
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

async function fetchSourceTracks(config, maxTracks = 10, fallbackCover = '', origenEtiqueta = '') {
  if (!config) return [];

  if (config.tipo === 'lookup') {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${config.id}&entity=song`);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    const data = await res.json();
    const valid = (data.results || []).filter((r) => r.wrapperType === 'track' && r.previewUrl);
    return valid.slice(0, maxTracks).map((t) => ({
      ...t,
      _coverOverride: fallbackCover,
      _origenNota: origenEtiqueta
    }));
  }

  if (config.tipo === 'queries') {
    const promesas = config.terms.map(async (q) => {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=3`);
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
      const d = await res.json();
      return (d.results || []).filter((t) => t.previewUrl).slice(0, 3);
    });
    const list = await Promise.all(promesas);
    return list.flat().slice(0, maxTracks).map((t) => ({
      ...t,
      _coverOverride: fallbackCover,
      _origenNota: origenEtiqueta
    }));
  }

  const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(config.term)}&entity=song&limit=15`);
  if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
  const data = await res.json();
  let lista = (data.results || []).filter((t) => t.previewUrl);
  if (config.artistFilter) {
    const filtrada = lista.filter((t) =>
      t.artistName.toLowerCase().includes(config.artistFilter.toLowerCase())
    );
    if (filtrada.length > 0) lista = filtrada;
  }
  return lista.slice(0, maxTracks).map((t) => ({
    ...t,
    _coverOverride: fallbackCover,
    _origenNota: origenEtiqueta
  }));
}

export default function ApiConsumo() {
  const [slugIntegrante, setSlugIntegrante] = useState('guillermo-chacon');
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState('');
  const [discoSeleccionado, setDiscoSeleccionado] = useState('todos');

  const [tracks, setTracks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [recargaManual, setRecargaManual] = useState(0);

  const [playingTrackId, setPlayingTrackId] = useState(null);
  const audioRef = useRef(null);

  const miembroActual = integrantes.find((m) => m.slug === slugIntegrante) || integrantes[0];

  const detenerAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingTrackId(null);
  }, []);

  const handleCambiarIntegrante = (e) => {
    setSlugIntegrante(e.target.value);
    setPeliculaSeleccionada('');
    setDiscoSeleccionado('todos');
  };

  const handleCambiarPelicula = (e) => {
    const valor = e.target.value;
    setPeliculaSeleccionada(valor);
    if (valor) {
      setDiscoSeleccionado('');
    } else {
      setDiscoSeleccionado('todos');
    }
  };

  const handleCambiarDisco = (e) => {
    const valor = e.target.value;
    setDiscoSeleccionado(valor);
    if (valor) {
      setPeliculaSeleccionada('');
    }
  };

  const cargarTracks = useCallback(async () => {
    detenerAudio();
    setCargando(true);
    setError(null);

    try {
      // Si hay una película seleccionada en el desplegable de películas del integrante
      if (peliculaSeleccionada) {
        const peliObj = miembroActual.peliculas.find((p) => p.titulo === peliculaSeleccionada);
        const cfg = PELICULAS_CONFIG[peliculaSeleccionada];
        const etiqueta = `🎬 Banda Sonora: ${peliculaSeleccionada} (${miembroActual.nombre.split(' ')[0]})`;
        const resultado = await fetchSourceTracks(cfg, 10, '', etiqueta);
        setTracks(resultado.map((t) => ({ ...t, _posterPelicula: peliObj?.poster || '' })));
        return;
      }

      // Si está elegido un disco específico del integrante
      if (discoSeleccionado && discoSeleccionado !== 'todos') {
        const discoObj = miembroActual.discos.find((d) => d.titulo === discoSeleccionado);
        const cfg = DISCOS_CONFIG[discoSeleccionado];
        const etiqueta = `💿 Disco: ${discoSeleccionado} — ${discoObj?.artista || ''}`;
        const resultado = await fetchSourceTracks(cfg, 10, discoObj?.portada || '', etiqueta);
        setTracks(resultado);
        return;
      }

      // Por defecto: trae los 3 discos favoritos del integrante seleccionado (4 temas por disco)
      const promesas = miembroActual.discos.map((disco) => {
        const cfg = DISCOS_CONFIG[disco.titulo];
        const etiqueta = `💿 ${disco.titulo} — ${disco.artista}`;
        return fetchSourceTracks(cfg, 4, disco.portada || '', etiqueta);
      });

      const grupos = await Promise.all(promesas);
      setTracks(grupos.flat());
    } catch (err) {
      setError(err.message || 'No se pudo completar la consulta en este momento.');
    } finally {
      setCargando(false);
    }
  }, [miembroActual, peliculaSeleccionada, discoSeleccionado, recargaManual, detenerAudio]);

  useEffect(() => {
    cargarTracks();
    return () => detenerAudio();
  }, [cargarTracks, detenerAudio]);

  const handleToggleAudio = (trackId, previewUrl) => {
    if (!audioRef.current || !previewUrl) return;

    if (playingTrackId === trackId) {
      audioRef.current.pause();
      setPlayingTrackId(null);
    } else {
      audioRef.current.src = previewUrl;
      audioRef.current.volume = 0.75;
      audioRef.current.play().catch(() => {
        setPlayingTrackId(null);
      });
      setPlayingTrackId(trackId);
    }
  };

  const resumenSeleccion = peliculaSeleccionada
    ? `Banda sonora de "${peliculaSeleccionada}" · Perfil de ${miembroActual.nombre}`
    : discoSeleccionado === 'todos'
      ? `Los 3 discos favoritos de ${miembroActual.nombre}`
      : `Disco "${discoSeleccionado}" · Perfil de ${miembroActual.nombre}`;

  return (
    <div className="api-page">
      <div style={{ marginBottom: '2rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Fonoteca y Bandas Sonoras
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.6rem' }}>
          Discos y Películas del Equipo
        </h1>
        <p style={{ color: 'var(--suave)', fontSize: '1.02rem', maxWidth: '720px' }}>
          Seleccioná un integrante del grupo para explorar las canciones de sus tres discos favoritos
          o la banda sonora de sus tres películas elegidas.
        </p>
      </div>

      <section style={{
        background: 'var(--papel)',
        border: '1px solid var(--linea)',
        borderRadius: 'var(--radio)',
        padding: '1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.15rem',
        boxShadow: 'var(--sombra)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div>
            <label htmlFor="select-integrante" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--texto-fuerte)', marginBottom: '0.35rem' }}>
              1. Integrante del equipo:
            </label>
            <select
              id="select-integrante"
              value={slugIntegrante}
              onChange={handleCambiarIntegrante}
              disabled={cargando}
              style={{
                width: '100%',
                padding: '0.68rem 0.95rem',
                borderRadius: 'var(--radio-sm)',
                border: '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              {integrantes.map((m) => (
                <option key={m.slug} value={m.slug}>{m.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="select-disco" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--texto-fuerte)', marginBottom: '0.35rem' }}>
              2. Discos de {miembroActual.nombre.split(' ')[0]}:
            </label>
            <select
              id="select-disco"
              value={discoSeleccionado}
              onChange={handleCambiarDisco}
              disabled={cargando}
              style={{
                width: '100%',
                padding: '0.68rem 0.95rem',
                borderRadius: 'var(--radio-sm)',
                border: discoSeleccionado ? '2px solid var(--birra)' : '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              <option value="">— Seleccionar disco —</option>
              <option value="todos">💿 Todos sus discos (3)</option>
              {miembroActual.discos.map((d) => (
                <option key={d.titulo} value={d.titulo}>
                  💿 {d.titulo} — {d.artista} ({d.anio})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="select-pelicula" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--texto-fuerte)', marginBottom: '0.35rem' }}>
              3. Películas de {miembroActual.nombre.split(' ')[0]} (Soundtrack):
            </label>
            <select
              id="select-pelicula"
              value={peliculaSeleccionada}
              onChange={handleCambiarPelicula}
              disabled={cargando}
              style={{
                width: '100%',
                padding: '0.68rem 0.95rem',
                borderRadius: 'var(--radio-sm)',
                border: peliculaSeleccionada ? '2px solid var(--birra)' : '1px solid var(--linea)',
                background: 'var(--crema)',
                fontFamily: 'var(--fuente-texto)',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              <option value="">— Seleccionar película —</option>
              {miembroActual.peliculas.map((p) => (
                <option key={p.titulo} value={p.titulo}>
                  🎬 {p.titulo} ({p.anio})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          borderTop: '1px solid var(--linea)',
          paddingTop: '0.85rem'
        }}>
          <span style={{ fontSize: '0.86rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
            Mostrando: <strong style={{ color: 'var(--tinta)' }}>{resumenSeleccion}</strong>
          </span>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-birra btn-sm"
              onClick={() => setRecargaManual((prev) => prev + 1)}
              disabled={cargando}
            >
              {cargando ? 'Cargando...' : '🔄 Actualizar'}
            </button>
          </div>
        </div>
      </section>

      {cargando && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--papel)',
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio)',
          boxShadow: 'var(--sombra)'
        }}>
          <div style={{
            fontSize: '3rem',
            animation: 'spin 1.2s infinite linear',
            display: 'inline-block',
            marginBottom: '1rem'
          }}>
            💿
          </div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--tinta)', marginBottom: '0.35rem' }}>
            Cargando pistas y portadas...
          </h3>
          <p style={{ color: 'var(--suave)', fontSize: '0.95rem' }}>
            {resumenSeleccion}
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {!cargando && error && (
        <div style={{
          background: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: 'var(--radio)',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: '#991b1b',
          boxShadow: 'var(--sombra)'
        }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❌⚠️</p>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'inherit' }}>Ocurrió un error en la consulta</h3>
          <p style={{ maxWidth: '580px', margin: '0 auto 1.5rem', fontSize: '0.95rem', color: '#7f1d1d' }}>
            {error}
          </p>
          <button
            type="button"
            className="btn"
            onClick={cargarTracks}
            style={{ background: '#b91c1c' }}
          >
            🔁 Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && (
        <div className="breweries-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.4rem'
        }}>
          {tracks.map((track) => {
            const isPlaying = playingTrackId === track.trackId;
            const coverImg =
              track._coverOverride ||
              (track.artworkUrl100 ? track.artworkUrl100.replace('100x100bb', '300x300bb') : '');
            const anio = track.releaseDate ? new Date(track.releaseDate).getFullYear() : '';

            return (
              <article
                key={`${track.trackId}-${track.collectionId}`}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.35rem',
                  border: isPlaying ? '2px solid var(--birra)' : undefined
                }}
              >
                <div>
                  {track._origenNota && (
                    <div style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--fuente-codigo)',
                      color: 'var(--acento-codigo)',
                      marginBottom: '0.55rem',
                      fontWeight: 600
                    }}>
                      {track._origenNota}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                    {coverImg && (
                      <div className={`album-cover-wrap ${isPlaying ? 'is-playing' : ''}`} style={{ width: '76px', height: '76px' }}>
                        <img
                          src={coverImg}
                          alt={`Portada de ${track.collectionName || track.trackName}`}
                          className="album-cover-img"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                        <span className="badge badge-birra" style={{ fontSize: '0.68rem' }}>
                          {track.primaryGenreName || 'Música'}
                        </span>
                        {anio && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--suave)', fontFamily: 'var(--fuente-codigo)' }}>
                            {anio}
                          </span>
                        )}
                      </div>

                      <h3 style={{
                        fontSize: '1.08rem',
                        color: 'var(--tinta)',
                        marginBottom: '0.2rem',
                        lineHeight: 1.25
                      }}>
                        {track.trackName}
                      </h3>

                      <p style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--acento)' }}>
                        {track.artistName}
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.83rem', color: 'var(--suave)', marginBottom: '0.85rem' }}>
                    💿 <strong>Álbum:</strong> {track.collectionName || 'Single'} · ⏱ {formatDuration(track.trackTimeMillis)}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px dashed var(--linea)',
                  paddingTop: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.6rem',
                  flexWrap: 'wrap'
                }}>
                  {track.previewUrl ? (
                    <button
                      type="button"
                      className={`media-action-btn ${isPlaying ? 'is-playing' : ''}`}
                      style={{ marginTop: 0 }}
                      onClick={() => handleToggleAudio(track.trackId, track.previewUrl)}
                    >
                      <span>{isPlaying ? '⏸' : '▶'}</span>
                      <span>{isPlaying ? 'Pausar (30s)' : 'Escuchar (30s)'}</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: 'var(--suave)', fontStyle: 'italic' }}>
                      Sin preview
                    </span>
                  )}

                  {track.trackViewUrl && (
                    <a
                      href={track.trackViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.78rem', fontFamily: 'var(--fuente-codigo)', fontWeight: 600 }}
                    >
                      Ver en iTunes ↗
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        style={{ display: 'none' }}
      />
    </div>
  );
}
