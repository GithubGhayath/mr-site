import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

export default function Machine() {
  const { t } = useLang();
  const specs = t('machine.specs');

  return (
    <Section id="machine" alt>
      <SectionHead label={t('machine.label')} heading={t('machine.heading')} />

      <div className="machine-grid">
        <div className="machine-text">
          <Reveal><p className="body">{t('machine.p1')}</p></Reveal>
          <Reveal delay={0.1}><p className="body">{t('machine.p2')}</p></Reveal>
          <Reveal delay={0.2}><MachineDiagram /></Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="spec-table card">
            {specs.map((s, i) => (
              <div className="spec-row" key={i}>
                <span className="spec-k">{s.k}</span>
                <span className="spec-v mono">{s.v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// Double-arbor schematic: two shafts with blade stacks, timber feeding through.
function MachineDiagram() {
  return (
    <div className="machine-diagram card">
      <svg viewBox="0 0 460 260" className="machine-svg">
        <defs>
          <linearGradient id="tf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c79a5b" />
            <stop offset="100%" stopColor="#8b6a34" />
          </linearGradient>
        </defs>

        {/* frame */}
        <rect x="20" y="20" width="420" height="220" rx="10" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />

        {/* timber */}
        <rect x="30" y="115" width="400" height="34" rx="3" fill="url(#tf)" opacity="0.85" />
        <text x="45" y="137" fontSize="10" fontFamily="monospace" fill="#3a2a12">TIMBER →</text>

        {/* upper arbor */}
        <line x1="60" y1="70" x2="400" y2="70" stroke="var(--text-dim)" strokeWidth="4" />
        {[110, 160, 210, 260, 310].map((cx) => (
          <g key={`u${cx}`}>
            <circle cx={cx} cy="70" r="30" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
            <circle cx={cx} cy="70" r="5" fill="var(--accent)" />
            {[...Array(12)].map((_, k) => (
              <line key={k} x1={cx} y1="42" x2={cx} y2="47" stroke="var(--accent)" strokeWidth="1.4"
                transform={`rotate(${k * 30} ${cx} 70)`} />
            ))}
          </g>
        ))}
        <text x="40" y="55" fontSize="9" fontFamily="monospace" fill="var(--text-dim)">ARBOR 1</text>

        {/* lower arbor */}
        <line x1="60" y1="200" x2="400" y2="200" stroke="var(--text-dim)" strokeWidth="4" />
        {[135, 185, 235, 285].map((cx) => (
          <g key={`l${cx}`}>
            <circle cx={cx} cy="200" r="30" fill="none" stroke="var(--accent-2)" strokeWidth="1.6" />
            <circle cx={cx} cy="200" r="5" fill="var(--accent-2)" />
            {[...Array(12)].map((_, k) => (
              <line key={k} x1={cx} y1="172" x2={cx} y2="177" stroke="var(--accent-2)" strokeWidth="1.4"
                transform={`rotate(${k * 30} ${cx} 200)`} />
            ))}
          </g>
        ))}
        <text x="40" y="225" fontSize="9" fontFamily="monospace" fill="var(--text-dim)">ARBOR 2</text>
      </svg>
    </div>
  );
}
