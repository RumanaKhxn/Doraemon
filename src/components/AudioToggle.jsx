import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Music Box Note Frequencies
const NOTES = {
  G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  C6: 1046.50
};

// Doraemon no Uta - Music Box Approximation
const DORAEMON_MELODY = [
  // Kon-na ko-to i-i na
  { n: 'C5', d: 0.5 }, { n: 'C5', d: 0.25 }, { n: 'B4', d: 0.25 }, { n: 'C5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'E5', d: 0.5 },
  // de-ki-ta-ra i-i na
  { n: 'E5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'C5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'C5', d: 1.0 },
  // An-na yu-me kon-na yu-me
  { n: 'C5', d: 0.5 }, { n: 'C5', d: 0.25 }, { n: 'B4', d: 0.25 }, { n: 'C5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'E5', d: 0.5 },
  // ip-pai a-ru ke-do
  { n: 'E5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'C5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'C5', d: 1.0 },
  // Min-na min-na min-na
  { n: 'G5', d: 0.5 }, { n: 'F5', d: 0.25 }, { n: 'E5', d: 0.25 }, { n: 'F5', d: 0.5 }, { n: 'E5', d: 0.5 },
  // ka-na-e-te ku-re-ru
  { n: 'D5', d: 0.5 }, { n: 'C5', d: 0.25 }, { n: 'B4', d: 0.25 }, { n: 'C5', d: 1.0 },
  // Fu-shi-gi na pok-ke de
  { n: 'G4', d: 0.25 }, { n: 'A4', d: 0.25 }, { n: 'B4', d: 0.25 }, { n: 'C5', d: 0.25 }, { n: 'D5', d: 0.5 }, { n: 'E5', d: 0.5 },
  // ka-na-e-te ku-re-ru
  { n: 'F5', d: 0.5 }, { n: 'E5', d: 0.25 }, { n: 'D5', d: 0.25 }, { n: 'C5', d: 1.5 },
  // Rest
  { n: null, d: 1.0 }
];

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const audioElRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Initialize Web Audio nodes or MP3 player
  const initAudio = () => {
    // 1. Try to play the MP3 if the user dropped it in the assets folder
    const audioEl = new Audio('/assets/audio/doraemon_theme.mp3');
    audioEl.loop = true;
    audioEl.volume = 0.5;
    
    audioEl.play().then(() => {
      // Success! MP3 exists and is playing.
      audioElRef.current = audioEl;
      setIsPlaying(true);
      isPlayingRef.current = true;
    }).catch(() => {
      // 2. Fallback to Music Box Synthesizer if MP3 is missing
      console.warn('Doraemon MP3 not found at /assets/audio/doraemon_theme.mp3. Falling back to Music Box Synthesizer.');
      startMusicBox();
    });
  };

  const startMusicBox = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    setIsPlaying(true);
    isPlayingRef.current = true;
    playMelody(ctx, 0, ctx.currentTime);
  };

  const playMelody = (ctx, index, time) => {
    if (!isPlayingRef.current || ctx.state === 'suspended') return;

    const note = DORAEMON_MELODY[index];
    const tempo = 0.7; // seconds per beat
    const duration = note.d * tempo;

    if (note.n) {
      // Play note
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle'; // Music box tone
      osc.frequency.value = NOTES[note.n];

      // Reverb/Delay effect for Music Box feel
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.3;
      const delayGain = ctx.createGain();
      delayGain.gain.value = 0.3;
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Connect to delay line
      gainNode.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(ctx.destination);
      delayGain.connect(delay);

      // Music box envelope: hard attack, exponential decay
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.3, time + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.05);

      osc.start(time);
      osc.stop(time + duration);
    }

    // Schedule next note
    const nextIndex = (index + 1) % DORAEMON_MELODY.length;
    
    // We use setTimeout to schedule ahead slightly to avoid blocking the main thread
    // while keeping Web Audio timing highly accurate
    setTimeout(() => {
      if (isPlayingRef.current) {
        playMelody(ctx, nextIndex, time + duration);
      }
    }, (duration * 1000) * 0.8); // trigger the next call slightly before the current note ends
  };

  const handleToggle = () => {
    if (isPlaying) {
      // Stop
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      // Start
      if (!audioCtxRef.current && !audioElRef.current) {
        initAudio();
      } else {
        if (audioElRef.current) {
          audioElRef.current.play();
        }
        if (audioCtxRef.current) {
          audioCtxRef.current.resume();
          // Restart melody if it was fully stopped, or it will just resume time
          if (!isPlayingRef.current) {
            isPlayingRef.current = true;
            playMelody(audioCtxRef.current, 0, audioCtxRef.current.currentTime);
          }
        }
        setIsPlaying(true);
        isPlayingRef.current = true;
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElRef.current) {
        audioElRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      isPlayingRef.current = false;
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-40 bg-bgDarkNavy/90 hover:bg-skyBlue hover:text-bgBase text-warmCream border border-white/20 rounded-full p-4 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] pointer-events-auto"
      title={isPlaying ? 'Mute Theme Song' : 'Play Doraemon Theme Song'}
    >
      {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
