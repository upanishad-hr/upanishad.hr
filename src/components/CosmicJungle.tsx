import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { BufferGeometry, Points, ShaderMaterial, Color, MathUtils, CanvasTexture } from 'three';

type ActiveSection = 'hero' | 'shaman' | 'developer';

interface CosmicJungleProps {
  activeSection: ActiveSection;
}

// Generate a smooth circle texture programmatically
const useCircleTexture = () => {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(16, 16, 14, 0, 2 * Math.PI);
      context.fillStyle = 'white';
      context.fill();
    }
    return new CanvasTexture(canvas);
  }, []);
};

const FractalPoints: React.FC<{ activeSection: ActiveSection }> = ({ activeSection }) => {
  const pointsRef = useRef<Points>(null);
  const numPoints = 2500;
  const circleTexture = useCircleTexture();
  
  // Memoize geometry data
  const { positions, colors, originalColors } = useMemo(() => {
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    const originalColors = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints; i++) {
      // Create a more distributed "cloud" shape
      const r = Math.cbrt(Math.random()) * 12; // Wider spread
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Base cosmic colors (Purple/Blue/Pink mix)
      const color = new Color();
      const hue = 0.6 + Math.random() * 0.2; // Blue to Purple range
      color.setHSL(hue, 0.8, 0.7);
      
      originalColors[i * 3] = color.r;
      originalColors[i * 3 + 1] = color.g;
      originalColors[i * 3 + 2] = color.b;
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors, originalColors };
  }, []);

  const geometryRef = useRef<BufferGeometry>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current && geometryRef.current) {
      const time = clock.getElapsedTime();
      
      // 1. Gentle Floating Rotation (No wild spinning)
      // Very slow, soothing rotation
      pointsRef.current.rotation.y = time * 0.03; 
      pointsRef.current.rotation.z = Math.sin(time * 0.05) * 0.02;

      // 2. Color Transition Logic
      const colorsAttr = geometryRef.current.attributes.color;
      const targetColor = new Color();
      const lerpFactor = 0.03; // Smooth transition speed
      
      for (let i = 0; i < numPoints; i++) {
         if (activeSection === 'shaman') {
            // Jungle: Emeralds, Greens, Golds
            // Vary hue slightly for organic look
            const noise = Math.sin(i * 0.1 + time) * 0.05;
            targetColor.setHSL(0.35 + noise, 0.8, 0.5); 
         } else if (activeSection === 'developer') {
            // Tech: Cyan, Electric Blue
            const noise = Math.cos(i * 0.1 + time) * 0.05;
            targetColor.setHSL(0.6 + noise, 0.9, 0.6);
         } else {
            // Hero: Revert to original mixed colors
            targetColor.setRGB(
                originalColors[i*3], 
                originalColors[i*3+1], 
                originalColors[i*3+2]
            );
         }

         const r = colorsAttr.getX(i);
         const g = colorsAttr.getY(i);
         const b = colorsAttr.getZ(i);

         colorsAttr.setXYZ(
             i,
             MathUtils.lerp(r, targetColor.r, lerpFactor),
             MathUtils.lerp(g, targetColor.g, lerpFactor),
             MathUtils.lerp(b, targetColor.b, lerpFactor)
         );
      }
      colorsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" count={numPoints} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={numPoints} array={colors} itemSize={3} />
      </bufferGeometry>
      {/* Use the texture to make points round */}
      <pointsMaterial 
        vertexColors 
        map={circleTexture} 
        size={0.18} 
        sizeAttenuation 
        transparent 
        opacity={0.9} 
        alphaTest={0.5} 
        depthWrite={false} 
        blending={2} // AdditiveBlending 
      />
    </points>
  );
};

const GlowShader: React.FC<{ activeSection: ActiveSection }> = ({ activeSection }) => {
  const materialRef = useRef<ShaderMaterial>(null);
  const { viewport } = useThree();
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
      
      const targetColor = new Color();
      if (activeSection === 'shaman') targetColor.setHex(0x00ff44); // Green glow
      else if (activeSection === 'developer') targetColor.setHex(0x0088ff); // Blue glow
      else targetColor.setHex(0xffaaee); // Pink/Purple glow

      // Smoothly transition the uniform color
      materialRef.current.uniforms.color.value.lerp(targetColor, 0.02);
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float strength = 0.2 + 0.1 * sin(time * 0.3 + uv.x * 2.0 + uv.y * 2.0); // Subtle pulse
      float dist = distance(uv, vec2(0.5));
      float glow = 1.0 - smoothstep(0.0, 0.9, dist); // Softer radial fade
      gl_FragColor = vec4(color * strength * glow, 1.0);
    }
  `;

  return (
    <mesh position={[0, 0, -15]} scale={[viewport.width * 2.5, viewport.height * 2.5, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          color: { value: new Color(0xffaaee) }, 
        }}
        transparent
        blending={2} // AdditiveBlending
        depthWrite={false}
      />
    </mesh>
  );
};

const CosmicJungle: React.FC<CosmicJungleProps> = ({ activeSection }) => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ width: '100%', height: '100%', background: '#020205' }}>
      <color attach="background" args={['#020205']} />
      <ambientLight intensity={0.5} />
      <Stars radius={150} depth={50} count={3000} factor={4} saturation={1} fade speed={0.5} />
      <FractalPoints activeSection={activeSection} />
      <GlowShader activeSection={activeSection} />
      <ParallaxCamera />
      {/* Disable autoRotate to fix "spinning wildly". Allow manual interaction but very damped. */}
      <OrbitControls 
        autoRotate={false} 
        enableZoom={false} 
        enablePan={false} 
        rotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.5} 
        minPolarAngle={Math.PI / 3} 
      />
    </Canvas>
  );
};

const ParallaxCamera = () => {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.05);
    camera.position.y = MathUtils.lerp(camera.position.y, mouse.y * 0.5, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

export default CosmicJungle;