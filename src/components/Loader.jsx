import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

export default function Loader({ onEnter }) {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Smooth progress simulation that checks actual Drei progress
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const target = Math.max(progress, prev);
        if (prev < 100) {
          // Increment speed
          const next = prev + Math.max(1, Math.floor((100 - prev) * 0.1));
          return Math.min(next, 100);
        }
        clearInterval(interval);
        return 100;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (displayProgress >= 100) {
      const timer = setTimeout(() => setIsLoaded(true), 600);
      return () => clearTimeout(timer);
    }
  }, [displayProgress]);

  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => {
      onEnter();
    }, 1000); // Allow fadeout animation time
  };

  return (
    <AnimatePresence>
      {!isStarted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-bgBase text-warmCream px-6 py-16"
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,39,64,0.15)_0%,rgba(5,9,20,1)_80%)] pointer-events-none" />

          {/* Top cinematic text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-xs uppercase tracking-ultra font-ui text-skyBlue text-center"
          >
            A Cinematic Interactive Experience
          </motion.div>

          {/* Core Branding */}
          <div className="flex flex-col items-center text-center max-w-4xl relative">
            <motion.h1
              initial={{ letterSpacing: '0.1em', opacity: 0 }}
              animate={{ letterSpacing: '0.3em', opacity: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-warmCream to-skyBlue mb-4"
            >
              DORAEMON
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="text-lg md:text-xl uppercase tracking-ultra font-sans text-warmCream font-light"
            >
              Memories Beyond Time
            </motion.p>
          </div>

          {/* Loading indicator / CTA */}
          <div className="w-full max-w-xs flex flex-col items-center relative h-24 justify-center">
            <AnimatePresence mode="wait">
              {!isLoaded ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  {/* Progress Line */}
                  <div className="w-48 h-[1px] bg-bgDeepBlue relative overflow-hidden mb-3">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-skyBlue"
                      initial={{ width: 0 }}
                      animate={{ width: `${displayProgress}%` }}
                      transition={{ ease: 'easeOut' }}
                      style={{ width: `${displayProgress}%` }}
                    />
                  </div>
                  <span className="text-sm font-ui tracking-widest text-skyBlue">
                    {displayProgress}%
                  </span>
                </motion.div>
              ) : (
                <motion.button
                  key="cta"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  onClick={handleStart}
                  className="group relative px-8 py-3 bg-transparent border border-skyBlue/30 text-warmCream hover:text-bgBase overflow-hidden transition-colors duration-500 rounded"
                >
                  {/* Hover bg overlay */}
                  <div className="absolute inset-0 bg-skyBlue scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
                  <span className="relative z-10 text-xs uppercase tracking-ultra font-ui font-medium">
                    Enter the Story
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
