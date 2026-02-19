import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import UniverseBackground from './components/UniverseBackground';
import FloatingGeometry from './components/FloatingGeometry';
import ThreeGlobe from './components/ThreeGlobe';
import TypeWriter from './components/TypeWriter';
import TiltCard3D from './components/TiltCard3D';
import MagneticButton from './components/MagneticButton';
import StatsCounter from './components/StatsCounter';
import SkillBars from './components/SkillBars';
import ScrollReveal from './components/ScrollReveal';
import ParticleField from './components/ParticleField';
import GlowCursor from './components/GlowCursor';
import LoadingScreen from './components/LoadingScreen';
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
  History,
  ArrowUpRight,
  Download,
  Award,
  TrendingUp,
  Activity,
  MousePointer,
  ChevronDown
} from 'lucide-react';

// ─── Scroll Progress Indicator ──────────────────────────────
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      className="scroll-indicator"
      style={{ width }}
    />
  );
};

// ─── Navbar ─────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Track active section
      const sections = ['profile', 'stacks', 'works', 'history'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Profile', id: 'profile' },
    { label: 'Stacks', id: 'stacks' },
    { label: 'Works', id: 'works' },
    { label: 'History', id: 'history' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        padding: scrolled ? '0.8rem 0' : '1.2rem 0',
        backgroundColor: scrolled ? 'rgba(2, 1, 8, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1100px'
      }}>
        <MagneticButton>
          <motion.div 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #0ea5e9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 800
            }}>
              MI
            </div>
            <span style={{ opacity: 0.9 }}>Mohammed Imad</span>
          </motion.div>
        </MagneticButton>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <MagneticButton key={item.id}>
              <a 
                href={`#${item.id}`}
                style={{ 
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: activeSection === item.id ? '#ffffff' : '#64748b',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  letterSpacing: '0.15em',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.color = '#ffffff'}
                onMouseOut={(e) => {
                  if (activeSection !== item.id) e.target.style.color = '#64748b';
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </a>
            </MagneticButton>
          ))}
          <MagneticButton>
            <a href="mailto:contact@example.com" style={{ textDecoration: 'none' }}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '8px',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'none',
                  transition: '0.3s',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  fontFamily: 'var(--font-body)'
                }}
              >
                Let's Talk
              </motion.button>
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
};

// ─── Section Heading ────────────────────────────────────────
const SectionHeading = ({ children, subtitle, icon: Icon, align = 'left' }) => (
  <ScrollReveal direction="up">
    <div style={{ marginBottom: '3rem', textAlign: align }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '0.75rem',
        justifyContent: align === 'center' ? 'center' : 'flex-start'
      }}>
        {Icon && <Icon size={14} style={{ color: '#8b5cf6' }} />}
        <span style={{ 
          fontSize: '0.6rem', 
          fontWeight: 800, 
          color: '#8b5cf6', 
          textTransform: 'uppercase', 
          letterSpacing: '0.4em',
          fontFamily: 'var(--font-mono)'
        }}>
          {'// '}{subtitle}
        </span>
      </div>
      <h2 style={{ 
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
        fontWeight: 700, 
        fontFamily: 'var(--font-heading)',
        lineHeight: 1.2
      }}>
        {children}
      </h2>
    </div>
  </ScrollReveal>
);

// ─── Tech Stack Icon ────────────────────────────────────────
const TechIcon = ({ name, color, delay = 0 }) => (
  <ScrollReveal direction="scale" delay={delay}>
    <motion.div
      whileHover={{ scale: 1.15, y: -5 }}
      style={{
        padding: '12px 16px',
        borderRadius: '10px',
        background: `${color}10`,
        border: `1px solid ${color}20`,
        fontSize: '0.75rem',
        fontWeight: 600,
        color: color,
        fontFamily: 'var(--font-mono)',
        textAlign: 'center',
        transition: 'all 0.3s',
        cursor: 'default'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = `${color}20`;
        e.currentTarget.style.borderColor = `${color}40`;
        e.currentTarget.style.boxShadow = `0 8px 25px ${color}20`;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = `${color}10`;
        e.currentTarget.style.borderColor = `${color}20`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {name}
    </motion.div>
  </ScrollReveal>
);

// ─── Main App ───────────────────────────────────────────────
const App = () => {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative" style={{ fontFamily: 'var(--font-body)' }}>
          {/* Background layers */}
          <UniverseBackground />
          <FloatingGeometry />
          <ParticleField />
          <div className="noise-bg" />
          <div className="grid-pattern" />
          <div className="aurora" />
          
          {/* Custom cursor */}
          <GlowCursor />
          
          {/* Scroll progress */}
          <ScrollProgress />
          
          {/* Navigation */}
          <Navbar />

          <main>
            {/* ═══════════════ HERO SECTION ═══════════════ */}
            <section id="profile" style={{ paddingTop: '160px', paddingBottom: '40px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
              <div className="container" style={{ maxWidth: '1100px' }}>
                <motion.div style={{ opacity: heroOpacity, y: heroY }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr auto', 
                    gap: '3rem', 
                    alignItems: 'center' 
                  }}>
                    {/* Left: Text content */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        {/* Status badge */}
                        <motion.div
                          animate={{ boxShadow: ['0 0 0px rgba(16, 185, 129, 0.3)', '0 0 15px rgba(16, 185, 129, 0.3)', '0 0 0px rgba(16, 185, 129, 0.3)'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            marginBottom: '1.5rem',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: '#10b981'
                          }}
                        >
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#10b981',
                            animation: 'pulse-glow 2s infinite'
                          }} />
                          Available for Work
                        </motion.div>

                        {/* Main heading */}
                        <h1 style={{ 
                          fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                          fontWeight: 700, 
                          color: '#fff', 
                          marginBottom: '1.5rem',
                          lineHeight: 1.1, 
                          letterSpacing: '-0.04em'
                        }}>
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            style={{ display: 'block' }}
                          >
                            I Build
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            style={{ 
                              display: 'block',
                              background: 'linear-gradient(135deg, #ffffff, #c084fc, #8b5cf6, #0ea5e9)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontWeight: 800,
                              paddingBottom: '4px'
                            }}
                          >
                            Digital Experiences.
                          </motion.span>
                        </h1>

                        {/* Typewriter role */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.8 }}
                          style={{
                            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                            marginBottom: '1.5rem',
                            minHeight: '2.5rem'
                          }}
                        >
                          <TypeWriter />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4, duration: 0.8 }}
                          style={{ 
                            fontSize: '1.05rem', 
                            lineHeight: 1.7, 
                            maxWidth: '550px', 
                            fontWeight: 400,
                            color: '#94a3b8'
                          }}
                        >
                          4+ years architecting high-scale MERN applications. 
                          Specialized in Node.js microservices, MongoDB optimization, 
                          and leading engineering teams to deliver exceptional products.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6, duration: 0.8 }}
                          style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}
                        >
                          <MagneticButton>
                            <motion.a
                              href="#works"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 28px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                color: '#fff',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-body)'
                              }}
                            >
                              View Projects <ArrowRight size={16} />
                            </motion.a>
                          </MagneticButton>

                          <MagneticButton>
                            <motion.a
                              href="#"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 28px',
                                borderRadius: '10px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                fontFamily: 'var(--font-body)'
                              }}
                            >
                              <Download size={16} /> Resume
                            </motion.a>
                          </MagneticButton>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8, duration: 0.8 }}
                          style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}
                        >
                          {[
                            { Icon: Github, href: '#', label: 'GitHub' },
                            { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                            { Icon: Mail, href: '#', label: 'Email' }
                          ].map(({ Icon, href, label }, i) => (
                            <MagneticButton key={i}>
                              <motion.a 
                                whileHover={{ y: -3, color: '#fff' }} 
                                href={href} 
                                title={label}
                                style={{ 
                                  color: '#64748b', 
                                  transition: '0.3s',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(255,255,255,0.06)',
                                  background: 'rgba(255,255,255,0.02)'
                                }}
                              >
                                <Icon size={18} strokeWidth={1.5} />
                              </motion.a>
                            </MagneticButton>
                          ))}
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Right: 3D Globe */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ position: 'relative' }}
                    >
                      <ThreeGlobe />
                      {/* Glow behind globe */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        pointerEvents: 'none',
                        zIndex: -1
                      }} />
                    </motion.div>
                  </div>

                  {/* Scroll indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginTop: '4rem',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: '#475569'
                    }}>
                      Scroll to explore
                    </span>
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ChevronDown size={18} style={{ color: '#8b5cf6' }} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* ═══════════════ STATS SECTION ═══════════════ */}
            <section style={{ padding: '0 0 60px 0' }}>
              <div className="container" style={{ maxWidth: '1100px' }}>
                <ScrollReveal direction="up">
                  <StatsCounter />
                </ScrollReveal>
              </div>
            </section>

            {/* ═══════════════ TECH STACKS ═══════════════ */}
            <section id="stacks" style={{ overflow: 'hidden' }}>
              <div className="container" style={{ maxWidth: '1100px' }}>
                <SectionHeading subtitle="Expertise" icon={Cpu}>
                  Technical <span className="text-gradient">Proficiencies</span>
                </SectionHeading>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '1.2rem',
                  marginBottom: '3rem'
                }}>
                  {[
                    {
                      icon: Layers,
                      iconColor: '#c084fc',
                      title: 'Frontend',
                      glowColor: '#8b5cf6',
                      items: ['React.js Ecosystem', 'Next.js / SSR', 'Redux & Zustand', 'Tailwind & Motion', 'TypeScript']
                    },
                    {
                      icon: Server,
                      iconColor: '#38bdf8',
                      title: 'Backend',
                      glowColor: '#0ea5e9',
                      items: ['Node.js & Express', 'REST & GraphQL', 'Event-Driven Arch', 'WebSocket / RT', 'JWT & OAuth']
                    },
                    {
                      icon: Database,
                      iconColor: '#34d399',
                      title: 'Infra & Data',
                      glowColor: '#10b981',
                      items: ['MongoDB Aggregations', 'Redis Caching', 'AWS Cloud Stack', 'Docker & CI/CD', 'Automated QA']
                    }
                  ].map((stack, i) => (
                    <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                      <TiltCard3D glowColor={stack.glowColor}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: `${stack.glowColor}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <stack.icon size={18} style={{ color: stack.iconColor }} />
                          </div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{stack.title}</h3>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, lineHeight: 2, fontSize: '0.85rem' }}>
                          {stack.items.map((item, idx) => (
                            <li key={idx} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px',
                              color: '#94a3b8'
                            }}>
                              <ChevronRight size={12} style={{ color: stack.glowColor, flexShrink: 0 }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </TiltCard3D>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Skill bars section */}
                <ScrollReveal direction="up" delay={0.3}>
                  <TiltCard3D>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
                      <Activity size={18} style={{ color: '#8b5cf6' }} />
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Skill Proficiency</h3>
                    </div>
                    <SkillBars />
                  </TiltCard3D>
                </ScrollReveal>

                {/* Tech badges */}
                <ScrollReveal direction="up" delay={0.4}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                    marginTop: '2rem',
                    justifyContent: 'center'
                  }}>
                    {['React', 'Node.js', 'MongoDB', 'Redis', 'Docker', 'AWS', 'TypeScript', 'GraphQL', 'Next.js', 'Socket.IO', 'Jest', 'CI/CD'].map((tech, i) => (
                      <TechIcon key={tech} name={tech} color={
                        ['#61dafb', '#68a063', '#10b981', '#dc382d', '#0ea5e9', '#ff9900', '#3178c6', '#e535ab', '#ffffff', '#010101', '#c21325', '#8b5cf6'][i]
                      } delay={i * 0.05} />
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </section>

            <div className="section-divider" style={{ margin: '0 auto', maxWidth: '1100px' }} />

            {/* ═══════════════ SELECTED WORKS ═══════════════ */}
            <section id="works">
              <div className="container" style={{ maxWidth: '1100px' }}>
                <SectionHeading subtitle="Portfolio" icon={Terminal}>
                  Key <span className="text-gradient">Deliverables</span>
                </SectionHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    {
                      title: "Scalable ERP Solution",
                      tech: ["MERN", "REDIS", "DOCKER", "AWS"],
                      desc: "Spearheaded the build of an enterprise resource ecosystem, achieving a 40% reduction in query overhead via advanced MongoDB indexing and Redis caching strategies.",
                      metrics: [
                        { label: 'Query Speed', value: '40% faster' },
                        { label: 'Users', value: '10K+' }
                      ],
                      link: "#",
                      color: '#8b5cf6'
                    },
                    {
                      title: "Real-time Fintech Dashboard",
                      tech: ["REACT", "NODE.JS", "SOCKET.IO", "CHARTS"],
                      desc: "Engineered a sub-millisecond financial engine supporting 10,000+ concurrent WebSocket streams with persistent data integrity and vault-grade security.",
                      metrics: [
                        { label: 'Connections', value: '10K+' },
                        { label: 'Latency', value: '<1ms' }
                      ],
                      link: "#",
                      color: '#0ea5e9'
                    },
                    {
                      title: "AI-Powered Learning Platform",
                      tech: ["NEXT.JS", "OPENAI", "MONGODB", "VERCEL"],
                      desc: "Built an intelligent lesson planning system with AI-generated content, automated assessments, and a real-time analytics dashboard used by 500+ educators.",
                      metrics: [
                        { label: 'Educators', value: '500+' },
                        { label: 'Automation', value: '85%' }
                      ],
                      link: "#",
                      color: '#10b981'
                    }
                  ].map((proj, i) => (
                    <ScrollReveal key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                      <TiltCard3D glowColor={proj.color}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
                          <div style={{ flex: 1, minWidth: '300px' }}>
                            {/* Project number */}
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.65rem',
                              color: proj.color,
                              fontWeight: 600,
                              letterSpacing: '0.1em'
                            }}>
                              PROJECT.0{i + 1}
                            </span>
                            
                            <h3 style={{ 
                              fontSize: '1.4rem', 
                              marginBottom: '0.75rem', 
                              fontWeight: 700,
                              marginTop: '0.5rem'
                            }}>
                              {proj.title}
                            </h3>
                            
                            {/* Tech badges */}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                              {proj.tech.map((t) => (
                                <span key={t} className="tech-badge" style={{
                                  background: `${proj.color}10`,
                                  color: proj.color,
                                  borderColor: `${proj.color}20`
                                }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                            
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#94a3b8' }}>{proj.desc}</p>

                            {/* Metrics */}
                            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.2rem' }}>
                              {proj.metrics.map((m, idx) => (
                                <div key={idx}>
                                  <div style={{ 
                                    fontSize: '1.2rem', 
                                    fontWeight: 800, 
                                    color: '#fff',
                                    fontFamily: 'var(--font-heading)'
                                  }}>
                                    {m.value}
                                  </div>
                                  <div style={{ 
                                    fontSize: '0.65rem', 
                                    fontWeight: 600, 
                                    color: '#64748b',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginTop: '2px'
                                  }}>
                                    {m.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <MagneticButton>
                            <motion.a 
                              href={proj.link} 
                              whileHover={{ scale: 1.1 }}
                              style={{ 
                                color: '#fff', 
                                textDecoration: 'none', 
                                display: 'flex', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.03)',
                                flexShrink: 0
                              }}
                            >
                              <ArrowUpRight size={20} />
                            </motion.a>
                          </MagneticButton>
                        </div>
                      </TiltCard3D>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            <div className="section-divider" style={{ margin: '0 auto', maxWidth: '1100px' }} />

            {/* ═══════════════ EXPERIENCE TIMELINE ═══════════════ */}
            <section id="history" style={{ paddingBottom: '80px' }}>
              <div className="container" style={{ maxWidth: '1100px' }}>
                <SectionHeading subtitle="Journey" icon={History}>
                  Professional <span className="text-gradient">Timeline</span>
                </SectionHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    {
                      role: "Senior Engineering Lead",
                      comp: "MetaX Systems",
                      date: "2023 — Present",
                      color: '#8b5cf6',
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
                      color: '#0ea5e9',
                      bullets: [
                        "Architected high-volume B2B e-commerce layers with Next.js.",
                        "Engineered automated API testing suites reducing bug reports by 60%.",
                        "Mentored junior talent in modern MERN best practices and Git flows."
                      ]
                    },
                    {
                      role: "Full-Stack Developer",
                      comp: "TechForge Labs",
                      date: "2020 — 2021",
                      color: '#10b981',
                      bullets: [
                        "Built RESTful APIs handling 1M+ daily requests with Express.js.",
                        "Developed responsive dashboards with React and real-time WebSocket.",
                        "Optimized MongoDB queries reducing average response time by 45%."
                      ]
                    }
                  ].map((exp, i) => (
                    <ScrollReveal key={i} direction="left" delay={i * 0.15}>
                      <div style={{ 
                        borderLeft: `2px solid ${exp.color}30`,
                        paddingLeft: '2.5rem', 
                        paddingBottom: i < 2 ? '3rem' : '0',
                        position: 'relative'
                      }}>
                        {/* Timeline dot with pulse */}
                        <motion.div
                          animate={{
                            boxShadow: [
                              `0 0 0px ${exp.color}`,
                              `0 0 15px ${exp.color}80`,
                              `0 0 0px ${exp.color}`
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          style={{ 
                            width: '12px', 
                            height: '12px', 
                            background: exp.color, 
                            borderRadius: '50%', 
                            position: 'absolute', 
                            left: '-7px', 
                            top: '6px'
                          }}
                        />

                        {/* Date badge */}
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '3px 10px',
                          borderRadius: '4px',
                          background: `${exp.color}10`,
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          color: exp.color,
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.05em',
                          marginBottom: '0.8rem'
                        }}>
                          {exp.date}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1rem' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: `${exp.color}10`,
                            border: `1px solid ${exp.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Briefcase size={18} style={{ color: exp.color }} />
                          </div>
                          <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.2rem' }}>{exp.role}</h3>
                            <p style={{ color: '#64748b', fontWeight: 600, fontSize: '0.85rem' }}>{exp.comp}</p>
                          </div>
                        </div>
                        
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.88rem', lineHeight: 1.8 }}>
                          {exp.bullets.map((b, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 + 0.3 }}
                              style={{ 
                                marginBottom: '0.5rem', 
                                position: 'relative', 
                                paddingLeft: '1.2rem',
                                color: '#94a3b8'
                              }}
                            >
                              <span style={{ position: 'absolute', left: 0, color: exp.color, fontWeight: 700 }}>›</span> {b}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            <div className="section-divider" style={{ margin: '0 auto', maxWidth: '1100px' }} />

            {/* ═══════════════ FOOTER / CTA ═══════════════ */}
            <footer style={{ padding: '100px 0 80px' }}>
              <div className="container" style={{ maxWidth: '1100px', textAlign: 'center' }}>
                <ScrollReveal direction="up">
                  <motion.div
                    style={{
                      position: 'relative',
                      padding: '4rem 2rem',
                      borderRadius: '24px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      background: 'rgba(255,255,255,0.02)',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Background glow */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '400px',
                      height: '400px',
                      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                      filter: 'blur(60px)',
                      pointerEvents: 'none'
                    }} />

                    <Sparkles size={20} style={{ color: '#8b5cf6', margin: '0 auto 1rem' }} />
                    
                    <h2 style={{ 
                      marginBottom: '1rem', 
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: 700,
                      position: 'relative'
                    }}>
                      Let's Build Something{' '}
                      <span className="text-gradient">Extraordinary</span>
                    </h2>
                    
                    <p style={{ 
                      marginBottom: '2.5rem', 
                      fontSize: '1rem', 
                      color: '#64748b',
                      maxWidth: '500px',
                      margin: '0 auto 2.5rem',
                      lineHeight: 1.7
                    }}>
                      Available for Senior or Lead MERN engineering engagements.
                      Let's discuss how I can accelerate your product.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                      <MagneticButton>
                        <motion.a
                          href="mailto:contact@example.com"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '14px 32px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            color: '#fff',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            fontFamily: 'var(--font-body)'
                          }}
                        >
                          <Mail size={16} /> Get In Touch
                        </motion.a>
                      </MagneticButton>
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: '1rem',
                      position: 'relative'
                    }}>
                      {[
                        { Icon: Github, href: '#', label: 'GITHUB' },
                        { Icon: Linkedin, href: '#', label: 'LINKEDIN' },
                        { Icon: Mail, href: '#', label: 'EMAIL' }
                      ].map(({ Icon, href, label }, i) => (
                        <MagneticButton key={i}>
                          <motion.a 
                            whileHover={{ y: -3 }}
                            href={href} 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              textDecoration: 'none', 
                              color: '#475569',
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              letterSpacing: '0.15em',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.05)',
                              background: 'rgba(255,255,255,0.02)',
                              transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.color = '#fff';
                              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.color = '#475569';
                              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                            }}
                          >
                            <Icon size={14} /> {label}
                          </motion.a>
                        </MagneticButton>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>

                {/* Copyright */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  style={{
                    marginTop: '3rem',
                    fontSize: '0.7rem',
                    color: '#334155',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.05em'
                  }}
                >
                  <span style={{ color: '#8b5cf6' }}>{'<'}</span>
                  {' '}Built with React + Three.js + Framer Motion{' '}
                  <span style={{ color: '#8b5cf6' }}>{'/>'}</span>
                  <br />
                  <span style={{ marginTop: '0.5rem', display: 'inline-block' }}>
                    © {new Date().getFullYear()} Mohammed Imad. All rights reserved.
                  </span>
                </motion.div>
              </div>
            </footer>
          </main>
        </div>
      )}
    </>
  );
};

export default App;
