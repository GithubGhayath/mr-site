import { useEffect, useRef, useState, useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { config } from '../data/config';
import './Splash.css';

// How long the story plays before the fade-out begins, and how long that
// fade takes. Reduced-motion gets a short, static hold instead — see
// Splash.css, which also zeroes every animation-delay in that mode so
// nothing sits waiting on a timer that no longer moves.
const HOLD_MS = 3300;
const HOLD_MS_REDUCED = 550;
const EXIT_MS = 450;
const EXIT_MS_REDUCED = 300;

// A small circular rip blade: a rim, a short spoke, and evenly spaced teeth
// ticks. Shared by the three blades on the machine's arbor.
function Blade({ cx, cy, r = 54, teeth = 14, className }) {
  const ticks = useMemo(() => {
    const out = [];
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const x1 = cx + Math.cos(a) * (r - 9);
      const y1 = cy + Math.sin(a) * (r - 9);
      const x2 = cx + Math.cos(a) * r;
      const y2 = cy + Math.sin(a) * r;
      out.push([x1, y1, x2, y2]);
    }
    return out;
  }, [cx, cy, r, teeth]);

  // Two nested groups: the outer plays the one-shot scale-and-fade "appear",
  // the inner plays the continuous spin. Both animate `transform`, and CSS
  // keyframes don't compose on a single element — splitting them across
  // parent/child lets both apply at once instead of one overriding the other.
  return (
    <g
      className={`m-blade ${className || ''}`}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <g className="m-blade-spin" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <circle cx={cx} cy={cy} r={r} className="m-blade-rim" />
        <circle cx={cx} cy={cy} r={r * 0.62} className="m-blade-web" />
        {ticks.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="m-blade-tooth" />
        ))}
        <circle cx={cx} cy={cy} r={7} className="m-blade-hub" />
      </g>
    </g>
  );
}

export default function Splash({ onDone }) {
  const { t, lang } = useLang();
  const [exiting, setExiting] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const hold = reducedRef.current ? HOLD_MS_REDUCED : HOLD_MS;
    const exitMs = reducedRef.current ? EXIT_MS_REDUCED : EXIT_MS;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const holdTimer = setTimeout(() => setExiting(true), hold);
    const doneTimer = setTimeout(() => onDone?.(), hold + exitMs);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`splash ${exiting ? 'splash-exit' : ''}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{t('splash.loading')}</span>

      <div className="splash-stage">
        <svg viewBox="0 0 760 340" className="m-svg" aria-hidden="true">
          {/* base frame */}
          <g className="m-frame">
            <line x1="60" y1="300" x2="700" y2="300" />
            <line x1="100" y1="300" x2="100" y2="318" />
            <line x1="270" y1="300" x2="270" y2="318" />
            <line x1="480" y1="300" x2="480" y2="318" />
            <line x1="650" y1="300" x2="650" y2="318" />
          </g>

          {/* conveyor: two rails + travelling dash + fixed rollers */}
          <g className="m-conveyor">
            <line x1="70" y1="210" x2="690" y2="210" className="m-rail m-rail-top" />
            <line x1="70" y1="224" x2="690" y2="224" className="m-rail m-rail-bottom" />
            <line x1="70" y1="217" x2="690" y2="217" className="m-belt-travel" />
            {[100, 160, 220, 280, 340, 610, 660].map((x) => (
              <circle key={x} cx={x} cy={230} r={6} className="m-roller" />
            ))}
          </g>

          {/* shared arbor + three ripping blades */}
          <g>
            <line x1="368" y1="190" x2="596" y2="190" className="m-arbor" />
            <Blade cx={390} cy={190} className="m-blade-1" />
            <Blade cx={460} cy={190} className="m-blade-2" />
            <Blade cx={530} cy={190} className="m-blade-3" />
            <circle cx={590} cy={190} r={20} className="m-pulley m-pulley-main" />
            <line x1="590" y1="171" x2="590" y2="150" className="m-pulley-spoke m-pulley-main-spoke" />
          </g>

          {/* motor + belt drive */}
          <g className="m-motor-group">
            <rect x={575} y={252} width={34} height={26} rx={4} className="m-motor-body" />
            <circle cx={592} cy={252} r={12} className="m-pulley m-pulley-motor" />
            <line x1="592" y1="241" x2="592" y2="230" className="m-pulley-spoke m-pulley-motor-spoke" />
            <line x1="578" y1="210" x2="580" y2="240" className="m-belt-drive" />
            <line x1="602" y1="210" x2="604" y2="240" className="m-belt-drive" />
          </g>

          {/* material: the incoming log */}
          <g className="m-log">
            <rect x={-70} y={182} width={70} height={38} rx={10} className="m-log-body" />
            <ellipse cx={-70} cy={201} rx={7} ry={19} className="m-log-end" />
          </g>

          {/* the four ripped strips, born where the log meets the blades */}
          <g className="m-strips">
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={390 + i * 17}
                y={183}
                width={14}
                height={36}
                rx={3}
                className={`m-strip m-strip-${i}`}
              />
            ))}
          </g>

          {/* the cut — a brief, clean flash at each blade */}
          <g className="m-cut-flash">
            <line x1="390" y1="168" x2="390" y2="212" />
            <line x1="460" y1="168" x2="460" y2="212" />
            <line x1="530" y1="168" x2="530" y2="212" />
          </g>

          {/* intelligence: three sensor points and two signal lines */}
          <g className="m-signal">
            <path d="M 592 240 Q 526 150 460 178" className="m-signal-line m-signal-line-1" />
            <path d="M 660 216 Q 560 140 462 178" className="m-signal-line m-signal-line-2" />
            <circle cx={592} cy={240} r={4} className="m-node m-node-1" />
            <circle cx={460} cy={176} r={4} className="m-node m-node-2" />
            <circle cx={660} cy={216} r={4} className="m-node m-node-3" />
          </g>
        </svg>

        <div className="splash-id">
          <span className="splash-word">SMRM</span>
          <span className="splash-tagline">{t('splash.tagline')}</span>
          <span className="splash-uni">{config.university.name[lang]}</span>
          <span className="splash-ready">
            <span className="splash-ready-dot" />
            {t('splash.ready')}
          </span>
        </div>
      </div>
    </div>
  );
}
