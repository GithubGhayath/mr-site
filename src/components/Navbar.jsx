import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Languages } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

// Full ordered list; a subset shows on desktop, the whole list in the mobile sheet.
const NAV = [
  'overview', 'machine', 'components', 'engineering', 'software',
  'monitoring', 'analytics', 'maintenance', 'line', 'gallery', 'docs', 'team', 'contact',
];
const DESKTOP = ['overview', 'machine', 'software', 'monitoring', 'maintenance', 'team', 'contact'];

export default function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const points = NAV.map((id) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.offsetTop - 140 } : null;
      }).filter(Boolean);
      const cur = points.reverse().find((p) => window.scrollY >= p.top);
      setActive(cur ? cur.id : 'hero');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = useCallback((id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go('hero')} aria-label="MRM home">
          <span className="nav-logo-mark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="34" height="34">
              <g transform="translate(20 20)">
                <g fill="currentColor">
                  {[...Array(12)].map((_, i) => (
                    <path key={i} d="M0 -18 L2.6 -14 L-2.6 -14 Z" transform={`rotate(${i * 30})`} />
                  ))}
                </g>
                <circle r="13.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle r="5" fill="currentColor" />
              </g>
            </svg>
          </span>
          <span className="nav-logo-text">
            <strong>MRM</strong>
            <em>{lang === 'ar' ? 'آلة التشريح المتعدّدة' : 'Multi Ripping Machine'}</em>
          </span>
        </button>

        <div className="nav-links">
          {DESKTOP.map((id) => (
            <button
              key={id}
              className={`nav-link ${active === id ? 'active' : ''}`}
              onClick={() => go(id)}
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>

        <div className="nav-actions">
          <button className="nav-icon-btn lang-btn" onClick={toggleLang} aria-label="Toggle language">
            <Languages size={17} />
            <span>{lang === 'ar' ? 'EN' : 'ع'}</span>
          </button>
          <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'inline-flex' }}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button className="nav-icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-sheet"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="nav-sheet-grid">
              {NAV.map((id, i) => (
                <motion.button
                  key={id}
                  className={`nav-sheet-link ${active === id ? 'active' : ''}`}
                  onClick={() => go(id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <span className="nav-sheet-num mono">{String(i + 1).padStart(2, '0')}</span>
                  {t(`nav.${id}`)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
