'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';

const jobs = [
  {
    title: 'Software Engineering Intern',
    company: 'Candela Technologies',
    dept: '',
    period: 'Jul 2026 – Present',
    location: 'Ferndale, WA (Remote)',
    color: 'from-amber-500/10 to-transparent',
    tag: 'SWE',
    bullets: [
      'Integrated 2D LiDAR and IMU data with ROS 2 Cartographer through Ansible-driven deployments for autonomous surveying across 6 client environments',
      'Built multithreaded Python automation pipelines against LANforge REST APIs across 15 access points, cutting test turnaround from 3 days to 4 hours',
      'Synchronized robot telemetry with RSSI and latency metrics using ptp4l/phc2sys hardware time sync to map network performance to spatial coordinates',
      'Resolved ROS 2 multi-subnet connectivity bottlenecks by tuning CycloneDDS discovery settings and analyzing Wireshark captures, reducing downtime 30%',
    ],
    stack: ['Python', 'ROS 2', 'Cartographer', 'Ansible', 'CycloneDDS', 'Wireshark'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'ADNOC Distribution',
    dept: 'EVCI & H2 Department',
    period: 'May 2025 – Jul 2025',
    location: 'Abu Dhabi, UAE',
    color: 'from-stone-700/30 to-transparent',
    tag: 'Backend',
    bullets: [
      'Built an OCPP 1.6 telemetry ingestion service in Python and FastAPI for 400+ EV chargers with 7k+ points per minute at under 100 ms p99 latency',
      'Engineered an XGBoost predictive-maintenance model from 40+ rolling telemetry features, reaching 0.78 PR-AUC and detecting failures 30 minutes before shutdown',
      'Wrote pytest regression coverage for malformed payloads, charger reconnections, duplicate events, and database failures, reducing manual validation time 60%',
    ],
    stack: ['Python', 'FastAPI', 'WebSockets', 'TimescaleDB', 'XGBoost', 'pytest'],
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
              whileHover={{ y: -4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`bg-gradient-to-br ${job.color} bg-stone-800 border border-stone-700 hover:border-amber-500/40 rounded-2xl p-7 transition-colors duration-300 group`}
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
