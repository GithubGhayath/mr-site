import { FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

export default function Engineering() {
  const { t } = useLang();
  const equations = t('engineering.equations');
  const contents = t('engineering.contents');

  return (
    <Section id="engineering" alt>
      <SectionHead label={t('engineering.label')} heading={t('engineering.heading')} />

      <div className="eng-grid">
        <div className="eng-text">
          <Reveal><p className="body">{t('engineering.p1')}</p></Reveal>
          <Reveal delay={0.1}><p className="body">{t('engineering.p2')}</p></Reveal>

          <Reveal delay={0.2}>
            <div className="thesis-card card">
              <div className="thesis-card-head">
                <FileText className="accent" size={24} />
                <h3 className="subheading">{t('engineering.theoryTitle')}</h3>
              </div>
              <p className="body">{t('engineering.theoryDesc')}</p>
              <ul className="thesis-contents">
                {contents.map((c) => (
                  <li key={c}><CheckCircle2 size={16} className="accent" />{c}</li>
                ))}
              </ul>
              <button className="btn btn-primary thesis-btn" onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('engineering.openThesis')}
                <ArrowRight className="icon-flip" size={18} />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="eng-equations">
          <Reveal><h3 className="eq-title mono">{t('engineering.eqTitle')}</h3></Reveal>
          {equations.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.06}>
              <div className="eq-card card">
                <span className="eq-name">{e.name}</span>
                <span className="eq-formula mono">{e.formula}</span>
                <span className="eq-vars">{e.vars}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
