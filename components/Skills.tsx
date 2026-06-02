'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';

const groups = [
  {
    label: 'Languages',
    items: ['C/C++ (OOP)', 'Python', 'JavaScript', 'Java', 'MATLAB', 'Assembly', 'Verilog', 'HTML5/CSS3'],
  },
  {
    label: 'Robotics & Embedded',
    items: ['ROS 2', 'STM32', 'Arduino', 'Raspberry Pi', 'CAN Bus', 'UART', 'ABB RobotStudio', 'RViz'],
  },
  {
    label: 'Web & ML',
    items: ['React', 'FastAPI', 'WebSockets', 'SQLite', 'NumPy', 'pandas', 'Matplotlib', 'SciPy', 'ARIMA', 'OpenCV'],
  },
  {
    label: 'Tools & Platforms',
    items: ['Git', 'GitHub Actions', 'Google Cloud', 'LaTeX', 'Fusion 360', 'AutoCAD', 'Pytest', 'ModelSim'],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="skills" className="py-28 bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionLabel>Skills</SectionLabel>

        <div ref={ref} className="mt-10 grid sm:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-stone-800 border border-stone-700 rounded-2xl p-6"
            >
              <p className="text-amber-400 font-mono text-xs tracking-widest uppercase mb-4">{g.label}</p>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 bg-stone-700/70 hover:bg-amber-500/10 hover:text-amber-300 text-stone-300 text-sm rounded-lg font-mono transition-all duration-200 cursor-default hover:border-amber-500/30 border border-transparent"
                  >
                    {item}
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
