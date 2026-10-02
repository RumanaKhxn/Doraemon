import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. TAKE-COPTER ACCESSORY
export function TakeCopter({ scale = 1, ...props }) {
  const propellerRef = useRef();

  useFrame((state) => {
    if (propellerRef.current) {
      propellerRef.current.rotation.y = state.clock.getElapsedTime() * 20; // Fast rotation
    }
  });

  return (
    <group scale={scale} {...props}>
      {/* Yellow Shaft */}
      <mesh castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Yellow Center Cap */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#eab308" metalness={0.4} />
      </mesh>
      {/* Propeller Blades */}
      <group ref={propellerRef} position={[0, 0.15, 0]}>
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.42, 0.012, 0.06]} />
          <meshStandardMaterial color="#fef08a" opacity={0.8} transparent />
        </mesh>
        <mesh position={[-0.22, 0, 0]}>
          <boxGeometry args={[0.42, 0.012, 0.06]} />
          <meshStandardMaterial color="#fef08a" opacity={0.8} transparent />
        </mesh>
      </group>
    </group>
  );
}

// 2. NOBITA PROCEDURAL MODEL
export function Nobita({ scale = 1, copter = false, wave = false, sit = false, ...props }) {
  const groupRef = useRef();
  const armRef = useRef();

  useFrame((state) => {
    if (!sit && groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04;
    }
    if (wave && armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 7) * 0.3 - 1.2;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props}>
      {/* Take-copter Attachment */}
      {copter && <TakeCopter position={[0, 1.25, 0]} />}

      {/* Head */}
      <group position={[0, 0.9, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.6} />
        </mesh>
        {/* Black Hair */}
        <mesh position={[0, 0.12, -0.05]} scale={[1.06, 0.9, 1.06]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Glasses (Black toruses) */}
        <mesh position={[-0.12, 0.02, 0.28]}>
          <torusGeometry args={[0.09, 0.015, 8, 24]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 0.02, 0.28]}>
          <torusGeometry args={[0.09, 0.015, 8, 24]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.12, 0.02, 0.27]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 0.02, 0.27]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Smile */}
        <mesh position={[0, -0.15, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.06, 0.01, 8, 16, Math.PI]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* Yellow Shirt Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.6, 16]} />
        <meshStandardMaterial color="#fef08a" roughness={0.5} />
      </mesh>
      {/* White Collar */}
      <mesh position={[0, 0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.03, 8, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Blue Shorts */}
      <mesh position={[0, sit ? 0.12 : 0.02, sit ? -0.15 : 0]} rotation={[sit ? -0.5 : 0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.23, 0.23, 0.2, 16]} />
        <meshStandardMaterial color="#1d4ed8" roughness={0.5} />
      </mesh>

      {/* Legs */}
      {sit ? (
        // Seated Legs
        <group position={[0, 0.05, 0.1]}>
          <mesh position={[-0.1, -0.1, 0.15]} rotation={[0.6, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.35, 8]} />
            <meshStandardMaterial color="#fed7aa" />
          </mesh>
          <mesh position={[0.1, -0.1, 0.15]} rotation={[0.6, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.35, 8]} />
            <meshStandardMaterial color="#fed7aa" />
          </mesh>
          <mesh position={[-0.1, -0.22, 0.28]} scale={[1, 1, 1.4]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.1, -0.22, 0.28]} scale={[1, 1, 1.4]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ) : (
        // Standing Legs
        <group position={[0, -0.25, 0]}>
          <mesh position={[-0.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
            <meshStandardMaterial color="#fed7aa" />
          </mesh>
          <mesh position={[0.1, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
            <meshStandardMaterial color="#fed7aa" />
          </mesh>
          <mesh position={[-0.1, -0.22, 0.03]} scale={[1, 1, 1.4]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.1, -0.22, 0.03]} scale={[1, 1, 1.4]} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      )}

      {/* Arms */}
      <group position={[-0.26, 0.5, 0]} rotation={[0, 0, sit ? 0.8 : 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
      <group ref={armRef} position={[0.26, 0.5, 0]} rotation={[0, 0, sit ? -0.8 : -0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
        <mesh position={[0, -0.24, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
    </group>
  );
}

// 3. SHIZUKA PROCEDURAL MODEL
export function Shizuka({ scale = 1, copter = false, ...props }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.03;
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props}>
      {copter && <TakeCopter position={[0, 1.2, 0]} />}

      {/* Head */}
      <group position={[0, 0.85, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.6} />
        </mesh>
        {/* Brown Hair */}
        <mesh position={[0, 0.1, -0.04]} scale={[1.05, 0.9, 1.05]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#78350f" roughness={0.8} />
        </mesh>
        {/* Hair Pigtails */}
        <mesh position={[-0.32, -0.15, -0.1]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.04, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0.32, -0.15, -0.1]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.04, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.1, 0.04, 0.25]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.1, 0.04, 0.25]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* Pink Dress Body */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.26, 0.5, 16]} />
        <meshStandardMaterial color="#f472b6" roughness={0.5} />
      </mesh>

      {/* Standing Legs */}
      <group position={[0, -0.22, 0]}>
        <mesh position={[-0.09, 0, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.4, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        <mesh position={[0.09, 0, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.4, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        <mesh position={[-0.09, -0.22, 0.03]} scale={[1, 1, 1.3]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#f43f5e" />
        </mesh>
        <mesh position={[0.09, -0.22, 0.03]} scale={[1, 1, 1.3]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#f43f5e" />
        </mesh>
      </group>

      {/* Arms */}
      <group position={[-0.18, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          <meshStandardMaterial color="#f472b6" />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
      <group position={[0.18, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
          <meshStandardMaterial color="#f472b6" />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
    </group>
  );
}

// 4. GIAN PROCEDURAL MODEL (Heavy orange body, zigzag pattern)
export function Gian({ scale = 1, ...props }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.9) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props}>
      {/* Head */}
      <group position={[0, 0.95, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.6} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.16, -0.04]} scale={[1.06, 0.85, 1.06]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
        {/* Eyes (Gian's eyes are tiny black dots) */}
        <mesh position={[-0.12, 0.06, 0.31]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 0.06, 0.31]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* Large Orange Shirt Body */}
      <group position={[0, 0.32, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.62, 16]} />
          <meshStandardMaterial color="#f97316" roughness={0.5} />
        </mesh>
        {/* Simple black graphic stripe (zigzag proxy) */}
        <mesh position={[0, 0, 0.36]}>
          <boxGeometry args={[0.45, 0.08, 0.02]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Dark Blue Pants */}
      <mesh position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.22, 16]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Heavy Legs */}
      <group position={[0, -0.35, 0]}>
        <mesh position={[-0.15, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.35, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        <mesh position={[0.15, 0, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.35, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        {/* Heavy Shoes */}
        <mesh position={[-0.15, -0.2, 0.04]} scale={[1.2, 1, 1.5]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0.15, -0.2, 0.04]} scale={[1.2, 1, 1.5]} castShadow>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      </group>

      {/* Heavy Arms */}
      <group position={[-0.42, 0.42, 0]} rotation={[0, 0, 0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.38, 8]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
      <group position={[0.42, 0.42, 0]} rotation={[0, 0, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.38, 8]} />
          <meshStandardMaterial color="#f97316" />
        </mesh>
        <mesh position={[0, -0.22, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
    </group>
  );
}

// 5. SUNEO PROCEDURAL MODEL (Pointed hair, teal shirt)
export function Suneo({ scale = 1, ...props }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.4) * 0.035;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props}>
      {/* Head */}
      <group position={[0, 0.8, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.6} />
        </mesh>
        {/* Pointed Hair Structure (Three small cones pointing forward) */}
        <group position={[0, 0.1, 0.05]} rotation={[0.4, 0, 0]}>
          <mesh position={[-0.1, 0.08, 0.12]} rotation={[Math.PI / 3, 0, -0.2]} castShadow>
            <coneGeometry args={[0.08, 0.25, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0.12, 0.16]} rotation={[Math.PI / 3, 0, 0]} castShadow>
            <coneGeometry args={[0.08, 0.3, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0.1, 0.08, 0.12]} rotation={[Math.PI / 3, 0, 0.2]} castShadow>
            <coneGeometry args={[0.08, 0.25, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
        {/* Back hair */}
        <mesh position={[0, 0.08, -0.06]} scale={[1.05, 0.9, 1.05]}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.1, 0.02, 0.23]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.1, 0.02, 0.23]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* Teal Shirt Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.46, 16]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.5} />
      </mesh>

      {/* Brown Shorts */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} />
        <meshStandardMaterial color="#7c2d12" />
      </mesh>

      {/* Legs */}
      <group position={[0, -0.18, 0]}>
        <mesh position={[-0.07, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.32, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        <mesh position={[0.07, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.32, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
        {/* Shoes */}
        <mesh position={[-0.07, -0.18, 0.03]} scale={[1, 1, 1.3]} castShadow>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
        <mesh position={[0.07, -0.18, 0.03]} scale={[1, 1, 1.3]} castShadow>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#3b82f6" />
        </mesh>
      </group>

      {/* Arms */}
      <group position={[-0.21, 0.48, 0]} rotation={[0, 0, 0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.32, 8]} />
          <meshStandardMaterial color="#14b8a6" />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
      <group position={[0.21, 0.48, 0]} rotation={[0, 0, -0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.32, 8]} />
          <meshStandardMaterial color="#14b8a6" />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#fed7aa" />
        </mesh>
      </group>
    </group>
  );
}
