import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollReveal = ({
  children,
  direction = 'up', // 'up', 'down', 'left', 'right', 'scale', 'rotate'
  delay = 0,
  duration = 0.7,
  once = true,
  className = '',
  style = {}
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const directions = {
    up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
    rotate: { hidden: { opacity: 0, rotate: -10, y: 30 }, visible: { opacity: 1, rotate: 0, y: 0 } }
  };

  const variant = directions[direction] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
