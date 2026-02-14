import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniverseBackground from './components/UniverseBackground';
import CosmicCard from './components/CosmicCard';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Layers,
  Server,
  Database,
  ArrowRight,
  Globe,
  Terminal,
  Cpu,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Code2,
  Briefcase,
  User,
  History
} from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={{
        paddingTop: scrolled ? '1rem' : '1.5rem',
        paddingBottom: scrolled ? '1rem' : '1.5rem',
        backgroundColor: scrolled ? 'rgba(2, 1, 8, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
      }}
    >
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <motion.div 
          style={{ 
            fontFamily: 'var(--font-heading)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase'
          }}
        >
          <Code2 size={24} style={{ color: '#8b5cf6' }} />
          Mohammed Imad
        </motion.div>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {[
            { label: 'Profile', id: 'profile' },
            { label: 'Stacks', id: 'stacks' },
            { label: 'Works', id: 'works' },
            { label: 'History', id: 'history' }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              style={{ 
                fontSize: '0.65rem',
                fontWeight: 700,
                color: '#94a3b8',
                textTransform: 'uppercase',
                trackingWidest: '0.2em',
                textDecoration: 'none',
                transition: '0.3s',
                letterSpacing: '0.15em'
              }}
              onMouseOver={(e) => e.target.style.color = '#ffffff'}
              onMouseOut={(e) => e.target.style.color = '#94a3b8'}
            >
              {item.label}
            </a>
          ))}
          <a href="mailto:contact@example.com" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ y: -1, boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)' }}
              style={{ 
                background: '#8b5cf6',
                color: '#ffffff',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              Contact
            </motion.button>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

const SectionHeading = ({ children, subtitle, icon: Icon }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
      {Icon && <Icon size={14} className="text-purple-500" />}
      <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.4em' }}>// {subtitle}</span>
    </div>
    <h2 style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#fff' }}>{children}</h2>
  </div>
);

const App = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', background: '#020108', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ width: '32px', height: '32px', border: '2px solid rgba(139, 92, 246, 0.1)', borderTopColor: '#8b5cf6', borderRadius: '50%' }} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-400" style={{ fontFamily: 'var(--font-body)' }}>
      <UniverseBackground />
      <div className="noise-bg" />
      <Navbar />

      <main>
        {/* PROFILE SUMMARY */}
        <section id="profile" style={{ paddingTop: '180px', paddingBottom: '60px' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8b5cf6', marginBottom: '1.5rem' }}>
                <User size={14} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em' }}>Mohammed Imad — Portfolio</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 700, color: '#fff', marginBottom: '2rem', fontFamily: 'var(--font-heading)', lineHeight: 1.1, letterSpacing: '-0.04em', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                Full-Stack<br />
                <span style={{ 
                  background: 'linear-gradient(to right, #ffffff, #c084fc, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  display: 'inline-block'
                }}>Engineer & Lead.</span>
              </h1>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '750px', fontWeight: 400 }}>
                4 years of experience architecting high-scale MERN applications. 
                Expert in Node.js microservices, MongoDB optimization, 
                and leading engineering squads.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem', alignItems: 'center' }}>
                {[
                  { Icon: Github, href: '#' },
                  { Icon: Linkedin, href: '#' },
                  { Icon: Mail, href: '#' }
                ].map(({ Icon, href }, i) => (
                  <motion.a key={i} whileHover={{ y: -2, color: '#fff' }} href={href} style={{ color: 'inherit', transition: '0.3s' }}>
                    <Icon size={20} strokeWidth={1.5} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* TECHNICAL STACKS */}
        <section id="stacks" style={{ overflow: 'hidden' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <SectionHeading subtitle="Expertise" icon={Cpu}>Technical Proficiencies</SectionHeading>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              alignItems: 'stretch' 
            }}>
              <CosmicCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <Layers size={18} className="text-purple-400" />
                  <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Frontend</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.8, fontSize: '0.85rem' }}>
                  <li>• React.js Ecosystem</li>
                  <li>• Next.js / Server Components</li>
                  <li>• Redux Toolkit & Zustand</li>
                  <li>• Tailwind & Framer Motion</li>
                  <li>• TypeScript Integration</li>
                </ul>
              </CosmicCard>
              <CosmicCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <Server size={18} className="text-blue-400" />
                  <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Backend</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.8, fontSize: '0.85rem' }}>
                  <li>• Node.js & Express</li>
                  <li>• REST & GraphQL API</li>
                  <li>• Event-Driven Logic</li>
                  <li>• WebSocket / Real-time</li>
                  <li>• JWT & OAuth Security</li>
                </ul>
              </CosmicCard>
              <CosmicCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                  <Database size={18} className="text-emerald-400" />
                  <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600 }}>Infra & Data</h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.8, fontSize: '0.85rem' }}>
                  <li>• MongoDB Aggregations</li>
                  <li>• Redis Caching Layers</li>
                  <li>• AWS Cloud Ecosystem</li>
                  <li>• Docker & CI/CD Pipelines</li>
                  <li>• Automated QA Suites</li>
                </ul>
              </CosmicCard>
            </div>
          </div>
        </section>

        {/* SELECTED WORKS */}
        <section id="works">
          <div className="container" style={{ maxWidth: '900px' }}>
            <SectionHeading subtitle="Works" icon={Terminal}>Key Deliverables</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                {
                  title: "Scalable ERP Solution",
                  tech: "MERN • REDIS • DOCKER",
                  desc: "Spearheaded the build of an enterprise resource ecosystem, achieving a 40% reduction in query overhead via advanced MongoDB indexing and Redis caching strategies.",
                  link: "#"
                },
                {
                  title: "Real-time Fintech Dashboard",
                  tech: "REACT • NODE.JS • SOCKET.IO",
                  desc: "Engineered a sub-millisecond financial engine supporting 10,000+ concurrent WebSocket streams with persistent data integrity and vault-grade security.",
                  link: "#"
                }
              ].map((proj, i) => (
                <CosmicCard key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                      <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: 600 }}>{proj.title}</h3>
                      <p style={{ color: '#8b5cf6', fontSize: '0.7rem', fontWeight: 800, marginBottom: '1.2rem', letterSpacing: '0.1em' }}>{proj.tech}</p>
                      <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{proj.desc}</p>
                    </div>
                    <motion.a href={proj.link} whileHover={{ x: 5 }} style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '0.1em' }}>
                      VIEW AUDIT <ArrowRight size={14} />
                    </motion.a>
                  </div>
                </CosmicCard>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE HISTORY */}
        <section id="history" style={{ paddingBottom: '160px' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <SectionHeading subtitle="Timeline" icon={History}>Professional History</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {[
                {
                  role: "Senior Engineering Lead",
                  comp: "MetaX Systems",
                  date: "2023 — Present",
                  bullets: [
                    "Directing a squad of 6 engineers on core MERN infrastructures.",
                    "Slashed cloud latency by 25% through specialized database sharding.",
                    "Implemented unified React component architectures for global teams."
                  ]
                },
                {
                  role: "Lead Full-Stack Developer",
                  comp: "CloudScale Consulting",
                  date: "2021 — 2023",
                  bullets: [
                    "Architected high-volume B2B e-commerce layers with Next.js.",
                    "Engineered automated API testing suites reducing bug reports by 60%.",
                    "Mentored junior talent in modern MERN best practices and Git flows."
                  ]
                }
              ].map((exp, i) => (
                <div key={i} style={{ borderLeft: '1px solid rgba(139, 92, 246, 0.3)', paddingLeft: '2.5rem', position: 'relative' }}>
                  <div style={{ width: '8px', height: '8px', background: '#8b5cf6', borderRadius: '50%', position: 'absolute', left: '-4.5px', top: '8px', boxShadow: '0 0 10px #8b5cf6' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <Briefcase size={18} className="text-purple-400 mt-1" />
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>{exp.role}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.3rem' }}>{exp.comp}</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'rgba(255,255,255,0.3)' }}>{exp.date}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {exp.bullets.map((b, idx) => (
                      <li key={idx} style={{ marginBottom: '0.6rem', position: 'relative', paddingLeft: '1.2rem' }}>
                        <span style={{ position: 'absolute', left: 0, color: '#8b5cf6' }}>—</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ paddingBottom: '100px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '100px' }}>
          <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
            <h2 style={{ color: '#fff', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Strategic Collaboration.</h2>
            <p style={{ marginBottom: '3rem', fontSize: '1rem' }}>Available for Senior or Lead MERN engineering engagements.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em' }}>
              <motion.a whileHover={{ color: '#fff' }} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                <Github size={16} /> GITHUB
              </motion.a>
              <motion.a whileHover={{ color: '#fff' }} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                <Linkedin size={16} /> LINKEDIN
              </motion.a>
              <motion.a whileHover={{ color: '#fff' }} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' }}>
                <Mail size={16} /> CONTACT
              </motion.a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
