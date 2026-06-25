import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ForestScene } from './ForestScene';

// A simple scene with floating golden dust particles for other pages
const DustScene: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sp[i] = 0.01 + Math.random() * 0.03;
    }
    return [pos, sp];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        // Drift slowly downwards
        posAttr.setY(i, posAttr.getY(i) - speeds[i] * 0.1);
        
        // Sway sideways
        posAttr.setX(i, posAttr.getX(i) + Math.sin(time * 0.3 + i) * 0.002);

        // Reset if too low
        if (posAttr.getY(i) < -7) {
          posAttr.setY(i, 7);
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#eec058"
          size={0.08}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <ambientLight intensity={0.05} color="#14130f" />
    </group>
  );
};

interface GlobalCanvasProps {
  currentPage: string;
}

export const GlobalCanvas: React.FC<GlobalCanvasProps> = ({ currentPage }) => {
  return (
    <div className="webgl-canvas-container">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]} // Limit device pixel ratio to 2 for high performance on Retina/4K screens
        shadows
      >
        {currentPage === 'home' ? <ForestScene /> : <DustScene />}
      </Canvas>
    </div>
  );
};
