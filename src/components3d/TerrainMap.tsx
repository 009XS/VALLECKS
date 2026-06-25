import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const TerrainMap: React.FC = () => {
  const terrainRef = useRef<THREE.Mesh>(null);
  const pinRef = useRef<THREE.Mesh>(null);

  // Slowly rotate the terrain map
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (terrainRef.current) {
      terrainRef.current.rotation.z = time * 0.15;
    }
    if (pinRef.current) {
      // Bob the location pin up and down
      pinRef.current.position.z = 0.5 + Math.sin(time * 3.0) * 0.1;
      pinRef.current.rotation.y = time * 2.0;
    }
  });

  // Generate procedural heightmap vertices to simulate mountain terrain
  const [positions, indices] = useMemo(() => {
    const size = 50;
    const segments = 45;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    
    const pos = geometry.attributes.position;
    const vertexCount = pos.count;

    for (let i = 0; i < vertexCount; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Create a valley in the center, mountains on the edges using sine waves
      const distFromCenter = Math.sqrt(x * x + y * y);
      
      // Mountains elevation
      let height = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 1.5;
      
      // Edge rise (creates a floating island tray style)
      if (distFromCenter > 15) {
        height += (distFromCenter - 15) * 0.18;
      }
      
      // Add fine mountain noise details
      height += Math.sin(x * 0.8) * Math.cos(y * 0.8) * 0.25;

      pos.setZ(i, height);
    }
    
    geometry.computeVertexNormals();

    return [pos.array as Float32Array, geometry.index!.array as Uint32Array];
  }, []);

  return (
    <group rotation={[-Math.PI / 3.5, 0, 0]} position={[0, -0.3, 0]}>
      {/* 3D Floating Terrain Mesh */}
      <mesh ref={terrainRef} castShadow receiveShadow>
        <planeGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </planeGeometry>
        <meshStandardMaterial
          color="#0b1b0c"
          roughness={0.8}
          wireframe={false}
          flatShading
        />
      </mesh>

      {/* Wireframe overlay for premium digital blueprint grid look */}
      <mesh position={[0, 0, 0.02]} scale={1.002}>
        <planeGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </planeGeometry>
        <meshBasicMaterial
          color="#eec058"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Location Pin */}
      <mesh ref={pinRef} position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.35, 8]} />
        <meshStandardMaterial
          color="#93000a"
          emissive="#690005"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Glowing pin base ring */}
      <mesh position={[0, 0, 0.08]}>
        <ringGeometry args={[0.15, 0.2, 16]} />
        <meshBasicMaterial color="#eec058" side={THREE.DoubleSide} />
      </mesh>

      {/* Glow Point Light representing La Marquesa */}
      <pointLight position={[0, 0, 0.6]} intensity={1.8} color="#eec058" distance={6} decay={2} />
    </group>
  );
};
