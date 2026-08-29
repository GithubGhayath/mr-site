import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FileText, KeyRound, BookOpen, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal, asset } from '../components/ui';
import ThesisRequest from '../components/ThesisRequest';
import ThesisViewer from '../components/ThesisViewer';
import { config } from '../data/config';

export default function Documents() {
  const { t } = useLang();
  const pdf = config.THESIS_PDF ? asset(config.THESIS_PDF) : '';
  const [requesting, setRequesting] = useState(false);
  const [reading, setReading] = useState(false);

  // Escape closes the full-screen reader, and the page behind it stays put.
  useEffect(() => {
    if (!reading) return;
    const onKey = (e) => { if (e.key === 'Escape') setReading(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [reading]);

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
              <button
                className={`btn btn-primary ${pdf ? '' : 'is-disabled'}`}
                type="button"
                onClick={() => setReading(true)}
                disabled={!pdf}
              >
                <BookOpen size={18} /> {t('docs.open')}
              </button>
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
              !reading && <ThesisViewer src={pdf} />
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

      {reading && pdf &&
        createPortal(
          <div className="thesis-reader" role="dialog" aria-modal="true" aria-label={t('docs.thesisTitle')}>
            <div className="thesis-reader-bar">
              <span className="thesis-reader-title">{t('docs.thesisTitle')}</span>
              <button
                className="thesis-reader-close"
                onClick={() => setReading(false)}
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>
            <ThesisViewer src={pdf} />
          </div>,
          document.body
        )}
    </Section>
  );
}
