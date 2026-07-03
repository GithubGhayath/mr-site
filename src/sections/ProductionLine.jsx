import { TreePine, Scissors, Cog, PackageCheck, MoveHorizontal } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import { config } from '../data/config';

export default function ProductionLine() {
  const { t, lang } = useLang();
  // The real sawmilling line the MRM belongs to, in feed order.
  const line = [
    { icon: TreePine, en: 'Log loading deck', ar: 'منصّة تحميل الجذوع' },
    { icon: Scissors, en: 'Twin vertical saw', ar: 'منشار عمودي مزدوج' },
    { icon: MoveHorizontal, en: 'Centring conveyor', ar: 'ناقل توسيط' },
    { icon: Cog, en: 'SMRM — multi-ripping', ar: 'SMRM — التشريح المتعدّد', active: true },
    { icon: PackageCheck, en: 'Sweep-chain out-feed', ar: 'ناقل الإخراج السلسلي' },
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
            <img
              src={asset(config.PRODUCTION_LINE_IMG)}
              alt={t('line.caption')}
              width="896"
              height="466"
              loading="lazy"
            />
            <p className="line-caption">{t('line.caption')}</p>
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
