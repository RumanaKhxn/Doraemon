import React from 'react';

export default function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo('#home', { duration: 2 });
    } else {
      document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      role="contentinfo" 
      aria-label="Footer" 
      className="w-full bg-[#050914] border-t border-white/5 py-16 px-6 md:px-16 text-warmCream/60 relative z-10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Branding & Subtitle */}
        <div className="text-center md:text-left flex flex-col gap-2">
          <a
            href="#home"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top of the story"
            className="text-2xl font-display font-bold tracking-widest text-warmCream hover:text-skyBlue transition-colors duration-300"
          >
            DORAEMON
          </a>
          <p className="text-[10px] uppercase tracking-ultra text-skyBlue/80 font-ui font-light">
            Memories Beyond Time
          </p>
        </div>

        {/* Navigation links & Socials */}
        <div 
          role="navigation" 
          aria-label="Footer navigation links" 
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-ui tracking-widest"
        >
          <a href="#home" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#home'); }} className="hover:text-skyBlue transition-colors">HOME</a>
          <a href="#memories" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#memories'); }} className="hover:text-skyBlue transition-colors">MEMORIES</a>
          <a href="#friends" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#friends'); }} className="hover:text-skyBlue transition-colors">FRIENDS</a>
          <a href="#adventures" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#adventures'); }} className="hover:text-skyBlue transition-colors">ADVENTURES</a>
          <a href="#love" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#love'); }} className="hover:text-skyBlue transition-colors">LOVE</a>
          <a href="#future" onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#future'); }} className="hover:text-skyBlue transition-colors">FUTURE</a>
        </div>

        {/* Social / Credits */}
        <div className="text-center md:text-right flex flex-col gap-2">
          <div 
            aria-label="Social media references" 
            className="flex justify-center md:justify-end gap-6 text-[10px] uppercase tracking-widest"
          >
            <span className="cursor-pointer hover:text-skyBlue transition-colors" role="link" tabIndex={0} aria-label="Visit Twitter placeholder">TWITTER</span>
            <span className="cursor-pointer hover:text-skyBlue transition-colors" role="link" tabIndex={0} aria-label="Visit Instagram placeholder">INSTAGRAM</span>
            <span className="cursor-pointer hover:text-skyBlue transition-colors" role="link" tabIndex={0} aria-label="Visit Youtube placeholder">YOUTUBE</span>
          </div>
          <p className="text-[9px] uppercase tracking-widest opacity-40">
            © {new Date().getFullYear()} DORAEMON MEMORIES BEYOND TIME. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
