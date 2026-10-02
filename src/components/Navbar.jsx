import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { name: 'HOME', href: '#home' },
  { name: 'MEMORIES', href: '#memories' },
  { name: 'FRIENDS', href: '#friends' },
  { name: 'ADVENTURES', href: '#adventures' },
  { name: 'LOVE', href: '#love' },
  { name: 'FUTURE', href: '#future' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { offset: 0, duration: 1.5 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav 
        role="navigation" 
        aria-label="Main navigation" 
        className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex items-center justify-between pointer-events-none"
      >
        {/* Logo */}
        <div className="pointer-events-auto">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            aria-label="Doraemon Memories Home"
            className="text-lg md:text-xl font-display font-bold tracking-widest text-warmCream hover:text-skyBlue transition-colors duration-300"
          >
            DORAEMON
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10 glass px-8 py-3 rounded-full pointer-events-auto">
          {LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[10px] font-ui uppercase tracking-widest text-warmCream/70 hover:text-skyBlue transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <button
            onClick={() => {
              if (window.lenis) {
                window.lenis.scrollTo('#finale', { duration: 2 });
              } else {
                document.querySelector('#finale')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Enter the Story epilogue"
            className="hidden sm:inline-block px-5 py-2 border border-warmCream/10 rounded-full text-[10px] uppercase tracking-widest text-warmCream hover:border-skyBlue hover:text-skyBlue transition-all duration-300"
          >
            Enter the Story
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
            className="lg:hidden p-2 text-warmCream hover:text-skyBlue transition-colors duration-300"
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Cinematic Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation overlay"
            className="fixed inset-0 z-30 bg-bgBase/98 flex flex-col items-center justify-center lg:hidden"
          >
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(12,39,64,0.2)_0%,rgba(5,9,20,1)_80%)] pointer-events-none" />

            <div className="flex flex-col items-center space-y-8 relative z-10">
              {LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.2, duration: 0.5 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-2xl font-display uppercase tracking-widest text-warmCream hover:text-skyBlue transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: LINKS.length * 0.08 + 0.2, duration: 0.5 }}
                onClick={() => {
                  setIsOpen(false);
                  if (window.lenis) {
                    window.lenis.scrollTo('#finale', { duration: 2 });
                  } else {
                    document.querySelector('#finale')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="mt-6 px-8 py-3 bg-skyBlue text-bgBase text-xs uppercase tracking-ultra font-ui font-semibold rounded-full hover:bg-warmCream transition-colors duration-300"
              >
                Enter the Story
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
