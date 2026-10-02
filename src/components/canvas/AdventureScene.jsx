import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StylizedDoraemon from './StylizedDoraemon';
import { Nobita, TakeCopter } from './StylizedCharacters';
import ProductionModel from './ProductionModel';
import { ASSET_PATHS } from '../../config/assets';

// 1. ANYWHERE DOOR PROCEDURAL FALLBACK
function AnywhereDoorFallback() {
  const portalRef = useRef();

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.material.emissiveIntensity = 1.5 + Math.sin(state.clock.getElapsedTime() * 5) * 0.5;
    }
  });

  return (
    <group position={[0, 0.3, 0]}>
      {/* Outer Pink Door Frame */}
      <mesh position={[-0.75, 1.0, 0]} castShadow>
        <boxGeometry args={[0.12, 2.0, 0.12]} />
        <meshStandardMaterial color="#ec4899" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0.75, 1.0, 0]} castShadow>
        <boxGeometry args={[0.12, 2.0, 0.12]} />
        <meshStandardMaterial color="#ec4899" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[1.62, 0.12, 0.12]} />
        <meshStandardMaterial color="#ec4899" roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Glowing Cosmic Portal */}
      <mesh ref={portalRef} position={[0, 1.0, -0.01]}>
        <planeGeometry args={[1.38, 1.88]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#a855f7"
          emissiveIntensity={2.0}
          roughness={0.1}
        />
      </mesh>

      {/* Slightly Open Door Panel */}
      <group position={[-0.69, 1.0, 0]} rotation={[0, -1.2, 0]}>
        <mesh position={[0.69, 0, 0.04]} castShadow>
          <boxGeometry args={[1.38, 1.88, 0.08]} />
          <meshStandardMaterial color="#ec4899" roughness={0.5} />
        </mesh>
        {/* Door Handle */}
        <mesh position={[1.2, 0, 0.1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function AdventureScene({ isActive }) {
  const sparksRef = useRef();
  const islandGroupRef = useRef();
  const characterGroupRef = useRef();

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Floating island motion
    if (islandGroupRef.current) {
      islandGroupRef.current.position.y = Math.sin(t * 1.0) * 0.15;
      islandGroupRef.current.rotation.y = t * 0.04;
    }

    // Characters flying motion
    if (characterGroupRef.current) {
      characterGroupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
      characterGroupRef.current.children[0].rotation.y = Math.sin(t * 0.5) * 0.1 + 0.5;
      characterGroupRef.current.children[1].rotation.y = Math.sin(t * 0.5) * 0.1 - 0.5;
    }

    if (sparksRef.current) {
      sparksRef.current.rotation.y = -t * 0.1;
      sparksRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
  });

  const sparkParticles = React.useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 1.0;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <group position={[0, -0.5, 0]} visible={isActive}>
      {/* MAGICAL FLOATING ISLAND */}
      <group ref={islandGroupRef}>
        {/* Main Island Platform */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.5, 3.2, 0.6, 8]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} flatShading />
        </mesh>
        
        {/* Bottom rock detail */}
        <mesh position={[0, -0.6, 0]} castShadow>
          <coneGeometry args={[2.5, 1.2, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} flatShading />
        </mesh>

        {/* Small floating rock satellite 1 */}
        <mesh position={[-3.5, 0.4, 1.5]} scale={[0.4, 0.3, 0.4]} castShadow>
          <dodecahedronGeometry args={[1]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} />
        </mesh>

        {/* Small floating rock satellite 2 */}
        <mesh position={[3.2, -0.5, -2]} scale={[0.5, 0.4, 0.5]} castShadow>
          <dodecahedronGeometry args={[1]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>

        {/* THE ANYWHERE DOOR (Wired via ProductionModel) */}
        <group position={[0, 0, 0]}>
          <ProductionModel
            url={ASSET_PATHS.anywhereDoor}
            fallback={AnywhereDoorFallback}
          />
        </group>
      </group>

      {/* FLYING CHARACTERS WITH TAKE-COPTERS (Wired via ProductionModel) */}
      <group ref={characterGroupRef} position={[0, 1.0, 0.5]}>
        {/* Doraemon */}
        <group position={[-1.6, 0.2, 0]}>
          <ProductionModel
            url={ASSET_PATHS.doraemon}
            fallback={StylizedDoraemon}
            scale={0.35}
          />
          <TakeCopter scale={0.35} position={[0, 0.65, 0]} />
        </group>

        {/* Nobita */}
        <group position={[1.6, 0.3, 0]}>
          <ProductionModel
            url={ASSET_PATHS.nobita}
            fallback={Nobita}
            scale={0.35}
            copter={true}
            wave={true}
          />
        </group>
      </group>

      {/* SWIRLING MAGICAL SPARKS */}
      <points ref={sparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparkParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#38bdf8"
          size={0.06}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Soft space/sky lighting */}
      <ambientLight intensity={0.6} color="#e9d5ff" />
      <pointLight position={[0, 3, 0]} color="#ec4899" intensity={3} distance={8} decay={1.5} />
      <pointLight position={[0, 1.5, -2]} color="#a855f7" intensity={4} distance={10} decay={1.5} />
    </group>
  );
}
