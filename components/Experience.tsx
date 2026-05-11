'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';

const jobs = [
  {
    title: 'Software Engineering Intern',
    company: 'ADNOC Distribution',
    dept: 'EVCI & H2 Department',
    period: 'May – Jul 2025',
    location: 'Abu Dhabi, UAE',
    color: 'from-amber-500/10 to-transparent',
    tag: 'SWE',
    bullets: [
      'Built React.js dashboard for EV-charger metrics; cut troubleshooting time 25% across 30+ engineers',
      'Traced overheating root cause behind charger downtime — prevented $15k in lost revenue',
      'Prototyped Python ARIMA model predicting temperature impact on uptime (8% MAPE)',
      'Authored 25-page installation guide adopted by 35+ staff across 5 departments',
    ],
    stack: ['React.js', 'Python', 'ARIMA', 'JavaScript', 'REST APIs'],
  },
  {
    title: 'Robotics Engineering Intern',
    company: 'ABB',
    dept: '',
    period: 'Jun – Jul 2023',
    location: 'Abu Dhabi, UAE',
    color: 'from-stone-700/30 to-transparent',
    tag: 'Robotics',
    bullets: [
      'Programmed and optimized welding robot paths in ABB RobotStudio (RAPID)',
      'Designed collision-detection logic; verified across 50+ simulations with zero collisions',
      'Automated fixture collision checks — cut path rework by 30%',
    ],
    stack: ['ABB RobotStudio', 'RAPID', 'Collision Detection', 'Path Planning'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="experience" className="py-28 bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel>Experience</SectionLabel>

        <div ref={ref} className="mt-10 grid md:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`bg-gradient-to-br ${job.color} bg-stone-800 border border-stone-700 hover:border-amber-500/40 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <span className="text-xs font-mono text-amber-500 tracking-widest uppercase">{job.tag}</span>
                  <h3 className="text-stone-100 font-bold text-xl mt-1">{job.title}</h3>
                  <p className="text-amber-400 font-semibold">{job.company}</p>
                  {job.dept && <p className="text-stone-500 text-sm">{job.dept}</p>}
                </div>
                <div className="text-right text-sm text-stone-500 shrink-0">
                  <p>{job.period}</p>
                  <p>{job.location}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-5">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-stone-400 text-sm leading-snug">
                    <span className="text-amber-500 mt-0.5 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 bg-stone-700/60 text-stone-400 text-xs rounded-md font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
