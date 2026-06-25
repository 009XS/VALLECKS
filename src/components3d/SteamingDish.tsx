import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SteamingDish: React.FC = () => {
  const potRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);

  // Slow spin and float
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (potRef.current) {
      potRef.current.rotation.y = time * 0.4;
      potRef.current.position.y = Math.sin(time * 1.5) * 0.08 - 0.2;
    }

    // Animate vapor particles
    if (steamRef.current) {
      const posAttr = steamRef.current.geometry.attributes.position;
      const count = posAttr.count;
      for (let i = 0; i < count; i++) {
        // Float upwards
        let y = posAttr.getY(i);
        y += 0.02;

        // Reset and randomize if too high
        if (y > 2.0) {
          y = 0.3; // Start just above the cup
          posAttr.setX(i, (Math.random() - 0.5) * 0.4);
          posAttr.setZ(i, (Math.random() - 0.5) * 0.4);
        }

        posAttr.setY(i, y);

        // Sway sideways (wind drift)
        const x = posAttr.getX(i);
        posAttr.setX(i, x + Math.sin(time * 2.0 + i) * 0.003);
      }
      posAttr.needsUpdate = true;
    }
  });

  // Steam particle setup
  const particleCount = 45;
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 0.3 + Math.random() * 1.7; // Height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return [pos];
  }, []);

  return (
    <group>
      {/* 3D Traditional Clay Pot / Cup (Jarrito de Barro) */}
      <group ref={potRef} scale={1.1}>
        {/* Main Cup Body */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.4, 0.8, 24]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.95} flatShading />
        </mesh>
        
        {/* Rim */}
        <mesh position={[0, 0.4, 0]}>
          <torusGeometry args={[0.52, 0.05, 8, 24]} />
          <meshStandardMaterial color="#6e3d15" roughness={0.9} />
        </mesh>

        {/* Handle */}
        <mesh position={[-0.5, 0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.25, 0.07, 8, 16, Math.PI * 1.2]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.95} />
        </mesh>

        {/* Liquid Surface inside */}
        <mesh position={[0, 0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.5, 16]} />
          <meshStandardMaterial color="#2b1810" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* Steam / Vapor Particles rising */}
      <points ref={steamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffdf9f"
          size={0.12}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
