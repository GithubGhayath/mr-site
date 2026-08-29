import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, FileText } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { config } from '../data/config';
import './ThesisRequest.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Access request for the thesis.
 *
 * The site is a static bundle on GitHub Pages: there is no server here and no
 * safe place to keep mail credentials. So the request either goes to a public
 * form endpoint supplied at build time (VITE_THESIS_FORM_ENDPOINT — an
 * endpoint id, never a secret), or, when none is configured, we compose the
 * message and hand it to the visitor's own mail client. Both routes end at
 * config.EMAIL; neither one puts a credential in the browser.
 */
export default function ThesisRequest({ open, onClose }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: '', email: '', purpose: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | prepared
  const firstFieldRef = useRef(null);
  const dialogRef = useRef(null);

  // Fresh form every time the dialog is opened.
  useEffect(() => {
    if (!open) return;
    setForm({ name: '', email: '', purpose: '' });
    setErrors({});
    setStatus('idle');
  }, [open]);

  // Escape to close, and keep the page behind the dialog from scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // minimal focus trap so tabbing cannot wander behind the backdrop
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll(
          'button, input, textarea, a[href]'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      const name = form.name.trim();
      const email = form.email.trim();
      const purpose = form.purpose.trim();

      const next = {};
      if (!name) next.name = t('docs.errName');
      if (!email) next.email = t('docs.errEmail');
      else if (!EMAIL_RE.test(email)) next.email = t('docs.errEmailFormat');
      setErrors(next);
      if (Object.keys(next).length) return;

      const subject = `${t('docs.mailSubject')} — ${name}`;
      const body = [
        `${t('docs.fieldName')}: ${name}`,
        `${t('docs.fieldEmail')}: ${email}`,
        `${t('docs.fieldPurpose')}: ${purpose || '—'}`,
        '',
        t('docs.mailFooter'),
      ].join('\n');

      if (config.THESIS_REQUEST_ENDPOINT) {
        setStatus('sending');
        try {
          const res = await fetch(config.THESIS_REQUEST_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ name, email, purpose, subject, _subject: subject }),
          });
          if (!res.ok) throw new Error(String(res.status));
          setStatus('sent');
          return;
        } catch {
          // Endpoint unreachable — fall through to the mail client rather than
          // losing the request.
        }
      }

      window.location.href =
        `mailto:${config.EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;
      setStatus('prepared');
    },
    [form, t]
  );

  const done = status === 'sent' || status === 'prepared';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="treq-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="treq-dialog card"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="treq-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="treq-head">
              <h3 className="subheading treq-title" id="treq-title">
                <FileText size={20} className="accent" />
                {done ? t('docs.requestDoneHead') : t('docs.requestTitle')}
              </h3>
              <button className="treq-close" onClick={onClose} aria-label={t('common.close')}>
                <X size={18} />
              </button>
            </div>

            {done ? (
              <div className="treq-done">
                <span className="treq-done-icon"><CheckCircle2 size={30} /></span>
                <h4>{status === 'sent' ? t('docs.sentTitle') : t('docs.preparedTitle')}</h4>
                <p className="body">
                  {status === 'sent' ? t('docs.sentBody') : t('docs.preparedBody')}
                </p>
                <button className="btn btn-primary" onClick={onClose}>
                  {t('common.close')}
                </button>
              </div>
            ) : (
              <form className="treq-form" onSubmit={submit} noValidate>
                <p className="body treq-intro">{t('docs.requestIntro')}</p>

                <label className="treq-field">
                  <span className="treq-label">{t('docs.fieldName')}</span>
                  <input
                    ref={firstFieldRef}
                    className={`treq-input ${errors.name ? 'has-error' : ''}`}
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="treq-error">{errors.name}</span>}
                </label>

                <label className="treq-field">
                  <span className="treq-label">{t('docs.fieldEmail')}</span>
                  <input
                    className={`treq-input ${errors.email ? 'has-error' : ''}`}
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    dir="ltr"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="treq-error">{errors.email}</span>}
                </label>

                <label className="treq-field">
                  <span className="treq-label">
                    {t('docs.fieldPurpose')} <em>{t('docs.optional')}</em>
                  </span>
                  <textarea
                    className="treq-input treq-textarea"
                    rows="3"
                    value={form.purpose}
                    onChange={set('purpose')}
                  />
                </label>

                <div className="treq-actions">
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                    <Send size={17} />
                    {status === 'sending' ? t('docs.sending') : t('docs.submit')}
                  </button>
                  <button className="btn btn-ghost" type="button" onClick={onClose}>
                    {t('docs.cancel')}
                  </button>
                </div>

                <p className="treq-note">{t('docs.requestNote')}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
