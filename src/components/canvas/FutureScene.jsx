import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FutureScene({ isActive }) {
  const tunnelRef = useRef();
  const clocksGroupRef = useRef();
  const starsRef = useRef();

  // Floating stars / cyber dust
  const starParticles = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();

    // Rotate wormhole
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = t * 0.15;
      tunnelRef.current.rotation.x = Math.sin(t * 0.4) * 0.2;
    }

    // Animate and float clocks
    if (clocksGroupRef.current) {
      clocksGroupRef.current.children.forEach((clock, idx) => {
        clock.position.y = clock.userData.startY + Math.sin(t * 1.5 + idx) * 0.2;
        clock.rotation.y = t * 0.3 + idx;
        clock.rotation.x = t * 0.1;
        // Rotate clock hands!
        const hourHand = clock.getObjectByName('hourHand');
        const minuteHand = clock.getObjectByName('minuteHand');
        if (hourHand) hourHand.rotation.z = -t * (2.0 + idx);
        if (minuteHand) minuteHand.rotation.z = -t * (10.0 + idx * 2);
      });
    }

    // Spin stars
    if (starsRef.current) {
      starsRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]} visible={isActive}>
      {/* 3D TIME PORTAL / WORMHOLE */}
      <mesh ref={tunnelRef} castShadow receiveShadow>
        <torusKnotGeometry args={[2.0, 0.6, 120, 16, 2, 3]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0c2740"
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Outer Halo Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.5, 0.03, 8, 48]} />
        <meshBasicMaterial color="#38bdf8" opacity={0.3} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[4.2, 0.02, 8, 48]} />
        <meshBasicMaterial color="#8b5cf6" opacity={0.25} transparent />
      </mesh>

      {/* FLOATING RETRO CLOCKS */}
      <group ref={clocksGroupRef}>
        {/* Clock 1 */}
        <group position={[-2.2, 1.2, -1]} scale={[0.5, 0.5, 0.5]} userData={{ startY: 1.2 }}>
          {/* Dial Base */}
          <mesh castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#071426" roughness={0.3} />
          </mesh>
          {/* Dial Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.8, 0.06, 8, 24]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} />
          </mesh>
          {/* Hour Hand */}
          <group name="hourHand" position={[0, 0, 0.06]}>
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.04, 0.5, 0.02]} />
              <meshBasicMaterial color="#fdf6e2" />
            </mesh>
          </group>
          {/* Minute Hand */}
          <group name="minuteHand" position={[0, 0, 0.08]}>
            <mesh position={[0, 0.35, 0]}>
              <boxGeometry args={[0.02, 0.7, 0.02]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>
        </group>

        {/* Clock 2 */}
        <group position={[2.5, -0.8, -1.5]} scale={[0.4, 0.4, 0.4]} userData={{ startY: -0.8 }}>
          {/* Dial Base */}
          <mesh castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.1, 24]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#0c2740" roughness={0.3} />
          </mesh>
          {/* Dial Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.8, 0.06, 8, 24]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} />
          </mesh>
          {/* Hour Hand */}
          <group name="hourHand" position={[0, 0, 0.06]}>
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.04, 0.5, 0.02]} />
              <meshBasicMaterial color="#fdf6e2" />
            </mesh>
          </group>
          {/* Minute Hand */}
          <group name="minuteHand" position={[0, 0, 0.08]}>
            <mesh position={[0, 0.35, 0]}>
              <boxGeometry args={[0.02, 0.7, 0.02]} />
              <meshBasicMaterial color="#8b5cf6" />
            </mesh>
          </group>
        </group>
      </group>

      {/* SPACE STAR DUST */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#fef08a"
          size={0.035}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Glowing atmospheric lights */}
      <ambientLight intensity={0.1} color="#0c2740" />
      <pointLight position={[-3, 2, 3]} color="#38bdf8" intensity={4} distance={8} decay={1.5} />
      <pointLight position={[3, -2, 3]} color="#8b5cf6" intensity={4} distance={8} decay={1.5} />
    </group>
  );
}
