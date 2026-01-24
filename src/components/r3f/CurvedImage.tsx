import { useMemo, forwardRef } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// シェーダー定義
const VertexShader = `
  varying vec2 vUv;
  uniform float uCurve;

  #include <fog_pars_vertex>

  void main() {
    vUv = uv;
    vec3 pos = position;

    // UV座標を -1.0 ~ 1.0 に正規化
    vec2 centeredUv = uv * 2.0 - 1.0;

    // 中心からの距離の二乗を計算
    float distSq = dot(centeredUv, centeredUv);

    // 中心から離れるほどZ座標を奥へ移動
    pos.z = -distSq * uCurve * 0.12;

    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vec4 mvPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * mvPosition;

    // Fogの深度計算
    vFogDepth = distance(worldPosition.xyz, vec3(0.0, 0.0, 5.0));
  }
`;

const FragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform float uHasTexture;
  varying vec2 vUv;

  #include <fog_pars_fragment>

  void main() {
    vec4 color;
    if (uHasTexture > 0.5) {
      color = texture2D(uTexture, vUv);
    } else {
      color = vec4(uColor, 1.0);
    }
    gl_FragColor = vec4(color.rgb, color.a * uOpacity);
    #include <fog_fragment>
  }
`;

type CurvedImageProps = {
  url?: string;
  color?: string;
  curveAmount?: number;
  opacity?: number;
  scale?: [number, number, number];
};

export const CurvedImage = forwardRef<THREE.Mesh, CurvedImageProps>(
  ({ url, color = '#333333', curveAmount = 0.3, opacity = 1, scale = [4 / 3, 1, 1] }, ref) => {
    const texture = url ? useTexture(url) : null;

    const uniforms = useMemo(
      () => ({
        ...THREE.UniformsLib.fog,
        uTexture: { value: texture },
        uCurve: { value: curveAmount },
        uOpacity: { value: opacity },
        uColor: { value: new THREE.Color(color) },
        uHasTexture: { value: texture ? 1.0 : 0.0 },
      }),
      [texture, curveAmount, opacity, color]
    );

    return (
      <mesh ref={ref} scale={scale}>
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          vertexShader={VertexShader}
          fragmentShader={FragmentShader}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
          fog={true}
        />
      </mesh>
    );
  }
);
