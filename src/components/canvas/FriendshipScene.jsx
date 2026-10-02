import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import StylizedDoraemon from './StylizedDoraemon';
import { Nobita, Shizuka, Gian, Suneo } from './StylizedCharacters';
import ProductionModel from './ProductionModel';
import { ASSET_PATHS } from '../../config/assets';

export default function FriendshipScene({ isActive }) {
  const treeRef = useRef();

  useFrame((state) => {
    if (!isActive) return;
    const t = state.clock.getElapsedTime();
    if (treeRef.current) {
      treeRef.current.rotation.z = Math.sin(t * 0.4) * 0.02;
    }
  });

  return (
    <group position={[0, -1.2, 0]} visible={isActive}>
      {/* Grassy Ground (Bright vacant lot green) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#4ade80" roughness={0.9} />
      </mesh>

      {/* Stylized Tree */}
      <group ref={treeRef} position={[-4.5, 0, -3]}>
        <mesh castShadow receiveShadow position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.2, 0.35, 3.6, 12]} />
          <meshStandardMaterial color="#78350f" roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 3.8, 0]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial color="#22c55e" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0.8, 4.4, 0.5]}>
          <sphereGeometry args={[1.0, 12, 12]} />
          <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </mesh>
      </group>

      {/* ICONIC VACANT LOT CONCRETE PIPES */}
      <group position={[2.5, 0, -2.5]} rotation={[0, -0.6, 0]}>
        {/* Bottom Left Pipe */}
        <mesh position={[-0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 1.8, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh position={[-0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 1.82, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>

        {/* Bottom Right Pipe */}
        <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 1.8, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 1.82, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>

        {/* Top Centered Pipe */}
        <mesh position={[0, 0.82, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 1.8, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.82, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.26, 0.26, 1.82, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
      </group>

      {/* Vacant Lot Wooden Fence */}
      <group position={[0, 0.8, -4.5]}>
        <mesh castShadow>
          <boxGeometry args={[14, 1.6, 0.08]} />
          <meshStandardMaterial color="#ca8a04" roughness={0.9} />
        </mesh>
        <mesh position={[-5, -0.4, 0.05]} castShadow>
          <boxGeometry args={[0.1, 2.0, 0.1]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        <mesh position={[0, -0.4, 0.05]} castShadow>
          <boxGeometry args={[0.1, 2.0, 0.1]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
        <mesh position={[5, -0.4, 0.05]} castShadow>
          <boxGeometry args={[0.1, 2.0, 0.1]} />
          <meshStandardMaterial color="#ca8a04" />
        </mesh>
      </group>

      {/* THE FIVE FRIENDS GATHERED (Wired via ProductionModel) */}
      <group position={[0, 0, 0.5]}>
        {/* Doraemon */}
        <group position={[-1.2, 0, 0]} rotation={[0, 0.5, 0]}>
          <ProductionModel
            url={ASSET_PATHS.doraemon}
            fallback={StylizedDoraemon}
            scale={0.35}
          />
        </group>
        {/* Nobita */}
        <group position={[-0.4, 0, 0.8]} rotation={[0, 0.1, 0]}>
          <ProductionModel
            url={ASSET_PATHS.nobita}
            fallback={Nobita}
            scale={0.35}
            wave={true}
          />
        </group>
        {/* Shizuka */}
        <group position={[0.4, 0, 0.8]} rotation={[0, -0.1, 0]}>
          <ProductionModel
            url={ASSET_PATHS.shizuka}
            fallback={Shizuka}
            scale={0.35}
          />
        </group>
        {/* Suneo */}
        <group position={[1.1, 0, 0]} rotation={[0, -0.5, 0]}>
          <ProductionModel
            url={ASSET_PATHS.suneo}
            fallback={Suneo}
            scale={0.33}
          />
        </group>
        {/* Gian */}
        <group position={[0, 0, -0.8]} rotation={[0, 0, 0]}>
          <ProductionModel
            url={ASSET_PATHS.gian}
            fallback={Gian}
            scale={0.38}
          />
        </group>
      </group>

      {/* Soft daylight lighting */}
      <ambientLight intensity={0.7} color="#fffbeb" />
      <directionalLight
        position={[2, 8, -4]}
        intensity={1.2}
        color="#fffbeb"
        castShadow
        shadow-bias={-0.001}
      />
    </group>
  );
}
