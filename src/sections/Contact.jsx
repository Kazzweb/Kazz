import { socials } from '../constants';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import Marquee from '../components/Marquee';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Contact = () => {
  const items = [
    'just imagine, We code',
    'just imagine, We code',
    'just imagine, We code',
    'just imagine, We code',
  ];
  const text = `Got a question, how or project Idea?
  We'd love to hear from you and discuss further!`;
  useGSAP(() => {
    gsap.from('.social-link', {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: 'back.out',
      scrollTrigger: {
        trigger: '.social-link',
      },
    });
  });
  return (
    <section
      id='contact'
      className='flex flex-col justify-between min-h-screen bg-black'
    >
      <div>
        <AnimatedHeaderSection
          subtitle={'You Dream It, We Code it'}
          title={'Contact'}
          text={text}
          textColor={'text-white'}
          withSrollTriggerr={true}
        />
        <div className='flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10'>
          <div className='flex flex-col w-full gap-10'>
            <div className='social-link'>
              <h2>E-mail</h2>
              <div className='w-full h-px my-2 bg-white opacity-30' />
              <p className='text-xl tracking-wider lowercase md:text-2xl lg:text-3xl'>
                kazzwebstudio@gmail.com
              </p>
            </div>
            <div className='social-link'>
              <h2>Phone</h2>
              <div className='w-full h-px my-2 bg-white opacity-30' />
              <p className='text-xl tracking-wider lowercase md:text-2xl lg:text-3xl'>
                +91 9221968131
              </p>
            </div>
            <div className='social-link'>
              <h2>Social Media</h2>
              <div className='w-full h-px my-2 bg-white opacity-30' />
              <div className='flex flex-wrap gap-2'>
                {socials.map((social, index) => {
                  return (
                    <a
                      target='_blank'
                      href={social.href}
                      className='text-xs leading-loose tracking-widest uppercase md:text-sm hover:text-white/80 transition-colors duration-200'
                      key={index}
                    >
                      {''}
                      {social.name}
                      {''}
                    </a>
                  );
                })}
              </div>
              {/* <p className='text-xl tracking-wider lowercase md:text-2xl lg:text-3xl'>
                +91 9221968131
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <Marquee items={items} className='text-white bg-transparent' />
    </section>
  );
};

export default Contact;
