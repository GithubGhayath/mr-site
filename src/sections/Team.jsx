import { Briefcase, ClipboardList, BookOpen, Linkedin } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

// LinkedIn profiles, in the same order as team.members in the translations.
// Kept out of the translation trees so one URL cannot drift from the other.
const LINKEDIN = [
  'https://www.linkedin.com/in/ghalali/',                   // Ghayath
  'https://www.linkedin.com/in/manar-abdulhadi-71b7a541b',  // Manar
  'https://www.linkedin.com/in/zoukaa-ahmad-335405432/',    // Zukaa
];

// Single stylized first initial (strip the Eng./م. title and any diacritic).
function firstInitial(name) {
  const clean = name.replace(/^(Eng\.|م\.)\s*/i, '').trim();
  return clean.charAt(0);
}

export default function Team() {
  const { t } = useLang();
  const members = t('team.members');

  return (
    <Section id="team">
      <SectionHead label={t('team.label')} heading={t('team.heading')} lead={t('team.lead')} center />

      <div className="team-grid">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.1}>
            <div className="team-card card">
              <div className="team-photo" aria-hidden="true">
                {/* machined dial ring around the initial */}
                <svg className="team-ring" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="57" fill="none" stroke="var(--border-strong)" strokeWidth="1" />
                  <g className="team-ring-spin">
                    <circle
                      cx="60" cy="60" r="50"
                      fill="none" stroke="var(--accent)" strokeWidth="1.5"
                      strokeDasharray="4 7" strokeLinecap="round" opacity="0.85"
                    />
                  </g>
                  {[...Array(12)].map((_, k) => {
                    const a = (k * 30 * Math.PI) / 180;
                    return (
                      <line
                        key={k}
                        x1={60 + 54 * Math.cos(a)} y1={60 + 54 * Math.sin(a)}
                        x2={60 + 57 * Math.cos(a)} y2={60 + 57 * Math.sin(a)}
                        stroke="var(--text-dim)" strokeWidth={k % 3 === 0 ? 1.6 : 0.8}
                      />
                    );
                  })}
                </svg>
                <span className="team-initial">{firstInitial(m.name)}</span>
              </div>
              <h3 className="team-name">{m.name}</h3>
              <span className="team-role"><Briefcase size={14} />{m.role}</span>
              {LINKEDIN[i] && (
                <a
                  className="team-linkedin"
                  href={LINKEDIN[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t('team.linkedinAria')} ${m.name}`}
                >
                  <Linkedin size={14} />
                  {t('team.linkedin')}
                </a>
              )}

              <div className="team-field">
                <span className="team-field-label"><ClipboardList size={14} />{t('team.responsibilities')}</span>
                {Array.isArray(m.resp) ? (
                  <ul className="team-resp">
                    {m.resp.map((r) => <li key={r}>{r}</li>)}
                  </ul>
                ) : (
                  <p>{m.resp}</p>
                )}
              </div>
              <div className="team-field">
                <span className="team-field-label"><BookOpen size={14} />{t('team.bio')}</span>
                <p>{m.bio}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
