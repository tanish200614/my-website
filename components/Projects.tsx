'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SectionLabel } from './About';

type Tag = 'All' | 'Robotics' | 'Full-Stack';

const projects: { tag: Tag; title: string; role: string; period: string; description: string; bullets: string[]; stack: string[]; github: string; accent: string; badge: string }[] = [
  {
    tag: 'Robotics',
    title: 'Michigan Robomasters',
    role: 'CV Lead & Co-Founder',
    period: 'Aug 2025 – Present',
    description:
      'Co-founded U of M\'s Robomasters team from scratch. Leading the computer vision subteam building real-time armor-plate detection and autonomous shooting systems.',
    bullets: [
      'Lead computer vision subteam building YOLO/OpenCV armor-plate detection',
      'Kalman filtering for real-time target prediction and lead compensation',
      'STM32 embedded motor-control firmware for M3508 drive motors & GM6020 gimbal over CAN/UART',
      'PID control algorithms for motor velocity and position regulation',
    ],
    stack: ['C++', 'ROS 2', 'OpenCV', 'YOLO', 'STM32', 'Python', 'RViz'],
    github: 'https://github.com/tanish200614',
    accent: 'border-amber-500/50 hover:border-amber-400',
    badge: 'bg-amber-500/10 text-amber-400',
  },
  {
    tag: 'Robotics',
    title: 'Michigan Mars Rover',
    role: 'Arm IK Controls Developer',
    period: 'Aug 2024 – Present',
    description:
      'Developing closed-loop inverse kinematics and real-time controls for a 5-DOF robotic arm on a competitive Mars rover.',
    bullets: [
      'Closed-loop Cartesian IK controller improved target alignment accuracy by 20%',
      'Geometric IK solvers integrated into a 30 Hz ROS 2 velocity pipeline with joint-limit checks',
      '<1 cm convergence while reducing motor saturation by 30%',
      'Python reachability point-cloud visualizer cut manual validation time by 50%',
    ],
    stack: ['C++', 'Python', 'ROS 2', 'RViz', 'Eigen', 'NumPy'],
    github: 'https://github.com/tanish200614',
    accent: 'border-stone-600/50 hover:border-amber-500/40',
    badge: 'bg-stone-700/50 text-stone-300',
  },
  {
    tag: 'Robotics',
    title: 'Autonomous Robotic Vehicle (A*)',
    role: 'Path Planning Engineer',
    period: 'Aug 2024 – Jan 2025',
    description:
      'Implemented grid-based path planning for an autonomous robot using the A* search algorithm in ROS 2, adopted by 25+ team members.',
    bullets: [
      'A* search algorithm in C++ within ROS 2 for grid-based path planning',
      'Visualized computed paths in RViz with waypoint grids — cut navigation test time 30%',
      '100% successful obstacle avoidance across all simulation tests',
    ],
    stack: ['C++', 'ROS 2', 'RViz', 'A*', 'Path Planning'],
    github: 'https://github.com/tanish200614',
    accent: 'border-stone-600/50 hover:border-amber-500/40',
    badge: 'bg-stone-700/50 text-stone-300',
  },
  {
    tag: 'Full-Stack',
    title: 'Algorithm Practice Platform',
    role: 'Sole Developer',
    period: 'Sep 2025 – Present',
    description:
      'Real-time multiplayer algorithm battle platform with secure code execution, live matches, and automated interview-style problem generation.',
    bullets: [
      'FastAPI and WebSockets backend supporting 50+ concurrent matches with <150 ms median latency',
      'Secure code execution engine supporting 3 languages and a C++ assembly viewer',
      'Big-O analysis via log-log regression and TF-IDF + k-means approach classification',
      'ELO-seeded matchmaking, 8-player tournament brackets, and live rating updates via SQLite',
      'AI problem and interview generator with 96% validation success and <1.2 s responses',
    ],
    stack: ['React', 'FastAPI', 'Python', 'JavaScript', 'SQLite', 'WebSockets'],
    github: 'https://github.com/tanish200614',
    accent: 'border-stone-600/50 hover:border-amber-500/40',
    badge: 'bg-stone-700/50 text-stone-300',
  },
];

const TABS: Tag[] = ['All', 'Robotics', 'Full-Stack'];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [active, setActive] = useState<Tag>('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.tag === active);

  return (
    <section id="projects" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionLabel>Projects</SectionLabel>

      {/* Filter tabs */}
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-mono transition-all duration-200 ${
              active === tab
                ? 'bg-amber-500 text-stone-900'
                : 'bg-stone-800 text-stone-400 hover:text-amber-400 hover:bg-stone-700 border border-stone-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mt-8 grid md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
        {filtered.map((p) => (
          <motion.div
            key={p.title}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`flex flex-col bg-stone-800 border ${p.accent} rounded-2xl p-6 transition-colors duration-300 hover:-translate-y-1`}
          >
              <div className="mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${p.badge}`}>{p.period}</span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-stone-700/50 text-stone-400">{p.tag}</span>
                </div>
                <h3 className="text-stone-100 font-bold text-lg mt-3">{p.title}</h3>
                <p className="text-amber-400 text-sm font-medium">{p.role}</p>
              </div>

              <p className="text-stone-400 text-sm leading-relaxed mb-4">{p.description}</p>

              <ul className="space-y-1.5 mb-5 flex-1">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-stone-500 text-xs leading-snug">
                    <span className="text-amber-600 mt-0.5 shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map((s) => (
                  <span key={s} className="px-2 py-0.5 bg-stone-700/60 text-stone-400 text-xs rounded font-mono">
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-500 hover:text-amber-400 text-sm transition-colors duration-200 mt-auto"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
