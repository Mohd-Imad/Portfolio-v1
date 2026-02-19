import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GlowCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let animationFrameId;

    const moveCursor = () => {
      // Linear Interpolation (Lerp) for creamy smoothness
      // 0.15 = speed (higher is faster, lower is smoother)
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      
      animationFrameId = requestAnimationFrame(moveCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    moveCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.matches('a, button, [role="button"], .clickable') || target.closest('a, button, [role="button"], .clickable')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.matches('a, button, [role="button"], .clickable') || target.closest('a, button, [role="button"], .clickable')) {
        setIsHovering(false);
      }
    };

    const handleWindowMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleWindowMouseLeave);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleWindowMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        opacity: isVisible ? 1 : 0,
        mixBlendMode: 'difference' // Ensures visibility on light/dark
      }}
    >
      {/* Container that handles the centering and layout separately from movement */}
      <div style={{ position: 'relative', transform: 'translate(-50%, -50%)' }}>
        
        {/* Outer Ring */}
        <motion.div
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            scale: isClicking ? 0.9 : 1,
            rotate: 360
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            width: { duration: 0.2 },
            height: { duration: 0.2 }
          }}
          style={{
            border: '1px dashed rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%'
          }}
        />

        {/* Inner Ring */}
        <motion.div
          animate={{
            width: isHovering ? 40 : 20,
            height: isHovering ? 40 : 20,
            scale: isClicking ? 0.8 : 1,
            rotate: -360
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            width: { duration: 0.2 },
            height: { duration: 0.2 }
          }}
          style={{
            border: '1.5px solid #fff',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%'
          }}
        />

        {/* Center Dot */}
        <motion.div 
          animate={{ scale: isHovering ? 0 : 1 }}
          style={{ 
             width: 4, height: 4, background: '#fff', borderRadius: '50%',
             position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%'
          }} 
        />
        
      </div>
    </div>
  );
};

export default GlowCursor;
