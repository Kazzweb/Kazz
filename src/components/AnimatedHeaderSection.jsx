import React from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedTextLines from './AnimatedTextLines';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const AnimatedHeaderSection = ({
  subtitle,
  title,
  text,
  textColor,
  withSrollTriggerr = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);

  const aboutText = `I help growing brands and startups gain an
   unfair advantage through premium
    results driven webs/apps`;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withSrollTriggerr
        ? { trigger: contextRef.current }
        : undefined,
    });
    tl.from(contextRef.current, { y: '50vh', duration: 1, ease: 'circ.out' });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'circ.out',
      },
      '<+0.2'
    );
  }, []);
  return (
    <div className='' ref={contextRef}>
      <div
        className=''
        style={{ clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <div
          className='flex flex-col justify-center gap-4 md:gap-8 pt-16  '
          ref={headerRef}
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-2 md:px-10 ${textColor}`}
          >
            {subtitle}
          </p>
          <div className='px-2 md:px-10 '>
            <h1
              className={`flex text-2xl md:text-5xl flex-col flex-wrap gap-12 ${textColor} uppercase banner-text-responsive leading-4 md:leading-8 sm:gap-16 md:block `}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-2 md:px-10 ${textColor}`}>
        <div className='absolute inset-x-0 border-t-2' />
        <div className='py-12 sm:py-16 text-end'>
          <AnimatedTextLines
            text={text}
            className={
              'font-light uppercase  value-text-responsive text-xs md:text-2xl'
            }
          />
          {/* <p className='font-light uppercase value-text-responsive'>
              I help growing brands and startups gain an unfair advantage
              through premium results driven webs/apps
            </p> */}
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
