import { useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './SawBlade.css';

// Polar → cartesian around the SVG centre (250,250).
function polar(angleDeg, r) {
  const a = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0° points up
  return [250 + r * Math.cos(a), 250 + r * Math.sin(a)];
}

// Build a realistic hooked rip-tooth rim as one closed SVG path.
function buildTeethPath(teeth, gulletR, tipR) {
  const step = 360 / teeth;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const faceRoot = a - step * 0.42; // leading face starts at root
    const tipFront = a - step * 0.2; // hooked front tip
    const tipBack = a - step * 0.02; // back of flat carbide top
    const backRoot = a + step * 0.3; // back face meets root
    const nextFaceRoot = (i + 1) * step - step * 0.42;
    const gulletMid = (backRoot + nextFaceRoot) / 2;

    const [fx, fy] = polar(faceRoot, gulletR);
    const [tfx, tfy] = polar(tipFront, tipR);
    const [tbx, tby] = polar(tipBack, tipR);
    const [bx, by] = polar(backRoot, gulletR);
    const [gcx, gcy] = polar(gulletMid, gulletR - 9); // dip → rounded gullet
    const [nfx, nfy] = polar(nextFaceRoot, gulletR);

    if (i === 0) d += `M ${fx.toFixed(2)} ${fy.toFixed(2)} `;
    d += `L ${tfx.toFixed(2)} ${tfy.toFixed(2)} `;
    d += `L ${tbx.toFixed(2)} ${tby.toFixed(2)} `;
    d += `L ${bx.toFixed(2)} ${by.toFixed(2)} `;
    d += `Q ${gcx.toFixed(2)} ${gcy.toFixed(2)} ${nfx.toFixed(2)} ${nfy.toFixed(2)} `;
  }
  return d + 'Z';
}

const TEETH = 40;
const GULLET_R = 198;
const TIP_R = 238;

function useIsMobile(query = '(max-width: 700px)') {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return mobile;
}

export default function SawBlade() {
  const isMobile = useIsMobile();
  return (
    <div className="saw-layer" aria-hidden="true">
      {isMobile ? <MobileBlade /> : <ScrollBlade />}
    </div>
  );
}

// Desktop: scroll-driven rotation. Direct transform mapping (no spring) so the
// blade stops exactly when scrolling stops — a trailing spring reads as jitter.
// px offsets only: vh units re-resolve when mobile browser chrome collapses.
function ScrollBlade() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-40, 40, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.08, 0.95]);

  return (
    <motion.div className="saw-blade" style={{ rotate, y, scale }}>
      <BladeSVG />
    </motion.div>
  );
}

// Mobile: slow time-based rotation. Scroll-linked transforms on a large fixed
// SVG force a repaint per scroll frame on mobile GPUs — the main jank source.
function MobileBlade() {
  return (
    <motion.div
      className="saw-blade"
      animate={{ rotate: 360 }}
      transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
    >
      <BladeSVG />
    </motion.div>
  );
}

function BladeSVG() {
  const teethPath = useMemo(() => buildTeethPath(TEETH, GULLET_R, TIP_R), []);

  // Carbide tips (brighter quads on each tooth top).
  const carbide = useMemo(() => {
    const step = 360 / TEETH;
    return [...Array(TEETH)].map((_, i) => {
      const a = i * step;
      const p1 = polar(a - step * 0.2, TIP_R);
      const p2 = polar(a - step * 0.02, TIP_R);
      const p3 = polar(a - step * 0.05, TIP_R - 12);
      const p4 = polar(a - step * 0.22, TIP_R - 12);
      return `${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)} ${p3[0].toFixed(1)},${p3[1].toFixed(1)} ${p4[0].toFixed(1)},${p4[1].toFixed(1)}`;
    });
  }, []);

  // Six laser anti-vibration slots.
  const slots = useMemo(() => {
    return [...Array(6)].map((_, i) => {
      const a = i * 60;
      const outer = polar(a, 182);
      const inner = polar(a, 120);
      const end = polar(a, 112);
      return { outer, inner, end };
    });
  }, []);

  // Bolt / drive-pin circle.
  const bolts = useMemo(() => [...Array(6)].map((_, i) => polar(i * 60 + 30, 46)), []);

  return (
    <svg viewBox="0 0 500 500" className="saw-svg">
      <defs>
        <radialGradient id="steel" cx="42%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#f2f4f5" />
          <stop offset="35%" stopColor="#c9cfd2" />
          <stop offset="65%" stopColor="#9aa2a6" />
          <stop offset="88%" stopColor="#6f777b" />
          <stop offset="100%" stopColor="#525a5e" />
        </radialGradient>
        <radialGradient id="hub" cx="42%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#f5893f" />
          <stop offset="55%" stopColor="#E05C1A" />
          <stop offset="100%" stopColor="#a63e0c" />
        </radialGradient>
        <linearGradient id="carbideGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfefe" />
          <stop offset="100%" stopColor="#b9c0c3" />
        </linearGradient>
        <radialGradient id="sheen" cx="35%" cy="28%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Teeth rim (steel) */}
      <path d={teethPath} fill="url(#steel)" stroke="#4a5155" strokeWidth="1" />

      {/* Blade body */}
      <circle cx="250" cy="250" r={GULLET_R} fill="url(#steel)" stroke="#585f63" strokeWidth="1" />

      {/* Carbide tips */}
      {carbide.map((pts, i) => (
        <polygon key={i} points={pts} fill="url(#carbideGrad)" stroke="#8b9195" strokeWidth="0.4" />
      ))}

      {/* Tension rings */}
      {[172, 150, 128, 104].map((r) => (
        <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="rgba(60,66,70,0.18)" strokeWidth="1" />
      ))}

      {/* Etched radial marks */}
      {[...Array(48)].map((_, i) => {
        const [x1, y1] = polar(i * 7.5, 190);
        const [x2, y2] = polar(i * 7.5, 184);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(50,56,60,0.35)" strokeWidth="0.7" />;
      })}

      {/* Anti-vibration laser slots */}
      {slots.map((s, i) => (
        <g key={i}>
          <line
            x1={s.outer[0]} y1={s.outer[1]} x2={s.inner[0]} y2={s.inner[1]}
            stroke="#3a4044" strokeWidth="3.4" strokeLinecap="round"
          />
          <circle cx={s.end[0]} cy={s.end[1]} r="4.5" fill="#3a4044" />
        </g>
      ))}

      {/* Hub */}
      <circle cx="250" cy="250" r="64" fill="url(#hub)" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

      {/* Drive-pin holes */}
      {bolts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#2a1509" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
      ))}

      {/* Arbor bore */}
      <circle cx="250" cy="250" r="20" fill="#161b1e" stroke="#000" strokeWidth="1.5" />
      <circle cx="250" cy="250" r="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Sheen */}
      <circle cx="250" cy="250" r={TIP_R} fill="url(#sheen)" />
    </svg>
  );
}
