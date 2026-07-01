import { Github, Mail, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';
import { config } from '../data/config';

export default function Contact() {
  const { t } = useLang();

  return (
    <Section id="contact" alt className="contact-section">
      <div className="grid-bg" />
      <div className="contact-inner">
        <SectionHead label={t('contact.label')} heading={t('contact.heading')} center />
        <Reveal delay={0.1}>
          <p className="lead contact-lead">{t('contact.lead')}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="contact-cta">
            <a className="btn btn-primary" href={config.GITHUB_REPO} target="_blank" rel="noopener noreferrer">
              <Github size={18} /> {t('contact.github')}
              <ArrowRight className="icon-flip" size={16} />
            </a>
            <a className="btn btn-ghost" href={`mailto:${config.EMAIL}`}>
              <Mail size={18} /> {t('contact.email')}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
