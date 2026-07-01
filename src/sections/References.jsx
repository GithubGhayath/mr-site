import { BookMarked, Quote } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

export default function References() {
  const { t } = useLang();
  const groups = t('references.groups');

  return (
    <Section id="references" alt>
      <SectionHead label={t('references.label')} heading={t('references.heading')} lead={t('references.lead')} />

      <div className="ref-grid">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 0.08}>
            <div className="ref-card card">
              <div className="ref-card-head">
                <BookMarked size={20} className="accent" />
                <h3 className="subheading">{g.title}</h3>
              </div>
              <ul className="ref-list">
                {g.items.map((item, k) => (
                  <li key={k}><Quote size={13} className="ref-quote" />{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="ref-note body">{t('references.note')}</p>
    </Section>
  );
}
