import { Image, Video, Box } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import { config } from '../data/config';

export default function Gallery() {
  const { t } = useLang();
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
    </Section>
  );
}
