import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { webAudioService } from '../../services/webAudioService';

// ── GLSL 3D Simplex Noise Shader — Calm, Silky & Mild Apple Liquid Glass ─────────
const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDistortion;
  uniform float uFrequency;
  uniform vec2 uMouse;
  uniform float uEnergy;       // 0.0 = completely still & quiet, 1.0 = active
  uniform float uAudioLow;     // Subtle bass breathing
  uniform float uAudioMid;     // Vocal melody wave
  uniform float uAudioHigh;    // Soft specular sparkle
  uniform float uAudioEnergy;  // Overall audio volume

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  varying vec2 vUv;
  varying float vAudioAura;

  // Classic Simplex 3D noise for ultra-smooth liquid flow
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    
    // Low-frequency, smooth, laminar liquid wave motion
    float time = uTime * uSpeed;
    float freq = uFrequency;
    
    // Pure, gentle primary fluid noise (low frequency, velvety smooth)
    vec3 noiseCoord = position * freq + vec3(time * 0.18, time * 0.22, time * 0.15);
    float fluidWave1 = snoise(noiseCoord);
    
    // Very subtle secondary harmonic (soft, non-spiky)
    vec3 noiseCoord2 = position * (freq * 1.5) - vec3(time * 0.12, time * 0.14, time * 0.1);
    float fluidWave2 = snoise(noiseCoord2) * 0.3;
    
    // Subtle interactive mouse liquid push
    float mouseDist = length(position.xy - vec3(uMouse * 1.2, 0.0).xy);
    float mouseRipple = sin(mouseDist * 2.5 - time * 1.2) * 0.03 * uEnergy;

    // Harmonic Audio Breathing (soft equatorial expansion & slow gentle ripples)
    float bassBreath = sin(position.y * 2.0 + time * 1.5) * (uAudioLow * 0.05);
    float vocalMelody = sin(position.x * 3.0 + position.z * 2.0 + time * 2.0) * (uAudioMid * 0.035);
    float audioRipples = (bassBreath + vocalMelody) * (uAudioEnergy + 0.1);

    // Total displacement: mild, calm, controlled amplitude (never exceeding smooth curvature)
    float totalWave = (fluidWave1 + fluidWave2 + mouseRipple) * uDistortion + audioRipples;
    float displacement = totalWave * uEnergy;
    vDisplacement = displacement;
    vAudioAura = uAudioEnergy;

    // Deform vertex position along its normal
    vec3 newPosition = position + normal * displacement;
    vPosition = newPosition;
    
    // Smoothly blended normal for silky light reflection
    vec3 smoothPerturb = vec3(fluidWave1 * 0.12, fluidWave2 * 0.12, fluidWave1 * 0.08) * uEnergy;
    vNormal = normalize(normalMatrix * (normal + smoothPerturb));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uEnergy;
  uniform float uAudioEnergy;
  uniform float uAudioLow;
  uniform float uAudioMid;
  uniform float uAudioHigh;
  uniform vec3 uColorA;     // Deep Sapphire / Midnight Blue
  uniform vec3 uColorB;     // Pure Apple Blue (#0071E3)
  uniform vec3 uColorC;     // Luminous Azure / Cyan (#00D2FF)
  uniform vec3 uColorD;     // Ethereal Soft Pearl / Lilac (#A78BFA)
  uniform vec3 uColorCore;  // Diamond Pure White (#FFFFFF)

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  varying vec2 vUv;
  varying float vAudioAura;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);

    // Soft, velvety Fresnel rim glow along edges
    float fresnel = pow(1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 2.6);
    
    // Gentle primary light for crisp specular highlight
    vec3 lightDir = normalize(vec3(0.6, 0.8, 1.0));
    float diff = max(0.0, dot(normal, lightDir));
    
    // Smooth specular highlight (crystal pearl sheen)
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 40.0);

    // Secondary subtle fill light from bottom right
    vec3 fillLight = normalize(vec3(-0.5, -0.6, 0.8));
    float fillDiff = max(0.0, dot(normal, fillLight)) * 0.3;

    // Harmonious color gradient transition
    float colorMix = clamp((vDisplacement * 3.5) + 0.45 + (uEnergy * 0.1) + (uAudioMid * 0.15), 0.0, 1.0);
    
    vec3 baseColor = mix(uColorA, uColorB, colorMix);
    vec3 cyanGlow = mix(baseColor, uColorC, smoothstep(0.25, 0.75, colorMix + fresnel * 0.35));
    vec3 pearlAccent = mix(cyanGlow, uColorD, fresnel * 0.65);

    // Calm audio luminosity glow
    vec3 vocalSheen = mix(uColorC, vec3(1.0, 1.0, 1.0), uAudioHigh * 0.4);
    vec3 gentleBurst = vocalSheen * ((uEnergy * 0.08) + (uAudioEnergy * 0.25) + (uAudioLow * 0.1));

    // Final combined crystal liquid color
    vec3 finalColor = pearlAccent 
      + (diff * 0.25 * uColorB) 
      + (fillDiff * uColorA) 
      + gentleBurst 
      + (uColorCore * spec * 0.85) 
      + (uColorC * fresnel * 0.45);

    gl_FragColor = vec4(finalColor, 0.98);
  }
`;

interface GlowingOrbProps {
  size?: number;
  interactive?: boolean;
  isTyping?: boolean;
  isAudioActive?: boolean;
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({
  size = 150,
  interactive = true,
  isTyping = false,
  isAudioActive = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isTypingRef = useRef(isTyping);
  const isAudioActiveRef = useRef(isAudioActive);

  useEffect(() => {
    isTypingRef.current = isTyping;
  }, [isTyping]);

  useEffect(() => {
    isAudioActiveRef.current = isAudioActive;
  }, [isAudioActive]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Three.js Scene, Camera, and WebGL Renderer ───────────────────────
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.4;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ── 2. High-Density Sphere Geometry (128x128 for pristine roundness) ───
    const geometry = new THREE.SphereGeometry(1.02, 128, 128);

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0 },
      uDistortion: { value: 0 },
      uFrequency: { value: 0.9 }, // Calm, low-frequency wave
      uEnergy: { value: 0 },
      uAudioEnergy: { value: 0 },
      uAudioLow: { value: 0 },
      uAudioMid: { value: 0 },
      uAudioHigh: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#002B7A') },    // Deep Midnight Sapphire
      uColorB: { value: new THREE.Color('#0071E3') },    // Semantic Apple Blue
      uColorC: { value: new THREE.Color('#38BDF8') },    // Ethereal Soft Azure
      uColorD: { value: new THREE.Color('#818CF8') },    // Pearl Lilac Lavender
      uColorCore: { value: new THREE.Color('#FFFFFF') }, // Specular White Highlight
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      wireframe: false,
    });

    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    // ── 3. Interactive Mouse Target Interpolation ──────────────────────────
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Euler(0, 0, 0);

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetMouse.set(x * 0.5, y * 0.5);
      targetRotation.y = x * 0.18;
      targetRotation.x = -y * 0.18;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      targetMouse.set(0, 0);
      targetRotation.set(0, 0, 0);
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // ── 4. 60fps Calm Animation Render Loop with Silky Flow ───────────────
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentEnergy = 0;
    let accumulatedTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const isActive = isTypingRef.current || isAudioActiveRef.current;

      // Sample WebAudio FFT metrics
      const audioMetrics = webAudioService.getFrequencyMetrics();

      // Smooth energy ramp: 1.0 when active, 0.0 when still
      const targetEnergy = isActive ? 1.0 : isHovered ? 0.2 : 0.0;
      currentEnergy = THREE.MathUtils.lerp(currentEnergy, targetEnergy, isActive ? 0.12 : 0.06);
      uniforms.uEnergy.value = currentEnergy;

      // Map FFT Spectrum into Shader Uniforms with smooth damping
      uniforms.uAudioLow.value = audioMetrics.low * 0.6;
      uniforms.uAudioMid.value = audioMetrics.mid * 0.6;
      uniforms.uAudioHigh.value = audioMetrics.high * 0.5;
      uniforms.uAudioEnergy.value = isAudioActiveRef.current ? Math.min(audioMetrics.volume * 0.8, 0.5) : 0;

      // Advance shader time ONLY when energy is present (silky, peaceful pace)
      if (currentEnergy > 0.001) {
        const paceMultiplier = isAudioActiveRef.current ? 1.2 + audioMetrics.mid * 0.5 : 0.85;
        accumulatedTime += delta * paceMultiplier * currentEnergy;
        uniforms.uTime.value = accumulatedTime;

        uniforms.uSpeed.value = 1.0;
        
        // Controlled, gentle amplitude: 0.06 - 0.09 (silky waves, never spiky)
        uniforms.uDistortion.value = THREE.MathUtils.lerp(
          0.0,
          isAudioActiveRef.current ? 0.08 + audioMetrics.low * 0.03 : 0.065,
          currentEnergy
        );

        // Calm, graceful 3D rotation
        const rotSpeed = (isAudioActiveRef.current ? 0.008 : 0.005) * currentEnergy;
        sphereMesh.rotation.y += rotSpeed;

        // Gentle organic breathing scale (smooth, serene)
        if (isAudioActiveRef.current) {
          const vocalExpansion = 1.0 + (audioMetrics.low * 0.03 + audioMetrics.volume * 0.02);
          sphereMesh.scale.set(vocalExpansion, vocalExpansion, vocalExpansion);
          sphereMesh.position.set(0, 0, 0);
        } else if (isTypingRef.current) {
          const breathScale = 1.0 + Math.sin(accumulatedTime * 3.5) * 0.015 * currentEnergy;
          sphereMesh.scale.set(breathScale, breathScale, breathScale);
          sphereMesh.position.set(0, 0, 0); // No erratic jitter!
        }
      } else {
        // Completely STILL, PRISTINE, and QUIET
        uniforms.uDistortion.value = 0;
        uniforms.uSpeed.value = 0;
        sphereMesh.position.set(0, 0, 0);
        sphereMesh.scale.set(1, 1, 1);
      }

      // Smooth subtle mouse parallax
      currentMouse.lerp(targetMouse, 0.06);
      uniforms.uMouse.value.copy(currentMouse);

      sphereMesh.rotation.x = THREE.MathUtils.lerp(sphereMesh.rotation.x, targetRotation.x, 0.05);
      sphereMesh.rotation.z = THREE.MathUtils.lerp(sphereMesh.rotation.z, -targetRotation.y * 0.3, 0.05);

      renderer.render(scene, camera);
    };

    animate();

    // ── 5. Cleanup on Unmount ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [size, interactive, isHovered]);

  const isOrbMoving = isTyping || isAudioActive;

  return (
    <div
      className={`relative flex items-center justify-center select-none group transition-transform duration-500 ease-out ${
        isOrbMoving ? 'scale-102' : ''
      }`}
      style={{ width: size, height: size }}
    >
      {/* Soft, Diffused Apple Atmosphere Glow (Subtle & Calming) */}
      <div
        className={`absolute -inset-2 rounded-full bg-gradient-to-tr from-[#0052CC]/25 via-[#0071E3]/20 to-[#38BDF8]/30 blur-xl transition-all duration-700 pointer-events-none ${
          isOrbMoving
            ? 'scale-110 opacity-75 from-[#0052CC]/40 via-[#0071E3]/35 to-[#38BDF8]/50'
            : 'opacity-30 group-hover:opacity-50'
        }`}
      />
      
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-full rounded-full overflow-visible flex items-center justify-center filter drop-shadow-[0_12px_28px_rgba(0,113,227,0.25)] transition-all"
      />
    </div>
  );
};
