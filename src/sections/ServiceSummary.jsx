'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to('#title-service-1', {
      xPercent: 20,
      scrollTrigger: {
        trigger: '#title-service-1',
        scrub: true,
      },
    });
    gsap.to('#title-service-2', {
      xPercent: -30,
      scrollTrigger: {
        trigger: '#title-service-2',
        scrub: true,
      },
    });
    gsap.to('#title-service-3', {
      xPercent: 20,
      scrollTrigger: {
        trigger: '#title-service-3',
        scrub: true,
      },
    });
    gsap.to('#title-service-4', {
      xPercent: -70,
      scrollTrigger: {
        trigger: '#title-service-4',
        scrub: true,
      },
    });
  });

  return (
    <section className='mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive'>
      {/* Service 1 */}
      <div id='title-service-1'>
        <p>Experience Design</p>
      </div>

      {/* Service 2 */}
      <div
        id='title-service-2'
        className='flex items-center justify-center gap-3 translate-x-8 md:translate-x-16'
      >
        <p className='font-normal'>Motion</p>
        <div className='min-w-10 h-1 md:w-32 bg-gold'></div>
        <p>Interactivity</p>
      </div>

      {/* Service 3 */}
      <div
        id='title-service-3'
        className='
          flex items-center justify-center gap-3'
      >
        <p>Web Aesthetics</p>
        <div className='min-w-10 h-1 md:w-32 bg-gold'></div>
        <p className='italic'>Visual Systems</p>
        <div className='min-w-10 h-1 md:w-32 bg-gold'></div>
        <p>3D Interfaces</p>
      </div>

      {/* Service 4 */}
      <div
        id='title-service-4'
        className='translate-x-12 md:translate-x-24 lg:translate-x-48'
      >
        <p>Frontend Craft</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
