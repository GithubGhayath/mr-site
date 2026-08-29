import { useState } from 'react';
import { FileText, KeyRound, ExternalLink } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import ThesisRequest from '../components/ThesisRequest';
import { config } from '../data/config';

export default function Documents() {
  const { t } = useLang();
  const pdf = config.THESIS_PDF ? asset(config.THESIS_PDF) : '';
  const [requesting, setRequesting] = useState(false);

  return (
    <Section id="docs">
      <SectionHead label={t('docs.label')} heading={t('docs.heading')} lead={t('docs.lead')} />

      <div className="docs-grid">
        <Reveal>
          <div className="docs-info card">
            <div className="docs-info-head">
              <FileText className="accent" size={26} />
              <h3 className="subheading">{t('docs.thesisTitle')}</h3>
            </div>
            <p className="body">{t('docs.thesisDesc')}</p>
            <div className="docs-actions">
              <a
                className={`btn btn-primary ${pdf ? '' : 'is-disabled'}`}
                href={pdf || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!pdf}
              >
                <ExternalLink size={18} /> {t('docs.open')}
              </a>
              <button
                className={`btn btn-ghost ${pdf ? '' : 'is-disabled'}`}
                type="button"
                onClick={() => setRequesting(true)}
                disabled={!pdf}
              >
                <KeyRound size={18} /> {t('docs.request')}
              </button>
            </div>
            <p className="docs-access-note">{t('docs.accessNote')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="docs-viewer card">
            <div className="docs-viewer-bar mono">{t('docs.viewer')}</div>
            {pdf ? (
              <object data={pdf} type="application/pdf" className="pdf-object" aria-label={t('docs.thesisTitle')}>
                <iframe src={pdf} title={t('docs.thesisTitle')} className="pdf-frame" />
              </object>
            ) : (
              <div className="media-placeholder pdf-placeholder">
                <span className="media-ph-badge">{t('common.comingSoon')}</span>
                <FileText size={30} />
                <p>{t('docs.viewerNote')}</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <ThesisRequest open={requesting} onClose={() => setRequesting(false)} />
    </Section>
  );
}
