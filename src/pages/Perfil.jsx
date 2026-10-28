import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { integrantes } from '../data/integrantes';
import TrailerModal from '../components/TrailerModal';

const frasesGuillermo = [
  "¡Marchando una grande de muzzarella y dos birras bien frías! 🍕🍺",
  "¡Segunda vuelta! La mesa del equipo agradece 🙌",
  "¡Pinta IPA y fainá recién horneada en camino! 🍻🍕",
  "¡Cine, pizza, birra y código para todo el grupo! 🎬🍕",
  "¡Ronda servida con honores de la casa! 🍕🍻"
];

const notasDiscosSonia = {
  0: "Grabado en Abbey Road con un prisma legendario. La transición entre 'Time' y 'The Great Gig in the Sky' es pura alquimia sonora.",
  1: "Obra cumbre de Spinetta, grabada casi en solitario a pesar del crédito de Pescado Rabioso. 'Cantata de puentes amarillos' es poesía pura.",
  2: "Homenaje a la música disco de fines de los 70 y principios de los 80, grabado con sintetizadores analógicos y músicos en vivo en París y Los Ángeles."
};

const frasesEitel = [
  "El equipo avanza cuando nadie se queda solo con el problema.",
  "Probar, equivocarse y documentar también es trabajo en equipo.",
  "La resiliencia se nota en el siguiente commit, no en el primero.",
  "Un buen refactor deja el código mejor de lo que lo encontramos."
];

export default function Perfil() {
  const { slug } = useParams();
  const currentIndex = integrantes.findIndex((m) => m.slug === slug);

  const [trailerPelicula, setTrailerPelicula] = useState(null);
  const [playingAlbumIdx, setPlayingAlbumIdx] = useState(null);
  // Se utiliza una única referencia de <audio> para evitar múltiples pistas superpuestas
  const audioRef = useRef(null);

  // Estados de interacción propios de cada perfil (declarados en el tope respetando Rules of Hooks)
  const [guilleRondas, setGuilleRondas] = useState(0);
  const [guilleMensaje, setGuilleMensaje] = useState("Llená la pantalla de pizza y birra.");
  const [guillePopEmojis, setGuillePopEmojis] = useState([]);
  const [guilleLluviaEmojis, setGuilleLluviaEmojis] = useState([]);
  const [florenciaSelectedMovie, setFlorenciaSelectedMovie] = useState(null);
  const [soniaActiveAlbum, setSoniaActiveAlbum] = useState(null);
  const [eitelFrase, setEitelFrase] = useState(frasesEitel[0]);

  // Limpia modales abiertos y detiene la reproducción activa al navegar a otro perfil
  useEffect(() => {
    setTrailerPelicula(null);
    setPlayingAlbumIdx(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [slug]);

  if (currentIndex === -1) {
    return <Navigate to="/" replace />;
  }

  const miembro = integrantes[currentIndex];
  const prevMiembro = integrantes[(currentIndex - 1 + integrantes.length) % integrantes.length];
  const nextMiembro = integrantes[(currentIndex + 1) % integrantes.length];

  const handleOpenTrailer = (peli) => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingAlbumIdx(null);
    }
    setTrailerPelicula(peli);
  };

  const handleToggleAudio = (index, previewUrl) => {
    if (!audioRef.current || !previewUrl) return;

    if (playingAlbumIdx === index) {
      audioRef.current.pause();
      setPlayingAlbumIdx(null);
    } else {
      audioRef.current.src = previewUrl;
      audioRef.current.volume = 0.75;
      audioRef.current.play().catch(() => {
        setPlayingAlbumIdx(null);
      });
      setPlayingAlbumIdx(index);
    }
  };

  const triggerGuillermoAction = (e) => {
    setGuilleRondas(prev => prev + 1);
    setGuilleMensaje(frasesGuillermo[Math.floor(Math.random() * frasesGuillermo.length)]);

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(40);
    }

    // Calcula el centro exacto del botón en el viewport para emitir partículas desde su origen
    const rect = e.currentTarget.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;

    const emojis = ["🍕", "🍺", "🍻", "🍕"];
    const nuevosPops = [];
    for (let i = 0; i < 6; i++) {
      nuevosPops.push({
        id: Date.now() + i,
        emoji: emojis[i % emojis.length],
        x: centroX,
        y: centroY,
        offsetX: (Math.random() - 0.5) * 160,
        offsetY: -(Math.random() * 80 + 40),
        rot: (Math.random() - 0.5) * 60
      });
    }
    setGuillePopEmojis(nuevosPops);
    setTimeout(() => setGuillePopEmojis([]), 1300);

    const nuevaLluvia = [];
    for (let j = 0; j < 16; j++) {
      nuevaLluvia.push({
        id: Date.now() + j + 20,
        emoji: emojis[j % emojis.length],
        left: Math.random() * 92,
        delay: Math.random() * 0.5
      });
    }
    setGuilleLluviaEmojis(nuevaLluvia);
    setTimeout(() => setGuilleLluviaEmojis([]), 2500);
  };

  const triggerFlorenciaAction = () => {
    const randomIndex = Math.floor(Math.random() * miembro.peliculas.length);
    setFlorenciaSelectedMovie(randomIndex);
  };

  const triggerSoniaAction = () => {
    setSoniaActiveAlbum(prev => (prev === null ? 0 : (prev + 1) % 3));
  };

  const triggerEitelAction = () => {
    setEitelFrase(prev => {
      let siguiente = frasesEitel[Math.floor(Math.random() * frasesEitel.length)];
      while (siguiente === prev && frasesEitel.length > 1) {
        siguiente = frasesEitel[Math.floor(Math.random() * frasesEitel.length)];
      }
      return siguiente;
    });
  };

  return (
    <div className="perfil-page" style={{ maxWidth: '960px', margin: '0 auto' }}>
      <article className="card" style={{ padding: 'clamp(1.5rem, 4vw, 2.75rem)', marginBottom: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'start',
          marginBottom: '2.5rem'
        }}>
          <div style={{
            aspectRatio: '4 / 5',
            borderRadius: 'var(--radio)',
            overflow: 'hidden',
            background: 'var(--tinta-2)',
            boxShadow: 'var(--sombra-alta)',
            border: '1px solid var(--linea)'
          }}>
            <img
              src={miembro.avatar}
              alt={miembro.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <span style={{
              fontFamily: 'var(--fuente-codigo)',
              fontSize: '0.8rem',
              color: 'var(--tomate)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Perfil del equipo
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', margin: '0.3rem 0 1rem', color: 'var(--tinta)' }}>
              {miembro.nombre}
            </h1>

            <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              <dt style={{ fontWeight: 600, color: 'var(--suave)' }}>Ciudad:</dt>
              <dd style={{ color: 'var(--tinta)' }}>{miembro.ciudad}</dd>
              <dt style={{ fontWeight: 600, color: 'var(--suave)' }}>Edad:</dt>
              <dd style={{ color: 'var(--tinta)' }}>{miembro.edad}</dd>
              <dt style={{ fontWeight: 600, color: 'var(--suave)' }}>GitHub:</dt>
              <dd>
                <a href={miembro.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                  @{miembro.github}
                </a>
              </dd>
              <dt style={{ fontWeight: 600, color: 'var(--suave)' }}>PFO1:</dt>
              <dd>
                <a href={miembro.pfo1Url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.88rem' }}>
                  Ver portfolio individual ↗
                </a>
              </dd>
            </dl>

            <p style={{ fontStyle: 'italic', color: 'var(--suave)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              "{miembro.frase}"
            </p>

            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--texto-fuerte)', marginBottom: '0.5rem', fontFamily: 'var(--fuente-codigo)' }}>
              Habilidades destacadas:
            </h4>
            <div className="chip-row">
              {miembro.habilidades.map((hab, idx) => (
                <span key={idx} className="chip">{hab}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(295px, 1fr))',
          gap: '2rem',
          borderTop: '1px solid var(--linea)',
          paddingTop: '2rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--tinta)' }}>
                <span>🎬</span> Películas favoritas
              </h2>
              <span style={{ fontSize: '0.73rem', fontFamily: 'var(--fuente-codigo)', color: 'var(--suave)' }}>
                Clic en póster para tráiler
              </span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {miembro.peliculas.map((peli, index) => {
                const isHighlighted = miembro.slug === 'florencia-guzman' && florenciaSelectedMovie === index;
                return (
                  <li
                    key={index}
                    className="media-item-card"
                    style={{
                      background: isHighlighted ? 'rgba(232, 167, 43, 0.25)' : 'var(--crema)',
                      border: isHighlighted ? '2px solid var(--birra)' : '1px solid var(--linea)',
                      boxShadow: isHighlighted ? '0 0 12px rgba(232, 167, 43, 0.4)' : undefined
                    }}
                  >
                    {peli.poster && (
                      <button
                        type="button"
                        className="poster-thumb-btn"
                        onClick={() => handleOpenTrailer(peli)}
                        title={`Ver tráiler oficial de ${peli.titulo}`}
                        aria-label={`Ver tráiler oficial de ${peli.titulo}`}
                      >
                        <img
                          src={peli.poster}
                          alt={`Póster de ${peli.titulo}`}
                          className="poster-thumb-img"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                        <span className="poster-play-overlay" aria-hidden="true">▶</span>
                      </button>
                    )}

                    <div className="media-item-body">
                      <strong style={{ display: 'block', color: 'var(--tinta)', fontSize: '0.96rem', lineHeight: 1.25 }}>
                        0{index + 1}. {peli.titulo}
                      </strong>
                      <div style={{ fontSize: '0.83rem', color: 'var(--suave)', marginTop: '0.15rem' }}>
                        Dir. {peli.director} ({peli.anio})
                      </div>
                      {peli.youtubeId && (
                        <button
                          type="button"
                          className="media-action-btn"
                          onClick={() => handleOpenTrailer(peli)}
                        >
                          <span>🎬</span> Ver Tráiler Oficial
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--tinta)' }}>
                <span>🎵</span> Discos favoritos
              </h2>
              <span style={{ fontSize: '0.73rem', fontFamily: 'var(--fuente-codigo)', color: 'var(--suave)' }}>
                Preview de audio (30s)
              </span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {miembro.discos.map((disco, index) => {
                const isOpen = miembro.slug === 'sonia-andrada' && soniaActiveAlbum === index;
                const isPlaying = playingAlbumIdx === index;
                return (
                  <li
                    key={index}
                    className="media-item-card"
                    style={{
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      background: isOpen ? 'rgba(43, 111, 143, 0.22)' : 'var(--crema)',
                      border: isOpen
                        ? '1px solid var(--codigo)'
                        : isPlaying
                          ? '1px solid var(--birra)'
                          : '1px solid var(--linea)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                      {disco.portada && (
                        <div className={`album-cover-wrap ${isPlaying ? 'is-playing' : ''}`}>
                          <img
                            src={disco.portada}
                            alt={`Portada de ${disco.titulo}`}
                            className="album-cover-img"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      <div className="media-item-body">
                        <strong style={{ display: 'block', color: 'var(--tinta)', fontSize: '0.96rem', lineHeight: 1.25 }}>
                          0{index + 1}. {disco.titulo}
                        </strong>
                        <div style={{ fontSize: '0.83rem', color: 'var(--suave)', marginTop: '0.15rem' }}>
                          {disco.artista} ({disco.anio})
                        </div>
                        {disco.previewUrl && (
                          <button
                            type="button"
                            className={`media-action-btn ${isPlaying ? 'is-playing' : ''}`}
                            onClick={() => handleToggleAudio(index, disco.previewUrl)}
                          >
                            <span>{isPlaying ? '⏸' : '▶'}</span>
                            <span>{isPlaying ? `Pausar "${disco.cancion}"` : `Escuchar "${disco.cancion}" (30s)`}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {isOpen && (
                      <div style={{
                        marginTop: '0.5rem',
                        paddingTop: '0.5rem',
                        borderTop: '1px dashed rgba(43, 111, 143, 0.4)',
                        fontSize: '0.84rem',
                        color: 'var(--acento-codigo)'
                      }}>
                        💡 <em>{notasDiscosSonia[index]}</em>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div style={{
          background: 'var(--crema)',
          border: '1px solid var(--linea)',
          borderRadius: 'var(--radio-sm)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          {miembro.slug === 'guillermo-chacon' && (
            <div>
              <p style={{ fontWeight: 600, color: 'var(--acento)', marginBottom: '0.5rem' }}>
                🍕🍻 Rondas de pizza y birra invitadas: <strong style={{
                  background: 'var(--birra)',
                  color: 'var(--sobre-birra)',
                  padding: '0.15rem 0.6rem',
                  borderRadius: '0.4rem',
                  fontFamily: 'var(--fuente-codigo)',
                  fontSize: '1.1rem'
                }}>{guilleRondas}</strong>
              </p>
              <button
                type="button"
                className="btn"
                onClick={triggerGuillermoAction}
                style={{ margin: '0.5rem auto' }}
              >
                Invitar pizza y birra 🍕🍺
              </button>
              <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginTop: '0.4rem' }}>
                {guilleMensaje}
              </p>
            </div>
          )}

          {miembro.slug === 'florencia-guzman' && (
            <div>
              <button type="button" className="btn" onClick={triggerFlorenciaAction}>
                Elegir película de la noche 🎬
              </button>
              <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginTop: '0.5rem' }}>
                Resalta al azar una de las tres películas de la cartelera de Florencia.
              </p>
            </div>
          )}

          {miembro.slug === 'sonia-andrada' && (
            <div>
              <button type="button" className="btn btn-birra" onClick={triggerSoniaAction}>
                {soniaActiveAlbum !== null ? "Siguiente nota de disco 🎵" : "Descubrir nota de disco 🎵"}
              </button>
              <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginTop: '0.5rem' }}>
                Despliega anécdotas y detalles curiosos sobre sus tres álbumes predilectos.
              </p>
            </div>
          )}

          {miembro.slug === 'eitel-belinzoni' && (
            <div>
              <blockquote style={{
                fontStyle: 'italic',
                color: 'var(--texto-fuerte)',
                fontWeight: 600,
                fontSize: '1.05rem',
                marginBottom: '0.85rem'
              }}>
                "{eitelFrase}"
              </blockquote>
              <button type="button" className="btn" onClick={triggerEitelAction}>
                Girar frase de equipo 🔄
              </button>
              <p style={{ fontSize: '0.9rem', color: 'var(--suave)', marginTop: '0.4rem' }}>
                Reflexiones sobre perseverancia, código colaborativo y resolución de problemas.
              </p>
            </div>
          )}
        </div>
      </article>

      <aside className="card" style={{ padding: '1.5rem', background: 'var(--papel)' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>Recorrido del equipo</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--suave)', marginBottom: '1rem' }}>
          Seguí conociendo a los demás integrantes del grupo.
        </p>

        <nav aria-label="Navegación entre integrantes" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link to="/" className="btn btn-ghost btn-sm">
            Portada
          </Link>
          <Link to={`/perfil/${prevMiembro.slug}`} className="btn btn-prev btn-sm">
            ← Anterior: {prevMiembro.nombre.split(' ')[0]}
          </Link>
          <Link to={`/perfil/${nextMiembro.slug}`} className="btn btn-next btn-sm">
            Siguiente: {nextMiembro.nombre.split(' ')[0]} →
          </Link>
          <Link to="/catalogo" className="btn btn-ghost btn-sm">
            Catálogo
          </Link>
          <Link to="/bitacora" className="btn btn-ghost btn-sm">
            Bitácora
          </Link>
        </nav>
      </aside>

      {guillePopEmojis.map((pop) => (
        <span
          key={pop.id}
          className="emoji-pop"
          style={{
            left: `${pop.x}px`,
            top: `${pop.y}px`,
            '--pop-x': `${pop.offsetX}px`,
            '--pop-y': `${pop.offsetY}px`,
            '--pop-rot': `${pop.rot}deg`
          }}
          aria-hidden="true"
        >
          {pop.emoji}
        </span>
      ))}

      {guilleLluviaEmojis.map((copo) => (
        <span
          key={copo.id}
          className="lluvia-emoji"
          style={{
            left: `${copo.left}vw`,
            animationDelay: `${copo.delay}s`
          }}
          aria-hidden="true"
        >
          {copo.emoji}
        </span>
      ))}

      <audio
        ref={audioRef}
        onEnded={() => setPlayingAlbumIdx(null)}
        style={{ display: 'none' }}
      />

      <TrailerModal
        pelicula={trailerPelicula}
        onClose={() => setTrailerPelicula(null)}
      />
    </div>
  );
}
