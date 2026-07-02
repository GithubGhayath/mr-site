import { useRef, useCallback } from 'react';
import { MonitorPlay, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import { config } from '../data/config';

// Screenshot files matching the order of software.screens in translations.
const SCREEN_IMGS = [
  'screens/app-home.png',
  'screens/app-monitoring.png',
  'screens/app-history.png',
  'screens/app-process.png',
  'screens/app-maintenance.png',
];

export default function Software() {
  const { t } = useLang();
  const screens = t('software.screens');
  const videoRef = useRef(null);

  // Slightly accelerated playback for presentation, per the demo requirements.
  const speedUp = useCallback(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.25;
  }, []);

  return (
    <Section id="software">
      <SectionHead label={t('software.label')} heading={t('software.heading')} lead={t('software.lead')} />

      <Reveal><p className="body software-intro">{t('software.p1')}</p></Reveal>

      {/* Demo video */}
      <Reveal delay={0.08}>
        <div className="demo-video card">
          <div className="demo-video-head">
            <h3 className="subheading">
              <MonitorPlay size={20} className="accent" /> {t('software.videoTitle')}
            </h3>
            <span className="tag mono">1.25×</span>
          </div>
          <video
            ref={videoRef}
            src={asset(config.APP_DEMO_VIDEO)}
            poster={asset('screens/app-home.png')}
            controls
            playsInline
            preload="metadata"
            onLoadedMetadata={speedUp}
            onPlay={speedUp}
          />
          <p className="demo-caption">{t('software.videoCaption')}</p>
        </div>
      </Reveal>

      {/* Real application screens, each described from its actual UI */}
      <div className="screens-list">
        {screens.map((s, i) => (
          <Reveal key={s.title} delay={0.05}>
            <div className={`screen-row ${i % 2 === 1 ? 'flip' : ''}`}>
              <div className="screen-shot card">
                <img
                  src={asset(SCREEN_IMGS[i])}
                  alt={s.title}
                  width="1920"
                  height="1200"
                  loading="lazy"
                />
              </div>
              <div className="screen-text">
                <span className="screen-num mono">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="subheading">{s.title}</h3>
                <p className="body">{s.desc}</p>
                <ul className="screen-points">
                  {s.points.map((p) => (
                    <li key={p}><CheckCircle2 size={15} className="accent" />{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="software-basis card">
          <span className="tag">Merchant · Fracture Mechanics · Research</span>
          <p className="body">{t('software.homeBasis')}</p>
        </div>
      </Reveal>
    </Section>
  );
}
