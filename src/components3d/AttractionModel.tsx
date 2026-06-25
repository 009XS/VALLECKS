import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { logCanvasActiveState } from '../lib/performance';

interface AttractionModelProps {
  type: 'gotcha' | 'cuatrimotos' | 'tirolesas' | 'caballo';
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export const AttractionModel: React.FC<AttractionModelProps> = ({
  type,
  isVisible = true,
  prefersReducedMotion = false,
}) => {
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    logCanvasActiveState('AttractionModel', isVisible);
  }, [isVisible]);

  // Spin the model slowly
  useFrame((state) => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      if (modelRef.current) {
        modelRef.current.rotation.y = 0;
        modelRef.current.rotation.x = 0;
      }
      return;
    }

    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.8;
      modelRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  // Render different procedural geometries based on the attraction type
  const renderGeometry = () => {
    switch (type) {
      case 'gotcha':
        return (
          <group>
            {/* Target Outer Ring */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[1.5, 1.5, 0.15, 32]} />
              <meshStandardMaterial color="#36352f" roughness={0.4} metalness={0.7} />
            </mesh>
            {/* Target Inner Ring */}
            <mesh position={[0, 0, 0.05]} castShadow>
              <cylinderGeometry args={[1.0, 1.0, 0.1, 32]} />
              <meshStandardMaterial color="#eec058" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Bullseye */}
            <mesh position={[0, 0, 0.09]} castShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
              <meshStandardMaterial color="#93000a" roughness={0.3} />
            </mesh>
            {/* Paint Splat 1 */}
            <mesh position={[-0.4, 0.3, 0.15]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#3de273" roughness={0.1} emissive="#005322" emissiveIntensity={0.2} />
            </mesh>
            {/* Paint Splat 2 */}
            <mesh position={[0.5, -0.4, 0.15]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#009443" roughness={0.1} />
            </mesh>
          </group>
        );

      case 'cuatrimotos':
        return (
          <group>
            {/* ATV Chassis */}
            <mesh position={[0, 0.1, 0]} castShadow>
              <boxGeometry args={[1.8, 0.4, 0.9]} />
              <meshStandardMaterial color="#102513" roughness={0.5} metalness={0.6} />
            </mesh>
            {/* Seat */}
            <mesh position={[-0.1, 0.35, 0]} castShadow>
              <boxGeometry args={[0.8, 0.15, 0.45]} />
              <meshStandardMaterial color="#1d1c17" roughness={0.9} />
            </mesh>
            {/* Handlebars Column */}
            <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
              <meshStandardMaterial color="#8e928a" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Handlebars Bar */}
            <mesh position={[0.68, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
              <meshStandardMaterial color="#1d1c17" metalness={0.5} roughness={0.7} />
            </mesh>
            {/* Front Left Wheel */}
            <mesh position={[0.6, -0.2, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
              <meshStandardMaterial color="#0f0e0a" roughness={0.9} />
            </mesh>
            {/* Front Right Wheel */}
            <mesh position={[0.6, -0.2, -0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.45, 0.45, 0.3, 16]} />
              <meshStandardMaterial color="#0f0e0a" roughness={0.9} />
            </mesh>
            {/* Rear Left Wheel */}
            <mesh position={[-0.6, -0.2, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.48, 0.48, 0.35, 16]} />
              <meshStandardMaterial color="#0f0e0a" roughness={0.9} />
            </mesh>
            {/* Rear Right Wheel */}
            <mesh position={[-0.6, -0.2, -0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.48, 0.48, 0.35, 16]} />
              <meshStandardMaterial color="#0f0e0a" roughness={0.9} />
            </mesh>
          </group>
        );

      case 'tirolesas':
        return (
          <group>
            {/* Main Pulley Body */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[1.2, 0.3, 0.2]} />
              <meshStandardMaterial color="#eec058" metalness={0.9} roughness={0.1} />
            </mesh>
            {/* Left Wheel */}
            <mesh position={[-0.35, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.22, 16]} />
              <meshStandardMaterial color="#8e928a" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Right Wheel */}
            <mesh position={[0.35, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.22, 16]} />
              <meshStandardMaterial color="#8e928a" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Carabiner Ring */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
              <torusGeometry args={[0.35, 0.08, 8, 24]} />
              <meshStandardMaterial color="#c4c8bf" metalness={0.95} roughness={0.05} />
            </mesh>
            {/* Hanging Strap */}
            <mesh position={[0, -0.6, 0]} castShadow>
              <boxGeometry args={[0.15, 0.8, 0.05]} />
              <meshStandardMaterial color="#93000a" roughness={0.7} />
            </mesh>
          </group>
        );

      case 'caballo':
        return (
          <group>
            {/* Horseshoe Base (Torus Segment) */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <torusGeometry args={[1.0, 0.16, 12, 32, Math.PI * 1.5]} />
              <meshStandardMaterial color="#eec058" metalness={0.9} roughness={0.15} />
            </mesh>
            {/* Horseshoe Left Tip */}
            <mesh position={[-1.0, 0, -0.05]} castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
              <meshStandardMaterial color="#ffdf9f" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Horseshoe Right Tip */}
            <mesh position={[0, 0, -1.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
              <meshStandardMaterial color="#ffdf9f" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Star highlight in the middle */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#b8ccb4" emissive="#51634f" emissiveIntensity={0.5} />
            </mesh>
          </group>
        );

      default:
        return null;
    }
  };

  return (
    <group ref={modelRef} scale={1.2}>
      {renderGeometry()}
    </group>
  );
};
