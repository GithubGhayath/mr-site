import { Github } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { config } from '../data/config';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">MRM</span>
          <p>{t('footer.tagline')}</p>
          <p className="footer-project">{t('footer.project')}</p>
        </div>
        <div className="footer-right">
          <a className="footer-gh" href={config.GITHUB_REPO} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <p className="footer-copy mono">© {year} · MRM. {t('footer.rights')}</p>
          <p className="footer-built">{t('footer.built')}</p>
        </div>
      </div>
    </footer>
  );
}
