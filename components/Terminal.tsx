'use client';

import { useState, useRef, useEffect } from 'react';

type Line = { type: 'input' | 'output' | 'error' | 'info'; content: string };

const SECTIONS = ['hero', 'about', 'experience', 'projects', 'skills', 'contact'] as const;

function processCommand(raw: string): { lines: Line[]; clear?: boolean } {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();

  const out = (...lines: string[]): Line[] => lines.map(c => ({ type: 'output' as const, content: c }));
  const err = (content: string): Line[] => [{ type: 'error', content }];
  const info = (content: string): Line[] => [{ type: 'info', content }];

  switch (cmd) {
    case 'help':
      return { lines: out(
        'Available commands:',
        '',
        '  about            Who I am',
        '  skills           Tech stack & tools',
        '  experience       Work history',
        '  projects         Things I\'ve built',
        '  contact          Get in touch',
        '  goto <section>   Scroll to a section',
        '  ls               List sections',
        '  clear            Clear the terminal',
        '',
        'Tip: use ↑ ↓ for command history, Esc to close',
      )};

    case 'about':
    case 'whoami':
      return { lines: out(
        'Tanish Dalal',
        'Computer Engineering @ University of Michigan (Class of 2028)',
        '',
        'Building at the intersection of robotics, ML, and full-stack software.',
        'From Abu Dhabi. Currently in Ann Arbor.',
        '',
        'GPA: 4.0  ·  Dean\'s List  ·  University Honors',
      )};

    case 'skills':
      return { lines: out(
        'Languages    C/C++, Python, JavaScript, Java, MATLAB, Verilog, Assembly',
        'Robotics     ROS 2, STM32, Arduino, Raspberry Pi, CAN, UART, RViz',
        'Web & ML     React, FastAPI, NumPy, pandas, OpenCV, ARIMA, SciPy',
        'Tools        Git, GitHub Actions, Google Cloud, Fusion 360, AutoCAD',
      )};

    case 'experience':
    case 'work':
      return { lines: out(
        'Software Engineering Intern  ·  ADNOC Distribution  ·  May–Jul 2025',
        '  ▸ React dashboard for EV-charger metrics — cut troubleshooting time 25%',
        '  ▸ Python ARIMA model for temperature/uptime prediction (8% MAPE)',
        '  ▸ Traced overheating root cause — prevented $15k in lost revenue',
        '',
        'Robotics Engineering Intern  ·  ABB  ·  Jun–Jul 2023',
        '  ▸ Programmed welding robot paths in ABB RobotStudio (RAPID)',
        '  ▸ Collision-detection logic verified across 50+ simulations',
        '  ▸ Automated fixture checks — cut path rework by 30%',
      )};

    case 'projects':
      return { lines: out(
        'Michigan Robomasters  ·  CV Lead & Co-Founder',
        '  Real-time YOLO armor-plate detection & autonomous shooting systems',
        '  Stack: C++, ROS 2, OpenCV, YOLO, STM32',
        '',
        'Michigan Mars Rover  ·  Arm IK Controls Developer',
        '  5-DOF inverse kinematics for a competitive Mars rover arm',
        '  Stack: C++, ROS 2, RViz',
        '',
        'Autonomous Robotic Vehicle (A*)  ·  Path Planning Engineer',
        '  A* grid-based path planning in ROS 2 — 100% obstacle avoidance in simulation',
        '  Stack: C++, ROS 2, RViz',
        '',
        'Algorithm Practice Platform  ·  Sole Developer',
        '  Full-stack LeetCode-style platform with sandboxed Python executor',
        '  Stack: React, FastAPI, Python',
      )};

    case 'contact':
    case 'social':
      return { lines: out(
        'Email     tanishdalal14@gmail.com',
        'GitHub    github.com/tanish200614',
        'LinkedIn  linkedin.com/in/dalal-tanish',
      )};

    case 'ls':
      return { lines: out(SECTIONS.map(s => s + '/').join('  ')) };

    case 'goto':
    case 'cd':
    case 'navigate': {
      const target = parts[1]?.toLowerCase();
      if (!target) return { lines: err(`Usage: goto <section>  (${SECTIONS.join(', ')})`) };
      const section = SECTIONS.find(s => s === target);
      if (!section) return { lines: err(`Not found: "${target}". Sections: ${SECTIONS.join(', ')}`) };
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
      return { lines: info(`Navigating to #${section}…`) };
    }

    case 'echo':
      return { lines: out(parts.slice(1).join(' ') || '') };

    case 'clear':
      return { lines: [], clear: true };

    case '':
      return { lines: [] };

    default:
      return { lines: err(`Command not found: "${cmd}". Type "help".`) };
  }
}

const WELCOME: Line[] = [
  { type: 'info', content: 'tanish@portfolio — bash' },
  { type: 'output', content: 'Type "help" to see available commands.' },
  { type: 'output', content: '' },
];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const submit = () => {
    const raw = input;
    setInput('');
    if (raw.trim()) {
      setCmdHistory(h => [raw, ...h]);
      setHistoryIdx(-1);
    }
    const { lines: result, clear } = processCommand(raw);
    if (clear) {
      setLines(WELCOME);
    } else {
      const echo: Line = { type: 'input', content: raw };
      setLines(l => [...l, echo, ...result]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      if (cmdHistory[newIdx] !== undefined) setInput(cmdHistory[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : (cmdHistory[newIdx] ?? ''));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Open terminal (Ctrl+`)"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-stone-900 border border-stone-700 hover:border-amber-500 rounded-xl flex items-center justify-center text-stone-400 hover:text-amber-400 transition-all duration-200 shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-2xl bg-stone-950 border border-stone-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-stone-900 border-b border-stone-800 select-none">
              <button
                onClick={() => setOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="mx-auto text-stone-500 text-xs font-mono tracking-wider">tanish@portfolio — bash</span>
            </div>

            <div
              className="h-72 overflow-y-auto p-4 space-y-0.5 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`font-mono text-sm leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input'  ? 'text-amber-400' :
                    line.type === 'error'  ? 'text-red-400' :
                    line.type === 'info'   ? 'text-amber-300 font-semibold' :
                                             'text-stone-300'
                  }`}
                >
                  {line.type === 'input' ? `$ ${line.content}` : (line.content || ' ')}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div
              className="flex items-center gap-2 px-4 py-3 border-t border-stone-800 bg-stone-900/40 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="text-amber-500 font-mono text-sm select-none">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-stone-100 font-mono text-sm outline-none placeholder-stone-600 caret-amber-400"
                placeholder="type a command…"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
