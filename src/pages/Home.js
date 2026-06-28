import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import CuttingDisc from '../components/CuttingDisc';
import SawdustParticles from '../components/SawdustParticles';
import './Home.css';

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dirs = { up: [40, 0], down: [-40, 0], left: [-60, 0], right: [60, 0] };
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, [axis]: dirs[direction][0] }}
      animate={inView ? { opacity: 1, [axis]: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedHeading({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          initial={{ opacity: 0, y: 30, rotateX: -60 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.025 }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  );
}

function StatCounter({ value, suffix = '', label, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const numRef = useRef(null);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
    >
      <motion.span
        className="stat-number"
        ref={numRef}
        animate={inView ? { '--n': value } : { '--n': 0 }}
        initial={{ '--n': 0 }}
        transition={{ duration: 2, ease: 'easeOut', delay }}
        onUpdate={(latest) => {
          if (numRef.current) numRef.current.textContent = Math.floor(latest['--n'] || 0) + suffix;
        }}
      >
        0{suffix}
      </motion.span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

function EquationCard({ formula, name, vars, index }) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="equation-card">
        <div className="eq-name">{name}</div>
        <div className="eq-formula">{formula}</div>
        <div className="eq-vars">{vars}</div>
      </div>
    </Reveal>
  );
}

function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const cutLine = useTransform(scrollYProgress, [0.03, 0.18], ['0%', '100%']);

  return (
    <div className="home">
      <SawdustParticles />
      <CuttingDisc scrollProgress={scrollYProgress} />

      {/* ═══════ HERO ═══════ */}
      <motion.section id="hero" className="hero" style={{ y: heroY, opacity: heroOpacity }}>
        <div className="hero-grid-bg" />
        <div className="hero-gears">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className={`hero-gear gear-${i}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 * i, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        <div className="hero-content">
          <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}>
            <span className="badge-dot" />UNIVERSITY CAPSTONE PROJECT
          </motion.div>

          <h1 className="hero-title">
            <AnimatedHeading text="Multi Ripping" className="title-line" delay={0.3} />
            <AnimatedHeading text="Cutting Machine" className="title-line accent" delay={0.7} />
          </h1>

          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            A double-arbor industrial wood processing system inspired by the WoodMizer MR200.
            Precision-engineered for multi-rip sawing with automated feed control and real-time
            force analysis.
          </motion.p>

          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
            <motion.button className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              Discover More
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.button>
            <motion.button className="btn-ghost" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('software')?.scrollIntoView({ behavior: 'smooth' })}>
              View Software
            </motion.button>
          </motion.div>
        </div>

        <motion.div className="scroll-hint"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <div className="scroll-track"><div className="scroll-thumb" /></div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.section>

      {/* cut line */}
      <div className="cut-divider">
        <motion.div className="cut-line" style={{ width: cutLine }} />
      </div>

      {/* ═══════ ABOUT ═══════ */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <Reveal><span className="label">ABOUT THE PROJECT</span></Reveal>
              <Reveal delay={0.1}>
                <h2 className="heading-2">
                  Automating <span className="accent">Precision</span> in
                  Industrial Wood Cutting
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="body-text">
                  Our Multi Ripping Cutting Machine is a fourth-year capstone engineering project
                  that automates the wood sawing process. Inspired by the WoodMizer MR200 double-arbor
                  multi-rip system, our machine processes raw timber into precisely dimensioned lumber
                  using multiple circular saw blades mounted on parallel arbors.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="body-text">
                  The system integrates a custom-built desktop application for real-time monitoring
                  of cutting forces, blade geometry, and production metrics — bridging mechanical
                  engineering with software automation.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="about-tags">
                  {['CNC Control', 'Force Analysis', 'WinForms UI', 'Entity Framework', 'ScottPlot Charts'].map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="about-right">
              <Reveal direction="right" delay={0.2}>
                <div className="machine-diagram">
                  <svg viewBox="0 0 400 400" className="diagram-svg">
                    <defs>
                      <linearGradient id="woodGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#5C4033" />
                        <stop offset="30%" stopColor="#8B6914" />
                        <stop offset="60%" stopColor="#C4A882" />
                        <stop offset="100%" stopColor="#8B6914" />
                      </linearGradient>
                    </defs>
                    {/* machine frame */}
                    <rect x="40" y="60" width="320" height="280" rx="6" fill="none" stroke="#17463E" strokeWidth="2" />
                    <rect x="40" y="60" width="320" height="40" rx="6" fill="rgba(23,70,62,0.15)" stroke="none" />
                    <text x="200" y="85" textAnchor="middle" fill="#17463E" fontSize="12" fontWeight="bold">DOUBLE ARBOR SYSTEM</text>

                    {/* arbor 1 */}
                    <line x1="80" y1="180" x2="320" y2="180" stroke="#848283" strokeWidth="3" />
                    {[120, 170, 220, 270].map((cx, i) => (
                      <g key={`a1-${i}`}>
                        <circle cx={cx} cy={180} r={22} fill="none" stroke="#E05C1A" strokeWidth="1.5" />
                        <circle cx={cx} cy={180} r={4} fill="#E05C1A" />
                        {[0, 60, 120, 180, 240, 300].map(a => (
                          <line key={a} x1={cx} y1={180 - 10} x2={cx} y2={180 - 18}
                            stroke="#E05C1A" strokeWidth="1" transform={`rotate(${a} ${cx} 180)`} />
                        ))}
                      </g>
                    ))}

                    {/* arbor 2 */}
                    <line x1="80" y1="260" x2="320" y2="260" stroke="#848283" strokeWidth="3" />
                    {[145, 195, 245].map((cx, i) => (
                      <g key={`a2-${i}`}>
                        <circle cx={cx} cy={260} r={22} fill="none" stroke="#E05C1A" strokeWidth="1.5" />
                        <circle cx={cx} cy={260} r={4} fill="#E05C1A" />
                        {[0, 60, 120, 180, 240, 300].map(a => (
                          <line key={a} x1={cx} y1={260 - 10} x2={cx} y2={260 - 18}
                            stroke="#E05C1A" strokeWidth="1" transform={`rotate(${a} ${cx} 260)`} />
                        ))}
                      </g>
                    ))}

                    {/* wood feed */}
                    <rect x="60" y="200" width="280" height="40" rx="3" fill="url(#woodGrad)" opacity="0.6" />
                    <text x="200" y="225" textAnchor="middle" fill="#F5F0EB" fontSize="11">TIMBER FEED →</text>

                    {/* labels */}
                    <text x="60" y="170" fill="#848283" fontSize="9">Arbor 1 (Upper)</text>
                    <text x="60" y="296" fill="#848283" fontSize="9">Arbor 2 (Lower)</text>

                    {/* dimension lines */}
                    <line x1="350" y1="180" x2="350" y2="260" stroke="#E05C1A" strokeWidth="0.5" strokeDasharray="3" />
                    <text x="362" y="224" fill="#E05C1A" fontSize="8" transform="rotate(-90 362 224)">KERF</text>
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="section section-dark">
        <div className="container">
          <div className="stats-row">
            <StatCounter value={9} suffix="" label="Wood Species" delay={0} />
            <StatCounter value={48} suffix="" label="Blade Teeth" delay={0.1} />
            <StatCounter value={12} suffix="" label="Operation Profiles" delay={0.2} />
            <StatCounter value={5200} suffix="" label="Max RPM" delay={0.3} />
            <StatCounter value={15} suffix="" label="Force Components" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ═══════ SPECS ═══════ */}
      <section id="specs" className="section">
        <div className="container">
          <Reveal><span className="label centered">MACHINE SPECIFICATIONS</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-2 centered">
              Engineering <span className="accent">Parameters</span>
            </h2>
          </Reveal>

          <div className="specs-grid">
            {[
              { title: 'Wood Types Supported', items: ['Native Beech (52 MPa)', 'Spruce variants (36-42 MPa)', 'Bendywood (49.7 MPa)', 'DMDHEU modified (22.4 MPa)', 'Lignamon 783 & 1185'] },
              { title: 'Cutting Parameters', items: ['Feed velocity: 0.85 – 3.80 m/min', 'Cutting speed: 3000 – 5200 RPM', 'Depth of cut: 15 – 36 mm', 'Feed per tooth: 0.10 – 0.32 mm', 'Motor power: 1200 – 2850 W'] },
              { title: 'Force Analysis', items: ['Cutting force Fc = f(h, τ, b)', 'Thrust force Ft = Fc·tan(θ)', 'Shear force Fs components', 'Friction on rake face', 'Real-time torque monitoring'] },
              { title: 'Production Metrics', items: ['Volumetric rate Q = Vf·A·3600', 'Product width: 30 mm standard', 'Product height: 200 mm', 'Electricity cost tracking', 'Operational load: 80 – 170 units'] },
            ].map((spec, i) => (
              <Reveal key={spec.title} delay={i * 0.12}>
                <div className="spec-card">
                  <div className="spec-number">0{i + 1}</div>
                  <h3 className="spec-title">{spec.title}</h3>
                  <ul className="spec-list">
                    {spec.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SOFTWARE ═══════ */}
      <section id="software" className="section section-dark">
        <div className="container">
          <Reveal><span className="label centered">DESKTOP APPLICATION</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-2 centered">
              Control <span className="accent">Software</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text centered max-w-lg">
              A Windows Forms application built with C# and .NET, featuring real-time force
              calculations, interactive charts powered by ScottPlot, and complete machine
              operation management through Entity Framework Core.
            </p>
          </Reveal>

          <div className="software-showcase">
            <Reveal delay={0.2}>
              <div className="app-window">
                <div className="window-bar">
                  <div className="window-dots">
                    <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                  </div>
                  <span className="window-title">MR200 Machine Controller — Home Panel</span>
                </div>
                <div className="window-body">
                  <div className="app-sidebar">
                    {['Home', 'Charts', 'History', 'Maintenance'].map((tab, i) => (
                      <div key={tab} className={`sidebar-btn ${i === 0 ? 'active' : ''}`}>
                        <div className="sidebar-icon" />
                        <span>{tab}</span>
                      </div>
                    ))}
                  </div>
                  <div className="app-main">
                    <div className="app-header-row">
                      <h3 className="app-panel-title">Home Panel</h3>
                      <div className="app-controls">
                        <button className="app-btn start">Start</button>
                        <button className="app-btn stop">Stop</button>
                        <button className="app-btn end">End Process</button>
                      </div>
                    </div>
                    <div className="app-content-grid">
                      <div className="app-section">
                        <div className="app-label">Choose type of wood to process:</div>
                        <div className="app-select">Select Wood Type ▾</div>
                        <div className="app-label mt">Cutting tool properties:</div>
                        <div className="app-data-grid">
                          {['Feed Velocity', 'Cutting Velocity', 'Feed per teeth', 'Number of rotations', 'Volumetric production rate'].map(p => (
                            <div key={p} className="app-data-row">
                              <span>{p}</span><span className="app-val">[N/A]</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="app-section">
                        <div className="app-chart">
                          <div className="chart-title">Fc(h) — Cutting Force</div>
                          <div className="chart-area">
                            <svg viewBox="0 0 200 100" className="chart-svg">
                              <polyline points="10,90 40,70 70,40 100,35 130,45 160,30 190,25"
                                fill="none" stroke="#E05C1A" strokeWidth="2" />
                              <line x1="10" y1="90" x2="190" y2="90" stroke="#444" strokeWidth="0.5" />
                              <line x1="10" y1="10" x2="10" y2="90" stroke="#444" strokeWidth="0.5" />
                            </svg>
                          </div>
                        </div>
                        <div className="app-chart">
                          <div className="chart-title">T(h) — Shaft Torque</div>
                          <div className="chart-area">
                            <svg viewBox="0 0 200 100" className="chart-svg">
                              <polyline points="10,85 40,60 70,35 100,30 130,38 160,28 190,20"
                                fill="none" stroke="#17463E" strokeWidth="2" />
                              <line x1="10" y1="90" x2="190" y2="90" stroke="#444" strokeWidth="0.5" />
                              <line x1="10" y1="10" x2="10" y2="90" stroke="#444" strokeWidth="0.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="app-forces">
                      <div className="forces-title">Force components for each angle:</div>
                      <div className="forces-grid">
                        {['Cutting Force', 'Active Force', 'Thrust Force', 'Shear Force',
                          'Friction on Rake', 'Normal to Rake', 'Normal to Shear'].map(f => (
                          <div key={f} className="force-item">
                            <span className="force-name">{f}</span>
                            <span className="force-val">[N/A] N</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="features-row">
            {[
              { icon: '⚙', title: 'Real-Time Calculation', desc: 'Computes cutting forces, shear angles, and friction coefficients instantly as you select wood types and operation parameters.' },
              { icon: '📊', title: 'Interactive Charts', desc: 'ScottPlot-powered visualization of cutting force Fc(h) and shaft torque T(h) as functions of chip thickness.' },
              { icon: '📋', title: 'Operation History', desc: 'Complete logging of all cutting operations with production conditions, critical values, and timestamps via Entity Framework.' },
              { icon: '🔧', title: 'Maintenance Tracking', desc: 'Monitor blade wear, schedule maintenance intervals, and track machine performance over time.' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="feature-card">
                  <div className="feature-icon">{f.icon}</div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SCIENCE ═══════ */}
      <section id="science" className="section">
        <div className="container">
          <Reveal><span className="label centered">THE SCIENCE</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="heading-2 centered">
              Cutting <span className="accent">Mechanics</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text centered max-w-lg">
              The machine's control system is built on fundamental metal and wood cutting theory,
              computing forces in real-time using Merchant's circle of forces and orthogonal
              cutting models.
            </p>
          </Reveal>

          <div className="equations-grid">
            <EquationCard index={0} name="Feed Per Tooth"
              formula="f = (Vf × π × D) / (Z × Vc)"
              vars="Vf: feed velocity, D: blade diameter, Z: teeth count, Vc: cutting velocity" />
            <EquationCard index={1} name="Shear Angle"
              formula="φ = π/4 − 0.5(β − α)"
              vars="β: friction angle, α: rake angle — from Merchant's theory" />
            <EquationCard index={2} name="Cutting Force"
              formula="Fc = (τy × b × ε / C) × h + (ws × b / C)"
              vars="τy: shear yield stress, b: kerf, ε: strain, h: chip thickness" />
            <EquationCard index={3} name="Shaft Torque"
              formula="M = Fc × R₀"
              vars="Fc: resultant cutting force, R₀: disc radius" />
            <EquationCard index={4} name="Production Rate"
              formula="Q = Vf × A × 3600"
              vars="Vf: feed velocity (m/s), A: product cross-section (m²)" />
            <EquationCard index={5} name="Chip Thickness"
              formula="h = f × sin(θ)"
              vars="f: feed per tooth, θ: angular position of tooth in cut" />
          </div>

          <Reveal delay={0.3}>
            <div className="wood-table">
              <h3 className="table-title">Supported Wood Material Properties</h3>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Wood Type</th>
                      <th>Category</th>
                      <th>τy (MPa)</th>
                      <th>ws (J/m²)</th>
                      <th>μ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Native Beech', 'Hardwood', '52.05', '1345.9', '0.651'],
                      ['Bendywood', 'Hardwood', '49.75', '905.1', '0.690'],
                      ['DMDHEU', 'Hardwood', '22.41', '1236.6', '0.848'],
                      ['Lignamon 783', 'Hardwood', '43.29', '3265.6', '0.690'],
                      ['Lignamon 1185', 'Hardwood', '30.39', '3736.4', '0.790'],
                      ['Beech 8', 'Hardwood', '57.16', '1772.6', '0.565'],
                      ['Beech 16', 'Hardwood', '50.61', '1656.0', '0.661'],
                      ['Spruce 8', 'Softwood', '41.53', '1555.4', '0.455'],
                      ['Spruce 16', 'Softwood', '36.00', '1472.4', '0.541'],
                    ].map(row => (
                      <tr key={row[0]}>
                        {row.map((cell, i) => <td key={i} className={i === 0 ? 'wood-name' : ''}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CONTACT / CTA ═══════ */}
      <section id="contact" className="section section-dark">
        <div className="container">
          <div className="cta-block">
            <div className="cta-gear-bg">
              {[180, 130, 80].map(r => (
                <motion.circle key={r} cx="250" cy="250" r={r}
                  fill="none" stroke="rgba(224,92,26,0.06)" strokeWidth="1"
                  animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '250px 250px' }} />
              ))}
            </div>
            <Reveal>
              <h2 className="heading-2 centered">
                Interested in <span className="accent">Our Work?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="body-text centered max-w-lg">
                This project represents the intersection of mechanical engineering, software development,
                and material science. Reach out to learn more about our multi-rip cutting machine
                or the control software behind it.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="cta-buttons">
                <motion.a href="https://github.com/GithubGhayath/Automating-slicing-machine"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  View on GitHub
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="footer-logo">MR<span className="accent">200</span></span>
              <p>Multi Ripping Cutting Machine — Capstone Engineering Project</p>
            </div>
            <div className="footer-copy">
              <p>&copy; 2026 — Built with precision.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
