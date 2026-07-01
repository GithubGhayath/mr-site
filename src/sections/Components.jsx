import { Layers, Disc3, Wrench, Zap, MoveHorizontal, Anchor, ArrowRightLeft } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

const ICONS = [Layers, Disc3, Anchor, Zap, MoveHorizontal, Wrench, ArrowRightLeft];

export default function Components() {
  const { t } = useLang();
  const items = t('components.items');

  return (
    <Section id="components">
      <SectionHead label={t('components.label')} heading={t('components.heading')} lead={t('components.lead')} />

      <div className="components-grid">
        {items.map((c, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <div className="component-card card">
                <div className="component-top">
                  <span className="component-icon"><Icon size={22} /></span>
                  <span className="component-num mono">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="subheading">{c.title}</h3>
                <p className="body">{c.desc}</p>
                <div className="component-tags">
                  {c.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
