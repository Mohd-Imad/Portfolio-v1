import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard3D = ({ children, className = '', glowColor = '#8b5cf6' }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { damping: 20, stiffness: 300 });
    const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { damping: 20, stiffness: 300 });

    const sheenX = useTransform(x, [0, 1], [0, 100]);
    const sheenY = useTransform(y, [0, 1], [0, 100]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width;
        const yPos = (e.clientY - rect.top) / rect.height;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <div style={{ perspective: '1200px' }}>
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    background: 'rgba(255, 255, 255, 0.02)',
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${isHovered ? `${glowColor}66` : 'rgba(255, 255, 255, 0.06)'}`,
                    borderRadius: '16px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    transition: 'border-color 0.4s ease',
                    height: '100%'
                }}
                className={className}
            >
                {/* Animated gradient sheen */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(600px circle at ${sheenX}% ${sheenY}%, ${glowColor}15, transparent 60%)`,
                        pointerEvents: 'none',
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 1
                    }}
                />

                {/* Top edge glow */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isHovered ? '80%' : '0%',
                    height: '1px',
                    background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
                    transition: 'width 0.5s ease',
                    zIndex: 2
                }} />

                {/* Content with 3D depth */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    transform: 'translateZ(30px)',
                    transformStyle: 'preserve-3d'
                }}>
                    {children}
                </div>

                {/* Corner accent dots */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: glowColor,
                    opacity: isHovered ? 0.6 : 0.2,
                    transition: 'opacity 0.3s',
                    boxShadow: isHovered ? `0 0 8px ${glowColor}` : 'none',
                    zIndex: 2
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '8px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: glowColor,
                    opacity: isHovered ? 0.6 : 0.2,
                    transition: 'opacity 0.3s',
                    boxShadow: isHovered ? `0 0 8px ${glowColor}` : 'none',
                    zIndex: 2
                }} />
            </motion.div>
        </div>
    );
};

export default TiltCard3D;
