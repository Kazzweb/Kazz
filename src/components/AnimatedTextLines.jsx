import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTextLines = ({ text, className }) => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  useGSAP(() => {
    if (lineRefs.current.length > 0) {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'back.out',
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }
  });

  return (
    <div className={className} ref={containerRef}>
      {lines.map((line, index) => {
        return (
          <span
            className='block leading-relaxed tracking-wide text-pretty'
            key={index}
            ref={(el) => (lineRefs.current[index] = el)}
          >
            {line}
          </span>
        );
      })}
    </div>
  );
};

export default AnimatedTextLines;
