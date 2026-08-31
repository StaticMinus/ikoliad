import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// ── GLSL 3D Simplex Noise Shader Definition ────────────────────────────────
const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uDistortion;
  uniform float uFrequency;
  uniform vec2 uMouse;
  uniform float uTypingIntensity;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  varying vec2 vUv;

  // Simplex 3D noise functions
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients
    float n_ = 0.142857142857; // 1.0/7.0
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

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    
    // Multi-octave organic displacement with dynamic typing agitation
    float time = uTime * uSpeed;
    float freq = uFrequency + (uTypingIntensity * 0.8);
    
    float noise1 = snoise(position * freq + vec3(time * 0.4, time * 0.5, time * 0.3));
    float noise2 = snoise(position * (freq * 2.2) - vec3(time * 0.3, time * 0.2, time * 0.4)) * 0.5;
    
    // Interactive mouse push
    float mouseDistance = length(position.xy - vec3(uMouse * 1.5, 0.0).xy);
    float mouseWave = sin(mouseDistance * 4.0 - time * 2.0) * 0.08;

    // Fast micro-tremor wave when user types
    float typingTremor = sin(time * 16.0 + position.y * 12.0) * (uTypingIntensity * 0.07);

    float displacement = (noise1 + noise2 + mouseWave + typingTremor) * uDistortion;
    vDisplacement = displacement;

    vec3 newPosition = position + normal * displacement;
    vPosition = newPosition;
    
    // Approximate displaced normal
    vNormal = normalize(normalMatrix * (normal + vec3(noise1 * 0.3, noise2 * 0.3, noise1 * 0.2)));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uTypingIntensity;
  uniform vec3 uColorA;     // Deep Cobalt Blue
  uniform vec3 uColorB;     // Electric Royal Blue
  uniform vec3 uColorC;     // Luminous Cyan / Azure
  uniform vec3 uColorD;     // Ethereal Soft Violet / Pearl Lavender
  uniform vec3 uColorCore;  // Bright White Core

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  varying vec2 vUv;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);

    // Fresnel glow along curvature edges (Apple Spatial glass pearl effect)
    float fresnel = pow(1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0))), 2.4);
    
    // Top-left primary light source for specular glints
    vec3 lightDir = normalize(vec3(0.7, 0.9, 1.2));
    float diff = max(0.0, dot(normal, lightDir));
    
    // Specular highlight
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

    // Dynamic color gradient based on displacement elevation and view angle
    float colorMix = clamp((vDisplacement * 2.8) + 0.5 + (uTypingIntensity * 0.15), 0.0, 1.0);
    
    vec3 baseColor = mix(uColorA, uColorB, colorMix);
    vec3 shimmerColor = mix(baseColor, uColorC, smoothstep(0.3, 0.8, colorMix + fresnel * 0.4));
    vec3 pearlColor = mix(shimmerColor, uColorD, fresnel * 0.75);

    // Dynamic luminous flash when typing
    vec3 typingBurst = uColorC * (uTypingIntensity * 0.25);

    // Core volumetric radiance
    vec3 finalColor = pearlColor + typingBurst + (uColorCore * spec * 0.9) + (uColorC * fresnel * 0.6);

    gl_FragColor = vec4(finalColor, 0.98);
  }
`;

interface GlowingOrbProps {
  size?: number;
  interactive?: boolean;
  isTyping?: boolean;
}

export const GlowingOrb: React.FC<GlowingOrbProps> = ({
  size = 150,
  interactive = true,
  isTyping = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTypingRef = useRef(isTyping);

  useEffect(() => {
    isTypingRef.current = isTyping;
  }, [isTyping]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Three.js Scene, Camera, and WebGL Renderer ───────────────────────
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      // Graceful fallback if WebGL fails
      return;
    }

    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // ── 2. Sphere Geometry & Fluid Organic Material ────────────────────────
    const geometry = new THREE.SphereGeometry(1.05, 96, 96);

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0.6 },
      uDistortion: { value: 0.18 },
      uFrequency: { value: 1.4 },
      uTypingIntensity: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      // Curated Palette: Pinterest/Cortex Iridescent Electric Blue Orb
      uColorA: { value: new THREE.Color('#003896') },    // Deep royal cobalt
      uColorB: { value: new THREE.Color('#0066E6') },    // Electric Apple Blue
      uColorC: { value: new THREE.Color('#00D2FF') },    // Shimmering Cyan
      uColorD: { value: new THREE.Color('#9333EA') },    // Pearl Violet highlight
      uColorCore: { value: new THREE.Color('#FFFFFF') }, // Specular White
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

      targetMouse.set(x, y);
      targetRotation.y = x * 0.4;
      targetRotation.x = -y * 0.4;
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

    // ── 4. 60fps Animation Render Loop ─────────────────────────────────────
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentTypingIntensity = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;

      // Smooth damping interpolation for fluid mouse reaction
      currentMouse.lerp(targetMouse, 0.08);
      uniforms.uMouse.value.copy(currentMouse);

      // Typing state interpolation
      const targetTyping = isTypingRef.current ? 1.0 : 0.0;
      currentTypingIntensity = THREE.MathUtils.lerp(currentTypingIntensity, targetTyping, 0.1);
      uniforms.uTypingIntensity.value = currentTypingIntensity;

      // Dynamic speed & distortion shift on typing & hover
      const targetSpeed = isTypingRef.current ? 2.2 : isHovered ? 1.1 : 0.65;
      const targetDistortion = isTypingRef.current ? 0.32 : isHovered ? 0.22 : 0.16;
      const targetFrequency = isTypingRef.current ? 2.0 : 1.4;

      uniforms.uSpeed.value = THREE.MathUtils.lerp(uniforms.uSpeed.value, targetSpeed, 0.08);
      uniforms.uDistortion.value = THREE.MathUtils.lerp(uniforms.uDistortion.value, targetDistortion, 0.08);
      uniforms.uFrequency.value = THREE.MathUtils.lerp(uniforms.uFrequency.value, targetFrequency, 0.08);

      // Kinetic micro-shake / jitter when actively typing
      if (currentTypingIntensity > 0.01) {
        sphereMesh.position.x = Math.sin(elapsedTime * 32.0) * 0.035 * currentTypingIntensity;
        sphereMesh.position.y = Math.cos(elapsedTime * 38.0) * 0.035 * currentTypingIntensity;
        const pulseScale = 1.0 + Math.sin(elapsedTime * 20.0) * 0.04 * currentTypingIntensity;
        sphereMesh.scale.set(pulseScale, pulseScale, pulseScale);
      } else {
        sphereMesh.position.set(0, 0, 0);
        sphereMesh.scale.set(1, 1, 1);
      }

      // Organic continuous 3D rotation with mouse parallax tilt
      sphereMesh.rotation.y += isTypingRef.current ? 0.016 : 0.004;
      sphereMesh.rotation.x = THREE.MathUtils.lerp(sphereMesh.rotation.x, targetRotation.x, 0.06);
      sphereMesh.rotation.z = THREE.MathUtils.lerp(sphereMesh.rotation.z, -targetRotation.y * 0.5, 0.06);

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

  return (
    <div
      className={`relative flex items-center justify-center select-none group cursor-grab active:cursor-grabbing transition-transform duration-300 ${
        isTyping ? 'scale-105' : ''
      }`}
      style={{ width: size, height: size }}
    >
      {/* Dynamic Multi-layered Ambient Atmosphere Glow */}
      <div
        className={`absolute -inset-4 rounded-full bg-gradient-to-tr from-[#0052CC]/40 via-[#0071E3]/35 to-[#00D2FF]/45 blur-2xl transition-all duration-300 pointer-events-none ${
          isTyping
            ? 'scale-125 opacity-100 from-[#0052CC]/60 via-[#0071E3]/55 to-[#00D2FF]/70'
            : 'group-hover:scale-110 opacity-80'
        }`}
      />
      
      {/* Soft Ethereal Violet Pearl Halo */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-b from-[#9333EA]/20 via-transparent to-[#00D2FF]/30 blur-xl pointer-events-none transition-all duration-300 ${
          isTyping ? 'scale-115 opacity-90' : 'opacity-60'
        }`}
      />

      {/* 3D WebGL Canvas Container with kinetic shake effect */}
      <div
        ref={containerRef}
        className={`relative z-10 w-full h-full rounded-full overflow-visible flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(0,113,227,0.35)] transition-all ${
          isTyping ? 'drop-shadow-[0_25px_50px_rgba(0,210,255,0.55)]' : ''
        }`}
      />
    </div>
  );
};
