'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const A = '#F59E0B';   // amber
const D = '#1C1917';   // dark bg
const C = '#292524';   // card
const B = '#44403C';   // border
const E = '#0C0A09';   // eye dark

export default function RobotSVG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pupils, setPupils] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * 400;
      const svgY = ((e.clientY - rect.top) / rect.height) * 550;
      const dx = svgX - 200;
      const dy = svgY - 134;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 180) / 180;
      const r = 9;
      setPupils({ x: Math.cos(angle) * dist * r, y: Math.sin(angle) * dist * r });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scheduleBlink = useCallback(() => {
    blinkTimer.current = setTimeout(() => {
      setBlinking(true);
      setTimeout(() => { setBlinking(false); scheduleBlink(); }, 160);
    }, 2500 + Math.random() * 3500);
  }, []);

  useEffect(() => {
    scheduleBlink();
    return () => { if (blinkTimer.current) clearTimeout(blinkTimer.current); };
  }, [scheduleBlink]);

  const lx = 158 + pupils.x;
  const ly = 134 + pupils.y;
  const rx = 242 + pupils.x;
  const ry = 134 + pupils.y;

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center select-none">
      <svg
        viewBox="0 0 400 550"
        xmlns="http://www.w3.org/2000/svg"
        className="robot-float w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] drop-shadow-2xl"
        aria-label="Interactive robot"
      >
        <defs>
          <radialGradient id="eye-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="55%" stopColor={A} />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
          <radialGradient id="body-grad" cx="30%" cy="25%" r="75%">
            <stop offset="0%" stopColor={B} />
            <stop offset="100%" stopColor={D} />
          </radialGradient>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <clipPath id="left-clip">
            <rect x="126" y="105" width="64" height="58" rx="10" />
          </clipPath>
          <clipPath id="right-clip">
            <rect x="210" y="105" width="64" height="58" rx="10" />
          </clipPath>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="200" cy="543" rx="75" ry="7" fill="#000" opacity="0.25" />

        {/* Antenna */}
        <line x1="200" y1="80" x2="200" y2="48" stroke={A} strokeWidth="3" strokeLinecap="round" />
        <circle cx="200" cy="40" r="10" fill={A} filter="url(#glow)">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Head */}
        <rect x="108" y="80" width="184" height="152" rx="22" fill="url(#body-grad)" stroke={B} strokeWidth="1.5" />
        <rect x="120" y="88" width="160" height="35" rx="14" fill={B} opacity="0.4" />

        {/* Eye sockets */}
        <rect x="126" y="105" width="64" height="58" rx="10" fill={E} />
        <rect x="210" y="105" width="64" height="58" rx="10" fill={E} />

        {/* Eye pupils (cursor-tracked) */}
        <g opacity={blinking ? 0 : 1} style={{ transition: 'opacity 0.08s' }}>
          <g clipPath="url(#left-clip)">
            <circle cx={lx} cy={ly} r="22" fill="url(#eye-grad)" filter="url(#soft-glow)" />
            <circle cx={lx} cy={ly} r="9" fill="#7C2D12" />
            <circle cx={lx - 6} cy={ly - 6} r="4" fill="#FEF9C3" opacity="0.8" />
          </g>
          <g clipPath="url(#right-clip)">
            <circle cx={rx} cy={ry} r="22" fill="url(#eye-grad)" filter="url(#soft-glow)" />
            <circle cx={rx} cy={ry} r="9" fill="#7C2D12" />
            <circle cx={rx - 6} cy={ry - 6} r="4" fill="#FEF9C3" opacity="0.8" />
          </g>
        </g>

        {/* Mouth / LED strip */}
        <rect x="140" y="178" width="120" height="28" rx="8" fill={E} />
        {[0,1,2,3,4,5,6,7].map(i => (
          <circle
            key={i}
            cx={150 + i * 14}
            cy={192}
            r="3.5"
            fill={A}
            className="led-dot"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}

        {/* Neck */}
        <rect x="175" y="232" width="50" height="22" rx="5" fill={C} stroke={B} strokeWidth="1" />
        <circle cx="185" cy="243" r="3" fill={B} />
        <circle cx="215" cy="243" r="3" fill={B} />

        {/* Body */}
        <rect x="70" y="254" width="260" height="162" rx="22" fill="url(#body-grad)" stroke={B} strokeWidth="1.5" />

        {/* Chest panel */}
        <rect x="110" y="276" width="180" height="92" rx="12" fill={E} stroke={A} strokeWidth="0.8" opacity="0.9" />

        {/* Panel scan line */}
        <rect x="110" y="276" width="180" height="2" fill={A} opacity="0.5">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="0 90" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.6;0.6;0" keyTimes="0;0.05;0.95;1" dur="3s" repeatCount="indefinite" />
        </rect>

        {/* Panel code lines */}
        <rect x="122" y="288" width="95" height="4" rx="2" fill={A} opacity="0.6" />
        <rect x="122" y="300" width="128" height="4" rx="2" fill={B} opacity="0.7" />
        <rect x="122" y="312" width="75" height="4" rx="2" fill={A} opacity="0.4" />
        <rect x="122" y="324" width="108" height="4" rx="2" fill={B} opacity="0.5" />
        <rect x="122" y="336" width="88" height="4" rx="2" fill={A} opacity="0.5" />
        <rect x="122" y="348" width="55" height="4" rx="2" fill={B} opacity="0.4" />

        {/* Panel status LEDs */}
        <circle cx="252" cy="285" r="4" fill="#22C55E" filter="url(#soft-glow)" />
        <circle cx="265" cy="285" r="4" fill={A} filter="url(#soft-glow)" />
        <circle cx="278" cy="285" r="4" fill="#EF4444" />

        {/* Left arm */}
        <rect x="16" y="264" width="58" height="123" rx="15" fill="url(#body-grad)" stroke={B} strokeWidth="1.5" />
        <rect x="26" y="283" width="38" height="4" rx="2" fill={A} opacity="0.4" />
        <rect x="26" y="295" width="38" height="4" rx="2" fill={B} opacity="0.6" />
        <ellipse cx="45" cy="390" rx="22" ry="13" fill={C} stroke={B} strokeWidth="1" />

        {/* Right arm */}
        <rect x="326" y="264" width="58" height="123" rx="15" fill="url(#body-grad)" stroke={B} strokeWidth="1.5" />
        <rect x="336" y="283" width="38" height="4" rx="2" fill={A} opacity="0.4" />
        <rect x="336" y="295" width="38" height="4" rx="2" fill={B} opacity="0.6" />
        <ellipse cx="355" cy="390" rx="22" ry="13" fill={C} stroke={B} strokeWidth="1" />

        {/* Shoulder joints */}
        <circle cx="70" cy="268" r="9" fill={C} stroke={A} strokeWidth="1.5" />
        <circle cx="330" cy="268" r="9" fill={C} stroke={A} strokeWidth="1.5" />

        {/* Left leg */}
        <rect x="106" y="416" width="74" height="107" rx="16" fill="url(#body-grad)" stroke={B} strokeWidth="1.5" />
        <rect x="96" y="518" width="88" height="20" rx="8" fill={C} stroke={B} strokeWidth="1" />

        {/* Right leg */}
        <rect x="220" y="416" width="74" height="107" rx="16" fill="url(#body-grad)" stroke={B} strokeWidth="1.5" />
        <rect x="216" y="518" width="88" height="20" rx="8" fill={C} stroke={B} strokeWidth="1" />

        {/* Hip joints */}
        <circle cx="143" cy="416" r="8" fill={C} stroke={A} strokeWidth="1.5" />
        <circle cx="257" cy="416" r="8" fill={C} stroke={A} strokeWidth="1.5" />
      </svg>
    </div>
  );
}
