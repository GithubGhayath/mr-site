import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { DollarSign, Zap, Box, ListChecks } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Section, SectionHead, Reveal } from '../components/ui';

const TREND = [
  { p: 'P6', v: 2.1 }, { p: 'P7', v: 2.35 }, { p: 'P8', v: 2.6 },
  { p: 'P9', v: 2.9 }, { p: 'P10', v: 3.2 }, { p: 'P11', v: 3.5 },
  { p: 'P12', v: 3.8 }, { p: 'P13', v: 3.4 }, { p: 'P14', v: 1.6 },
];

const DIST = [
  { name: 'Beech', value: 34, color: '#E05C1A' },
  { name: 'Spruce', value: 22, color: '#17463E' },
  { name: 'Lignamon', value: 18, color: '#c79a5b' },
  { name: 'Bendywood', value: 14, color: '#2c8574' },
  { name: 'DMDHEU', value: 12, color: '#e0a53a' },
];

const ROWS = [
  ['4', 'Lignamon 783', '30×200', '1.600', '1920.00', '11.30'],
  ['7', 'Beech 16', '30×200', '2.350', '2820.00', '14.20'],
  ['10', 'Native Beech', '30×200', '3.200', '3840.00', '17.20'],
  ['12', 'Spruce 8', '30×200', '3.800', '4560.00', '19.10'],
  ['13', 'Beech 16', '30×200', '2.900', '3480.00', '16.30'],
];

export default function Analytics() {
  const { t } = useLang();
  const caps = t('analytics.capabilities');
  const kpis = [
    { icon: DollarSign, label: t('analytics.kpiFees'), value: '$32,702', color: 'var(--accent)' },
    { icon: Zap, label: t('analytics.kpiEnergy'), value: '164.8 kWh', color: 'var(--brand-green-lighter)' },
    { icon: Box, label: t('analytics.kpiVolume'), value: '27.25 m³', color: 'var(--brand-orange-light)' },
    { icon: ListChecks, label: t('analytics.kpiProcesses'), value: '14', color: 'var(--accent-2)' },
  ];

  return (
    <Section id="analytics">
      <SectionHead label={t('analytics.label')} heading={t('analytics.heading')} lead={t('analytics.lead')} />

      <div className="kpi-row">
        {kpis.map((k, i) => (
          <Reveal key={k.label} delay={i * 0.06}>
            <div className="kpi-card card">
              <span className="kpi-icon" style={{ color: k.color }}><k.icon size={22} /></span>
              <span className="kpi-value mono">{k.value}</span>
              <span className="kpi-label">{k.label}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal><p className="body analytics-intro">{t('analytics.p1')}</p></Reveal>

      <div className="analytics-charts">
        <Reveal delay={0.05}>
          <div className="chart-card card">
            <h3 className="subheading">{t('analytics.trendTitle')}</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--grid-line)" vertical={false} />
                  <XAxis dataKey="p" tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-dim)', fontSize: 11 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} width={38} />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 10, fontSize: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="var(--accent)" strokeWidth={2.5} fill="url(#areaFill)" name="m³" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="chart-card card">
            <h3 className="subheading">{t('analytics.distTitle')}</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={DIST} dataKey="value" nameKey="name" innerRadius="45%" outerRadius="75%" paddingAngle={2} stroke="var(--card)">
                    {DIST.map((d) => <Cell key={d.name} fill={d.color} />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 10, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="analytics-bottom">
        <Reveal delay={0.05}>
          <div className="caps-card card">
            <p className="body">{t('analytics.p2')}</p>
            <div className="caps-grid">
              {caps.map((c) => <span key={c} className="pill">{c}</span>)}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="ops-card card">
            <div className="ops-head">
              <span>#</span><span>Wood</span><span>Dim</span><span>Vol</span><span>Fees</span><span>kWh</span>
            </div>
            {ROWS.map((r) => (
              <div className="ops-row" key={r[0]}>
                {r.map((c, i) => <span key={i} className={i === 1 ? '' : 'mono'}>{c}</span>)}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
