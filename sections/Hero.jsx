'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { FaReact, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiC, SiPython, SiMongodb } from 'react-icons/si';
import { PiPackageThin } from 'react-icons/pi';
import '../styles/hero.css';
import { Info } from "lucide-react";
import PortfolioHeader from '../components/ui/PortfolioHeader';
import Image from 'next/image';
import '../styles/globals.css';

// Memoize tech categories to prevent unnecessary re-renders
const techCategories = {
  frontend: [
    { Icon: FaReact, name: 'React', info: 'Built dynamic UIs with React and Next.js', color: 'text-blue-400' },
    { Icon: SiNextdotjs, name: 'Next.js', info: 'Built SEO-friendly applications', color: 'text-white' },
    { Icon: SiTailwindcss, name: 'Tailwind', info: 'Styled UI using utility-first approach', color: 'text-teal-400' },
  ],
  backend: [
    { Icon: FaNodeJs, name: 'Node.js', info: 'Developed backend stuffs like a reverse proxy server and a custom deployement pipeline', color: 'text-green-500' },
    { Icon: FaJava, name: 'Java', info: 'Worked on Spring Boot applications', color: 'text-red-500' },
    { Icon: SiMongodb, name: 'MongoDB', info: 'Used mongoDB as the go-to NoSQL database for mulitple small-scale applications', color: 'text-green-600' },
  ],
  languages: [
    { Icon: SiC, name: 'C', info: 'Worked on low level testing complying with aerospace grade safety standards.', color: 'text-blue-600' },
    { Icon: SiPython, name: 'Python', info: 'Worked on writing scripts in order to automate testing and workflows', color: 'text-yellow-400' },
    { Icon: PiPackageThin, name: 'Packages', info: 'Currently working on an npm package that scans your node modules and checks up with package.json file to remove unused node package.', color: 'text-gray-300' },
  ]
};

// Predefine positions instead of random assignments
const desktopPositions = [
  'top-4 left-20', 'top-4 right-28', 'bottom-12 left-20', 'bottom-1/4 right-32',
  'top-1/3 left-24', 'top-1/3 right-32', 'bottom-1/3 left-24', 'bottom-1/5 right-28',
  'top-1/2 right-28'
];

// Predefine limited number of particles for better performance
const particles = Array.from({ length: 8 }, (_, i) => ({ 
  size: Math.floor(Math.random() * 4) + 2,
  top: `${Math.floor(Math.random() * 100)}%`,
  left: `${Math.floor(Math.random() * 100)}%`,
  delay: `${Math.floor(Math.random() * 5)}s`,
  duration: `${Math.floor(Math.random() * 10) + 10}s`
}));

const Hero = () => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  // Memoize all tech icons to prevent unnecessary recalculations
  const allTechIcons = useMemo(() => [
    ...techCategories.frontend,
    ...techCategories.backend,
    ...techCategories.languages
  ], []);

  // Check mobile only once on initial render and when resized
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Throttled resize handler using requestAnimationFrame
    let rafId;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkMobile);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Memoize handlers to prevent unnecessary re-renders
  const handleTechHover = useCallback((name) => {
    setHoveredTech(name);
  }, []);

  const handleTechLeave = useCallback(() => {
    setHoveredTech(null);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setError('Failed to load profile image');
  }, []);

  return (
    <section 
      className="min-h-screen w-full relative overflow-hidden py-6 md:py-16 px-4 md:px-8"
      aria-label="Hero section"
    >
      {/* Optimized background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-70" />

      {/* Reduced particles count for better performance */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-cyan-500/20 will-change-transform"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: particle.top,
              left: particle.left,
              animation: `float ${particle.duration} linear infinite`,
              animationDelay: particle.delay
            }}
          />
        ))}
      </div>

      {isMobile ? (
        <div className="flex flex-col items-center min-h-screen py-12 px-6">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700 shadow-xl animate-glow">
            <div className="absolute inset-0">
              <Image 
                src="/profile.png" 
                alt="Profile" 
                width={192}
                height={192}
                quality={65}
                loading="eager"
                className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoadingComplete={handleImageLoad}
                onError={handleImageError}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
            </div>
            {!imageLoaded && !error && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm">
                {error}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-white animate-slideUp">Full-Stack Developer</h2>
            <p className="text-base text-gray-300 mt-2 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Crafting intuitive experiences
            </p>
            <span className="text-sm text-white bg-gray-800/60 backdrop-blur-md px-3 py-1 rounded-full mt-3 inline-block animate-slideUp" style={{ animationDelay: '0.4s' }}>
              24, India
            </span>
          </div>

          {/* Virtualized tech cards for mobile to improve performance */}
          <div className="mt-10 w-full space-y-4">
            {Object.entries(techCategories).map(([category, techs], index) => (
              <div
                key={category}
                className="relative w-full bg-gray-900/30 backdrop-blur-lg rounded-xl p-5 shadow-xl border border-gray-700/50 animate-slideUp transform hover:scale-[1.02] transition-transform duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="space-y-3">
                  {techs.map(({ Icon, name, info, color }) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-300"
                    >
                      <Icon className={`${color} text-3xl`} />
                      <div>
                        <h4 className={`text-sm font-semibold ${color}`}>{name}</h4>
                        <p className="text-xs text-gray-400">{info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <PortfolioHeader headerText="Welcome to my Portfolio" />
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto mb-8 md:mb-12 px-2 group perspective">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-indigo-500 rounded-2xl blur-lg opacity-60 transform scale-105 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 rounded-2xl blur-md opacity-40 transform scale-103 animate-pulse" />
            <div className="relative rounded-2xl overflow-hidden bg-[#1e1f2e] p-1 transform group-hover:scale-[1.02] transition-all duration-500 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-cyan-900/20 z-10" />
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs md:text-sm font-medium text-white border border-cyan-500/50 shadow-lg transform translate-y-1 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500 z-20">
                23, India
              </div>
              <button
                className="absolute top-4 left-4 bg-black/80 p-2 rounded-full text-white shadow-md sm:hidden z-30 hover:bg-black/90 transition-colors duration-300"
                onClick={() => setShowInfo(!showInfo)}
                aria-label={showInfo ? "Hide info" : "Show info"}
              >
                <Info className="w-5 h-5" />
              </button>
              <div className="relative w-full aspect-[16/9]">
                <Image 
                  src="/profile.png" 
                  alt="Profile" 
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 512px, 800px"
                  quality={75}
                  priority={true}
                  className={`object-cover rounded-xl transform group-hover:scale-[1.03] transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoadingComplete={handleImageLoad}
                  onError={handleImageError}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>
              {!imageLoaded && !error && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-xl" />
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm rounded-xl">
                  {error}
                </div>
              )}
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-black/50 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm md:text-base text-white font-medium z-20 hidden sm:block">
                A full-stack developer crafting intuitive and visually compelling digital experiences.
              </div>
              {showInfo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-sm sm:hidden p-4 rounded-xl z-40">
                  A full-stack developer crafting intuitive and visually compelling digital experiences.
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            {allTechIcons.slice(0, 9).map(({ Icon, name, info, color }, index) => (
              <div 
                key={index} 
                className={`absolute text-4xl lg:text-5xl opacity-80 ${color} ${desktopPositions[index]} transform hover:scale-125 transition-transform duration-300 animate-float will-change-transform`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div
                  className="relative group cursor-pointer p-2"
                  onMouseEnter={() => handleTechHover(name)}
                  onMouseLeave={handleTechLeave}
                >
                  <Icon />
                  <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                  {hoveredTech === name && (
                    <div 
                      className={`absolute mt-3 px-4 py-2 bg-black/90 backdrop-blur-sm text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-10 border border-gray-700 animate-fadeIn ${
                        desktopPositions[index].includes('right') ? 'right-0 transform translate-x-0' : 'left-1/2 transform -translate-x-1/2'
                      }`}
                      role="tooltip"
                    >
                      {info}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0% { box-shadow: 0 0 15px rgba(147, 51, 234, 0.5); }
          50% { box-shadow: 0 0 25px rgba(147, 51, 234, 0.8); }
          100% { box-shadow: 0 0 15px rgba(147, 51, 234, 0.5); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse { animation: pulse 4s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards; }
        .animate-glow { animation: glow 2s infinite ease-in-out; }
        .perspective { perspective: 1000px; }

        @media (max-width: 767px) {
          section { padding-bottom: 10rem; }
        }

        /* Add smooth scrolling to the page */
        html {
          scroll-behavior: smooth;
        }

        /* Optimize animations for users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-pulse,
          .animate-fadeIn,
          .animate-slideUp,
          .animate-glow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;