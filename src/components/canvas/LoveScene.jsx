import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StylizedDoraemon from './StylizedDoraemon';
import { Nobita } from './StylizedCharacters';
import ProductionModel from './ProductionModel';
import { ASSET_PATHS } from '../../config/assets';

export default function LoveScene({ isActive }) {
  const petalsRef = useRef();

  // Floating cherry blossom petals drifting down
  const petalData = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const attributes = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 4 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      attributes.push({
        speedY: 0.15 + Math.random() * 0.15,
        swingSpeed: 1 + Math.random() * 1.5,
        swingRadius: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return { positions, attributes };
  }, []);

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    if (petalsRef.current) {
      const positions = petalsRef.current.geometry.attributes.position.array;
      const attrs = petalData.attributes;
      const count = attrs.length;

      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= attrs[i].speedY * 0.05;
        positions[i * 3] += Math.sin(t * attrs[i].swingSpeed + attrs[i].phase) * 0.005;
        positions[i * 3 + 2] -= 0.01;

        if (positions[i * 3 + 1] < 0) {
          positions[i * 3 + 1] = 4;
          positions[i * 3] = (Math.random() - 0.5) * 8;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
      }
      petalsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -1, 0]} visible={isActive}>
      {/* Grassy Ground in Sunset Tone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#22c55e" roughness={0.9} />
      </mesh>

      {/* Cherry Blossom Tree (Sakura) Trunk & Foliage */}
      <group position={[-3, 0, -2.5]}>
        <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.15, 0.28, 3.0, 10]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 3.2, 0]}>
          <sphereGeometry args={[1.3, 16, 16]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0.8, 3.6, 0.4]}>
          <sphereGeometry args={[0.9, 12, 12]} />
          <meshStandardMaterial color="#fb7185" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[-0.8, 3.5, -0.4]}>
          <sphereGeometry args={[1.0, 12, 12]} />
          <meshStandardMaterial color="#fb7185" roughness={0.8} />
        </mesh>
      </group>

      {/* NOSTALGIC PARK BENCH WITH DORAEMON & NOBITA SITTING SIDE BY SIDE */}
      <group position={[1.5, 0, -0.5]} rotation={[0, -0.5, 0]}>
        {/* Bench Legs */}
        <mesh position={[-0.7, 0.2, -0.25]} castShadow>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.7, 0.2, -0.25]} castShadow>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[-0.7, 0.2, 0.25]} castShadow>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.7, 0.2, 0.25]} castShadow>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#475569" />
        </mesh>

        {/* Bench Seat */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[1.6, 0.04, 0.6]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>

        {/* Bench Backrest support structure */}
        <mesh position={[-0.7, 0.7, -0.28]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.6, 0.05]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.7, 0.7, -0.28]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.05, 0.6, 0.05]} />
          <meshStandardMaterial color="#475569" />
        </mesh>

        {/* Bench Backrest wood */}
        <mesh position={[0, 0.8, -0.29]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 0.25, 0.04]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>

        {/* Sitting Doraemon (Wired via ProductionModel) */}
        <group position={[-0.3, 0.38, 0.08]} rotation={[0.1, 0.1, 0]}>
          <ProductionModel
            url={ASSET_PATHS.doraemon}
            fallback={StylizedDoraemon}
            scale={0.28}
          />
        </group>

        {/* Sitting Nobita (Wired via ProductionModel) */}
        <group position={[0.3, 0.42, 0.05]} rotation={[0, -0.1, 0]}>
          <ProductionModel
            url={ASSET_PATHS.nobita}
            fallback={Nobita}
            scale={0.28}
            sit={true}
          />
        </group>
      </group>

      {/* DRIFTING CHERRY BLOSSOM PETALS */}
      <points ref={petalsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[petalData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#f43f5e"
          size={0.04}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#fed7aa" />
      <directionalLight
        position={[8, 4, -6]}
        intensity={2.0}
        color="#fb923c"
        castShadow
        shadow-bias={-0.001}
      />
      <directionalLight
        position={[-8, 3, 6]}
        intensity={0.6}
        color="#ec4899"
      />
    </group>
  );
}
