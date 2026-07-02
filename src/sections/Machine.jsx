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

// Arbor assembly, drawn the way it actually is: a SIDE view where the blade
// stack reads as thin discs separated by spacers on one cantilever shaft, plus
// a FRONT view inset showing that the blades overlap into a single visible one.
function MachineDiagram() {
  const { t } = useLang();
  const d = t('machine.diagram');

  // Blade stack layout: blade = 4px disc (edge view), spacers 32/5/2.5 mm
  // rendered proportionally (14/5/3 px). 10 blades on the shaft.
  const spacerSeq = [14, 5, 3, 14, 5, 3, 14, 5, 3];
  const blades = [];
  const spacers = [];
  let bx = 134;
  for (let i = 0; i < 10; i++) {
    blades.push(bx);
    bx += 4;
    if (i < 9) {
      spacers.push({ x: bx, w: spacerSeq[i] });
      bx += spacerSeq[i];
    }
  }
  const stackEnd = bx; // ≈240
  const noteParts = String(d.frontNote).split('—').map((s) => s.trim());

  return (
    <div className="machine-diagram card">
      <div className="diagram-title mono">{d.title}</div>
      <svg viewBox="0 0 460 290" className="machine-svg">
        {/* ——— SIDE VIEW ——— */}
        {/* centreline (dash-dot, CAD convention) */}
        <line x1="12" y1="150" x2="298" y2="150" stroke="var(--text-dim)" strokeWidth="0.7" strokeDasharray="12 4 2 4" opacity="0.6" />

        {/* motor */}
        <rect x="16" y="118" width="50" height="64" rx="6" fill="var(--surface-2)" stroke="var(--border-strong)" strokeWidth="1.2" />
        {[128, 138, 148, 158, 168].map((y) => (
          <line key={y} x1="20" y1={y} x2="62" y2={y} stroke="var(--border-strong)" strokeWidth="0.8" opacity="0.7" />
        ))}
        <text x="41" y="200" fontSize="9" textAnchor="middle" fill="var(--text-dim)">{d.motor}</text>

        {/* coupling: two flanges */}
        <rect x="68" y="132" width="9" height="36" rx="2" fill="var(--text-dim)" />
        <rect x="80" y="132" width="9" height="36" rx="2" fill="var(--text-dim)" />
        <line x1="78.5" y1="128" x2="78.5" y2="172" stroke="var(--bg-2)" strokeWidth="1.4" />

        {/* bearing housing (cantilever support) with hatching */}
        <rect x="93" y="124" width="26" height="52" rx="3" fill="var(--surface-2)" stroke="var(--border-strong)" strokeWidth="1.2" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={96 + i * 6} y1="172" x2={102 + i * 6} y2="128" stroke="var(--border-strong)" strokeWidth="0.7" opacity="0.6" />
        ))}

        {/* shaft */}
        <rect x="119" y="143" width="153" height="14" rx="2" fill="var(--text-dim)" opacity="0.85" />

        {/* blade stack: tall thin discs (edge view) */}
        {blades.map((x) => (
          <g key={x}>
            <rect x={x} y="78" width="4" height="144" rx="1.2" fill="var(--text-soft)" stroke="var(--border-strong)" strokeWidth="0.5" />
            {/* carbide tip hints top & bottom */}
            <rect x={x - 0.8} y="76" width="5.6" height="5" rx="1" fill="var(--accent)" opacity="0.85" />
            <rect x={x - 0.8} y="219" width="5.6" height="5" rx="1" fill="var(--accent)" opacity="0.85" />
          </g>
        ))}

        {/* spacers between blades */}
        {spacers.map((s) => (
          <rect key={s.x} x={s.x} y="135" width={s.w} height="30" rx="2" fill="var(--text-dim)" opacity="0.55" />
        ))}

        {/* locking nut + bolt end */}
        <rect x={stackEnd + 3} y="136" width="17" height="28" rx="3" fill="var(--text-soft)" stroke="var(--border-strong)" strokeWidth="0.8" />
        <rect x={stackEnd + 20} y="142" width="9" height="16" rx="2" fill="var(--text-dim)" />

        {/* ——— labels + leader lines ——— */}
        <g fontSize="9" fill="var(--text-dim)">
          {/* blade */}
          <text x="128" y="36">{d.blade}</text>
          <line x1="140" y1="42" x2="140" y2="74" stroke="var(--accent)" strokeWidth="0.8" />
          <circle cx="140" cy="76" r="1.6" fill="var(--accent)" />
          {/* locking bolt */}
          <text x={stackEnd + 12} y="112" textAnchor="middle">{d.bolt}</text>
          <line x1={stackEnd + 12} y1="118" x2={stackEnd + 12} y2="132" stroke="var(--accent)" strokeWidth="0.8" />
          <circle cx={stackEnd + 12} cy="134" r="1.6" fill="var(--accent)" />
          {/* spacers */}
          <text x="150" y="266">{d.spacer}</text>
          <line x1="181" y1="256" x2="181" y2="168" stroke="var(--accent)" strokeWidth="0.8" />
          <circle cx="181" cy="166" r="1.6" fill="var(--accent)" />
          {/* coupling */}
          <text x="60" y="238" textAnchor="middle">{d.coupling}</text>
          <line x1="78" y1="228" x2="78" y2="176" stroke="var(--accent)" strokeWidth="0.8" />
          <circle cx="78" cy="174" r="1.6" fill="var(--accent)" />
          {/* cantilever shaft */}
          <text x="262" y="238" textAnchor="middle">{d.shaft}</text>
          <line x1="262" y1="228" x2="262" y2="160" stroke="var(--accent)" strokeWidth="0.8" />
          <circle cx="262" cy="158" r="1.6" fill="var(--accent)" />
        </g>

        {/* ——— FRONT VIEW inset ——— */}
        <line x1="312" y1="24" x2="312" y2="266" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 5" />
        <text x="386" y="38" fontSize="9.5" textAnchor="middle" fill="var(--text-dim)" fontWeight="600">
          {d.frontTitle}
        </text>
        <g>
          {/* teeth ring */}
          {[...Array(20)].map((_, i) => {
            const a = (i * 18 * Math.PI) / 180;
            const x1 = 386 + 52 * Math.cos(a);
            const y1 = 138 + 52 * Math.sin(a);
            const x2 = 386 + 58 * Math.cos(a + 0.08);
            const y2 = 138 + 58 * Math.sin(a + 0.08);
            const x3 = 386 + 52 * Math.cos(a + 0.18);
            const y3 = 138 + 52 * Math.sin(a + 0.18);
            return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="var(--text-soft)" />;
          })}
          <circle cx="386" cy="138" r="52" fill="none" stroke="var(--text-soft)" strokeWidth="2.4" />
          <circle cx="386" cy="138" r="40" fill="none" stroke="var(--border-strong)" strokeWidth="0.7" opacity="0.7" />
          <circle cx="386" cy="138" r="13" fill="var(--accent)" />
          <circle cx="386" cy="138" r="4.5" fill="var(--bg-2)" />
        </g>
        <text x="386" y="222" fontSize="8.5" textAnchor="middle" fill="var(--text-dim)">{noteParts[0]}</text>
        <text x="386" y="234" fontSize="8.5" textAnchor="middle" fill="var(--text-dim)">{noteParts[1] || ''}</text>
      </svg>
    </div>
  );
}
