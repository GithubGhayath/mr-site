import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'specs', label: 'Specs' },
  { id: 'software', label: 'Software' },
  { id: 'science', label: 'Science' },
  { id: 'contact', label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return el ? { id: s.id, top: el.offsetTop - 120 } : null;
      }).filter(Boolean);
      const current = offsets.reverse().find(o => window.scrollY >= o.top);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <button className="nav-logo" onClick={() => scrollTo('hero')}>
          <motion.div
            className="logo-disc"
            animate={{ rotate: scrolled ? 360 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 36 36" width="36" height="36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#E05C1A" strokeWidth="1.5" />
              <circle cx="18" cy="18" r="4" fill="#E05C1A" />
              {[...Array(12)].map((_, i) => (
                <line key={i} x1="18" y1="6" x2="18" y2="10" stroke="#E05C1A" strokeWidth="1"
                  transform={`rotate(${i * 30} 18 18)`} />
              ))}
            </svg>
          </motion.div>
          <div className="logo-text-group">
            <span className="logo-text">MR<span className="logo-accent">200</span></span>
            <span className="logo-sub">Multi Rip Machine</span>
          </div>
        </button>

        <div className="nav-links-desktop">
          {sections.map((s, i) => (
            <motion.button
              key={s.id}
              className={`nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => scrollTo(s.id)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              {s.label}
            </motion.button>
          ))}
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {sections.map((s, i) => (
              <motion.button
                key={s.id}
                className={`mobile-link ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => scrollTo(s.id)}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
              >
                {s.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
