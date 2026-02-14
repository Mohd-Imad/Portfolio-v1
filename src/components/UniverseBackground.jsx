import React, { useEffect, useRef } from 'react';

const UniverseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let stars = [];
    let mouse = { x: -1000, y: -1000 };
    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        
        // Random star colors (white, purple, blue)
        const colors = ['#ffffff', '#7c3aed', '#3b82f6', '#a78bfa'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.01 + 0.002;
      }

      update() {
        // Warp Drive / Swarm effect: Draw stars TOWARDS the mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = 400;
        
        if (distance < maxDistance) {
          let force = (maxDistance - distance) / maxDistance;
          let directionX = (dx / distance) * force * this.density * 0.5;
          let directionY = (dy / distance) * force * this.density * 0.5;
          
          this.x += directionX; // Attraction instead of repulsion
          this.y += directionY;
          this.currentSize = this.size * (1 + force * 3);
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
          this.currentSize = this.size;
        }

        // Fading effect
        this.opacity += this.fadeSpeed;
        if (this.opacity > 1 || this.opacity < 0.2) {
          this.fadeSpeed = -this.fadeSpeed;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentSize || this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = 0;
        this.len = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 5;
        this.size = Math.random() * 1 + 0.5;
        this.opacity = 0;
        this.active = false;
        this.delay = Math.random() * 5000;
        this.startTime = Date.now();
      }

      update() {
        if (!this.active) {
          if (Date.now() - this.startTime > this.delay) {
            this.active = true;
          }
          return;
        }

        this.x -= this.speed;
        this.y += this.speed;
        this.opacity += 0.05;

        if (this.x < -this.len || this.y > height + this.len) {
          this.reset();
        }
      }

      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(this.opacity, 0.5)})`;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.len, this.y - this.len);
        ctx.stroke();
        ctx.restore();
      }
    }

    let shootingStars = [new ShootingStar(), new ShootingStar()];

    const init = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 10000); // Responsive density
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    init();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    const connect = () => {
      for (let a = 0; a < stars.length; a++) {
        for (let b = a; b < stars.length; b++) {
          let dx = stars[a].x - stars[b].x;
          let dy = stars[a].y - stars[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            let opacity = 1 - (distance / 120);
            ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(stars[a].x, stars[a].y);
            ctx.lineTo(stars[b].x, stars[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.update();
        star.draw();
      });
      shootingStars.forEach(ss => {
        ss.update();
        ss.draw();
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: 'transparent'
      }}
    />
  );
};

export default UniverseBackground;
