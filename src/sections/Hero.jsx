import { motion } from 'framer-motion';
import { ArrowRight, MonitorPlay } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

// Animate per WORD (not per character) so Arabic letter-joining is preserved.
function AnimatedWord({ text, delay = 0, className = '' }) {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, y: 40, rotateX: -70 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: delay + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  const stats = [
    { v: '20', label: t('hero.stat1') },
    { v: '2', label: t('hero.stat2') },
    { v: '10', label: t('hero.stat3') },
    { v: '540mm', label: t('hero.stat4') },
  ];

  return (
    <section id="hero" className="hero">
      <div className="grid-bg" />
      <div className="hero-glow" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="hero-badge-dot" />
            {t('hero.badge')}
          </motion.div>

          <h1 className="hero-title display">
            <AnimatedWord text={t('hero.title1')} delay={0.35} className="hero-title-line" />
            <br />
            <AnimatedWord text={t('hero.title2')} delay={0.6} className="hero-title-line accent" />
            <motion.sup
              className="hero-abbr"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {t('hero.abbr')}
            </motion.sup>
          </h1>

          <motion.p
            className="hero-sub lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <button className="btn btn-primary" onClick={() => document.getElementById('machine')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.ctaExplore')}
              <ArrowRight className="icon-flip" size={18} />
            </button>
            <button className="btn btn-ghost" onClick={() => document.getElementById('software')?.scrollIntoView({ behavior: 'smooth' })}>
              <MonitorPlay size={18} />
              {t('hero.ctaSoftware')}
            </button>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {stats.map((s) => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-v mono">{s.v}</span>
                <span className="hero-stat-l">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <RipSchematic />
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="scroll-track"><span /></div>
        <em>{t('hero.scroll')}</em>
      </motion.div>
    </section>
  );
}

// A log being ripped into planks — animated technical schematic.
function RipSchematic() {
  return (
    <div className="rip-card">
      <div className="rip-card-head">
        <span className="mono">LOG → PLANKS</span>
        <span className="rip-dot" />
      </div>
      <svg viewBox="0 0 420 300" className="rip-svg">
        <defs>
          <linearGradient id="logGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c79a5b" />
            <stop offset="50%" stopColor="#9c7238" />
            <stop offset="100%" stopColor="#6f4e22" />
          </linearGradient>
          <linearGradient id="plankGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d9b57e" />
            <stop offset="100%" stopColor="#b98f4f" />
          </linearGradient>
        </defs>

        {/* incoming log */}
        <motion.g
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <ellipse cx="70" cy="150" rx="26" ry="70" fill="url(#logGrad)" />
          {[52, 62, 70].map((r) => (
            <ellipse key={r} cx="70" cy="150" rx={r / 6} ry={r} fill="none" stroke="rgba(90,60,25,0.5)" strokeWidth="1.2" />
          ))}
          <rect x="70" y="80" width="130" height="140" fill="url(#logGrad)" />
        </motion.g>

        {/* rip planes — the MRM cuts ALONG the log, so the glowing kerf lines
            run horizontally (parallel to the feed) and march in the feed direction */}
        {[112, 136, 160, 184].map((y, i) => (
          <g key={y}>
            <motion.line
              x1="76" y1={y} x2="228" y2={y}
              stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"
              strokeDasharray="8 6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.35, 0.95, 0.35], strokeDashoffset: [0, -28] }}
              transition={{
                opacity: { delay: 1.1 + i * 0.12, duration: 2, repeat: Infinity, ease: 'easeInOut' },
                strokeDashoffset: { delay: 1.1, duration: 1.1, repeat: Infinity, ease: 'linear' },
              }}
            />
            {/* glowing kerf entry point where the blade plane meets the wood */}
            <motion.circle
              cx="212" cy={y} r="3"
              fill="var(--accent)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ delay: 1.2 + i * 0.12, duration: 1.4, repeat: Infinity }}
            />
          </g>
        ))}

        {/* output planks */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x="230" y={92 + i * 24} width="150" height="16" rx="2"
            fill="url(#plankGrad)"
            initial={{ x: -18, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.3 + i * 0.12, duration: 0.6 }}
          />
        ))}

        {/* feed arrow */}
        <motion.g
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <line x1="20" y1="260" x2="200" y2="260" stroke="var(--accent-2)" strokeWidth="1.5" />
          <path d="M200 260 l-8 -4 l0 8 z" fill="var(--accent-2)" />
        </motion.g>
        <text x="20" y="280" fill="var(--text-dim)" fontSize="11" fontFamily="monospace">FEED 11 m/min</text>
        <text x="300" y="280" fill="var(--text-dim)" fontSize="11" fontFamily="monospace">200 × 30 mm</text>
      </svg>
    </div>
  );
}
