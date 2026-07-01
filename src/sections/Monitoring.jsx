import { useState, useEffect } from 'react';
import { Camera, Radio, AlertTriangle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';
import LiveChart, { useLiveStat } from '../components/LiveChart';

function useTimer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(s / 3600)).padStart(2, '0');
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export default function Monitoring() {
  const { t } = useLang();
  const time = useTimer();
  const shaftA = useLiveStat(57, 6);
  const shaftB = useLiveStat(61, 6);
  const monitored = t('monitoring.monitored');
  const catchList = t('monitoring.catch');

  return (
    <Section id="monitoring" alt>
      <div className="monitoring-head">
        <SectionHead label={t('monitoring.label')} heading={t('monitoring.heading')} lead={t('monitoring.lead')} />
        <Reveal>
          <div className="run-badge">
            <span className="run-dot" />
            {t('monitoring.running')}
            <span className="run-time mono">{time}</span>
          </div>
        </Reveal>
      </div>

      <Reveal><p className="body monitoring-intro">{t('monitoring.p1')}</p></Reveal>

      <div className="monitoring-grid">
        {/* Torque chart */}
        <Reveal delay={0.05}>
          <div className="mon-card card">
            <div className="mon-card-head">
              <h3 className="subheading">{t('monitoring.chartTorque')}</h3>
              <span className="mon-unit mono">N·m</span>
            </div>
            <LiveChart
              unit="N·m"
              domain={[0, 100]}
              series={[
                { key: 'a', name: 'Shaft A', color: 'var(--accent)', base: 57, jitter: 6, spike: true },
                { key: 'b', name: 'Shaft B', color: 'var(--accent-2)', base: 61, jitter: 6 },
              ]}
            />
            <div className="mon-stats">
              <StatCard color="var(--accent)" name="Shaft A" cur={shaftA.value} max={shaftA.max} unit="N·m" />
              <StatCard color="var(--accent-2)" name="Shaft B" cur={shaftB.value} max={shaftB.max} unit="N·m" />
            </div>
          </div>
        </Reveal>

        {/* Camera */}
        <Reveal delay={0.1}>
          <div className="mon-card card camera-card">
            <div className="mon-card-head">
              <h3 className="subheading"><Camera size={18} className="accent" /> {t('monitoring.cameraTitle')}</h3>
              <span className="live-tag"><Radio size={12} /> LIVE</span>
            </div>
            <div className="camera-frame">
              <div className="camera-scan" />
              <div className="camera-grid-lines" />
              <span className="camera-note">{t('monitoring.cameraNote')}</span>
            </div>
          </div>
        </Reveal>

        {/* Conveyor chart */}
        <Reveal delay={0.15}>
          <div className="mon-card card">
            <div className="mon-card-head">
              <h3 className="subheading">{t('monitoring.chartConveyor')}</h3>
              <span className="mon-unit mono">m/min</span>
            </div>
            <LiveChart
              unit="m/min"
              domain={[8, 14]}
              series={[
                { key: 'in', name: 'Input', color: 'var(--brand-orange-light)', base: 11, jitter: 0.6 },
                { key: 'out', name: 'Output', color: 'var(--brand-green-lighter)', base: 11.2, jitter: 0.6 },
              ]}
            />
          </div>
        </Reveal>

        {/* Monitored + catch */}
        <Reveal delay={0.2}>
          <div className="mon-card card">
            <p className="body">{t('monitoring.p2')}</p>
            <div className="mon-chips">
              {monitored.map((m) => <span key={m} className="pill">{m}</span>)}
            </div>
            <div className="mon-catch">
              <strong><AlertTriangle size={16} className="accent" /> {t('monitoring.catchTitle')}</strong>
              <div className="mon-chips">
                {catchList.map((c) => <span key={c} className="tag">{c}</span>)}
              </div>
              <p className="body mon-p3">{t('monitoring.p3')}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <p className="sim-note mono">{t('monitoring.simNote')}</p>
    </Section>
  );
}

function StatCard({ color, name, cur, max, unit }) {
  return (
    <div className="stat-card">
      <span className="stat-name"><span className="stat-swatch" style={{ background: color }} />{name}</span>
      <div className="stat-vals">
        <span><em>Current</em><b className="mono">{cur}</b></span>
        <span><em>Max</em><b className="mono">{max}</b></span>
        <span className="stat-unit mono">{unit}</span>
      </div>
    </div>
  );
}
