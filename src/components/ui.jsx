import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../context/LanguageContext';

// Resolve a file in /public respecting Vite's base path (works in dev & on Pages).
export function asset(name) {
  if (!name) return '';
  return `${import.meta.env.BASE_URL}${name}`.replace(/\/{2,}/g, '/').replace(':/', '://');
}

// Reveal-on-scroll wrapper.
export function Reveal({ children, delay = 0, y = 34, className = '', as = 'div' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-70px' });
  const M = motion[as] || motion.div;
  return (
    <M
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

// Standard section header: eyebrow label + heading + optional lead.
export function SectionHead({ label, heading, lead, center = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`}>
      <Reveal>
        <span className="eyebrow">{label}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="heading" dangerouslySetInnerHTML={{ __html: heading }} />
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className="lead">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

// A titled section wrapper that also registers the anchor id.
export function Section({ id, alt = false, children, className = '' }) {
  return (
    <section id={id} className={`section ${alt ? 'section-alt' : ''} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

// Small hook returning the translation helper (convenience).
export function useT() {
  return useLang().t;
}
