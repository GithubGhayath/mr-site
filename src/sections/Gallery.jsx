import { Image, Video, Box, Ruler, ExternalLink } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import { config } from '../data/config';

// Engineering drawing sheets in /public/drawings — the order matches gallery.drawings
// in the translations, and each slug names both the PDF and its preview image.
const DRAWINGS = [
  'cutting-mechanism',
  'feeding-mechanism',
  'v-belt-drive',
  'feeding-arm-assembly',
  'cutting-shaft',
  'saw-blade',
  'spacer-31-4',
  'feeding-shaft',
  'toothed-feed-roller',
  'feeding-shaft-pulley',
  'gearbox-feeding-pulley',
  'housing-bearing-16009',
  'rubber-bushing',
  'hex-head-bolt',
];

export default function Gallery() {
  const { t } = useLang();
  const drawings = t('gallery.drawings');
  const cats = [
    { icon: Image, label: t('gallery.photos') },
    { icon: Video, label: t('gallery.video') },
    { icon: Box, label: t('gallery.cad') },
  ];

  return (
    <Section id="gallery" alt>
      <SectionHead label={t('gallery.label')} heading={t('gallery.heading')} lead={t('gallery.lead')} />

      <div className="gallery-cats">
        {cats.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.06}>
            <span className="pill gallery-cat"><c.icon size={16} />{c.label}</span>
          </Reveal>
        ))}
      </div>

      <div className="gallery-grid">
        {config.PROJECT_VIDEO && (
          <Reveal>
            <div className="gallery-item gallery-video card">
              <video src={asset(config.PROJECT_VIDEO)} controls preload="metadata" />
              <span className="gallery-caption">{t('gallery.video')}</span>
            </div>
          </Reveal>
        )}
        {[...Array(config.PROJECT_VIDEO ? 5 : 6)].map((_, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <div className="gallery-item media-placeholder card">
              <span className="media-ph-badge">{t('common.comingSoon')}</span>
              <Image size={26} />
            </div>
          </Reveal>
        ))}
      </div>

      <p className="gallery-note body">{t('gallery.placeholder')}</p>

      {/* Engineering drawing archive — every card opens its original PDF sheet */}
      <div className="dwg-head">
        <Reveal>
          <h3 className="subheading dwg-title">
            <Ruler size={20} className="accent" />
            {t('gallery.cadTitle')}
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="body dwg-lead">{t('gallery.cadLead')}</p>
        </Reveal>
      </div>

      <div className="dwg-grid">
        {drawings.map((d, i) => (
          <Reveal key={DRAWINGS[i]} delay={0.04 * (i % 3)}>
            <a
              className="dwg-card card"
              href={asset(`drawings/${DRAWINGS[i]}.pdf`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="dwg-shot">
                <img
                  src={asset(`drawings/thumbs/${DRAWINGS[i]}.png`)}
                  alt={d.title}
                  width="1100"
                  height="778"
                  loading="lazy"
                />
                <span className="dwg-format mono">PDF</span>
                <span className="dwg-open">
                  <ExternalLink size={14} />
                  {t('gallery.openPdf')}
                </span>
              </div>
              <div className="dwg-body">
                <span className="dwg-type">{d.type}</span>
                <h4 className="dwg-name">{d.title}</h4>
                <p className="body dwg-desc">{d.desc}</p>
                <div className="dwg-specs">
                  {d.specs.map((s) => (
                    <span key={s} className="dwg-spec">{s}</span>
                  ))}
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <p className="gallery-note body">{t('gallery.cadNote')}</p>
    </Section>
  );
}
