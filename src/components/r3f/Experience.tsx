import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';
import { CardRing } from './CardRing';
import type { Work } from '../../data/works';

type GroupProps = ThreeElements['group'];

interface ExperienceProps extends Omit<GroupProps, 'ref'> {
  works: Work[];
  onHoverChange?: (work: Work | null) => void;
  onWorkClick?: (work: Work) => void;
}

// 螺旋の設定
const TOTAL_ROTATION = 1.0;
const SPIRAL_HEIGHT = 8.0;

export function Experience({ works, onHoverChange, onWorkClick, ...props }: ExperienceProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const scroll = useScroll();
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // スクロールに応じてy軸を中心に回転させる
    groupRef.current.rotation.y = -scroll.offset * (Math.PI * 2.0) * TOTAL_ROTATION;
    // スクロールに応じてy軸方向に移動させる
    groupRef.current.position.y = scroll.offset * SPIRAL_HEIGHT;

    const aspect = state.size.width / state.size.height;

    const BASE_Z = 6.5;
    let targetZ = BASE_Z;
    // aspectが1未満（縦長）の場合、カメラを引く
    if (aspect < 1) {
      targetZ = BASE_Z / aspect ** 0.4;
    }

    easing.damp3(state.camera.position, [0, 0, targetZ], 0.3, delta);
    state.camera.lookAt(0, 0, 0);
  });

  // ホバー中の作品データを取得
  const activeWork = hovered !== null ? works[hovered] : null;

  useEffect(() => {
    onHoverChange?.(activeWork ?? null);
  }, [activeWork, onHoverChange]);

  return (
    <group ref={groupRef} {...props}>
      <CardRing
        items={works}
        onActivate={setHovered}
        onDeactivate={setHovered}
        hoveredIndex={hovered}
        onClick={onWorkClick}
        totalRotation={TOTAL_ROTATION - 0.01}
        spiralHeight={SPIRAL_HEIGHT - 0.05}
      />
    </group>
  );
}
