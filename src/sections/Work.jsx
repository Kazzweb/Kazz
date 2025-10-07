import { Icon } from '@iconify/react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { projects } from '../constants';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const text = `Featured projects that have been meticulously
  crafed with passion to drive results and impact.`;

  const previewRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(null);

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);
  const overlayRefs = useRef([]);
  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, 'x', {
      duration: 1.5,
      ease: 'power3.out',
    });
    moveY.current = gsap.quickTo(previewRef.current, 'y', {
      duration: 2,
      ease: 'power3.out',
    });

    gsap.from('#project', {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: 'back.out',
      scrollTrigger: {
        trigger: '#project',
      },
    });
  });

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      },
      {
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 0)',
        duration: 0.15,
        ease: 'power2.out',
      }
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);
    const el = overlayRefs.current[index];
    if (!el) return;

    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 0.2,
      ease: 'power2.in',
    });
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.out',
    });
  };
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };
  return (
    <section id='work' className='min-h-screen flex flex-col'>
      <AnimatedHeaderSection
        subtitle={'Logic meets Aesthetics, Seamlessly'}
        title={'Works'}
        text={text}
        textColor={'text-black'}
        withSrollTriggerr={true}
      />
      <div
        className='relative flex flex-col font-light'
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => {
          return (
            <div
              key={project.id}
              id='project'
              className='relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0'
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* ovelay */}
              <a href={project.href} target='_blank'>
                <div
                  className='absolute inset-0 hidden lg:block duration-200 bg-black -z-10 clip-path'
                  ref={(el) => {
                    overlayRefs.current[index] = el;
                  }}
                />
                {/* title */}
                <div className='flex justify-between px-10 text-black transition-all duration-500 md:group-hover:text-white md:group-hover:px-12'>
                  <h2 className='lg:text-[32px] text-[26px] leading-none'>
                    {project.name}
                  </h2>
                  <Icon
                    icon='tabler:arrow-up-right'
                    className='size-5 md:size-6'
                  />
                </div>
                {/* divider */}
                <div className='w-full h-0.5 bg-black opacity-80' />
                {/* framework */}
                <div className='flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm  gap-x-5 md:group-hover:px-12'>
                  {project.frameworks.map((framework) => {
                    return (
                      <p
                        key={framework.id}
                        className='text-black transition-colors duration-500 md:group-hover:text-white'
                      >
                        {framework.name}
                      </p>
                    );
                  })}
                </div>
                {/* mobile preview images */}
                <div className='relative flex items-center justify-center px-10 md:hidden h-[400px]'>
                  <img
                    src={project.bgImage}
                    alt={`${project.name}-bg-image`}
                    className='object-cover w-full h-full rounded-md brightness-50'
                  />
                  <img
                    src={project.image}
                    alt={`${project.name}-image`}
                    className='absolute bg-center px-14 rounded-xl'
                  />
                </div>
              </a>
            </div>
          );
        })}
        {/* desktop floating preview image */}
        <div
          ref={previewRef}
          className='fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-[700px] 2xl:w-[960px] md:block hidden opacity-0'
        >
          {currentIndex !== null && (
            <img
              src={projects[currentIndex].image}
              alt={`perview`}
              className='object-cover w-full h-full'
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
