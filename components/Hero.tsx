'use client';

import { useEffect, useState } from 'react';
import RobotSVG from './RobotSVG';

const ROLES = ['Computer Engineer', 'Robotics Developer', 'ML Engineer', 'Full-Stack Developer'] as const;

function Typewriter() {
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[idx];
    if (!deleting && text.length < role.length) {
      const t = setTimeout(() => setText(role.slice(0, text.length + 1)), 85);
      return () => clearTimeout(t);
    }
    if (!deleting && text.length === role.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }
    if (deleting && text.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % ROLES.length);
    }
  }, [text, deleting, idx]);

  return (
    <span className="text-amber-400 font-mono text-lg md:text-xl">
      {text}
      <span className="cursor-blink text-amber-400 ml-0.5">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden bg-stone-900"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">

        {/* Left: Text */}
        <div className="flex-1 flex flex-col gap-5 text-center md:text-left">
          <p className="text-amber-500 text-sm font-mono tracking-widest uppercase">
            Computer Engineering @ University of Michigan
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-stone-100">Tanish</span>
            <br />
            <span className="text-amber-400">Dalal.</span>
          </h1>

          <div className="h-7">
            <Typewriter />
          </div>

          <p className="text-stone-400 text-base max-w-md mx-auto md:mx-0 leading-relaxed">
            Building robots, training models, and shipping full-stack products.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-2">
            <a
              href="#projects"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-stone-600 hover:border-amber-400 text-stone-300 hover:text-amber-400 font-semibold rounded-lg transition-all duration-200"
            >
              Get in Touch
            </a>
            <a
              href="/resume-2.pdf"
              download
              className="px-6 py-3 border border-stone-600 hover:border-amber-400 text-stone-300 hover:text-amber-400 font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-4 justify-center md:justify-start mt-1">
            <a
              href="https://github.com/tanish200614"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-amber-400 transition-colors duration-200"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/dalal-tanish"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-amber-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:tanishdalal14@gmail.com"
              className="text-stone-500 hover:text-amber-400 transition-colors duration-200"
              aria-label="Email"
            >
              <MailIcon />
            </a>
          </div>
        </div>

        {/* Right: Robot */}
        <div className="flex-1 flex items-center justify-center w-full max-w-sm md:max-w-none">
          <RobotSVG />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-600 text-xs animate-bounce">
        <span className="font-mono tracking-widest">scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
