import { useRef } from 'react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import AnimatedTextLines from '../components/AnimatedTextLines';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imgRef = useRef(null);
  const text = `Passionate about clean architecture
  I build scalable, high-performance solutions from prototype to production`;
  const aboutText = `Obsessed with building fast, intuitive
   apps-from pixel-perfect React UIs to bulletproof serverless
   backends. Every line of code is a promise: quality that users
   feel.
   When I'm not shipping:
   ⚡Open-sourcing my latest experiment (or hacking on yours)
  🎥 Teaching devs on Twitch/Youtube-because rising tides lift all ships
  🧗‍♂️ Rock Climbing (problem-solving with real stakes)
  🎸 Strumming chords while CI pipelines pass (multitasking at its finest)`;

  useGSAP(() => {
    gsap.to('#about', {
      scale: 0.95,
      scrollTrigger: {
        trigger: '#about',
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: true,
      },
      ease: 'power1.inOut',
    });

    gsap.set(imgRef.current, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
    });
    gsap.to(imgRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: imgRef.current,
      },
    });
  });
  return (
    <section className='min-h-screen bg-black rounded-b-4xl' id='about'>
      <AnimatedHeaderSection
        subtitle={'Code with purpose, Build to scale'}
        title={'About'}
        text={text}
        textColor={'text-white'}
        withSrollTriggerr={true}
      />
      <div className='flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide  lg:flex-row md:text-2xl lg:text-3xl text-white/60'>
        <img
          src='images/man.jpg'
          alt='man'
          className='w-md rounded-3xl'
          ref={imgRef}
        />
        <AnimatedTextLines text={aboutText} className={'w-full'} />
      </div>
    </section>
  );
};

export default About;
