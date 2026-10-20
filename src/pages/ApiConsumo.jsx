import React, { useState, useEffect, useCallback, useRef } from 'react';

const COLECCIONES_EQUIPO = [
  {
    id: 'soundtracks',
    etiqueta: '🎬 Bandas Sonoras de Películas (Inception, Interstellar, Pulp Fiction)',
    query: 'Hans Zimmer Interstellar Inception Soundtrack'
  },
  {
    id: 'guillermo',
    etiqueta: '⚡ Selección Guillermo (Soda Stereo · AC/DC · Guns N Roses)',
    query: 'Soda Stereo Cancion Animal'
  },
  {
    id: 'florencia',
    etiqueta: '🎸 Selección Florencia (Gustavo Cerati · Tame Impala · Fleetwood Mac)',
    query: 'Gustavo Cerati Bocanada'
  },
  {
    id: 'sonia',
    etiqueta: '🎹 Selección Sonia (Spinetta · Pink Floyd · Daft Punk)',
    query: 'Pink Floyd Dark Side of the Moon'
  },
  {
    id: 'eitel',
    etiqueta: '🤘 Selección Eitel (Patricio Rey · La Renga · Metallica)',
    query: 'Metallica Master of Puppets'
  },
  {
    id: 'esteban',
    etiqueta: '🎷 Selección Esteban (Charly García · Radiohead · Miles Davis)',
    query: 'Charly Garcia Clics Modernos'
  }
];

function formatDuration(ms) {
  if (!ms) return '0:30';
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = String(totalSec % 60).padStart(2, '0');
  return `${min}:${sec}`;
}

export default function ApiConsumo() {
  const [tracks, setTracks] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [coleccionActiva, setColeccionActiva] = useState(COLECCIONES_EQUIPO[0].id);
  const [terminoBusqueda, setTerminoBusqueda] = useState(COLECCIONES_EQUIPO[0].query);
  const [inputBusqueda, setInputBusqueda] = useState('');
  const [recargaManual, setRecargaManual] = useState(0);

  // Control de reproducción de previews de 30s mediante una única instancia de <audio>
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const audioRef = useRef(null);

  const detenerAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingTrackId(null);
  }, []);

  const fetchMediaTracks = useCallback(async () => {
    detenerAudio();
    setCargando(true);
    setError(null);

    try {
      const encoded = encodeURIComponent(terminoBusqueda.trim() || 'Rock Nacional Argentino');
      const url = `https://itunes.apple.com/search?term=${encoded}&entity=song&limit=12`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error en el servidor: HTTP ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setTracks(data.results || []);
    } catch (err) {
      setError(err.message || 'Error desconocido al conectar con la API pública de Apple iTunes.');
    } finally {
      setCargando(false);
    }
  }, [terminoBusqueda, recargaManual, detenerAudio]);

  useEffect(() => {
    fetchMediaTracks();
    return () => detenerAudio();
  }, [fetchMediaTracks, detenerAudio]);

  const handleSelectColeccion = (e) => {
    const id = e.target.value;
    setColeccionActiva(id);
    const encontrada = COLECCIONES_EQUIPO.find((c) => c.id === id);
    if (encontrada) {
      setInputBusqueda('');
      setTerminoBusqueda(encontrada.query);
    }
  };

  const handleSubmitBusqueda = (e) => {
    e.preventDefault();
    if (!inputBusqueda.trim()) return;
    setColeccionActiva('custom');
    setTerminoBusqueda(inputBusqueda.trim());
  };

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

  // Permite simular una caída de red para verificar la interfaz de contingencia y reintento
  const forzarErrorPrueba = () => {
    detenerAudio();
    setCargando(true);
    setTimeout(() => {
      setError('Error simulado de red (HTTP 503 Service Unavailable) para verificar el estado de error y la recuperación.');
      setCargando(false);
    }, 400);
  };

  return (
    <div className="api-page">
      <div style={{ marginBottom: '2.25rem' }}>
        <span style={{
          fontFamily: 'var(--fuente-codigo)',
          fontSize: '0.8rem',
          color: 'var(--tomate)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          API Pública Externa · Apple iTunes Search API (REST JSON)
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', margin: '0.2rem 0 0.8rem' }}>
          Explorador en Vivo: Discos y Bandas Sonoras
        </h1>
        <div style={{
          background: 'var(--crema)',
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio)',
          padding: '1.25rem 1.5rem',
          maxWidth: '880px',
          boxShadow: 'var(--sombra)'
        }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--tinta-2)', lineHeight: 1.5 }}>
            <strong>¿Qué información aporta esta API?</strong> Conecta en tiempo real con la API pública{' '}
            <a
              href="https://performance-partners.apple.com/search-api"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 600 }}
            >
              Apple iTunes Search
            </a>{' '}
            (gratuita y sin claves privadas) para consultar los discos favoritos del equipo, bandas sonoras de películas
            y cualquier artista, obteniendo portadas en alta definición, metadatos del álbum y fragmentos de audio
            reales de 30 segundos.
          </p>
        </div>
      </div>

      {/* PANEL DE CONTROL Y BUSCADOR EN VIVO */}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          alignItems: 'end'
        }}>
          <div>
            <label htmlFor="select-coleccion" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--tinta-2)', marginBottom: '0.35rem' }}>
              💿 Colecciones recomendadas por el equipo:
            </label>
            <select
              id="select-coleccion"
              value={coleccionActiva}
              onChange={handleSelectColeccion}
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
              {COLECCIONES_EQUIPO.map((c) => (
                <option key={c.id} value={c.id}>{c.etiqueta}</option>
              ))}
              {coleccionActiva === 'custom' && (
                <option value="custom">🔎 Búsqueda personalizada: "{terminoBusqueda}"</option>
              )}
            </select>
          </div>

          <form onSubmit={handleSubmitBusqueda} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="input-api-search" style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: 'var(--tinta-2)', marginBottom: '0.35rem' }}>
                🔍 Buscar artista, disco o película en la API:
              </label>
              <input
                id="input-api-search"
                type="text"
                value={inputBusqueda}
                onChange={(e) => setInputBusqueda(e.target.value)}
                placeholder="Ej: Pulp Fiction, Ennio Morricone, Divididos..."
                style={{
                  width: '100%',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radio-sm)',
                  border: '1px solid var(--linea)',
                  background: 'var(--crema)',
                  fontFamily: 'var(--fuente-texto)',
                  fontSize: '0.92rem'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-birra btn-sm"
              disabled={cargando || !inputBusqueda.trim()}
              style={{ height: '41px', flexShrink: 0 }}
            >
              Buscar
            </button>
          </form>
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
            Consulta activa: <strong style={{ color: 'var(--tinta)' }}>"{terminoBusqueda}"</strong>
          </span>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-birra btn-sm"
              onClick={() => setRecargaManual((prev) => prev + 1)}
              disabled={cargando}
            >
              {cargando ? 'Consultando...' : '🔄 Actualizar / Refrescar'}
            </button>

            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={forzarErrorPrueba}
              disabled={cargando}
              title="Simular fallo de red para comprobar el renderizado del estado de error"
            >
              ⚠️ Simular Error
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
            Consultando catálogo de Apple iTunes en tiempo real...
          </h3>
          <p style={{ color: 'var(--suave)', fontSize: '0.95rem' }}>
            Descargando portadas y pistas de vista previa para <strong>"{terminoBusqueda}"</strong>.
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
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Ocurrió un error en la consulta</h3>
          <p style={{ maxWidth: '580px', margin: '0 auto 1.5rem', fontSize: '0.95rem', color: '#7f1d1d' }}>
            {error}
          </p>
          <button
            type="button"
            className="btn"
            onClick={fetchMediaTracks}
            style={{ background: '#b91c1c' }}
          >
            🔁 Reintentar consulta a la API
          </button>
        </div>
      )}

      {!cargando && !error && (
        <>
          <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginBottom: '1rem' }}>
            Se encontraron <strong>{tracks.length}</strong> pistas y discos disponibles con vista previa de audio:
          </p>

          {tracks.length > 0 ? (
            <div className="breweries-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '1.4rem'
            }}>
              {tracks.map((track) => {
                const isPlaying = playingTrackId === track.trackId;
                const highResCover = track.artworkUrl100
                  ? track.artworkUrl100.replace('100x100bb', '300x300bb')
                  : '';
                const anio = track.releaseDate ? new Date(track.releaseDate).getFullYear() : '';

                return (
                  <article
                    key={track.trackId}
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
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                        {highResCover && (
                          <div className={`album-cover-wrap ${isPlaying ? 'is-playing' : ''}`} style={{ width: '76px', height: '76px' }}>
                            <img
                              src={highResCover}
                              alt={`Portada de ${track.collectionName || track.trackName}`}
                              className="album-cover-img"
                              loading="lazy"
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
                            fontSize: '1.1rem',
                            color: 'var(--tinta)',
                            marginBottom: '0.2rem',
                            lineHeight: 1.25
                          }}>
                            {track.trackName}
                          </h3>

                          <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--tomate-oscuro)' }}>
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
                          Ficha iTunes ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div style={{
              background: 'var(--papel)',
              border: '2px dashed var(--linea)',
              borderRadius: 'var(--radio)',
              padding: '3rem 1.5rem',
              textAlign: 'center',
              color: 'var(--suave)'
            }}>
              No se encontraron discos o canciones para "{terminoBusqueda}". Probá con otro artista o película.
            </div>
          )}
        </>
      )}

      <audio
        ref={audioRef}
        onEnded={() => setPlayingTrackId(null)}
        style={{ display: 'none' }}
      />
    </div>
  );
}
