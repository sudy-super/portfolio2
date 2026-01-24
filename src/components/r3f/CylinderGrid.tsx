import { useMemo } from 'react';
import * as THREE from 'three';

interface CylinderGridProps {
  radius?: number;
  height?: number;
  radialSegments?: number;
  heightSegments?: number;
  color?: string;
  opacity?: number;
}

export function CylinderGrid({
  radius = 6,
  height = 20,
  radialSegments = 32,
  heightSegments = 20,
  color = '#000000',
  opacity = 0.08,
}: CylinderGridProps) {
  const geometry = useMemo(() => {
    const positions: number[] = [];

    // カードと同じ座標系を使用: x = sin(angle), z = cos(angle)
    // 奥側を広くカバー（画面両端まで届くように）
    // 角度: π/4 から 7π/4 (45度から315度、つまり270度の範囲)
    const startAngle = Math.PI * 0.25;
    const endAngle = Math.PI * 1.75;
    const angleRange = endAngle - startAngle;

    // 縦のライン（半円周に沿って配置）
    for (let i = 0; i <= radialSegments; i++) {
      const angle = startAngle + (i / radialSegments) * angleRange;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      // 上から下へのライン
      positions.push(x, height / 2, z);
      positions.push(x, -height / 2, z);
    }

    // 横のライン（水平方向の半円弧）
    for (let j = 0; j <= heightSegments; j++) {
      const y = (j / heightSegments) * height - height / 2;

      for (let i = 0; i < radialSegments; i++) {
        const angle1 = startAngle + (i / radialSegments) * angleRange;
        const angle2 = startAngle + ((i + 1) / radialSegments) * angleRange;

        const x1 = Math.sin(angle1) * radius;
        const z1 = Math.cos(angle1) * radius;
        const x2 = Math.sin(angle2) * radius;
        const z2 = Math.cos(angle2) * radius;

        positions.push(x1, y, z1);
        positions.push(x2, y, z2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [radius, height, radialSegments, heightSegments]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}
