import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
    'Full-Stack Engineer',
    'Team Lead',
    'MERN Architect',
    'Node.js Expert',
    'MongoDB Specialist',
    'Cloud Engineer'
];

const TypeWriter = () => {
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = roles[currentRole];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentText.length) {
                    setDisplayText(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayText(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentRole]);

    return (
        <span style={{ position: 'relative' }}>
            <span style={{
                background: 'linear-gradient(to right, #c084fc, #8b5cf6, #0ea5e9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800
            }}>
                {displayText}
            </span>
            <motion.span
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '1em',
                    background: '#8b5cf6',
                    marginLeft: '4px',
                    verticalAlign: 'text-bottom',
                    borderRadius: '2px',
                    boxShadow: '0 0 10px #8b5cf6'
                }}
            />
        </span>
    );
};

export default TypeWriter;
