import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StylizedDoraemon({ scale = 1, ...props }) {
  const groupRef = useRef();
  const headGroupRef = useRef();
  const leftPupilRef = useRef();
  const rightPupilRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // Normalised mouse [-1 to 1]

    // 1. Breathing & Floating motion
    if (groupRef.current) {
      // Natural bobbing
      groupRef.current.position.y = Math.sin(t * 1.6) * 0.04;
      
      // Breathing squash & stretch (subtle scale change)
      const breathScale = 1 + Math.sin(t * 1.6) * 0.012;
      groupRef.current.scale.set(scale, scale * breathScale, scale);
    }

    // 2. Head tracking (Doraemon looks at user mouse)
    if (headGroupRef.current) {
      // Limit the tracking angles to keep it natural
      const targetRotY = pointer.x * 0.35; // max 20 degrees
      const targetRotX = -pointer.y * 0.20; // max 11 degrees
      
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, targetRotY, 0.08);
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, targetRotX, 0.08);
    }

    // 3. Eye Pupil tracking (pupils shift slightly towards cursor)
    if (leftPupilRef.current && rightPupilRef.current) {
      const pupilShiftX = pointer.x * 0.02;
      const pupilShiftY = pointer.y * 0.02;
      
      leftPupilRef.current.position.x = THREE.MathUtils.lerp(leftPupilRef.current.position.x, 0.02 + pupilShiftX, 0.1);
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(leftPupilRef.current.position.y, pupilShiftY, 0.1);
      
      rightPupilRef.current.position.x = THREE.MathUtils.lerp(rightPupilRef.current.position.x, -0.02 + pupilShiftX, 0.1);
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(rightPupilRef.current.position.y, pupilShiftY, 0.1);
    }

    // 4. Subtle arm swaying / greeting gesture
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.45 + Math.sin(t * 2.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} {...props}>
      {/* HEAD GROUP */}
      <group ref={headGroupRef} position={[0, 1.2, 0]}>
        {/* Blue Head Base */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* White Face Plate */}
        <mesh position={[0, -0.05, 0.1]} castShadow>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.0} />
        </mesh>

        {/* Eyes (Left & Right) */}
        {/* Left Eye */}
        <group position={[-0.18, 0.28, 0.62]}>
          <mesh castShadow>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          {/* Pupil */}
          <mesh ref={leftPupilRef} position={[0.02, 0, 0.12]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#050914" />
          </mesh>
        </group>
        {/* Right Eye */}
        <group position={[0.18, 0.28, 0.62]}>
          <mesh castShadow>
            <sphereGeometry args={[0.16, 24, 24]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} />
          </mesh>
          {/* Pupil */}
          <mesh ref={rightPupilRef} position={[-0.02, 0, 0.12]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#050914" />
          </mesh>
        </group>

        {/* Nose */}
        <group position={[0, 0.12, 0.72]}>
          <mesh castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} />
          </mesh>
          {/* Nose shine */}
          <mesh position={[0.03, 0.03, 0.06]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Whiskers (Left & Right) */}
        {/* Left side */}
        <group position={[-0.35, -0.05, 0.65]} rotation={[0, 0.1, 0.1]}>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.25, 0.015, 0.015]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.25, 0.015, 0.015]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.25, 0.015, 0.015]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
        </group>
        {/* Right side */}
        <group position={[0.35, -0.05, 0.65]} rotation={[0, -0.1, -0.1]}>
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.25, 0.015, 0.015]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.25, 0.015, 0.015]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.25, 0.015, 0.015]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
        </group>

        {/* Smile Line */}
        <mesh position={[0, -0.22, 0.68]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.012, 8, 24, Math.PI]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* COLLAR & BELL */}
      <group position={[0, 0.42, 0]}>
        {/* Red Collar Torus */}
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.56, 0.07, 12, 32]} />
          <meshStandardMaterial color="#ef4444" roughness={0.4} />
        </mesh>

        {/* Yellow Bell */}
        <group position={[0, -0.1, 0.58]}>
          <mesh castShadow>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#eab308" roughness={0.2} metalness={0.5} />
          </mesh>
          {/* Bell line */}
          <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.09, 0.01, 8, 16]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
          {/* Bell sound hole */}
          <mesh position={[0, -0.04, 0.06]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#1e293b" />
          </mesh>
        </group>
      </group>

      {/* BODY GROUP */}
      <group position={[0, 0, 0]}>
        {/* Blue Body */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.62, 32, 32]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* White Belly (Pocket Base) */}
        <mesh position={[0, 0.05, 0.12]} castShadow>
          <sphereGeometry args={[0.52, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>

        {/* 4D Pocket Rim */}
        <mesh position={[0, 0, 0.56]} rotation={[0, 0, Math.PI]}>
          <ringGeometry args={[0.22, 0.24, 32]} />
          <meshBasicMaterial color="#94a3b8" side={2} />
        </mesh>
      </group>

      {/* ARMS & HANDS */}
      {/* Left Arm */}
      <group position={[-0.58, 0.1, 0]} rotation={[0, 0, 0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.45, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Left Hand */}
        <mesh position={[0, -0.26, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>
      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.58, 0.1, 0]} rotation={[0, 0, -0.45]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.45, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Right Hand */}
        <mesh position={[0, -0.26, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>

      {/* LEGS & FEET */}
      {/* Left Leg */}
      <group position={[-0.26, -0.58, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.25, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Left Foot */}
        <mesh position={[0, -0.15, 0.08]} scale={[1.3, 1, 1.6]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>
      {/* Right Leg */}
      <group position={[0.26, -0.58, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.25, 16]} />
          <meshStandardMaterial color="#0284c7" roughness={0.4} />
        </mesh>
        {/* Right Foot */}
        <mesh position={[0, -0.15, 0.08]} scale={[1.3, 1, 1.6]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>

      {/* Foot Gap Reducer */}
      <mesh position={[0, -0.68, 0]}>
        <boxGeometry args={[0.12, 0.12, 0.25]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
    </group>
  );
}
