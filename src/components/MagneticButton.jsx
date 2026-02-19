import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = '', style = {}, ...props }) => {
    const buttonRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        setPos({ x: dx * 0.3, y: dy * 0.3 });
    };

    const handleMouseLeave = () => {
        setPos({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-block', ...style }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
