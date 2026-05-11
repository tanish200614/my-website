'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionLabel>Contact</SectionLabel>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mt-10 grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto"
      >
        {/* Left: intro */}
        <div className="space-y-4">
          <h3 className="text-stone-100 text-3xl font-bold">Let&apos;s build something.</h3>
          <p className="text-stone-400 leading-relaxed">
            Whether it&apos;s a robotics project, internship opportunity, or something I haven&apos;t thought of —
            my inbox is open.
          </p>

          <div className="pt-4 flex gap-5">
            <a
              href="https://github.com/tanish200614"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-stone-500 hover:text-amber-400 transition-colors duration-200"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/dalal-tanish"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-stone-500 hover:text-amber-400 transition-colors duration-200"
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:tanishdalal14@gmail.com"
              aria-label="Email"
              className="text-stone-500 hover:text-amber-400 transition-colors duration-200"
            >
              <MailIcon />
            </a>
          </div>
        </div>

        {/* Right: form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-stone-400 text-xs font-mono tracking-wider uppercase">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-stone-800 border border-stone-700 focus:border-amber-500 focus:outline-none text-stone-100 placeholder-stone-600 rounded-lg px-4 py-2.5 text-sm transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-stone-400 text-xs font-mono tracking-wider uppercase">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-stone-800 border border-stone-700 focus:border-amber-500 focus:outline-none text-stone-100 placeholder-stone-600 rounded-lg px-4 py-2.5 text-sm transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-stone-400 text-xs font-mono tracking-wider uppercase">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind?"
              className="bg-stone-800 border border-stone-700 focus:border-amber-500 focus:outline-none text-stone-100 placeholder-stone-600 rounded-lg px-4 py-2.5 text-sm transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-stone-900 font-semibold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] text-sm"
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message sent ✓' : 'Send Message'}
          </button>

          {status === 'sent' && (
            <p className="text-amber-500/70 text-xs text-center">Message delivered to my inbox.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400/70 text-xs text-center">Something went wrong — try emailing directly at tanishdalal14@gmail.com</p>
          )}
        </form>
      </motion.div>

      <div className="mt-24 pt-8 border-t border-stone-800 text-center text-stone-600 text-sm font-mono">
        <p>Tanish Dalal · University of Michigan · Class of 2028</p>
      </div>
    </section>
  );
}

function GitHubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
