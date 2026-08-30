import React, { useEffect, useRef } from 'react';

interface BacteriaParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  angle: number;
  va: number;
  depth: number; // 0.2 (far) to 1.0 (near)
  opacity: number;
  hue: number;
}

interface BacteriaMovementSimulationProps {
  className?: string;
  particleCount?: number;
  tint?: string;
  showReticle?: boolean;
}

export const BacteriaMovementSimulation: React.FC<BacteriaMovementSimulationProps> = ({
  className = 'w-full h-full',
  particleCount = 28,
  tint = '#0071E3',
  showReticle = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize bacilli bacteria particles
    const particles: BacteriaParticle[] = Array.from({ length: particleCount }, () => {
      const depth = 0.25 + Math.random() * 0.75;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * depth,
        vy: (Math.random() - 0.5) * 0.4 * depth,
        length: (12 + Math.random() * 22) * depth,
        width: (4 + Math.random() * 5) * depth,
        angle: Math.random() * Math.PI * 2,
        va: (Math.random() - 0.5) * 0.015,
        depth,
        opacity: 0.25 + depth * 0.55,
        hue: Math.random() > 0.3 ? 210 : 160, // Blue and Emerald clinical palette
      };
    });

    let scanLineY = 0;
    let targetIndex = 0;
    let targetTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Microscopic focal fluid gradient background
      const grad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.7);
      grad.addColorStop(0, 'rgba(0, 113, 227, 0.04)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Bacilli Bacteria
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.va;

        // Wrap boundaries smoothly
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Draw capsule / rod shape (Bacillus)
        ctx.beginPath();
        const r = p.width / 2;
        const hl = p.length / 2;
        ctx.arc(-hl + r, 0, r, Math.PI / 2, (Math.PI * 3) / 2);
        ctx.arc(hl - r, 0, r, (Math.PI * 3) / 2, Math.PI / 2);
        ctx.closePath();

        ctx.fillStyle = `rgba(${p.hue === 210 ? '0, 113, 227' : '16, 185, 129'}, ${p.opacity * 0.7})`;
        ctx.fill();

        ctx.lineWidth = 1 * p.depth;
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`;
        ctx.stroke();

        // Inner glowing core
        if (p.depth > 0.6) {
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
          ctx.fill();
        }

        ctx.restore();
      });

      // Optical Laser Scan Line
      scanLineY = (scanLineY + 0.75) % height;
      const scanGrad = ctx.createLinearGradient(0, scanLineY - 15, 0, scanLineY + 15);
      scanGrad.addColorStop(0, 'rgba(0, 113, 227, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 113, 227, 0.25)');
      scanGrad.addColorStop(1, 'rgba(0, 113, 227, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLineY - 15, width, 30);

      // Targeting Reticle on Primary Pathogen
      if (showReticle && particles.length > 0) {
        targetTimer++;
        if (targetTimer > 180) {
          targetTimer = 0;
          targetIndex = Math.floor(Math.random() * particles.length);
        }

        const target = particles[targetIndex] || particles[0];
        ctx.save();
        ctx.translate(target.x, target.y);

        ctx.strokeStyle = 'rgba(0, 113, 227, 0.75)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(-30, 0);
        ctx.lineTo(-20, 0);
        ctx.moveTo(20, 0);
        ctx.lineTo(30, 0);
        ctx.moveTo(0, -30);
        ctx.lineTo(0, -20);
        ctx.moveTo(0, 20);
        ctx.lineTo(0, 30);
        ctx.strokeStyle = 'rgba(0, 113, 227, 0.9)';
        ctx.stroke();

        // Label
        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('M. leprae • BI: 3+', 30, -10);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, tint, showReticle]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block ${className}`}
    />
  );
};
