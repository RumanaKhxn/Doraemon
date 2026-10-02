import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StylizedDoraemon from './StylizedDoraemon';
import { Nobita } from './StylizedCharacters';
import ProductionModel from './ProductionModel';
import { ASSET_PATHS } from '../../config/assets';

export default function FinaleScene({ isActive }) {
  const starsRef = useRef();

  // Twinkling night stars
  const starData = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 8 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      opacities[i] = Math.random();
    }
    return { positions, opacities };
  }, []);

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.4;
      starsRef.current.rotation.y = t * 0.005;
    }
  });

  return (
    <group position={[0, -1.2, 0]} visible={isActive}>
      {/* Dark warm grass landscape */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b2e13" roughness={0.95} />
      </mesh>

      {/* GIANT GLOWING MOON */}
      <group position={[6, 5, -8]}>
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#fef3c7" />
        </mesh>
        {/* Soft Moon Light */}
        <pointLight color="#fed7aa" intensity={2} distance={15} decay={1.5} />
      </group>

      {/* NOSTALGIC HOUSE IN THE DISTANCE */}
      <group position={[-3.5, 0, -4.5]} rotation={[0, 0.4, 0]}>
        {/* Main Base */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[1.6, 1.2, 2.0]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0]} castShadow>
          <coneGeometry args={[1.4, 0.6, 4]} />
          <meshStandardMaterial color="#f87171" roughness={0.9} />
        </mesh>
        {/* Warmly Glowing Window */}
        <mesh position={[0.81, 0.6, 0.2]}>
          <boxGeometry args={[0.02, 0.4, 0.5]} />
          <meshStandardMaterial
            color="#fb923c"
            emissive="#fb923c"
            emissiveIntensity={3}
          />
        </mesh>
        {/* Small window glow light */}
        <pointLight position={[1.2, 0.6, 0.2]} color="#fb923c" intensity={1.5} distance={4} />
      </group>

      {/* DORAEMON AND NOBITA STANDING SIDE BY SIDE (Wired via ProductionModel) */}
      <group position={[1.1, 0, -2.5]} rotation={[0, 2.6, 0]}>
        <ProductionModel
          url={ASSET_PATHS.doraemon}
          fallback={StylizedDoraemon}
          scale={0.28}
        />
      </group>
      <group position={[1.6, 0, -2.5]} rotation={[0, 2.6, 0]}>
        <ProductionModel
          url={ASSET_PATHS.nobita}
          fallback={Nobita}
          scale={0.28}
          wave={false}
        />
      </group>

      {/* TWINKLING NIGHT STARS */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fef3c7"
          size={0.03}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Soft night ambient */}
      <ambientLight intensity={0.4} color="#0c2740" />
      {/* Sky moon glow */}
      <directionalLight
        position={[-2, 6, 4]}
        intensity={0.6}
        color="#bae6fd"
      />
    </group>
  );
}
