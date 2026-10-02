import React, { useState, useEffect, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Experience from './components/canvas/Experience';
import Overlay from './components/Overlay';
import Cursor from './components/Cursor';
import AudioToggle from './components/AudioToggle';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const SECTIONS = ['home', 'memories', 'friends', 'adventures', 'love', 'future', 'finale'];

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.8, // Heavy, cinematic scroll inertia duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // slow, premium ease-out curve
      smoothWheel: true,
      wheelMultiplier: 0.95, // heavy, controlled feel
    });

    window.lenis = lenisInstance;

    // Connect Lenis to requestAnimationFrame loop
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial state: locked while loading
    if (!isEntered) {
      lenisInstance.stop();
    } else {
      lenisInstance.start();
    }

    return () => {
      lenisInstance.destroy();
      window.lenis = null;
    };
  }, [isEntered]);

  // Activate scrolling when loaded and entered
  const handleEnter = () => {
    setIsEntered(true);
    if (window.lenis) {
      window.lenis.start();
    }
  };

  // Set up ScrollTrigger indicators to track section indices
  useLayoutEffect(() => {
    if (!isEntered) return;

    const triggers = SECTIONS.map((id, idx) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(idx);
          }
        },
      });
    });

    // Clean up triggers on unmount
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [isEntered]);

  return (
    <div className="relative bg-bgBase text-warmCream min-h-screen overflow-x-hidden select-none">
      {/* Cinematic Custom Cursor */}
      <Cursor />

      {/* Cinematic Ambient Sound Toggle */}
      {isEntered && <AudioToggle activeSection={activeSection} />}

      {/* Cinematic Preloader */}
      <Loader onEnter={handleEnter} />

      {/* Main Experience Layout (Fades in on entering) */}
      <div
        className={`transition-opacity duration-1000 ${
          isEntered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Navbar */}
        <Navbar />

        {/* 3D WebGL Canvas Backdrop */}
        <Experience activeSection={activeSection} isEntered={isEntered} />

        {/* Scrollable Story HTML Sections */}
        <Overlay />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
