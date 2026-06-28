import { motion, useTransform } from 'framer-motion';
import './CuttingDisc.css';

function CuttingDisc({ scrollProgress }) {
  const rotate = useTransform(scrollProgress, [0, 1], [0, 2160]);
  const x = useTransform(scrollProgress, [0, 0.2, 0.5, 0.8, 1], [100, 0, -50, 0, 100]);
  const y = useTransform(scrollProgress, [0, 0.3, 0.6, 1], ['40vh', '30vh', '50vh', '60vh']);
  const scale = useTransform(scrollProgress, [0, 0.15, 0.5, 0.85, 1], [0.7, 1, 1.15, 1, 0.8]);
  const opacity = useTransform(scrollProgress, [0, 0.05, 0.9, 1], [0.1, 0.2, 0.2, 0.05]);

  const teeth = 48;

  return (
    <motion.div className="disc-3d-wrapper" style={{ rotate, x, top: y, scale, opacity }}>
      <div className="disc-3d-body">
        <svg viewBox="0 0 500 500" className="disc-svg">
          <defs>
            <radialGradient id="discBody" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#ddd" />
              <stop offset="30%" stopColor="#bbb" />
              <stop offset="60%" stopColor="#999" />
              <stop offset="85%" stopColor="#777" />
              <stop offset="100%" stopColor="#555" />
            </radialGradient>
            <radialGradient id="discCenter" cx="45%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#f07030" />
              <stop offset="100%" stopColor="#b5400e" />
            </radialGradient>
            <radialGradient id="discHighlight" cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="innerShadow">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="3" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.4" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          <ellipse cx="250" cy="258" rx="220" ry="220" fill="rgba(0,0,0,0.3)" />

          <circle cx="250" cy="250" r="220" fill="url(#discBody)" />

          {[...Array(teeth)].map((_, i) => {
            const angle = (i * 360) / teeth;
            const rad = (angle * Math.PI) / 180;
            const ir = 195;
            const or = 218;
            const hw = (Math.PI / teeth) * 0.5;

            return (
              <polygon
                key={i}
                points={`
                  ${250 + ir * Math.cos(rad - hw)},${250 + ir * Math.sin(rad - hw)}
                  ${250 + or * Math.cos(rad - hw * 0.4)},${250 + or * Math.sin(rad - hw * 0.4)}
                  ${250 + or * Math.cos(rad + hw * 0.2)},${250 + or * Math.sin(rad + hw * 0.2)}
                  ${250 + ir * Math.cos(rad + hw)},${250 + ir * Math.sin(rad + hw)}
                `}
                fill="#aaa"
                stroke="#888"
                strokeWidth="0.3"
              />
            );
          })}

          {[...Array(24)].map((_, i) => {
            const a = (i * 15 * Math.PI) / 180;
            return (
              <line key={`r-${i}`}
                x1={250 + 65 * Math.cos(a)} y1={250 + 65 * Math.sin(a)}
                x2={250 + 190 * Math.cos(a)} y2={250 + 190 * Math.sin(a)}
                stroke="rgba(80,80,80,0.2)" strokeWidth="0.5" />
            );
          })}

          {[120, 140, 160, 180].map(r => (
            <circle key={r} cx="250" cy="250" r={r} fill="none" stroke="rgba(100,100,100,0.1)" strokeWidth="0.5" />
          ))}

          <circle cx="250" cy="250" r="60" fill="url(#discCenter)" filter="url(#innerShadow)" />
          <circle cx="250" cy="250" r="58" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

          <circle cx="250" cy="250" r="18" fill="#1a1a1a" stroke="#333" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="14" fill="none" stroke="#444" strokeWidth="0.5" />

          {[...Array(8)].map((_, i) => (
            <circle key={`b-${i}`}
              cx={250 + 40 * Math.cos((i * 45 * Math.PI) / 180)}
              cy={250 + 40 * Math.sin((i * 45 * Math.PI) / 180)}
              r="3.5" fill="#2a1a10" stroke="#444" strokeWidth="0.5" />
          ))}

          <circle cx="250" cy="250" r="220" fill="url(#discHighlight)" />
        </svg>
      </div>
    </motion.div>
  );
}

export default CuttingDisc;
