import React from 'react';
import { motion } from 'framer-motion';

const SECTION_DATA = [
  {
    id: 'home',
    alignment: 'justify-start',
    label: 'CHAPTER I — THE INCEPTION',
    title: 'DORAEMON',
    subtitle: 'MEMORIES BEYOND TIME',
    desc: 'A journey through friendship, adventure and childhood.',
    lyric: '"I have so many dreams, so many wishes...\nWith a wondrous gadget, he makes them all come true!"',
    cta: 'ENTER THE STORY',
    secondary: 'SCROLL TO EXPLORE',
  },
  {
    id: 'memories',
    alignment: 'justify-end',
    label: 'CHAPTER II — RETROSPECTIVE',
    title: 'MEMORIES',
    desc: 'Some moments never grow old. Revisit the fragments of time spent in the small study room.',
    hasGallery: true,
  },
  {
    id: 'friends',
    alignment: 'justify-start',
    label: 'CHAPTER III — SOLIDARITY',
    title: 'FRIENDSHIP',
    desc: 'Some friends become part of who we are. Gathered at the vacant lot, sharing laughter and dreams.',
  },
  {
    id: 'adventures',
    alignment: 'justify-end',
    label: 'CHAPTER IV — ESCAPISM',
    title: 'ADVENTURE',
    desc: 'Every ordinary day could become extraordinary when you have the Anywhere Door.',
    hasAdventures: true,
  },
  {
    id: 'love',
    alignment: 'justify-start',
    label: 'CHAPTER V — BENEVOLENCE',
    title: 'LOVE',
    desc: 'Not every kind of love needs words. A silent sunset speaks volumes.',
  },
  {
    id: 'future',
    alignment: 'justify-end',
    label: 'CHAPTER VI — DESTINY',
    title: 'THE FUTURE',
    desc: 'What if the future was only another adventure? The bond remains unbroken.',
  },
];

const MEMORY_IMAGES = [
  { title: 'The First Meeting', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' },
  { title: 'Study Desk', img: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400&q=80' },
  { title: 'Sunset Talks', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80' }
];

const ADVENTURE_IMAGES = [
  { title: 'Dinosaur Kingdom', img: 'https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=400&q=80' },
  { title: 'Cloud Kingdom', img: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=400&q=80' },
  { title: 'Steel Troops', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80' },
  { title: 'Little Space War', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80' }
];

function MemoryGallery() {
  return (
    <div className="flex gap-3 md:gap-4 mt-3 md:mt-6 overflow-x-auto pb-4 w-full snap-x scrollbar-hide">
      {MEMORY_IMAGES.map((mem, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 + idx * 0.15 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative shrink-0 min-w-[130px] md:min-w-[200px] h-[160px] md:h-[280px] rounded-xl overflow-hidden shadow-lg border border-white/10 snap-center group cursor-pointer"
        >
          <div className="absolute inset-0 bg-bgDarkNavy/40 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img src={mem.img} alt={mem.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent z-20">
            <p className="text-warmCream text-[10px] md:text-sm font-display font-medium tracking-wide leading-tight">{mem.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AdventureGallery() {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-4 mt-3 md:mt-6 w-full">
      {ADVENTURE_IMAGES.map((adv, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
          whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
          className="relative h-[90px] md:h-[160px] rounded-lg overflow-hidden shadow-md border border-skyBlue/20 group cursor-pointer"
        >
          <div className="absolute inset-0 bg-skyBlue/30 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
          <img src={adv.img} alt={adv.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/20 transition-colors duration-500 z-20">
            <p className="text-warmCream text-[9px] md:text-xs uppercase tracking-widest font-ui font-semibold text-center px-2 drop-shadow-md">
              {adv.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SectionPanel({ section, index }) {
  const isRight = section.alignment === 'justify-end';

  return (
    <section
      id={section.id}
      className={`min-h-[100vh] md:min-h-[85vh] w-full flex items-center ${section.alignment} px-4 md:px-24 py-16 md:py-12 relative z-10`}
    >
      {/* Localized Glassmorphism card */}
      <motion.div
        whileHover={{ boxShadow: '0 0 25px rgba(255,255,255,0.05)' }}
        className={`max-w-2xl w-full p-6 md:p-10 rounded-2xl bg-bgDarkNavy/70 backdrop-blur-md border border-white/10 flex flex-col gap-3 md:gap-5 text-left ${
          isRight ? 'md:text-right md:items-end' : 'md:text-left md:items-start'
        } transition-shadow duration-500`}
      >
        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[9px] md:text-[11px] uppercase tracking-ultra font-ui text-skyBlue font-semibold"
        >
          {section.label}
        </motion.span>

        {/* Heading Title */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 40 }}
            whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.3, ease: [0.215, 0.610, 0.355, 1], delay: 0.2 }}
            className="text-clamp-h2 font-display font-bold tracking-widest text-warmCream leading-none"
          >
            {section.title}
          </motion.h2>
        </div>

        {/* Subtitle */}
        {section.subtitle && (
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.5 }}
            className="text-clamp-h3 uppercase tracking-ultra text-skyBlue font-light -mt-1 md:-mt-2"
          >
            {section.subtitle}
          </motion.h3>
        )}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.4 }}
          className="text-[14px] md:text-[16px] xl:text-[18px] text-warmCream/80 font-light leading-relaxed font-sans mt-1"
        >
          {section.desc}
        </motion.p>

        {/* Nostalgic Lyric */}
        {section.lyric && (
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-2 pl-4 border-l-2 border-skyBlue/50 text-skyBlue italic font-sans text-sm md:text-base leading-relaxed whitespace-pre-line drop-shadow-md"
          >
            {section.lyric}
          </motion.blockquote>
        )}

        {/* Dynamic Modules */}
        {section.hasGallery && <MemoryGallery />}
        {section.hasAdventures && <AdventureGallery />}

        {/* CTA Buttons for Hero */}
        {section.cta && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-5 mt-4 md:mt-6 w-full sm:w-auto"
          >
            <button
              onClick={() => {
                window.lenis?.scrollTo('#memories', { duration: 1.5 });
              }}
              className="w-full sm:w-auto px-6 py-3 md:py-4 bg-skyBlue text-bgBase text-[9px] md:text-[10px] uppercase tracking-widest font-ui font-semibold rounded hover:bg-warmCream active:scale-95 transition-all duration-300 shadow-md"
            >
              {section.cta}
            </button>
            <button
              onClick={() => {
                window.lenis?.scrollTo('#finale', { duration: 2.5 });
              }}
              className="w-full sm:w-auto px-6 py-3 md:py-4 border border-warmCream/20 text-warmCream hover:border-skyBlue hover:text-skyBlue active:scale-95 text-[9px] md:text-[10px] uppercase tracking-widest font-ui rounded transition-all duration-300"
            >
              {section.secondary}
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

export default function Overlay() {
  return (
    <div className="relative w-full z-10 flex flex-col pt-10 pb-20 overflow-x-hidden">
      {/* Narrative Chapters */}
      {SECTION_DATA.map((section, idx) => (
        <SectionPanel key={section.id} section={section} index={idx} />
      ))}

      {/* FINALE SECTION */}
      <section
        id="finale"
        className="min-h-[90vh] md:min-h-[80vh] w-full flex items-center justify-center text-center px-4 md:px-6 py-12 relative z-10"
      >
        <motion.div
          whileHover={{ boxShadow: '0 0 30px rgba(255,255,255,0.08)' }}
          className="glass p-8 md:p-12 rounded-2xl flex flex-col items-center gap-4 md:gap-6 max-w-2xl w-full transition-shadow duration-500 bg-bgDarkNavy/70 backdrop-blur-md border border-white/10"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="text-[9px] md:text-[10px] uppercase tracking-ultra font-ui text-skyBlue font-semibold"
          >
            EPILOGUE — FOREVER AFTER
          </motion.span>

          <div className="flex flex-col gap-2 md:gap-3 overflow-hidden">
            <motion.h2
              initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 35 }}
              whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.215, 0.610, 0.355, 1], delay: 0.2 }}
              className="text-clamp-h2 font-display font-medium text-warmCream tracking-widest leading-tight"
            >
              CHILDHOOD ENDS.
            </motion.h2>
            <motion.h2
              initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', y: 35 }}
              whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 1.2, ease: [0.215, 0.610, 0.355, 1], delay: 0.4 }}
              className="text-clamp-h2 font-display font-medium text-skyBlue tracking-widest leading-tight"
            >
              MEMORIES DON'T.
            </motion.h2>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="h-[1px] w-16 md:w-24 bg-white/10 my-2 md:my-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.0, delay: 0.65 }}
            className="text-[12px] md:text-[14px] text-warmCream/70 italic max-w-sm mb-2"
          >
            "Even when we grow up, and the days go by... I will never forget the magic we shared."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="flex flex-col gap-1"
          >
            <h3 className="text-[20px] md:text-clamp-h3 font-display uppercase tracking-widest text-warmCream">
              DORAEMON
            </h3>
            <p className="text-[9px] md:text-[10px] uppercase tracking-ultra text-skyBlue font-light">
              Memories Beyond Time
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            onClick={() => {
              window.lenis?.scrollTo('#home', { duration: 2 });
            }}
            className="mt-4 md:mt-6 w-full sm:w-auto px-8 py-3 md:py-4 bg-transparent border border-skyBlue/30 text-warmCream hover:bg-skyBlue hover:text-bgBase text-[9px] md:text-xs uppercase tracking-ultra font-ui font-medium rounded transition-colors duration-500 shadow-md"
          >
            Restart The Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
