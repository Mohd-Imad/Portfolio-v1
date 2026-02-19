import React, { useEffect, useRef } from 'react';

const ThreeGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 400;
    canvas.width = size * 2; // retina
    canvas.height = size * 2;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(2, 2);

    let animId;
    let mouseX = 0, mouseY = 0;
    const cx = size / 2, cy = size / 2;
    const radius = 130;

    const handleMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);

    // Generate dots on sphere surface
    const dotCount = 200;
    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dots.push({
        theta, phi,
        size: Math.random() * 2 + 0.5,
        color: i % 5 === 0 ? '#0ea5e9' : i % 7 === 0 ? '#10b981' : '#8b5cf6',
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Generate grid lines (longitude/latitude)
    const gridLines = [];
    // Longitude lines
    for (let i = 0; i < 12; i++) {
      const baseLon = (i / 12) * Math.PI * 2;
      const points = [];
      for (let j = 0; j <= 40; j++) {
        const lat = (j / 40) * Math.PI;
        points.push({ theta: baseLon, phi: lat });
      }
      gridLines.push(points);
    }
    // Latitude lines
    for (let i = 1; i < 6; i++) {
      const baseLat = (i / 6) * Math.PI;
      const points = [];
      for (let j = 0; j <= 60; j++) {
        const lon = (j / 60) * Math.PI * 2;
        points.push({ theta: lon, phi: baseLat });
      }
      gridLines.push(points);
    }

    // Generate arcs between random dots
    const arcs = [];
    for (let i = 0; i < 8; i++) {
      const a = dots[Math.floor(Math.random() * dotCount)];
      const b = dots[Math.floor(Math.random() * dotCount)];
      arcs.push({ a, b, progress: 0, speed: 0.005 + Math.random() * 0.01 });
    }

    // Orbiting particles
    const orbiters = [
      { angle: 0, speed: 0.008, radius: 165, tilt: 0.55, size: 3, color: '#0ea5e9' },
      { angle: Math.PI, speed: 0.005, radius: 155, tilt: 0.3, size: 2, color: '#8b5cf6' }
    ];

    const startTime = performance.now();
    let rotY = 0;
    let rotX = 0.3;

    const project = (theta, phi, r = radius) => {
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      // Apply rotation
      const cosRY = Math.cos(rotY), sinRY = Math.sin(rotY);
      const x1 = x * cosRY + z * sinRY;
      const z1 = -x * sinRY + z * cosRY;

      const cosRX = Math.cos(rotX), sinRX = Math.sin(rotX);
      const y1 = y * cosRX - z1 * sinRX;
      const z2 = y * sinRX + z1 * cosRX;

      const scale = 400 / (400 + z2);
      return {
        x: cx + x1 * scale,
        y: cy + y1 * scale,
        z: z2,
        scale,
        visible: z2 > -radius * 0.3
      };
    };

    const animate = () => {
      const time = (performance.now() - startTime) / 1000;
      ctx.clearRect(0, 0, size, size);

      // Update rotation
      rotY += 0.003;
      rotX += (mouseY * 0.3 - rotX) * 0.02;
      rotY += mouseX * 0.001;

      // Draw grid lines
      gridLines.forEach(line => {
        ctx.beginPath();
        let started = false;
        line.forEach(point => {
          const p = project(point.theta + rotY * 0.5, point.phi);
          if (p.visible) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          } else {
            started = false;
          }
        });
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.06)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw arcs
      arcs.forEach(arc => {
        arc.progress += arc.speed;
        if (arc.progress > 1) arc.progress = 0;

        const segments = 20;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          if (t > arc.progress) break;
          const theta = arc.a.theta + (arc.b.theta - arc.a.theta) * t;
          const phi = arc.a.phi + (arc.b.phi - arc.a.phi) * t;
          const lift = Math.sin(t * Math.PI) * 20;
          const p = project(theta, phi, radius + lift);
          if (p.visible) {
            if (!started) { ctx.moveTo(p.x, p.y); started = true; }
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Sort dots by z-depth for proper rendering
      const projectedDots = dots.map(d => {
        const p = project(d.theta, d.phi);
        return { ...d, ...p };
      }).filter(d => d.visible).sort((a, b) => a.z - b.z);

      // Draw dots
      projectedDots.forEach(d => {
        const pulse = Math.sin(time * 2 + d.pulseOffset) * 0.3 + 0.7;
        const dotSize = d.size * d.scale * pulse;
        const alpha = (d.z + radius) / (radius * 2) * 0.6 + 0.1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Glow on larger dots
        if (d.size > 1.5) {
          ctx.beginPath();
          ctx.arc(d.x, d.y, dotSize * 3, 0, Math.PI * 2);
          const grd = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, dotSize * 3);
          grd.addColorStop(0, d.color.replace(')', ', 0.15)').replace('rgb', 'rgba'));
          grd.addColorStop(1, 'transparent');
          ctx.fillStyle = grd;
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;

      // Draw orbital ring
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.lineWidth = 1;
      const ringSegments = 100;
      for (let i = 0; i <= ringSegments; i++) {
        const angle = (i / ringSegments) * Math.PI * 2;
        const rx = 165, ry = 165 * 0.35;
        const px = cx + Math.cos(angle) * rx;
        const py = cy + Math.sin(angle) * ry * Math.cos(0.55) - Math.sin(angle) * 5;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw orbiting particles
      orbiters.forEach(orb => {
        orb.angle += orb.speed;
        const ox = cx + Math.cos(orb.angle) * orb.radius;
        const oy = cy + Math.sin(orb.angle) * orb.radius * Math.sin(orb.tilt) * 0.35;

        // Glow
        const grd = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.size * 5);
        grd.addColorStop(0, orb.color);
        grd.addColorStop(1, 'transparent');
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Center glow
      const centerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      centerGrd.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
      centerGrd.addColorStop(0.5, 'rgba(139, 92, 246, 0.01)');
      centerGrd.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = centerGrd;
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '400px',
        height: '400px'
      }}
    />
  );
};

export default ThreeGlobe;
