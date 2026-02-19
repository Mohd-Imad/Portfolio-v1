import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ target, label, suffix = '', duration = 2000 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutExpo for punchy animation
      const eased = 1 - Math.pow(1 - progress, 4);
      start = Math.floor(eased * target);
      setCount(start);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '1.5rem'
      }}
    >
      <div style={{
        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
        fontWeight: 800,
        fontFamily: 'var(--font-heading)',
        background: 'linear-gradient(135deg, #ffffff, #a78bfa, #8b5cf6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1.2
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        color: '#64748b',
        marginTop: '0.5rem'
      }}>
        {label}
      </div>
    </motion.div>
  );
};

const StatsCounter = () => {
  const stats = [
    { target: 4, label: 'Years Experience', suffix: '+' },
    { target: 50, label: 'Projects Delivered', suffix: '+' },
    { target: 10, label: 'Team Members Led', suffix: '+' },
    { target: 99, label: 'Uptime SLA', suffix: '%' }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      padding: '2rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative'
    }}>
      {/* Glow behind stats */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '100%',
        background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {stats.map((stat, i) => (
        <AnimatedCounter
          key={i}
          target={stat.target}
          label={stat.label}
          suffix={stat.suffix}
        />
      ))}
    </div>
  );
};

export default StatsCounter;
