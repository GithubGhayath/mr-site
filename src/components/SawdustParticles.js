import { useEffect, useState, useCallback } from 'react';
import './SawdustParticles.css';

function SawdustParticles() {
  const [particles, setParticles] = useState([]);

  const createParticle = useCallback(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: -5,
    size: Math.random() * 4 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: Math.random() * 1.5 + 0.5,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 4,
    opacity: Math.random() * 0.5 + 0.2,
    color: ['#C4A882', '#8B6914', '#5C4033', '#D4B896'][Math.floor(Math.random() * 4)],
  }), []);

  useEffect(() => {
    let scrollY = 0;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - scrollY);
      scrollY = window.scrollY;
      if (delta > 2) {
        const count = Math.min(Math.floor(delta / 5), 4);
        const newParticles = Array.from({ length: count }, createParticle);
        setParticles(prev => [...prev.slice(-40), ...newParticles]);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [createParticle]);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles(prev => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="sawdust-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="sawdust-particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
            '--rot': `${p.rotation}deg`,
            '--speed-x': `${p.speedX * 100}px`,
            '--speed-y': `${p.speedY * 100}vh`,
          }}
        />
      ))}
    </div>
  );
}

export default SawdustParticles;
