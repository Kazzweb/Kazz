import { useGSAP } from '@gsap/react';
import AnimatedTextLines from '../components/AnimatedTextLines';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { Canvas } from '@react-three/fiber';
import { Planet } from '../components/Planet';
import { Environment, Float, Lightformer } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import '../index.css';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });

  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const aboutText = `I help growing brands and startups gain an
   unfair advantage through premium
    results driven webs/apps`;

  // useGSAP(() => {
  //   const tl = gsap.timeline();
  //   tl.from(contextRef.current, { y: '50vh', duration: 1, ease: 'circ.out' });
  //   tl.from(
  //     headerRef.current,
  //     {
  //       opacity: 0,
  //       y: 100,
  //       duration: 1,
  //       ease: 'circ.out',
  //     },
  //     '<+0.2'
  //   );
  // }, []);

  return (
    <section className='flex flex-col justify-end min-h-screen ' id='home'>
      {/* <div className='' ref={contextRef}>
        <div
          className=''
          style={{ clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' }}
        >
          <div
            className='flex flex-col justify-center gap-4 pt-16  '
            ref={headerRef}
          >
            <p className='text-sm font-light tracking-[0.5rem] uppercase px-2 md:px-10 text-black'>
              404 No Bugs Found
            </p>
            <div className='px-2 md:px-10 '>
              <h1 className='flex text-2xl md:text-5xl flex-col flex-wrap gap-12 text-black uppercase banner-text-responsive leading-4 md:leading-8 sm:gap-16 md:block '>
                Pankaj Gaikwad
              </h1>
            </div>
          </div>
        </div>
        <div className='relative px-2 md:px-10 text-black'>
          <div className='absolute inset-x-0 border-t-2' />
          <div className='py-12 sm:py-16 text-end'>
            <AnimatedTextLines
              text={aboutText}
              className={
                'font-light uppercase  value-text-responsive text-xs md:text-2xl'
              }
            />
          </div>
        </div>
      </div> */}
      <AnimatedHeaderSection
        text={aboutText}
        subtitle={'404 bugs not found'}
        title={'Pankaj Gaikwad'}
        textColor={'text-black'}
      />
      <figure
        className='absolute inset-0 -z-50'
        style={{ width: '100vw', height: '100vh' }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
          performance={{ min: 0.3 }}
        >
          <ambientLight intensity={0.5} />
          <Environment resolution={isMobile ? 64 : 256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={'circle'}
                intensity={2}
                position={(0, 5, -9)}
                scale={10}
              />
              <Lightformer
                form={'circle'}
                intensity={2}
                position={(0, 3, 1)}
                scale={10}
              />
              <Lightformer
                form={'circle'}
                intensity={2}
                position={(-5, -1, -1)}
                scale={10}
              />
              <Lightformer
                form={'circle'}
                intensity={2}
                position={(10, 1, 0)}
                scale={16}
              />
            </group>
          </Environment>
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.5 : 1} />
          </Float>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
