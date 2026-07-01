import { useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

// A self-driving live chart: keeps a rolling window of simulated sensor readings.
// series: [{ key, name, color, base, jitter, spike? }]
export default function LiveChart({ series, points = 40, interval = 900, unit = '', domain }) {
  const [data, setData] = useState(() => {
    const seed = [];
    for (let i = 0; i < points; i++) {
      const row = { t: i };
      series.forEach((s) => (row[s.key] = s.base));
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
        const row = { t: counter.current++ };
        series.forEach((s) => {
          const last = prev[prev.length - 1][s.key];
          const spike = s.spike && Math.random() < 0.05 ? (Math.random() * s.jitter * 3) : 0;
          const drift = (s.base - last) * 0.15; // pull back to base
          const next = last + drift + (Math.random() - 0.5) * s.jitter * 2 + spike;
          row[s.key] = Math.max(0, +next.toFixed(1));
        });
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

// Live rolling value read from the same simulation model (for the stat cards).
export function useLiveStat(base, jitter, interval = 900) {
  const [v, setV] = useState(base);
  const maxRef = useRef(base);
  const [max, setMax] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setV((prev) => {
        const drift = (base - prev) * 0.15;
        const next = Math.max(0, +(prev + drift + (Math.random() - 0.5) * jitter * 2).toFixed(1));
        if (next > maxRef.current) {
          maxRef.current = next;
          setMax(next);
        }
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [base, jitter, interval]);
  return { value: v, max };
}
