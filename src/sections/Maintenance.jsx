import { Gauge, ScanLine, Mail, ShieldAlert, Sparkles, CircleStop } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

const STEP_ICONS = [Gauge, ScanLine, Mail, ShieldAlert];

export default function Maintenance() {
  const { t } = useLang();
  const steps = t('maintenance.steps');
  const tracked = t('maintenance.tracked');
  const emailItems = t('maintenance.emailItems');

  return (
    <Section id="maintenance" alt>
      <SectionHead label={t('maintenance.label')} heading={t('maintenance.heading')} lead={t('maintenance.lead')} />

      <div className="mnt-highlight">
        <Sparkles size={18} className="accent" />
        {t('maintenance.highlight')}
      </div>

      <div className="mnt-intro-grid">
        <Reveal><p className="body">{t('maintenance.p1')}</p></Reveal>
        <Reveal delay={0.1}><p className="body">{t('maintenance.p2')}</p></Reveal>
      </div>

      {/* Tracked components */}
      <Reveal delay={0.1}>
        <div className="mnt-tracked">
          {tracked.map((c) => <span key={c} className="pill">{c}</span>)}
        </div>
      </Reveal>

      {/* Workflow */}
      <div className="mnt-steps">
        {steps.map((s, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="mnt-step card">
                <span className="mnt-step-num mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="mnt-step-icon"><Icon size={24} /></span>
                <h3 className="subheading">{s.title}</h3>
                <p className="body">{s.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* The two simultaneous actions */}
      <div className="mnt-actions">
        <Reveal delay={0.05}>
          <div className="mnt-action card">
            <div className="mnt-action-head">
              <Mail className="accent" size={22} />
              <h3 className="subheading">{t('maintenance.emailTitle')}</h3>
            </div>
            <div className="email-mock">
              <div className="email-line email-to">To: Maintenance Department</div>
              {emailItems.map((e) => (
                <div key={e} className="email-line"><span className="email-key">•</span>{e}</div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mnt-action card mnt-stop">
            <div className="mnt-action-head">
              <CircleStop className="accent" size={22} />
              <h3 className="subheading">{t('maintenance.stopTitle')}</h3>
            </div>
            <p className="body">{t('maintenance.stopDesc')}</p>
            <div className="stop-visual">
              <span className="stop-btn">STOP</span>
              <span className="stop-sim mono">machine.state = HALTED</span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
