import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';
import { easing } from 'maath';
import { useCursor, Text } from '@react-three/drei';
import { CurvedImage } from './CurvedImage';
import type { Work } from '../../data/works';

type GroupProps = ThreeElements['group'];

interface SingleCardProps extends Omit<GroupProps, 'ref'> {
  work: Work;
  aspectRatio?: number;
  onActiveStateChange?: (isActive: boolean) => void;
  onClick?: () => void;
  threshold?: number;
}

export function SingleCard({
  work,
  aspectRatio = 16 / 9,
  onActiveStateChange,
  onClick,
  threshold = 0.15,
  ...props
}: SingleCardProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const scaleY = 1;
  const scaleX = scaleY * aspectRatio;
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  const isHoveredRef = useRef(false);
  const [pointer, setPointer] = useState(false);
  useCursor(pointer, 'pointer');

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.getWorldPosition(worldPos);

    // 描画負荷軽減
    const currentY = worldPos.y;
    const isVisible = currentY > -0.8 && currentY < 0.8;
    if (groupRef.current.visible !== isVisible) {
      groupRef.current.visible = isVisible;
    }

    if (!isVisible) return;

    const isHovered = worldPos.y > -threshold && worldPos.y < threshold;
    const f = isHovered ? 1.4 : 1;
    easing.damp3(groupRef.current.scale, [f, f, 1], 0.15, delta);

    // ホバーするカードが変わったときのみ通知
    if (isHovered !== isHoveredRef.current) {
      isHoveredRef.current = isHovered;
      onActiveStateChange?.(isHovered);
    }
  });

  return (
    <group
      ref={groupRef}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        if (isHoveredRef.current && onClick) {
          onClick();
        }
      }}
      onPointerOver={() => {
        if (isHoveredRef.current) {
          setPointer(true);
        }
      }}
      onPointerOut={() => {
        setPointer(false);
      }}
    >
      {/* カード背景 */}
      <CurvedImage
        url={work.thumbnailUrl}
        color="#ffffff"
        curveAmount={0.3}
        scale={[scaleX, scaleY, 1]}
      />

      {/* タイトルテキスト（サムネイルがない場合） */}
      {!work.thumbnailUrl && (
        <Text
          position={[0, 0.15, 0.1]}
          fontSize={0.12}
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
          maxWidth={scaleX * 0.8}
        >
          {work.title}
        </Text>
      )}

      {/* 年度バッジ */}
      {!work.thumbnailUrl && (
        <Text
          position={[0, -0.25, 0.1]}
          fontSize={0.08}
          color="#666666"
          anchorX="center"
          anchorY="middle"
        >
          {work.year}
        </Text>
      )}
    </group>
  );
}
