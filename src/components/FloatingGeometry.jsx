import React, { useEffect, useRef } from 'react';

const FloatingGeometry = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width, height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    let mouseX = width / 2, mouseY = height / 2;
    const handleMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    // 3D shape definitions — vertices for wireframe polyhedra
    class Shape3D {
      constructor(vertices, edges, x, y, z, size, color, rotSpeed) {
        this.vertices = vertices;
        this.edges = edges;
        this.x = x; this.y = y; this.z = z;
        this.size = size;
        this.color = color;
        this.rotX = Math.random() * Math.PI;
        this.rotY = Math.random() * Math.PI;
        this.rotZ = Math.random() * Math.PI;
        this.rotSpeed = rotSpeed;
        this.baseX = x;
        this.baseY = y;
        this.floatPhase = Math.random() * Math.PI * 2;
      }

      project(vx, vy, vz) {
        // Rotate X
        let y1 = vy * Math.cos(this.rotX) - vz * Math.sin(this.rotX);
        let z1 = vy * Math.sin(this.rotX) + vz * Math.cos(this.rotX);
        // Rotate Y
        let x2 = vx * Math.cos(this.rotY) + z1 * Math.sin(this.rotY);
        let z2 = -vx * Math.sin(this.rotY) + z1 * Math.cos(this.rotY);
        // Rotate Z
        let x3 = x2 * Math.cos(this.rotZ) - y1 * Math.sin(this.rotZ);
        let y3 = x2 * Math.sin(this.rotZ) + y1 * Math.cos(this.rotZ);

        const scale = 300 / (300 + z2 + this.z);
        return {
          x: x3 * this.size * scale + this.x,
          y: y3 * this.size * scale + this.y
        };
      }

      update(time) {
        this.rotX += this.rotSpeed.x;
        this.rotY += this.rotSpeed.y;
        this.rotZ += this.rotSpeed.z;

        // Float movement
        this.y = this.baseY + Math.sin(time * 0.5 + this.floatPhase) * 15;
        this.x = this.baseX + Math.sin(time * 0.3 + this.floatPhase + 1) * 10;

        // Mouse parallax
        const dx = (mouseX - width / 2) / width;
        const dy = (mouseY - height / 2) / height;
        this.x += dx * 20;
        this.y += dy * 20;
      }

      draw(ctx) {
        const projected = this.vertices.map(v => this.project(v[0], v[1], v[2]));

        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.15;

        this.edges.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(projected[a].x, projected[a].y);
          ctx.lineTo(projected[b].x, projected[b].y);
          ctx.stroke();
        });

        // Draw vertices as dots
        ctx.globalAlpha = 0.25;
        projected.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        });

        ctx.globalAlpha = 1;
      }
    }

    // Icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoVerts = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    const icoEdges = [
      [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
      [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],
      [7,8],[7,10],[8,9],[10,11]
    ];

    // Octahedron vertices
    const octVerts = [
      [0,1,0],[0,-1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1]
    ];
    const octEdges = [
      [0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],
      [2,4],[4,3],[3,5],[5,2]
    ];

    // Cube vertices
    const cubeVerts = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
    ];
    const cubeEdges = [
      [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    const shapes = [
      new Shape3D(icoVerts, icoEdges, width * 0.85, height * 0.25, 50, 30, 'rgba(139, 92, 246, 1)', { x: 0.003, y: 0.005, z: 0.002 }),
      new Shape3D(octVerts, octEdges, width * 0.12, height * 0.7, 30, 45, 'rgba(14, 165, 233, 1)', { x: 0.005, y: 0.003, z: 0.004 }),
      new Shape3D(cubeVerts, cubeEdges, width * 0.75, height * 0.8, 80, 25, 'rgba(16, 185, 129, 1)', { x: 0.004, y: 0.006, z: 0.003 }),
      new Shape3D(icoVerts, icoEdges, width * 0.2, height * 0.2, 100, 20, 'rgba(167, 139, 250, 1)', { x: 0.002, y: 0.004, z: 0.005 }),
      new Shape3D(octVerts, octEdges, width * 0.5, height * 0.9, 60, 35, 'rgba(139, 92, 246, 1)', { x: 0.004, y: 0.002, z: 0.003 })
    ];

    const startTime = performance.now();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const time = (performance.now() - startTime) / 1000;

      shapes.forEach(s => {
        s.update(time);
        s.draw(ctx);
      });

      // Draw a large rotating ring
      ctx.save();
      ctx.translate(width * 0.5, height * 0.4);
      ctx.rotate(time * 0.1);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 250, 80, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
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
        zIndex: 0
      }}
    />
  );
};

export default FloatingGeometry;
