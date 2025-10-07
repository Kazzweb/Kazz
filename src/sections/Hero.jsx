'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import '../index.css';

// Dynamic import for Planet to reduce initial bundle (still client-only)
const Planet = React.lazy(() => import('../components/Planet'));

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [show3D, setShow3D] = useState(false);
  const heroRef = useRef(null);

  const aboutText = `I help growing brands and startups gain an
   unfair advantage through premium
    results driven webs/apps`;

  // Lazy-load the 3D canvas after the hero is visible (intersection) OR after a small timeout.
  useEffect(() => {
    if (!heroRef.current) {
      // fallback: show after a small delay if ref is not ready (rare)
      const t = setTimeout(() => setShow3D(true), 700);
      return () => clearTimeout(t);
    }

    const el = heroRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShow3D(true);
            obs.disconnect();
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    obs.observe(el);

    // Fallback timeout (in case intersection doesn't fire quickly)
    const fallback = setTimeout(() => setShow3D(true), 1500);

    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className='flex flex-col justify-end min-h-screen relative'
      id='home'
    >
      <AnimatedHeaderSection
        text={aboutText}
        subtitle={'404 bugs not found'}
        title={'Pankaj Gaikwad'}
        textColor={'text-black'}
      />

      {/* Background 3D figure (absolute layer) */}
      <figure
        className='absolute inset-0 -z-50'
        style={{ width: '100vw', height: '100vh', pointerEvents: 'none' }}
        aria-hidden
      >
        {/* Only render the Canvas after show3D becomes true (lazy load) */}
        {show3D && (
          <Suspense fallback={null}>
            <Canvas
              shadows
              // On mobile reduce pixel density and use demand rendering to save GPU
              dpr={isMobile ? [1, 1.4] : [1, 2]}
              frameloop={isMobile ? 'demand' : 'always'}
              performance={{ min: isMobile ? 0.25 : 0.6, max: 1.0 }}
              camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
            >
              {/* Ambient light is cheap and gives base visibility */}
              <ambientLight intensity={0.5} />

              {/* Environment: very low res for mobile, moderate for desktop */}
              <Environment resolution={isMobile ? 64 : 128}>
                {/* Only render heavy Lightformers on non-mobile devices */}
                {!isMobile && (
                  <group rotation={[-Math.PI / 3, 4, 1]}>
                    <Lightformer
                      form='circle'
                      intensity={2}
                      position={[0, 5, -9]}
                      scale={10}
                    />
                    <Lightformer
                      form='circle'
                      intensity={2}
                      position={[0, 3, 1]}
                      scale={10}
                    />
                    <Lightformer
                      form='circle'
                      intensity={2}
                      position={[-5, -1, -1]}
                      scale={10}
                    />
                    <Lightformer
                      form='circle'
                      intensity={2}
                      position={[10, 1, 0]}
                      scale={16}
                    />
                  </group>
                )}
              </Environment>

              {/* Use Float only on non-mobile to avoid continuous per-frame motion on mobile */}
              {isMobile ? (
                <Suspense fallback={null}>
                  <Planet scale={0.7} />
                </Suspense>
              ) : (
                <Float speed={0.5} floatIntensity={0.6}>
                  <Suspense fallback={null}>
                    <Planet scale={1} />
                  </Suspense>
                </Float>
              )}
            </Canvas>
          </Suspense>
        )}
      </figure>
    </section>
  );
};

export default Hero;
