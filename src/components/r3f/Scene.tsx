import { useRef, useCallback, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import { Experience } from './Experience';
import { CylinderGrid } from './CylinderGrid';
import { HoveredWorkPanel } from '../ui/HoveredWorkPanel';
import type { Work } from '../../data/works';

// スクロール位置の監視
function ScrollTopObserver({ onChange }: { onChange: (atTop: boolean) => void }) {
  const scroll = useScroll();
  const lastAtTopRef = useRef<boolean | null>(null);

  useFrame(() => {
    const atTop = scroll.offset <= 0.001;
    if (lastAtTopRef.current === atTop) return;
    lastAtTopRef.current = atTop;
    onChange(atTop);
  });

  return null;
}

interface SceneProps {
  works: Work[];
}

export function Scene({ works }: SceneProps) {
  const [hoveredWork, setHoveredWork] = useState<Work | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // ホバー変更のハンドラ
  const handleHoverChange = useCallback(
    (work: Work | null) => {
      if (!selectedWork) {
        setHoveredWork(work);
      }
    },
    [selectedWork]
  );

  // クリック時
  const handleWorkClick = useCallback((work: Work) => {
    if (work.link) {
      window.open(work.link, '_blank', 'noopener,noreferrer');
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        fontFamily: "'Space Grotesk', 'Noto Sans JP', system-ui, sans-serif",
      }}
    >
      <Canvas dpr={[1, 1.5]} style={{ display: 'block', width: '100%', height: '100%' }}>
        <color attach="background" args={['#f5f5f5']} />
        <fog attach="fog" args={['#f5f5f5', 8, 20]} />

        {/* 固定の円筒グリッド（奥側に配置） */}
        <CylinderGrid
          radius={8}
          height={30}
          radialSegments={48}
          heightSegments={40}
          color="#000000"
          opacity={0.12}
        />

        <ScrollControls pages={8} damping={0.5}>
          <ScrollTopObserver onChange={setAtTop} />
          <ambientLight color={'#ffffff'} intensity={2} />
          <directionalLight color={'#ffffff'} position={[2, 5, 5]} intensity={Math.PI * 1.5} />
          <Experience
            works={works}
            onHoverChange={handleHoverChange}
            onWorkClick={handleWorkClick}
          />
        </ScrollControls>
      </Canvas>

      {/* ホバー中の作品情報 */}
      <HoveredWorkPanel work={hoveredWork} visible={!atTop} />

      {/* トップのタイトル */}
      {atTop && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#1a1a1a',
            pointerEvents: 'none',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(3rem, 12vw, 8rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #1a1a1a' }}>#</span>
            Products
          </h1>
          <p
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              color: '#666666',
              marginTop: '1rem',
            }}
          >
            Scroll to explore
          </p>
        </div>
      )}

      {/* 戻るボタン */}
      <a
        href="/"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
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
