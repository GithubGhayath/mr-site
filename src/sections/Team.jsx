import { User, Briefcase, ClipboardList, BookOpen } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

function initials(name) {
  const clean = name.replace(/^(Eng\.|م\.)\s*/i, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
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
                <span className="team-initials">{initials(m.name)}</span>
                <User className="team-photo-icon" size={30} />
              </div>
              <h3 className="team-name">{m.name}</h3>
              <span className="team-role"><Briefcase size={14} />{m.role}</span>

              <div className="team-field">
                <span className="team-field-label"><ClipboardList size={14} />{t('team.responsibilities')}</span>
                <p>{m.resp}</p>
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
