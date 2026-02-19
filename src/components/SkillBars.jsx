import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SkillBar = ({ name, level, color = '#8b5cf6', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  return (
    <div ref={ref} style={{ marginBottom: '1.2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.4rem',
        alignItems: 'center'
      }}>
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#e2e8f0',
          letterSpacing: '0.02em'
        }}>
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: color,
            fontFamily: 'var(--font-heading)'
          }}
        >
          {level}%
        </motion.span>
      </div>
      <div style={{
        width: '100%',
        height: '4px',
        borderRadius: '4px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{
            delay: delay,
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            height: '100%',
            borderRadius: '4px',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            position: 'relative',
            boxShadow: `0 0 12px ${color}66`
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              delay: delay + 1.2,
              ease: 'easeInOut'
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              borderRadius: '4px'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const SkillBars = () => {
  const skills = [
    { name: 'React / Next.js', level: 95, color: '#61dafb' },
    { name: 'Node.js / Express', level: 92, color: '#68a063' },
    { name: 'MongoDB / Redis', level: 90, color: '#10b981' },
    { name: 'TypeScript', level: 85, color: '#3178c6' },
    { name: 'AWS / Cloud', level: 82, color: '#ff9900' },
    { name: 'Docker / DevOps', level: 78, color: '#0ea5e9' }
  ];

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {skills.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          color={skill.color}
          delay={i * 0.1}
        />
      ))}
    </div>
  );
};

export default SkillBars;
