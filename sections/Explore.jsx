'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import { Eye, Github, X } from 'lucide-react'; 
import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from '../components';
import mobileAppHome from '../public/mobileAppHome.jpg';
import profileHome from '../public/profileImage.jpg';
import omen from '../public/omen.png';
import blog from '../public/blog3.png';
import StorageLogin from '../public/StorageLogin.png';
import Storage1 from '../public/Storage1.png';
import StorageHome from '../public/StorageHome .png';
import Storage2 from '../public/Storage2.png';
import AI1 from '../public/AI1.png';
import AI2 from '../public/AI2.png';  
import AI3 from '../public/AI3.png';
import AI4 from '../public/AI4.png';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'AI', 'Mobile'];

const projectImages = {
  'project-1': StorageLogin,
  'project-2': blog,
  'project-3': mobileAppHome,
  'project-4': profileHome,
  'project-5': omen,
};

const projectsData = [
  {
    id: 'project-1',
    title: 'Storage Management App',
    description: 'An application for storing, sharing and viewing files uploaded. Made with react and next on the frontend and appwrite for the backend.',
    imgUrl: projectImages['project-1'],
    liveLink: 'https://anubhav-storage-app.vercel.app/',
    repoLink: 'https://github.com/anubhav126/storage-management-app',
    technologies: ['React', 'Appwrite', 'Node.js', 'Tailwind'],
    category: 'Frontend',
    features: [
      'Secure Login with Google or email',
      'Upload files of various formats or extensions',
      'Ability to download, view, rename and delete files',
      'Sort files by multiple parameters',
    ],
    galleryImages: [StorageHome, Storage1, Storage2],
  },
  {
    id: 'project-2',
    title: 'Node.js reverse proxy',
    description: 'A high-performance, cluster-based load balancer and reverse proxy server implementation in Node.js.',
    imgUrl: projectImages['project-2'],
    repoLink: 'https://github.com/anubhav126/reverse-proxy',
    technologies: ['Node.js', 'Typescript'],
    category: 'Backend',
    features: [
      'Multi-process architecture using Node.js cluster module',
      'Round-robin load balancing across worker processes',
      'Error handling and validation using schema validation',
      'Configuration-based routing rules',
      'Upstream server proxying'
    ],
    galleryImages: [blog, profileHome],
  },
  {
    id: 'project-3',
    title: 'Movie Recommendation App',
    description: 'A beautifully crafted app aimed at recommending movies based on your mood and personality traits.',
    imgUrl: projectImages['project-3'],
    liveLink: 'https://apps.apple.com/example',
    repoLink: 'https://github.com/yourusername/fitness-app',
    technologies: ['React Native', 'Appwrite', 'Expo', 'Nativewind', 'Google Fit'],
    category: 'Mobile',
    features: [
      'Login with either Google or your email to save progress',
      'Search from a huge database of over 50,000 movies across genres',
      'Save movies under different categories',
      'Custom algorithm suggests movies based on mood and personality',
    ],
    galleryImages: [mobileAppHome, omen],
    isMobile: true
  },
  {
    id: 'project-4',
    title: 'AI Image Generator',
    description: 'A fully responsive text-to-image AI web app built with React that generates 1024x1024 images based on the prompt provided with the help of the OpenAI API.',
    imgUrl: AI1,
    liveLink: 'https://anubhav-ai-image-generator.netlify.app',
    repoLink: 'https://github.com/anubhav1206/AI-image-generator',
    technologies: ['React', 'OpenAI API', 'Tailwind CSS', 'Node.js'],
    category: 'AI',
    features: [
      '50 carefully created prompts to get you started',
      'Industry standard coding practices following best principles',
      'Ability to share your creations to the community and option to download anyone else\'s',
    ],
    galleryImages: [AI1, AI4, AI2],
  },
  {
    id: 'project-5',
    title: 'Personal Portfolio',
    description: 'My personal developer portfolio showcasing projects, skills, and experience with an interactive and engaging design.',
    imgUrl: projectImages['project-5'],
    liveLink: 'https://yourportfolio.com',
    repoLink: 'https://github.com/yourusername/portfolio',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    category: 'Frontend',
    features: [
      'Interactive 3D elements',
      'Smooth page transitions',
      'Dark/light mode toggle',
      'Performance optimized animations',
    ],
    galleryImages: [omen, mobileAppHome],
  },
];

const TechTag = ({ tech }) => (
  <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-800/80 text-gray-300 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/80 hover:text-violet-300 transition-colors duration-200 cursor-default whitespace-nowrap">
    {tech}
  </span>
);

const MobileFrame = ({ children }) => (
  <div className="relative mx-auto w-full max-w-[300px]">
    <div className="relative mx-auto border-[12px] border-gray-900 rounded-[40px] shadow-xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10"></div>
      
      {/* Power Button */}
      <div className="absolute top-20 right-[-12px] w-[3px] h-10 bg-gray-800 rounded-r-lg"></div>
      
      {/* Volume Buttons */}
      <div className="absolute top-32 left-[-12px] w-[3px] h-8 bg-gray-800 rounded-l-lg"></div>
      <div className="absolute top-44 left-[-12px] w-[3px] h-8 bg-gray-800 rounded-l-lg"></div>
      
      {/* Screen Content with subtle inner shadow */}
      <div className="relative aspect-[9/19.5] bg-gray-900 overflow-hidden shadow-inner">
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-700 rounded-full"></div>
    </div>
    
    {/* Phone Reflection */}
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-md rounded-full"></div>
  </div>
);

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef(null);
  const projectModalRef = useRef(null);

  const filteredProjects = useMemo(() => {
    const categoryFiltered = selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);
    
    if (!searchQuery.trim()) return categoryFiltered;
    
    const query = searchQuery.toLowerCase().trim();
    return categoryFiltered.filter(project => 
      project.title.toLowerCase().includes(query) || 
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query))
    );
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedProject && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedProject]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  return (
    <main className={`${styles.paddings} relative`} id="explore">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1D] to-[#0D0D2D] -z-10" />
      <div className="absolute inset-0 opacity-20 -z-10 bg-[url('/grid-pattern.svg')] bg-repeat bg-center" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| My Portfolio" textStyles="text-center" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white py-8 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            Explore <br className="md:block hidden" /> My Projects
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 mb-8 px-4 md:px-0">
            Discover my latest work across web development, design, and creative coding.
            Each project represents my passion for building innovative digital experiences.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative max-w-md mx-auto mb-8 px-4 md:px-0 w-full"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full opacity-70 blur-md group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-12 pr-4 bg-gray-800/70 backdrop-blur-md text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Mobile Category Dropdown */}
        <div className="md:hidden px-4 mb-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-between w-full py-3 px-4 rounded-lg bg-gray-800/80 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Select project category"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500"></span>
              <span>{selectedCategory}</span>
            </span>
            <svg
              className={`h-5 w-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 py-2 rounded-lg bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-xl z-20 relative"
              >
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={clsx(
                      'w-full text-left px-4 py-2 text-sm',
                      selectedCategory === category
                        ? 'bg-violet-600/20 text-violet-300'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="hidden md:flex flex-wrap justify-center gap-4 mb-12"
        >
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                'relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden',
                selectedCategory === category
                  ? 'text-white'
                  : 'bg-gray-800/30 text-gray-300 border border-gray-700 hover:border-gray-600'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategoryBackground"
                  className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-4 md:px-0 mb-6 text-center text-gray-400"
        >
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </motion.div>

        {/* Project Cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  index={index}
                  setSelectedProject={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 px-4"
          >
            <div className="w-16 h-16 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl text-white font-medium mb-2">No projects found</h3>
            <p className="text-gray-400 text-center max-w-md">
              No projects match your current filters. Try changing your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6 px-6 py-2 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com/anubhav126"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden rounded-full group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"></span>
            <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-full"></span>
            
            {/* Animated shimmer effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
            
            <span className="relative block px-8 py-3 font-medium text-white z-10 flex items-center">
              <Github className="w-5 h-5 inline mr-2" /> View all on GitHub
            </span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={projectsData.find(p => p.id === selectedProject)} 
            onClose={() => setSelectedProject(null)} 
            modalRef={modalRef}
            projectModalRef={projectModalRef}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

const ProjectCard = ({
  id,
  imgUrl,
  title,
  description,
  technologies,
  category,
  index,
  setSelectedProject,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 h-[350px] md:h-[400px] hover:shadow-violet-600/20 hover:shadow-2xl transition-all duration-500"
    >
      <div className="absolute inset-0 overflow-hidden">
        {isLoading && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
        <Image
          src={imgUrl}
          alt={title}
          width={800}
          height={450}
          onLoad={() => setIsLoading(false)}
          onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
          className={clsx(
            'w-full h-full object-cover object-center transition-all duration-700 ease-out',
            'group-hover:scale-110 group-hover:filter-none scale-105 brightness-[0.7] filter',
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        
        {/* Animated glow effect on hover */}
        <motion.div 
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
        <div className="mb-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="inline-block px-3 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-300 text-xs font-medium"
          >
            {category}
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <motion.h3 
            className="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300"
            animate={{ 
              color: isHovered ? '#c4b5fd' : '#ffffff',
              textShadow: isHovered ? '0 0 8px rgba(139, 92, 246, 0.5)' : 'none' 
            }}
          >
            {title}
          </motion.h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 3).map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <TechTag tech={tech} />
              </motion.div>
            ))}
            {technologies.length > 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <TechTag tech={`+${technologies.length - 3}`} />
              </motion.div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(id);
            }}
            className="relative w-full py-3 font-medium rounded-full overflow-hidden group"
            aria-label={`View details for ${title}`}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"></span>
            <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-full"></span>
            <span className="relative z-20 flex items-center justify-center text-white">
              <Eye className="w-5 h-5 inline mr-2" /> View Project
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose, modalRef, projectModalRef }) => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const imageModalRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageModalRef.current && !imageModalRef.current.contains(event.target)) {
        closeZoomedImage();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (zoomedImage) {
      setScrollPosition(projectModalRef.current.scrollTop);
    }
  }, [zoomedImage, projectModalRef]);

  const closeZoomedImage = () => {
    setZoomedImage(null);
    if (projectModalRef.current) {
      setTimeout(() => {
        projectModalRef.current.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }, 100);
    }
  };

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Gallery' }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
      >
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden shadow-2xl border border-gray-700/50 w-full h-full md:h-auto md:max-h-[90vh] md:rounded-2xl overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="fixed md:absolute top-4 right-4 z-50 p-3 rounded-full bg-black/50 text-white backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-full h-56 sm:h-64 md:h-80 relative">
            <Image
              src={project.imgUrl}
              alt={project.title}
              width={1200}
              height={675}
              priority
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            {/* Animated particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-violet-400 rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: Math.random() * 0.5 + 0.3
                  }}
                  animate={{ 
                    y: [null, Math.random() * 30 - 15 + '%'],
                    x: [null, Math.random() * 20 - 10 + '%'],
                    opacity: [null, Math.random() * 0.3 + 0.1]
                  }}
                  transition={{ 
                    duration: Math.random() * 10 + 5,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                />
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 p-6 max-w-xl">
              <div className="flex items-center gap-3 mb-2">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-300 text-xs font-medium"
                >
                  Featured Project
                </motion.span>
                <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-400 text-sm"
                >
                  {project.category}
                </motion.span>
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              >
                {project.title}
              </motion.h2>
            </div>
          </div>

          <div className="flex border-b border-gray-700/50 px-6 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium text-sm relative ${
                  activeTab === tab.id ? 'text-violet-300' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div ref={projectModalRef} className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row gap-8"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-200 mb-4">Overview</h3>
                    <p className="text-gray-400 mb-6">{project.description}</p>
                    
                    <div className="md:hidden">
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <TechTag tech={tech} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-64 space-y-6 mt-6 md:mt-0">
                    <div className="hidden md:block">
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <TechTag tech={tech} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-full py-3 font-medium rounded-lg flex items-center justify-center overflow-hidden group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg"></span>
                          <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-lg"></span>
                          <span className="relative z-20 flex items-center justify-center text-white">
                            <Eye className="w-5 h-5 inline mr-2" /> Live Demo
                          </span>
                        </motion.a>
                      )}
                      <motion.a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative w-full py-3 font-medium rounded-lg flex items-center justify-center overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gray-800 border border-gray-700 rounded-lg"></span>
                        <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-700 rounded-lg"></span>
                        <span className="relative z-20 flex items-center justify-center text-white">
                          <Github className="w-5 h-5 inline mr-2" /> GitHub Repo
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
                      >
                        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-violet-400 text-lg">•</span>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gallery' && project.galleryImages && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-gray-200 mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.galleryImages.map((img, index) => (
                      <motion.div 
                        key={index} 
                        className="relative rounded-lg overflow-hidden cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setZoomedImage(img)}
                      >
                        {project.isMobile ? (
                          <MobileFrame>
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${index + 1}`}
                              width={400}
                              height={800}
                              className="w-full h-full object-contain"
                              onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                            />
                          </MobileFrame>
                        ) : (
                          <div className="relative aspect-video bg-gray-800 group">
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${index + 1}`}
                              width={800}
                              height={450}
                              className="w-full h-full object-cover"
                              onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                            />
                            <motion.div 
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="absolute inset-0 bg-gradient-to-t from-violet-900/70 via-gray-900/50 to-transparent flex items-center justify-center"
                            >
                              <motion.div 
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                className="bg-black/50 p-2 rounded-full backdrop-blur-sm"
                              >
                                <Eye className="w-5 h-5 text-white" />
                              </motion.div>
                            </motion.div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* Zoomed Image Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              ref={imageModalRef}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
            >
              <button
                onClick={closeZoomedImage}
                className="absolute -top-12 right-0 z-50 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                aria-label="Close zoomed image"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-gray-700/30">
                {project.isMobile ? (
                  <MobileFrame>
                    <Image
                      src={zoomedImage}
                      alt="Zoomed project image"
                      width={400}
                      height={800}
                      className="w-full h-full object-contain"
                    />
                  </MobileFrame>
                ) : (
                  <Image
                    src={zoomedImage}
                    alt="Zoomed project image"
                    width={1200}
                    height={800}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Explore;