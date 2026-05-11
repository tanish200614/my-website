'use client';

import { useEffect, useState } from 'react';

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-stone-900/90 backdrop-blur-md border-b border-stone-800' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#hero" className="text-amber-400 font-mono font-bold text-lg tracking-wider hover:text-amber-300 transition-colors">
          TD
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-stone-400 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
            >
              {n.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-stone-400 hover:text-amber-400 transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open
              ? <><path d="M6 6l12 12M6 18L18 6" /></>
              : <><path d="M3 6h18M3 12h18M3 18h18" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-6 pb-5 pt-2">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-stone-400 hover:text-amber-400 font-medium border-b border-stone-800 last:border-0 transition-colors"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
