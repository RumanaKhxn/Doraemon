import React from 'react';

const GRADIENTS = [
  'from-[#050914] to-[#071426]', // Hero
  'from-[#0c2740] via-[#181512] to-[#050914]', // Memories (Warm cream/wood shadow)
  'from-[#071426] via-[#0284c7]/10 to-[#050914]', // Friendship (Daylight blue)
  'from-[#250f38] via-[#ec4899]/10 to-[#050914]', // Adventure (Magical purple)
  'from-[#3b1406] via-[#fb923c]/10 to-[#050914]', // Love (Sunset orange)
  'from-[#03050c] via-[#38bdf8]/10 to-[#050914]', // Future (Deep space blue)
  'from-[#050914] via-[#0c2740]/20 to-[#050914]' // Finale (Night blue)
];

const PARTICLE_COLORS = [
  'bg-skyBlue/30',      // Hero
  'bg-warmCream/30',    // Memories
  'bg-skyBlue/40',      // Friendship
  'bg-pink-400/30',     // Adventure
  'bg-sunsetOrange/30', // Love
  'bg-skyBlue/40',      // Future
  'bg-warmCream/20'     // Finale
];

export default function FallbackBackground({ activeSection }) {
  const gradientClass = GRADIENTS[activeSection] || GRADIENTS[0];
  const particleColor = PARTICLE_COLORS[activeSection] || PARTICLE_COLORS[0];

  // Generate stable mock offsets for 20 particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 7) % 95 + 3}%`,
      delay: `${(i * 0.4) % 8}s`,
      duration: `${12 + (i % 7) * 3}s`,
      size: `${4 + (i % 6)}px`,
      swing: `${(i * 15) % 40 + 20}px`
    }));
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-bgBase transition-all duration-1000 ease-in-out pointer-events-none">
      {/* Dynamic Gradient Layer */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradientClass} transition-all duration-1000 ease-in-out`} />

      {/* Subtle Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute bottom-[-10px] rounded-full ${particleColor} transition-colors duration-1000`}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animation: `floatUp ${p.duration} infinite linear`,
              animationDelay: p.delay,
              '--swing-x': p.swing
            }}
          />
        ))}
      </div>

      {/* CSS Keyframe definition for floating particles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-105vh) translateX(var(--swing-x));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
