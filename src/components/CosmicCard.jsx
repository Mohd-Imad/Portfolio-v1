import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CosmicCard = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement for the glow effect
  const springX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  useEffect(() => {
    if (!isHovered) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 40;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.fadeSpeed;

        if (this.opacity <= 0) {
          this.reset();
          this.opacity = 0;
        }
      }

      draw() {
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`glass-card relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      {/* Background stars (only visible on hover) */}
      <canvas
        ref={canvasRef}
        className="transition-opacity duration-500"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: isHovered ? 0.6 : 0,
          zIndex: 1
        }}
      />
      
      {/* Hover glow effect */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: 'inherit',
          zIndex: 10,
          background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgba(124, 58, 237, 0.15), transparent 80%)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

export default CosmicCard;
