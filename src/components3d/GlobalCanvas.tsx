import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ForestScene } from './ForestScene';
import { usePageVisibility } from '../hooks/usePageVisibility';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { logCanvasActiveState, logRouteRenderPolicy, logVisibilityChange } from '../lib/performance';
import { PERFORMANCE } from '../config/performance';

interface DustSceneProps {
  isVisible: boolean;
  prefersReducedMotion: boolean;
}

// A simple scene with floating golden dust particles for other pages
const DustScene: React.FC<DustSceneProps> = ({ isVisible, prefersReducedMotion }) => {
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

  useEffect(() => {
    logCanvasActiveState('GlobalCanvas-DustScene', isVisible);
  }, [isVisible]);

  useFrame((state) => {
    if (!isVisible) return;
    
    // Stop floating animation if reduced motion is preferred
    if (prefersReducedMotion) return;

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
  const isTabVisible = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();

  // Log visibility updates in development
  useEffect(() => {
    logVisibilityChange(isTabVisible);
  }, [isTabVisible]);

  // Log dynamic render policy on page transition
  useEffect(() => {
    const policy = currentPage === 'home' 
      ? 'full-3d-scene (Forest)' 
      : 'reduced-3d-scene (Dust Particles)';
    logRouteRenderPolicy(currentPage, policy);
  }, [currentPage]);

  return (
    <div className="webgl-canvas-container">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, PERFORMANCE.MAX_DPR]} // Limit device pixel ratio using constants
        shadows
      >
        {currentPage === 'home' ? (
          <ForestScene 
            isVisible={isTabVisible} 
            prefersReducedMotion={prefersReducedMotion} 
          />
        ) : (
          <DustScene 
            isVisible={isTabVisible} 
            prefersReducedMotion={prefersReducedMotion} 
          />
        )}
      </Canvas>
    </div>
  );
};
