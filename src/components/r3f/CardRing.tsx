import type { ThreeElements } from '@react-three/fiber';
import { SingleCard } from './SingleCard';
import type { Work } from '../../data/works';

type GroupProps = ThreeElements['group'];

interface CardRingProps extends Omit<GroupProps, 'ref'> {
  items: Work[];
  onActivate: (index: number) => void;
  onDeactivate: (index: number | null) => void;
  hoveredIndex: number | null;
  onClick?: (work: Work) => void;
  totalRotation?: number;
  spiralHeight?: number;
}

export function CardRing({
  items,
  onActivate,
  onDeactivate,
  hoveredIndex,
  onClick,
  totalRotation = 1.49,
  spiralHeight = 7.95,
  ...props
}: CardRingProps) {
  const amount = items.length;
  const radius = 5;

  // カード枚数に応じてしきい値を調整
  const threshold = (spiralHeight / amount) * 0.5;

  return (
    <group {...props}>
      {items.map((work, i) => {
        // 螺旋状の配置計算
        const angle = Math.PI / 8 + (i / amount) * (Math.PI * 2) * totalRotation;
        const height = -(i / amount) * spiralHeight - 0.3;

        return (
          <SingleCard
            key={work.id}
            work={work}
            position={[Math.sin(angle) * radius, height, Math.cos(angle) * radius]}
            rotation={[0, angle, 0]}
            aspectRatio={16 / 9}
            threshold={threshold}
            onActiveStateChange={(isActive) => {
              if (isActive) {
                onActivate(i);
              } else {
                if (hoveredIndex === i) {
                  onDeactivate(null);
                }
              }
            }}
            onClick={() => onClick?.(work)}
          />
        );
      })}
    </group>
  );
}
