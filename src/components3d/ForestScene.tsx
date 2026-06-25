import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { logCanvasActiveState } from '../lib/performance';

interface ForestSceneProps {
  isVisible?: boolean;
  prefersReducedMotion?: boolean;
}

export const ForestScene: React.FC<ForestSceneProps> = ({
  isVisible = true,
  prefersReducedMotion = false,
}) => {
  const { mouse } = useThree();
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const foliageRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const count = 180; // Number of trees

  // Generate random positions, scales, and rotations for the trees
  const treeData = useMemo(() => {
    const data = [];
    const minRadius = 15; // Keep center clear for text readability
    const maxRadius = 80;

    for (let i = 0; i < count; i++) {
      // Polar coordinates distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const y = -2; // Ground height

      const height = 4 + Math.random() * 5; // Tree height
      const scale = 0.6 + Math.random() * 0.8;
      const rotation = Math.random() * Math.PI * 2;

      data.push({ x, y, z, height, scale, rotation });
    }
    return data;
  }, []);

  // Initialize instances matrices
  useMemo(() => {
    const tempMatrix = new THREE.Matrix4();
    const tempRotation = new THREE.Quaternion();
    const tempPosition = new THREE.Vector3();
    const tempScale = new THREE.Vector3();

    // Small delay to make sure refs are attached
    setTimeout(() => {
      if (!trunkRef.current || !foliageRef.current) return;

      treeData.forEach((tree, i) => {
        // 1. Position trunks
        tempPosition.set(tree.x, tree.y + tree.height * 0.25 * tree.scale, tree.z);
        tempRotation.setFromAxisAngle(new THREE.Vector3(0, 1, 0), tree.rotation);
        // Trunk size scale
        tempScale.set(tree.scale * 0.3, tree.height * 0.5 * tree.scale, tree.scale * 0.3);
        tempMatrix.compose(tempPosition, tempRotation, tempScale);
        trunkRef.current!.setMatrixAt(i, tempMatrix);

        // 2. Position foliage (cone layers)
        // We set the foliage slightly higher than the trunk center
        tempPosition.set(tree.x, tree.y + tree.height * 0.7 * tree.scale, tree.z);
        tempScale.set(tree.scale * 2.2, tree.height * 0.9 * tree.scale, tree.scale * 2.2);
        tempMatrix.compose(tempPosition, tempRotation, tempScale);
        foliageRef.current!.setMatrixAt(i, tempMatrix);
      });

      trunkRef.current.instanceMatrix.needsUpdate = true;
      foliageRef.current.instanceMatrix.needsUpdate = true;
    }, 50);
  }, [treeData]);

  // Particle configuration (mist/fireflies)
  const particleCount = 250;
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sp = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a large cylinder/sphere around center
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 45;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -5 + Math.random() * 15; // Vertical distribution
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      sp[i] = 0.05 + Math.random() * 0.15; // Speed
    }
    return [pos, sp];
  }, []);

  useEffect(() => {
    logCanvasActiveState('GlobalCanvas-ForestScene', isVisible);
  }, [isVisible]);

  // Frame animation loop
  useFrame((state) => {
    if (!isVisible) return;
    const time = state.clock.getElapsedTime();

    // 1. Animate particles (mist & fireflies floating) - skip under reduced motion
    if (!prefersReducedMotion && particlesRef.current) {
      const positionAttribute = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        // Drift upwards
        positionAttribute.setY(i, positionAttribute.getY(i) + speeds[i] * 0.04);
        
        // Add horizontal drift (swaying with sine wave)
        const currentX = positionAttribute.getX(i);
        const currentZ = positionAttribute.getZ(i);
        positionAttribute.setX(i, currentX + Math.sin(time * 0.5 + i) * 0.005);
        positionAttribute.setZ(i, currentZ + Math.cos(time * 0.5 + i) * 0.005);

        // Reset if too low
        if (positionAttribute.getY(i) > 12) {
          positionAttribute.setY(i, -5);
        }
      }
      positionAttribute.needsUpdate = true;
    }

    // 2. Dynamic camera/light movement based on mouse
    if (state.camera) {
      if (prefersReducedMotion) {
        state.camera.position.x = 0;
        state.camera.position.y = 2;
        state.camera.lookAt(0, 1, 0);
      } else {
        // Subtle parallax effect on camera
        const targetX = mouse.x * 2.5;
        const targetY = 2 + mouse.y * 1.5;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.03);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.03);
        state.camera.lookAt(0, 1, 0);
      }
    }
  });

  return (
    <group>
      {/* 3D Ground plane with subtle dark forest color */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#0b120c" roughness={0.9} />
      </mesh>

      {/* Instanced Trunks */}
      <instancedMesh ref={trunkRef} args={[undefined, undefined, count]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.15, 1, 6]} />
        <meshStandardMaterial color="#2d1c0d" roughness={0.8} />
      </instancedMesh>

      {/* Instanced Foliage (Cone representation of Oyameles) */}
      <instancedMesh ref={foliageRef} args={[undefined, undefined, count]} castShadow receiveShadow>
        <coneGeometry args={[0.5, 1.2, 5]} />
        <meshStandardMaterial color="#102513" roughness={0.7} flatShading />
      </instancedMesh>

      {/* Fog/Fireflies Particles */}
      {!prefersReducedMotion && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#d4a843"
            size={0.15}
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Lighting Setup */}
      <ambientLight intensity={0.15} color="#141c15" />
      
      {/* Moon Light (Key Light) */}
      <directionalLight
        position={[25, 40, -10]}
        intensity={0.65}
        color="#a5c4e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Warm Forest Glade Light (Ambient gold highlight) */}
      <pointLight position={[0, 3, 0]} intensity={0.45} color="#eec058" distance={30} decay={2} />
    </group>
  );
};
