import {
  Gauge, ScanLine, Mail, ShieldAlert, Sparkles, CircleStop, MailWarning,
  CheckCircle2, ExternalLink,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';

// The real alert the application emailed when bearing 16007 #11 reached its
// rated life — the original PDF lives in /public/reports.
const ALERT_PDF = 'reports/maintenance-alert.pdf';
const ALERT_THUMB = 'reports/thumbs/maintenance-alert.png';

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

      {/* The real alert, exactly as it was sent */}
      <div className="alert-grid">
        <div className="alert-text">
          <Reveal>
            <h3 className="subheading alert-title">
              <MailWarning size={20} className="accent" />
              {t('maintenance.alertTitle')}
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="body">{t('maintenance.alertLead')}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="alert-contents">
              {t('maintenance.alertContents').map((c) => (
                <li key={c}><CheckCircle2 size={15} className="accent" />{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <a
            className="alert-doc card"
            href={asset(ALERT_PDF)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="alert-shot">
              <img
                src={asset(ALERT_THUMB)}
                alt={t('maintenance.alertSubject')}
                width="901"
                height="1165"
                loading="lazy"
              />
              <span className="alert-format mono">{t('maintenance.alertPages')}</span>
              <span className="alert-open">
                <ExternalLink size={14} />
                {t('maintenance.openAlert')}
              </span>
            </span>
            <span className="alert-meta">
              <span className="alert-subject">{t('maintenance.alertSubject')}</span>
              <span className="alert-stamp">{t('maintenance.alertStamp')}</span>
            </span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
