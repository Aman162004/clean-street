import React, { useEffect, useRef } from 'react';

const HalideLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse Parallax Logic
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      // Rotate the 3D Canvas
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      // Apply depth shift to layers
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance Animation
    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';
    
    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)';
    }, 300);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg: #0a1f3e;
          --silver: #ffffff;
          --accent: #ff9933;
          --grain-opacity: 0.15;
        }

        .halide-body {
          background-color: var(--bg);
          color: var(--silver);
          font-family: 'Syncopate', sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
        }

        .halide-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: var(--grain-opacity);
        }

        .viewport {
          perspective: 2000px;
          width: 100vw; height: 100vh;
          display: flex; align-items: center; justify-content: flex-end;
          padding-right: min(8vw, 140px);
          overflow: hidden;
          pointer-events: none;
        }

        .canvas-3d {
          position: relative;
          width: 1000px; height: 650px;
          max-width: 58vw;
          max-height: 70vh;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: auto;
        }

        .layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.1);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .layer-1 { background-image: url('/Delhi map.png?v=2'); filter: grayscale(1) contrast(1.15) brightness(0.65) sepia(0.25); }
        .layer-2 { background-image: url('/Delhi map.png?v=2'); filter: grayscale(1) contrast(1.1) brightness(0.7); opacity: 0.6; mix-blend-mode: screen; }
        .layer-3 { background-image: url('/Delhi map.png?v=2'); filter: grayscale(1) contrast(1.25) brightness(0.75); opacity: 0.4; mix-blend-mode: overlay; }
        
        .contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.05) 41px, transparent 42px);
          transform: translateZ(120px);
          pointer-events: none;
        }

        .interface-grid {
          position: absolute;
          inset: 0;
          padding: 4rem 4rem 4rem clamp(3rem, 8vw, 6rem);
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto 1fr auto;
          row-gap: 1rem;
          z-index: 10;
          pointer-events: none;
        }

        .hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(3rem, 10vw, 10rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
        }

        .hero-subcopy {
          grid-column: 1 / -1;
          max-width: 48rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: clamp(1rem, 2vw, 1.35rem);
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          letter-spacing: -0.01em;
        }

        .stats-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          font-size: 0.95rem;
          color: #fff;
          backdrop-filter: blur(6px);
        }

        .cta-button {
          pointer-events: auto;
          background: var(--silver);
          color: var(--bg);
          padding: 1rem 2rem;
          text-decoration: none;
          font-weight: 700;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: 0.3s;
          cursor: pointer;
          border: none;
        }

        .cta-button:hover { background: var(--accent); transform: translateY(-5px); }

        .scroll-hint {
          position: absolute;
          bottom: 2rem; left: 50%;
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, var(--silver), transparent);
          animation: flow 2s infinite ease-in-out;
        }

        @keyframes flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>

      <div className="halide-body">
        {/* SVG Filter for Grain */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>

        <div className="halide-grain" style={{ filter: 'url(#grain)' }}></div>

        <div className="interface-grid">
          <div style={{ fontWeight: 700 }}>CLEAN_STREET</div>
          <div style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.7rem' }}>
            <div>LATITUDE: 28.7041° N</div>
            <div>LONGITUDE: 77.1025° E</div>
          </div>

          <h1 className="hero-title">CLEAN<br />DELHI</h1>

          <div className="hero-subcopy">
            A city-wide cleanliness drive powered by real-time issue reporting, volunteer action, and transparent follow-through. Map every pothole, overflow, and dark spot—and watch teams resolve them faster.
          </div>

          <div className="stats-row">
            <div className="stat-pill">⚡ 24/7 reporting</div>
            <div className="stat-pill">🛰️ Map-first workflows</div>
            <div className="stat-pill">🤝 Citizens · Volunteers · Admins</div>
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)' }}>
              <p style={{ margin: 0 }}>[ INITIATIVE 2024 ]</p>
              <p style={{ margin: 0 }}>CIVIC ENGAGEMENT · URBAN MAPPING · LIGHTING & WASTE</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', pointerEvents: 'auto' }}>
              <a href="#report" className="cta-button">REPORT AN ISSUE</a>
              <a href="#" className="cta-button" style={{ background: 'transparent', color: 'var(--silver)', border: '1px solid rgba(255,255,255,0.25)' }}>VIEW LIVE FEED</a>
            </div>
          </div>
        </div>

        <div className="viewport">
          <div className="canvas-3d" ref={canvasRef}>
            <div className="layer layer-1" ref={(el) => (layersRef.current[0] = el!)}></div>
            <div className="layer layer-2" ref={(el) => (layersRef.current[1] = el!)}></div>
            <div className="layer layer-3" ref={(el) => (layersRef.current[2] = el!)}></div>
            <div className="contours"></div>
          </div>
        </div>

        <div className="scroll-hint"></div>
      </div>
    </>
  );
};

export default HalideLanding;
