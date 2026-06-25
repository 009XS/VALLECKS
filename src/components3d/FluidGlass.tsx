import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { logCanvasActiveState } from '../lib/performance';

interface FluidGlassProps {
  cocktailType: 'pitufos' | 'mojito' | 'cantaritos';
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export const FluidGlass: React.FC<FluidGlassProps> = ({
  cocktailType,
  isVisible = true,
  prefersReducedMotion = false,
}) => {
  const glassRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const iceGroupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Set colors based on the cocktail type
  const cocktailColors = {
    pitufos: {
      liquid: '#00d4ff',
      emissive: '#002b47',
      glass: '#ffffff',
    },
    mojito: {
      liquid: '#3de273',
      emissive: '#003915',
      glass: '#ffffff',
    },
    cantaritos: {
      liquid: '#eec058',
      emissive: '#402d00',
      glass: '#8b5a2b', // Cantaritos clay cup texture
    },
  };

  const colors = cocktailColors[cocktailType];

  useEffect(() => {
    logCanvasActiveState('FluidGlass', isVisible);
  }, [isVisible]);

  useFrame((state) => {
    if (!isVisible) return;
    const time = state.clock.getElapsedTime();

    // 1. Tilt the glass based on mouse coordinates (simulating inertia)
    if (glassRef.current) {
      if (prefersReducedMotion) {
        glassRef.current.rotation.x = 0;
        glassRef.current.rotation.z = 0;
        glassRef.current.position.y = 0;
      } else {
        const targetRotationX = mouse.y * 0.4;
        const targetRotationZ = -mouse.x * 0.4;
        glassRef.current.rotation.x = THREE.MathUtils.lerp(glassRef.current.rotation.x, targetRotationX, 0.05);
        glassRef.current.rotation.z = THREE.MathUtils.lerp(glassRef.current.rotation.z, targetRotationZ, 0.05);
        glassRef.current.position.y = Math.sin(time * 2.0) * 0.05;
      }
    }

    // 2. Animate the liquid surface (wobble/slosh effect)
    if (liquidRef.current) {
      if (prefersReducedMotion) {
        liquidRef.current.rotation.z = 0;
        liquidRef.current.rotation.x = 0;
      } else {
        const speed = 4.0;
        const wave = Math.sin(time * speed) * 0.06;
        liquidRef.current.rotation.z = -glassRef.current!.rotation.z + wave;
        liquidRef.current.rotation.x = -glassRef.current!.rotation.x + Math.cos(time * speed) * 0.04;
      }
    }

    // 3. Rotate ice cubes inside
    if (iceGroupRef.current) {
      if (prefersReducedMotion) {
        iceGroupRef.current.rotation.y = 0;
        iceGroupRef.current.position.y = 0;
      } else {
        iceGroupRef.current.rotation.y = time * 0.15;
        iceGroupRef.current.position.y = Math.sin(time * 3.0) * 0.02;
      }
    }
  });

  return (
    <group ref={glassRef} scale={1.2}>
      {cocktailType === 'cantaritos' ? (
        /* Render traditional clay cup for Cantaritos */
        <group>
          {/* Main Clay Body */}
          <mesh castShadow receiveShadow position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.55, 0.45, 1.2, 24]} />
            <meshStandardMaterial color={colors.glass} roughness={0.95} />
          </mesh>
          {/* Cup Rim */}
          <mesh position={[0, 0.4, 0]}>
            <torusGeometry args={[0.52, 0.04, 8, 24]} />
            <meshStandardMaterial color="#6e3d15" roughness={0.9} />
          </mesh>
        </group>
      ) : (
        /* Render sleek glass cup for Pitufos / Mojito */
        <group>
          {/* Glass Rim / Outer Wall */}
          <mesh castShadow>
            <cylinderGeometry args={[0.6, 0.45, 1.4, 24, 1, true]} />
            <meshPhysicalMaterial
              color={colors.glass}
              transparent
              opacity={0.3}
              roughness={0.1}
              metalness={0.1}
              transmission={0.9}
              ior={1.5}
              thickness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Solid glass base */}
          <mesh position={[0, -0.7, 0]}>
            <cylinderGeometry args={[0.45, 0.42, 0.15, 24]} />
            <meshPhysicalMaterial
              color={colors.glass}
              transparent
              opacity={0.4}
              roughness={0.1}
              transmission={0.9}
            />
          </mesh>
        </group>
      )}

      {/* Interactive Liquid Mesh */}
      <mesh ref={liquidRef} position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.52, 0.44, 1.0, 24]} />
        <meshStandardMaterial
          color={colors.liquid}
          emissive={colors.emissive}
          roughness={0.2}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Floating Elements (Ice cubes / mint leaves) */}
      <group ref={iceGroupRef} position={[0, 0.2, 0]}>
        {/* Ice Cube 1 */}
        <mesh position={[0.15, 0.1, 0.1]} rotation={[0.2, 0.5, 0.1]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
            roughness={0.0}
            transmission={0.95}
          />
        </mesh>
        {/* Ice Cube 2 */}
        <mesh position={[-0.2, 0.05, -0.15]} rotation={[0.6, 0.1, 0.8]}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
            roughness={0.0}
            transmission={0.95}
          />
        </mesh>
        
        {/* Mint leaves for Mojito */}
        {cocktailType === 'mojito' && (
          <group>
            <mesh position={[0.1, 0.2, -0.1]} rotation={[0.4, 0.9, 0.5]}>
              <boxGeometry args={[0.12, 0.01, 0.25]} />
              <meshStandardMaterial color="#1a4c21" roughness={0.8} />
            </mesh>
            <mesh position={[-0.15, 0.15, 0.2]} rotation={[-0.5, 0.2, -0.3]}>
              <boxGeometry args={[0.15, 0.01, 0.22]} />
              <meshStandardMaterial color="#1a4c21" roughness={0.8} />
            </mesh>
          </group>
        )}
      </group>

      {/* Local Lighting highlighting the liquid */}
      <pointLight position={[0, 0.4, 0]} intensity={1.5} color={colors.liquid} distance={3} decay={2} />
    </group>
  );
};
