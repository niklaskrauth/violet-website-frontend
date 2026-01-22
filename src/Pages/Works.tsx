import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimationWork {
  id: string;
  year: number;
  title: string;
  description: string;
  videoUrl?: string; // Platzhalter für später
}

const worksData: AnimationWork[] = [
  { id: '1', year: 2026, title: 'Project Alpha', description: 'Eine faszinierende Animation über Licht und Schatten.' },
  { 
    id: '2', 
    year: 2025, 
    title: 'Head Turn',
    description: 'He is gonna shoot you.',
    videoUrl: '/assets/videos/2025/HiPaint_1764153224805.mp4'
  },
  { 
    id: '3', 
    year: 2025, 
    title: 'Rat Maxing', 
    description: 'Macht halt Raten Sachen.',
    videoUrl: '/assets/videos/2025/Rat_-_Maxing_1.mp4'
  },
  { 
    id: '4', 
    year: 2025, 
    title: 'Converter',
    description: 'Drehende Kristalle',
    videoUrl: '/assets/videos/2025/lv_0_20251026205014.mp4'
  },
  { 
    id: '5', 
    year: 2025, 
    title: 'Die Glocke',
    description: 'Man hört sie in der Ferne leuten.',
    videoUrl: '/assets/videos/2025/lv_0_20251026205955.mp4'
  },
  { 
    id: '6', 
    year: 2025, 
    title: 'Mochi',
    description: 'Squished und Bounced herum.',
    videoUrl: '/assets/videos/2025/lv_0_20251112114027.mp4'
  },
  {
    id: '7',
    year: 2025,
    title: 'Drop',
    description: 'Ein Tropfen fällt in den Teich.',
    videoUrl: '/assets/videos/2025/ezgif-3316a7d3b96126c2.mp4'
  },
  { id: '8', year: 2024, title: 'Urban Pulse', description: 'Der Rhythmus der Stadt in animierter Form.' },
  { id: '9', year: 2024, title: 'Digital Rain', description: 'Ein moderner Klassiker, neu interpretiert.' }
];

const years = [2026, 2025, 2024];

const WorkItem = ({ work }: { work: AnimationWork; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex items-center gap-12 mb-48 w-full"
      id={`work-${work.id}`}
    >
      <div className="w-[400px] h-[400px] bg-zinc-900/50 backdrop-blur-sm rounded-xl flex-shrink-0 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
        {work.videoUrl ? (
          <video 
            src={work.videoUrl} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-zinc-600 font-medium tracking-widest uppercase text-sm">Animation Placeholder</span>
        )}
      </div>
      <div className="flex-1">
        <motion.h3 
          className="text-3xl font-bold mb-6 text-white uppercase tracking-widest border-l-4 border-purple-500 pl-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {work.title}
        </motion.h3>
        <motion.p 
          className="text-zinc-400 max-w-md leading-relaxed text-lg font-light"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {work.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [activeYear, setActiveYear] = useState<number>(2025);

  const scrollToYear = (year: number) => {
    const firstWorkOfYear = worksData.find(w => w.year === year);
    if (firstWorkOfYear) {
      const element = document.getElementById(`work-${firstWorkOfYear.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    setActiveYear(year);
  };

  // Optional: Update active year on scroll
  useEffect(() => {
    const container = document.querySelector('.overflow-y-auto');
    if (!container) {
        // Fallback to window scroll if container not found or not scrollable
        const handleWindowScroll = () => {
          const scrollPosition = window.scrollY + 300;
          for (const work of worksData) {
            const element = document.getElementById(`work-${work.id}`);
            if (element) {
              const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
              if (scrollPosition >= absoluteTop && scrollPosition <= absoluteTop + element.offsetHeight + 100) {
                  if(activeYear !== work.year) {
                      setActiveYear(work.year);
                  }
                  break;
              }
            }
          }
        };
        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + 300;
      for (const work of worksData) {
        const element = document.getElementById(`work-${work.id}`);
        if (element) {
          const absoluteTop = element.offsetTop;
          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteTop + element.offsetHeight + 100) {
              if(activeYear !== work.year) {
                  setActiveYear(work.year);
              }
              break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeYear]);

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-purple-500/30">
      <div className="container mx-auto px-12 pt-40 pb-20 flex">
        {/* Left Column: Year & Titles */}
        <div className="w-1/4 fixed left-12 top-40 pointer-events-none">
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-[12rem] font-black mb-12 tracking-tighter opacity-10 leading-none select-none">{activeYear}</h1>
            <ul className="space-y-6 relative z-10">
              {worksData.filter(w => w.year === activeYear).map(work => (
                <motion.li 
                  key={work.id} 
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <img src="/assets/images/Arrow.png" alt="arrow" className="w-10 h-10 object-contain" />
                  <span className="text-xl font-medium tracking-widest uppercase">{work.title}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Center Column: Animation Feed */}
        <div className="w-1/2 mx-auto ml-[30%] pr-12 pointer-events-auto">
          {worksData.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* Right Column: Year Navigation */}
        <div className="w-24 fixed right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-center pointer-events-auto">
          {years.map(year => (
            <button
              key={year}
              onClick={() => scrollToYear(year)}
              className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-all duration-500 group relative ${
                activeYear === year 
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                : 'bg-transparent text-white border-white/20 hover:border-white/60'
              }`}
            >
              <span className="text-lg font-black tracking-tighter italic">'{year.toString().slice(-2)}</span>
              {activeYear === year && (
                <motion.div 
                  layoutId="activeYearIndicator"
                  className="absolute -right-4 w-1 h-8 bg-purple-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;
