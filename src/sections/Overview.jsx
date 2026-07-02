import { Landmark, Cog, Cpu, Activity } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

const ICONS = [Cog, Cpu, Activity];

export default function Overview() {
  const { t } = useLang();
  const pillars = t('overview.pillars');

  return (
    <Section id="overview">
      <SectionHead label={t('overview.label')} heading={t('overview.heading')} lead={t('overview.lead')} />

      <div className="overview-grid">
        <div className="overview-text">
          <Reveal><p className="body">{t('overview.p1')}</p></Reveal>
          <Reveal delay={0.1}><p className="body">{t('overview.p2')}</p></Reveal>
          <Reveal delay={0.2}>
            <div className="overview-dept card">
              <Landmark className="accent" size={26} />
              <div>
                <strong>{t('overview.university')}</strong>
                <span>{t('overview.dept')}</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="overview-pillars">
          {pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="pillar card">
                  <span className="pillar-icon"><Icon size={22} /></span>
                  <div>
                    <h3 className="subheading">{p.title}</h3>
                    <p className="body">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
