import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StylizedDoraemon from './StylizedDoraemon';
import { Nobita } from './StylizedCharacters';
import ProductionModel from './ProductionModel';
import { ASSET_PATHS } from '../../config/assets';

export default function NobitaRoomScene({ isActive }) {
  const particlesRef = useRef();

  // Floating warm dust particles in light rays
  const particleData = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    const speeds = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      positions[i * 3] = Math.cos(theta) * radius + 0.3;
      positions[i * 3 + 1] = Math.random() * 4 - 1.5;
      positions[i * 3 + 2] = Math.sin(theta) * radius - 0.2;

      speeds.push({
        y: 0.05 + Math.random() * 0.05,
        x: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    if (particlesRef.current && isActive) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const speeds = particleData.speeds;
      const count = speeds.length;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += speeds[i].y * 0.05;
        positions[i * 3] += speeds[i].x * 0.05;
        positions[i * 3 + 2] += speeds[i].z * 0.05;

        if (positions[i * 3 + 1] > 2.5) {
          positions[i * 3 + 1] = -1.5;
          positions[i * 3] = (Math.random() - 0.5) * 2;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -1, 0]} visible={isActive}>
      {/* Floor - Bright Green Tatami Mats */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 3, -4]} receiveShadow>
        <boxGeometry args={[16, 6, 0.2]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.9} />
      </mesh>

      {/* Classic Wooden Study Desk */}
      <group position={[0.2, 0, -1.8]}>
        {/* Table Top */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.08, 1.4]} />
          <meshStandardMaterial color="#fb923c" roughness={0.6} />
        </mesh>
        
        {/* Left Side Drawer/Leg unit */}
        <mesh position={[-0.9, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.9, 1.2]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>

        {/* Right Side Leg */}
        <mesh position={[0.9, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 0.9, 1.2]} />
          <meshStandardMaterial color="#b45309" roughness={0.7} />
        </mesh>

        {/* Desk Drawer Unit (Center-Left) */}
        <group position={[-0.4, 0.76, 0.1]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.2, 1.0]} />
            <meshStandardMaterial color="#b45309" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.51]}>
            <boxGeometry args={[0.15, 0.03, 0.02]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>
        </group>

        {/* TIME MACHINE DRAWER (Center-Right, Open!) */}
        <group position={[0.4, 0.72, 0.2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.16, 1.0]} />
            <meshStandardMaterial color="#9a3412" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.51]}>
            <boxGeometry args={[0.15, 0.03, 0.02]} />
            <meshStandardMaterial color="#eab308" />
          </mesh>

          {/* Doraemon Peeking out of the open drawer (Wired via ProductionModel) */}
          <group position={[0, 0.1, -0.1]} rotation={[0.2, 0.4, 0]}>
            <ProductionModel
              url={ASSET_PATHS.doraemon}
              fallback={StylizedDoraemon}
              scale={0.32}
            />
          </group>
        </group>

        {/* Study Lamp */}
        <group position={[-0.8, 0.94, -0.4]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <mesh position={[0.1, 0.4, 0]} rotation={[0, 0, -0.5]} castShadow>
            <coneGeometry args={[0.16, 0.24, 16]} />
            <meshStandardMaterial color="#f87171" roughness={0.4} />
          </mesh>
          <spotLight
            position={[0.18, 0.32, 0]}
            angle={Math.PI / 4}
            penumbra={0.6}
            intensity={5}
            color="#fef08a"
            distance={8}
            castShadow
          />
        </group>

        {/* Books on the desk */}
        <group position={[0.7, 0.98, -0.3]} rotation={[0, -0.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.06, 0.45]} />
            <meshStandardMaterial color="#f87171" />
          </mesh>
          <mesh position={[0.02, 0.06, -0.02]} rotation={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.28, 0.05, 0.42]} />
            <meshStandardMaterial color="#60a5fa" />
          </mesh>
          <mesh position={[-0.01, 0.11, 0.01]} rotation={[0, -0.1, 0]} castShadow>
            <boxGeometry args={[0.3, 0.04, 0.4]} />
            <meshStandardMaterial color="#fef08a" />
          </mesh>
        </group>
      </group>

      {/* Desk Chair */}
      <group position={[0.2, 0, -0.3]} rotation={[0, 0.4, 0]}>
        {/* Chair Legs */}
        <mesh position={[-0.25, 0.25, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.25, 0.25, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[-0.25, 0.25, 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0.25, 0.25, 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Chair Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.6, 0.04, 0.55]} />
          <meshStandardMaterial color="#d97706" roughness={0.7} />
        </mesh>
        {/* Chair Backrest supports */}
        <mesh position={[0, 0.8, -0.22]} castShadow>
          <boxGeometry args={[0.45, 0.6, 0.03]} />
          <meshStandardMaterial color="#b45309" roughness={0.8} />
        </mesh>

        {/* Nobita Seated on the Chair (Wired via ProductionModel) */}
        <group position={[0, 0.46, -0.05]} rotation={[0, -0.6, 0]}>
          <ProductionModel
            url={ASSET_PATHS.nobita}
            fallback={Nobita}
            scale={0.32}
            sit={true}
          />
        </group>
      </group>

      {/* Window letting in soft dust light */}
      <group position={[-5.8, 3, -1]}>
        {/* Window frame */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 2.0, 1.8]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Window Glass light emission */}
        <mesh position={[0.01, 0, 0]}>
          <planeGeometry args={[1.7, 1.9]} />
          <meshBasicMaterial color="#93c5fd" opacity={0.4} transparent side={2} />
        </mesh>
      </group>

      {/* Floating Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fef08a"
          size={0.03}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#fffbeb" />
      <directionalLight
        position={[4, 5, 2]}
        intensity={1.0}
        color="#fffbeb"
        castShadow
        shadow-bias={-0.001}
      />
    </group>
  );
}
