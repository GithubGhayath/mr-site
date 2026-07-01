import { Home, Activity, History, Wrench, Cpu } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

const MODULE_ICONS = [Home, Activity, History, Wrench];

export default function Software() {
  const { t } = useLang();
  const modules = t('software.modules');
  const outputs = t('software.homeOutputs');

  return (
    <Section id="software">
      <SectionHead label={t('software.label')} heading={t('software.heading')} lead={t('software.lead')} />

      <Reveal><p className="body software-intro">{t('software.p1')}</p></Reveal>

      {/* App window mockup */}
      <Reveal delay={0.1}>
        <div className="app-window">
          <div className="app-titlebar">
            <div className="app-dots"><span /><span /><span /></div>
            <span className="app-title mono">MRM Controller — Home</span>
          </div>
          <div className="app-body">
            <aside className="app-side">
              <div className="app-brand"><Cpu size={18} className="accent" /> MRM</div>
              {modules.map((m, i) => {
                const Icon = MODULE_ICONS[i];
                return (
                  <div key={m.title} className={`app-nav ${i === 0 ? 'active' : ''}`}>
                    <Icon size={16} /> {m.title}
                  </div>
                );
              })}
            </aside>
            <div className="app-main">
              <div className="app-card">
                <h4>{t('software.homeTitle')}</h4>
                <p className="app-muted">{t('software.homeDesc')}</p>
              </div>
              <div className="app-outputs">
                {outputs.map((o) => (
                  <div key={o} className="app-output">
                    <span>{o}</span>
                    <span className="app-chip mono">✓</span>
                  </div>
                ))}
              </div>
              <div className="app-chart-row">
                <MiniChart title="Fc(h)" color="var(--accent)" />
                <MiniChart title="T(h)" color="var(--accent-2)" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="software-basis card">
          <span className="tag">Merchant · Fracture Mechanics · Research</span>
          <p className="body">{t('software.homeBasis')}</p>
        </div>
      </Reveal>

      {/* Module cards */}
      <div className="modules-grid">
        {modules.map((m, i) => {
          const Icon = MODULE_ICONS[i];
          return (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="module-card card">
                <span className="module-icon"><Icon size={22} /></span>
                <h3 className="subheading">{m.title}</h3>
                <p className="body">{m.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function MiniChart({ title, color }) {
  return (
    <div className="mini-chart">
      <span className="mini-chart-title mono">{title}</span>
      <svg viewBox="0 0 200 90" preserveAspectRatio="none">
        <polyline
          points="8,80 40,66 72,50 104,44 136,34 168,24 192,16"
          fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        />
        <line x1="8" y1="82" x2="192" y2="82" stroke="var(--border)" strokeWidth="1" />
      </svg>
    </div>
  );
}
