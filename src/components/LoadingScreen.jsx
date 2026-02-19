import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading', 'complete', 'exit'

  useEffect(() => {
    // Animate progress
    let start = 0;
    const interval = setInterval(() => {
      start += Math.random() * 8 + 2;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => setPhase('complete'), 300);
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 800);
        }, 1200);
      }
      setProgress(Math.min(start, 100));
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Canvas morphing shape
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 200;
    canvas.width = size;
    canvas.height = size;

    let animId;
    const cx = size / 2;
    const cy = size / 2;

    const animate = () => {
      const time = Date.now() * 0.002;
      ctx.clearRect(0, 0, size, size);

      // Draw morphing shape
      for (let layer = 3; layer >= 0; layer--) {
        const radius = 30 + layer * 12;
        const points = 6;
        const morph = Math.sin(time + layer * 0.5) * 0.3 + 0.7;

        ctx.beginPath();
        for (let i = 0; i <= points * 10; i++) {
          const angle = (i / (points * 10)) * Math.PI * 2;
          const wave = Math.sin(angle * points + time * 2) * 10 * morph;
          const wave2 = Math.cos(angle * (points - 1) + time * 1.5) * 5;
          const r = radius + wave + wave2;

          const x = cx + Math.cos(angle + time * 0.3) * r;
          const y = cy + Math.sin(angle + time * 0.3) * r;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const alpha = 0.15 - layer * 0.03;
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha + 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = `rgba(139, 92, 246, ${alpha * 0.3})`;
        ctx.fill();
      }

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3 + Math.sin(time * 3) * 1, 0, Math.PI * 2);
      ctx.fillStyle = '#8b5cf6';
      ctx.fill();
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#020108',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          {/* Morphing shape */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <canvas
              ref={canvasRef}
              style={{
                width: '200px',
                height: '200px'
              }}
            />
          </motion.div>

          {/* Logo text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#ffffff'
            }}
          >
            <span style={{ color: '#8b5cf6' }}>{'< '}</span>
            Mohammed Imad
            <span style={{ color: '#8b5cf6' }}>{' />'}</span>
          </motion.div>

          {/* Progress bar */}
          <div style={{
            width: '200px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <motion.div
              style={{
                height: '100%',
                borderRadius: '2px',
                background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9)',
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
              }}
            />
          </div>

          {/* Progress text */}
          <motion.div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: '#64748b'
            }}
          >
            {phase === 'complete' ? 'INITIALIZING PORTFOLIO...' : `LOADING ASSETS — ${Math.floor(progress)}%`}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
