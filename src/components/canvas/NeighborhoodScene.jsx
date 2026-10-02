import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StylizedDoraemon from './StylizedDoraemon';
import { Nobita } from './StylizedCharacters';
import ProductionModel from './ProductionModel';
import { ASSET_PATHS } from '../../config/assets';

// 1. HIGH-FIDELITY NOBITA'S HOUSE PROCEDURAL FALLBACK
// Recreates a realistic two-story Japanese house faithful to the Stand By Me silhouette.
function NobitaHouseFallback(props) {
  return (
    <group {...props}>
      {/* First Story Concrete Base */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.4, 3.6]} />
        <meshStandardMaterial color="#fafaf9" roughness={0.8} />
      </mesh>

      {/* Second Story Base (Slightly smaller, offset back) */}
      <mesh position={[0, 2.0, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.2, 3.0]} />
        <meshStandardMaterial color="#fafaf9" roughness={0.8} />
      </mesh>

      {/* Slanted Gable Roof (Terracotta Red tiled roof panels) */}
      {/* Main Roof Left slope */}
      <mesh position={[-0.8, 2.9, -0.2]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[1.8, 0.08, 3.2]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.4} />
      </mesh>
      {/* Main Roof Right slope */}
      <mesh position={[0.8, 2.9, -0.2]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[1.8, 0.08, 3.2]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.4} />
      </mesh>

      {/* First Story Slanted Roof Overhang (Red tiles) */}
      <mesh position={[0, 1.45, 0.9]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[3.4, 0.06, 1.0]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.4} />
      </mesh>

      {/* Front Entrance Porch Gables */}
      <group position={[0.7, 0, 1.7]}>
        {/* Support Pillars */}
        <mesh position={[-0.4, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} />
        </mesh>
        {/* Porch Roof */}
        <mesh position={[-0.4, 1.2, 0.1]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.6, 0.05, 0.5]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
        {/* Wood sliding entrance door */}
        <mesh position={[-0.4, 0.5, -0.1]}>
          <boxGeometry args={[0.6, 1.0, 0.04]} />
          <meshStandardMaterial color="#78350f" roughness={0.7} />
        </mesh>
        {/* Glass panel in door */}
        <mesh position={[-0.4, 0.6, -0.07]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#93c5fd" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Windows with Wooden Frames & Glass */}
      {/* 2nd Story Main Window */}
      <group position={[0, 2.0, 1.32]}>
        <mesh>
          <boxGeometry args={[1.2, 0.6, 0.05]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.1, 0.5]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.4} metalness={0.9} roughness={0.05} />
        </mesh>
      </group>
      {/* 1st Story Side Window */}
      <group position={[-1.2, 0.7, 1.82]}>
        <mesh>
          <boxGeometry args={[0.6, 0.6, 0.05]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.4} metalness={0.9} roughness={0.05} />
        </mesh>
      </group>
    </group>
  );
}

export default function NeighborhoodScene({ isActive }) {
  const cloudsRef = useRef();

  useFrame((state) => {
    if (cloudsRef.current) {
      const t = state.clock.getElapsedTime();
      cloudsRef.current.children.forEach((cloud, idx) => {
        cloud.position.x = cloud.userData.startX + Math.sin(t * 0.05 + idx * 2) * 1.5;
        cloud.position.z = cloud.userData.startZ + Math.cos(t * 0.03 + idx * 2) * 1.0;
      });
    }
  });

  return (
    <group position={[0, -2, 0]} visible={isActive}>
      {/* Ground & Grass (Realistic Green Lawn) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#34d399" roughness={0.85} />
      </mesh>

      {/* Main Street Road (Concrete Asphalt Grey) */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[3, 50]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.7} />
      </mesh>

      {/* Sidewalk border blocks */}
      <mesh position={[-1.6, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.2, 50]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <mesh position={[1.6, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.2, 50]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>

      {/* White Road Markings */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 40]} />
        <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
      </mesh>

      {/* NOBITA'S HOUSE PORT (Asynchronous loader with realistic fallback) */}
      <group position={[-2.8, 0, -1]}>
        <ProductionModel
          url={ASSET_PATHS.house}
          fallback={NobitaHouseFallback}
          scale={1.0}
        />
      </group>

      {/* Neighbor's House (Simplified background building) */}
      <group position={[3.2, 0, 2]}>
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 2.0, 2.8]} />
          <meshStandardMaterial color="#fafaf9" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.3, 0]} castShadow>
          <coneGeometry args={[1.8, 0.9, 4]} />
          <meshStandardMaterial color="#2563eb" roughness={0.6} />
        </mesh>
      </group>

      {/* Concrete Utility Pole */}
      <group position={[-1.7, 0, 4]}>
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 5, 12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.8, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 3.8, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.6, 0.06, 0.06]} />
          <meshStandardMaterial color="#64748b" roughness={0.7} />
        </mesh>
        {/* Streetlight */}
        <mesh position={[0.2, 3.5, 0]} castShadow>
          <boxGeometry args={[0.3, 0.1, 0.15]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>

      {/* Stylized Bright Green Trees */}
      <group position={[2.5, 0, -4]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.12, 1.2, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow>
          <sphereGeometry args={[0.65, 16, 16]} />
          <meshStandardMaterial color="#10b981" roughness={0.85} />
        </mesh>
      </group>

      {/* Floating Fluffy Clouds */}
      <group ref={cloudsRef}>
        <mesh position={[-6, 7, -8]} userData={{ startX: -6, startZ: -8 }} castShadow>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.8} />
        </mesh>
        <mesh position={[8, 8, -12]} scale={[2.0, 1.2, 1.2]} userData={{ startX: 8, startZ: -12 }} castShadow>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} transparent opacity={0.85} />
        </mesh>
      </group>

      {/* Concrete Fences */}
      <group position={[-1.7, 0, 0.5]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.02, 0.7, 3]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.8} />
        </mesh>
      </group>

      {/* WAving DORAEMON AND NOBITA (Wired via ProductionModel) */}
      <group position={[-0.3, 0, 1.8]} rotation={[0, 0.4, 0]}>
        <ProductionModel
          url={ASSET_PATHS.doraemon}
          fallback={StylizedDoraemon}
          scale={0.4}
        />
      </group>
      <group position={[0.3, 0, 1.8]} rotation={[0, -0.4, 0]}>
        <ProductionModel
          url={ASSET_PATHS.nobita}
          fallback={Nobita}
          scale={0.4}
          wave={true}
        />
      </group>
    </group>
  );
}
