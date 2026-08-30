import React, { useEffect, useRef } from 'react';

interface DiseaseCardHUDProps {
  diseaseId: string;
  isHovered: boolean;
}

export const DiseaseCardHUD: React.FC<DiseaseCardHUDProps> = ({ diseaseId, isHovered }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isHovered) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = (canvas.width = canvas.clientWidth);
    const height = (canvas.height = canvas.clientHeight);

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      ctx.save();

      // Dynamic Reticle Overlay based on Disease
      if (diseaseId === 'leprosy-pb') {
        // Hypopigmentation Optical Thermal Scanner
        ctx.strokeStyle = 'rgba(0, 113, 227, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.arc(cx, cy, 38 + Math.sin(time * 2) * 4, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(cx - 50, cy);
        ctx.lineTo(cx - 30, cy);
        ctx.moveTo(cx + 30, cy);
        ctx.lineTo(cx + 50, cy);
        ctx.moveTo(cx, cy - 50);
        ctx.lineTo(cx, cy - 30);
        ctx.moveTo(cx, cy + 30);
        ctx.lineTo(cx, cy + 50);
        ctx.stroke();

        // Telemetry Text
        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('SENSORY MAP: -1.2Δ', cx - 45, cy + 55);
      } else if (diseaseId === 'leprosy-mb') {
        // Peripheral Nerve Signal Tracking
        ctx.strokeStyle = 'rgba(0, 113, 227, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 20; x < width - 20; x += 10) {
          const y = cy + Math.sin(x * 0.05 + time * 3) * 12;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('NERVE VELOCITY: 24.8 m/s', 20, 25);
      } else if (diseaseId === 'buruli-ulcer') {
        // IS2404 PCR Amplicon Radar & Necrosis Depth
        const radius = (time * 25) % 65;
        ctx.strokeStyle = `rgba(0, 113, 227, ${1 - radius / 65})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('IS2404 AMPLICON: POSITIVE', 20, 25);
      } else if (diseaseId === 'yaws') {
        // Treponemal Spiral Motility
        ctx.strokeStyle = 'rgba(0, 113, 227, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 40; i++) {
          const angle = 0.2 * i + time * 2;
          const r = 2 * i;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('DPP SEROLOGY: 1:64 TITER', 20, 25);
      } else if (diseaseId === 'trachoma') {
        // Corneal Optical Vector Laser
        const scanY = cy + Math.sin(time * 2) * 35;
        ctx.strokeStyle = 'rgba(0, 113, 227, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(20, scanY);
        ctx.lineTo(width - 20, scanY);
        ctx.stroke();

        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('TRICHIASIS: 0 INVERTED LASHES', 20, 25);
      } else {
        // Amastigote Cell Cluster
        ctx.fillStyle = 'rgba(0, 113, 227, 0.8)';
        for (let i = 0; i < 8; i++) {
          const px = cx + Math.cos(time + i * 0.8) * (20 + i * 3);
          const py = cy + Math.sin(time * 1.5 + i * 0.8) * (15 + i * 2);
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.font = '9px monospace';
        ctx.fillStyle = '#0071E3';
        ctx.fillText('AMASTIGOTE DENSITY: MODERATE', 20, 25);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isHovered, diseaseId]);

  if (!isHovered) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-300"
    />
  );
};
