import { Icon } from '@iconify/react';
import AnimatedHeaderSection from '../components/AnimatedHeaderSection';
import { projects } from '../constants';

const Work = () => {
  const text = `Featured projects that have been meticulously
  crafed with passion to drive results and impact.`;
  return (
    <section id='work' className='min-h-screen flex flex-col'>
      <AnimatedHeaderSection
        subtitle={'Logic meets Aesthetics, Seamlessly'}
        title={'Works'}
        text={text}
        textColor={'text-black'}
        withSrollTriggerr={true}
      />
      <div className='relative flex flex-col font-light'>
        {projects.map((project, index) => {
          return (
            <div
              key={project.id}
              id='project'
              className='relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0'
            >
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
              <div className='w-full' />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
