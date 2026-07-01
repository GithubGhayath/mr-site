import { TreePine, Scissors, Cog, PackageCheck } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import { config } from '../data/config';

export default function ProductionLine() {
  const { t, lang } = useLang();
  // A simple, conceptual 4-stage line with the MRM at its centre.
  const line = [
    { icon: TreePine, en: 'Log intake', ar: 'استلام الجذوع' },
    { icon: Scissors, en: 'Debark / prep', ar: 'التقشير والتهيئة' },
    { icon: Cog, en: 'MRM — ripping', ar: 'MRM — التشريح', active: true },
    { icon: PackageCheck, en: 'Sort & stack', ar: 'الفرز والتكديس' },
  ];

  return (
    <Section id="line">
      <SectionHead label={t('line.label')} heading={t('line.heading')} />

      <div className="line-grid">
        <div className="line-text">
          <Reveal><p className="body">{t('line.p1')}</p></Reveal>
          <Reveal delay={0.1}><p className="body">{t('line.p2')}</p></Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="line-flow">
            {line.map((s, i) => (
              <div key={i} className={`line-node ${s.active ? 'active' : ''}`}>
                <span className="line-node-icon"><s.icon size={22} /></span>
                <span className="line-node-label">{lang === 'ar' ? s.ar : s.en}</span>
                {i < line.length - 1 && <span className="line-arrow" aria-hidden="true">→</span>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        {config.PRODUCTION_LINE_IMG ? (
          <div className="line-layout card">
            <img src={asset(config.PRODUCTION_LINE_IMG)} alt="Production line layout" />
          </div>
        ) : (
          <div className="media-placeholder card">
            <span className="media-ph-badge">{t('common.comingSoon')}</span>
            <p>{t('line.placeholder')}</p>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
