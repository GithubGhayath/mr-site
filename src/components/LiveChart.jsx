import { useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

// Layered signal generator that mimics industrial sensor output:
//   slow sinusoid  → load variation as the cut progresses
//   fast sinusoid  → periodic ripple (tooth engagement / belt segments)
//   white noise    → sensor & measurement noise
//   decaying bumps → occasional transients (knots, feed disturbances)
// Series options: base, noise, osc (slow amp), ripple (fast amp), spike (bool).
function makeGenerator(s) {
  const p1 = Math.random() * Math.PI * 2;
  const p2 = Math.random() * Math.PI * 2;
  const f1 = 0.16 + Math.random() * 0.08; // slow component frequency
  const f2 = 0.85 + Math.random() * 0.2; // fast component frequency
  let load = 0;
  return (t) => {
    if (s.spike && Math.random() < 0.055) load += (s.osc ?? 1) * (1.5 + Math.random() * 2);
    load *= 0.72; // exponential decay of transients
    const slow = Math.sin(t * f1 + p1) * (s.osc ?? 0);
    const fast = Math.sin(t * f2 + p2) * (s.ripple ?? 0);
    const noise = (Math.random() - 0.5) * 2 * (s.noise ?? 0);
    return Math.max(0, +(s.base + slow + fast + noise + load).toFixed(2));
  };
}

// A self-driving live chart: keeps a rolling window of simulated sensor readings.
export default function LiveChart({ series, points = 40, interval = 900, unit = '', domain }) {
  const gensRef = useRef(null);
  if (!gensRef.current) gensRef.current = series.map((s) => makeGenerator(s));

  const [data, setData] = useState(() => {
    // Seed the whole window from the generators so the chart opens realistic,
    // not as a flat line that only comes alive after a while.
    const seed = [];
    for (let i = 0; i < points; i++) {
      const row = { t: i };
      series.forEach((s, k) => (row[s.key] = gensRef.current[k](i)));
      seed.push(row);
    }
    return seed;
  });
  const counter = useRef(points);
  const paused = useRef(false);

  useEffect(() => {
    const onVis = () => (paused.current = document.hidden);
    document.addEventListener('visibilitychange', onVis);
    const id = setInterval(() => {
      if (paused.current) return;
      setData((prev) => {
        const t = counter.current++;
        const row = { t };
        series.forEach((s, k) => (row[s.key] = gensRef.current[k](t)));
        return [...prev.slice(1), row];
      });
    }, interval);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [series, interval]);

  return (
    <div className="live-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
          <CartesianGrid stroke="var(--grid-line)" vertical={false} />
          <XAxis dataKey="t" tick={false} axisLine={{ stroke: 'var(--border)' }} />
          <YAxis
            domain={domain || ['auto', 'auto']}
            tick={{ fill: 'var(--text-dim)', fontSize: 11, fontFamily: 'monospace' }}
            axisLine={{ stroke: 'var(--border)' }}
            tickLine={false}
            width={44}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: 10,
              fontSize: 12,
            }}
            labelStyle={{ display: 'none' }}
            formatter={(v, n) => [`${v} ${unit}`, n]}
          />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Live rolling value read from a matching simulation model (for the stat cards).
export function useLiveStat(base, jitter, interval = 900) {
  const genRef = useRef(null);
  if (!genRef.current) {
    genRef.current = makeGenerator({ base, noise: jitter * 0.5, osc: jitter * 1.4, ripple: jitter * 0.5, spike: true });
  }
  const tRef = useRef(0);
  const maxRef = useRef(base);
  const [v, setV] = useState(base);
  const [max, setMax] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      const next = +genRef.current(tRef.current++).toFixed(1);
      setV(next);
      if (next > maxRef.current) {
        maxRef.current = next;
        setMax(next);
      }
    }, interval);
    return () => clearInterval(id);
  }, [interval]);
  return { value: v, max };
}
