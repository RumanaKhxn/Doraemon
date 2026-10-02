import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import NeighborhoodScene from './NeighborhoodScene';
import NobitaRoomScene from './NobitaRoomScene';
import FriendshipScene from './FriendshipScene';
import AdventureScene from './AdventureScene';
import LoveScene from './LoveScene';
import FutureScene from './FutureScene';
import FinaleScene from './FinaleScene';
import FallbackBackground from '../FallbackBackground';

gsap.registerPlugin(ScrollTrigger);

// Vertical Y offsets for stacked coordinate scenes
const SCENE_OFFSETS = {
  hero: 0,
  memories: -20,
  friendship: -40,
  adventure: -60,
  love: -80,
  future: -100,
  finale: -120
};

// Bright, warm, recognizable Doraemon anime-style color grading targets
const FOG_COLORS = [
  '#bae6fd', // Hero (Daylight Sky Blue)
  '#fef3c7', // Memories (Warm Study Afternoon Cream)
  '#bae6fd', // Friendship (Grassy daylight field blue)
  '#e9d5ff', // Adventure (Soft magical sky violet)
  '#fed7aa', // Love (Sunset Orange)
  '#a5f3fc', // Future (Glowing cyber sky cyan)
  '#fed7aa'  // Finale (Soft warm twilight sky)
];

// WebGL context detection utility
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

function CameraController({ activeSection, isEntered }) {
  const { camera, scene, gl } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, -0.4, 0));
  
  // High-performance animated state object (GSAP drives this; read in useFrame)
  const camState = useRef({
    x: 0,
    y: 1.0,
    z: 7.5,
    tx: 0,
    ty: -0.4,
    tz: 0,
    roll: 0
  });

  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
  }, []);

  // Initialize ScrollTrigger scrub timeline
  useLayoutEffect(() => {
    if (!isEntered) return;

    camera.position.set(0, 1.0, 7.5);
    currentLookAt.current.set(0, -0.4, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.8,
      }
    });

    // 1. Transition: Hero -> Memories
    tl.to(camState.current, {
      x: 0.5,
      y: SCENE_OFFSETS.memories + 1.5,
      z: 5.0,
      tx: 0.2,
      ty: SCENE_OFFSETS.memories + 0.4,
      tz: -1.0,
      roll: 0,
      ease: 'sine.inOut'
    })
    // 2. Transition: Memories -> Friendship
    .to(camState.current, {
      x: 0.0,
      y: SCENE_OFFSETS.friendship + 2.0,
      z: 6.0,
      tx: 0.0,
      ty: SCENE_OFFSETS.friendship + 0.4,
      tz: 0.0,
      roll: 0,
      ease: 'sine.inOut'
    })
    // 3. Transition: Friendship -> Adventure
    .to(camState.current, {
      x: 0.0,
      y: SCENE_OFFSETS.adventure + 1.8,
      z: 6.5,
      tx: 0.0,
      ty: SCENE_OFFSETS.adventure + 0.3,
      tz: 0.0,
      roll: 0,
      ease: 'power2.inOut'
    })
    // 4. Transition: Adventure -> Love
    .to(camState.current, {
      x: 0.8,
      y: SCENE_OFFSETS.love + 1.4,
      z: 5.5,
      tx: 0.3,
      ty: SCENE_OFFSETS.love + 0.2,
      tz: -0.5,
      roll: 0,
      ease: 'power1.inOut'
    })
    // 5. Transition: Love -> Future (Z-roll spin)
    .to(camState.current, {
      x: 0.0,
      y: SCENE_OFFSETS.future + 0.0,
      z: 5.2,
      tx: 0.0,
      ty: SCENE_OFFSETS.future + 0.0,
      tz: 0.0,
      roll: reduceMotion ? 0 : Math.PI * 2,
      ease: 'power2.inOut'
    })
    // 6. Transition: Future -> Finale
    .to(camState.current, {
      x: 0.0,
      y: SCENE_OFFSETS.finale + 1.6,
      z: 6.2,
      tx: 0.4,
      ty: SCENE_OFFSETS.finale + 0.3,
      tz: -2.0,
      roll: reduceMotion ? 0 : Math.PI * 2,
      ease: 'sine.out'
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [isEntered, reduceMotion, camera]);

  useFrame((state) => {
    const pointer = state.pointer;
    const cur = camState.current;

    // Apply pointer parallax if motion allowed
    const parallaxX = reduceMotion ? 0 : pointer.x * 0.35;
    const parallaxY = reduceMotion ? 0 : pointer.y * 0.25;

    // Smoothly lerp camera position
    const targetPos = new THREE.Vector3(
      cur.x + parallaxX,
      cur.y + parallaxY,
      cur.z
    );
    camera.position.lerp(targetPos, 0.06);

    // Smoothly lerp camera target lookAt
    const targetLookAt = new THREE.Vector3(cur.tx, cur.ty, cur.tz);
    currentLookAt.current.lerp(targetLookAt, 0.06);
    camera.lookAt(currentLookAt.current);

    // Apply camera roll
    if (!reduceMotion) {
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, cur.roll, 0.06);
    }

    // Dynamic Fog and Clear Color grading transitions (60fps)
    if (scene.fog) {
      const targetFogColor = new THREE.Color(FOG_COLORS[activeSection] || FOG_COLORS[0]);
      scene.fog.color.lerp(targetFogColor, 0.04);
      gl.setClearColor(scene.fog.color);
    }
  });

  return null;
}

export default function Experience({ activeSection, isEntered }) {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check WebGL availability and screen size
  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // WebGL Fallback layout
  if (!hasWebGL) {
    return <FallbackBackground activeSection={activeSection} />;
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-bgBase">
      <Canvas
        shadows={!isMobile} // Disable shadows on mobile to maintain FPS
        gl={{ 
          antialias: !isMobile, // Lower antialias quality on mobile
          alpha: false, 
          powerPreference: "high-performance" 
        }}
        className="w-full h-full"
      >
        <CameraController activeSection={activeSection} isEntered={isEntered} />

        {/* Ambient Fog initialized with Bright Sky Blue */}
        <fog attach="fog" args={[FOG_COLORS[0], 6, 22]} />

        {/* Global bright warm sunlight simulation */}
        <ambientLight intensity={0.7} color="#fffef0" />
        <directionalLight
          position={[5, 12, 5]}
          intensity={1.3}
          color="#fffbeb"
          castShadow={!isMobile}
          shadow-mapSize={[512, 512]}
          shadow-bias={-0.001}
        />

        {/* Vertical scene stacks */}
        <group position={[0, SCENE_OFFSETS.hero, 0]}>
          <NeighborhoodScene isActive={activeSection === 0 || activeSection === 1} />
        </group>

        <group position={[0, SCENE_OFFSETS.memories, 0]}>
          <NobitaRoomScene isActive={activeSection === 0 || activeSection === 1 || activeSection === 2} />
        </group>

        <group position={[0, SCENE_OFFSETS.friendship, 0]}>
          <FriendshipScene isActive={activeSection === 1 || activeSection === 2 || activeSection === 3} />
        </group>

        <group position={[0, SCENE_OFFSETS.adventure, 0]}>
          <AdventureScene isActive={activeSection === 2 || activeSection === 3 || activeSection === 4} />
        </group>

        <group position={[0, SCENE_OFFSETS.love, 0]}>
          <LoveScene isActive={activeSection === 3 || activeSection === 4 || activeSection === 5} />
        </group>

        <group position={[0, SCENE_OFFSETS.future, 0]}>
          <FutureScene isActive={activeSection === 4 || activeSection === 5 || activeSection === 6} />
        </group>

        <group position={[0, SCENE_OFFSETS.finale, 0]}>
          <FinaleScene isActive={activeSection === 5 || activeSection === 6} />
        </group>

      </Canvas>
    </div>
  );
}
