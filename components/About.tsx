'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '4.0', label: 'GPA', sub: 'University Honors · Dean\'s List' },
  { value: '2', label: 'Internships', sub: 'ADNOC · ABB Robotics' },
  { value: '3+', label: 'Projects', sub: 'Active & shipped' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <SectionLabel>About</SectionLabel>

        <div className="mt-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-stone-400 text-lg leading-relaxed">
            <p>
              I&apos;m a{' '}
              <span className="text-amber-400 font-semibold">Computer Engineering student</span>{' '}
              at the University of Michigan (graduating 2027), building at the intersection of
              robotics, machine learning, and full-stack software.
            </p>
            <p>
              I&apos;ve shipped production software at <span className="text-stone-200">ADNOC</span> in Abu Dhabi, programmed
              industrial welding robots at <span className="text-stone-200">ABB</span>, and co-founded
              Michigan&apos;s <span className="text-stone-200">Robomasters</span> team from the ground up.
            </p>
            <p>
              I care about systems that work in the real world — whether that&apos;s a robot arm that
              never loses its TCP clearance, or an API that hits 150&nbsp;ms under load.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-stone-800 border border-stone-700 hover:border-amber-500/50 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-3xl font-bold text-amber-400 font-mono">{s.value}</p>
                <p className="text-stone-200 font-semibold mt-1 text-sm">{s.label}</p>
                <p className="text-stone-500 text-xs mt-1 leading-snug">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-stone-800" />
      <h2 className="text-amber-400 font-mono text-sm tracking-[0.3em] uppercase">{children}</h2>
      <div className="h-px flex-1 bg-stone-800" />
    </div>
  );
}
