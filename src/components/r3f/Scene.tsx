import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CylinderGrid } from './CylinderGrid';
import type { Work } from '../../data/works';

interface WorkCardProps {
  work: Work;
}

function WorkCard({ work }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);

  const getLinkIcon = (linkType?: string) => {
    switch (linkType) {
      case 'github':
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'huggingface':
        return (
          <svg width="13" height="13" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 95C25.1 95 5 74.9 5 50S25.1 5 50 5s45 20.1 45 45-20.1 45-45 45z" />
            <circle cx="35" cy="40" r="8" />
            <circle cx="65" cy="40" r="8" />
            <path d="M70 60c0 11-9 20-20 20s-20-9-20-20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        );
      default:
        return (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        );
    }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        if (work.link) window.open(work.link, '_blank', 'noopener,noreferrer');
      }}
      style={{
        cursor: work.link ? 'pointer' : 'default',
        transition: 'transform 0.2s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* サムネイル */}
      <div
        style={{
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          borderRadius: '6px',
          backgroundColor: '#e4e4e4',
          boxShadow: hovered
            ? '0 8px 24px rgba(0,0,0,0.13)'
            : '0 2px 8px rgba(0,0,0,0.07)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {work.thumbnailUrl ? (
          <img
            src={work.thumbnailUrl}
            alt={work.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ebebeb',
              padding: '1rem',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.75rem, 1.5vw, 0.95rem)',
                fontWeight: 600,
                color: '#1a1a1a',
                textAlign: 'center',
                letterSpacing: '-0.01em',
              }}
            >
              {work.title}
            </span>
            <span style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.4rem' }}>
              {work.year}
            </span>
          </div>
        )}
      </div>

      {/* カード下部テキスト */}
      <div style={{ marginTop: '0.55rem', paddingLeft: '0.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#1a1a1a',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            {work.title}
          </span>
          {work.link && (
            <span style={{ color: '#999', flexShrink: 0, lineHeight: 1 }}>
              {getLinkIcon(work.linkType)}
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.75rem', color: '#666', margin: 0, lineHeight: 1.5 }}>
          {work.shortDescription}
        </p>
      </div>
    </div>
  );
}

interface SceneProps {
  works: Work[];
}

export function Scene({ works }: SceneProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        fontFamily: "'Space Grotesk', 'Noto Sans JP', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* R3F 背景キャンバス */}
      <Canvas
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <color attach="background" args={['#f5f5f5']} />
        <CylinderGrid
          radius={6}
          height={30}
          radialSegments={48}
          heightSegments={30}
          color="#000000"
          opacity={0.07}
        />
      </Canvas>

      {/* スクロール可能なコンテンツ */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflowY: 'auto',
          zIndex: 1,
        }}
      >
        {/* ヘッダー */}
        <div style={{ paddingTop: '5rem', paddingBottom: '2.5rem', textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 10vw, 7rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#1a1a1a',
            }}
          >
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #1a1a1a' }}>#</span>
            Products
          </h1>
        </div>

        {/* カードグリッド */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem 1.5rem',
            padding: '0 2.5rem 5rem',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>

      {/* 戻るボタン */}
      <a
        href="/"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          zIndex: 2,
          color: '#1a1a1a',
          fontSize: '0.875rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none',
          opacity: 0.6,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.6';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </a>
    </div>
  );
}
