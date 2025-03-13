'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from '../components';

// Sample project data with categories
const projectsData = [
  {
    id: 'project-1',
    title: 'E-Commerce Dashboard',
    description: 'A comprehensive dashboard for managing products, orders, and customers with real-time analytics and inventory tracking.',
    imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    liveLink: 'https://example.com/dashboard',
    repoLink: 'https://github.com/yourusername/ecommerce-dashboard',
    technologies: ['React', 'Redux', 'Node.js', 'MongoDB', 'Chart.js'],
    category: 'Frontend',
    features: [
      'Real-time sales analytics',
      'Inventory management system',
      'Customer behavior tracking',
      'Responsive design for all devices'
    ]
  },
  {
    id: 'project-2',
    title: 'API Gateway Service',
    description: 'A scalable API gateway that handles authentication, request routing, and rate limiting for microservices architecture.',
    imgUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop',
    liveLink: 'https://api.example.com',
    repoLink: 'https://github.com/yourusername/api-gateway',
    technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'AWS Lambda'],
    category: 'Backend',
    features: [
      'JWT authentication and authorization',
      'Request caching and rate limiting',
      'Load balancing across services',
      'Comprehensive logging and monitoring'
    ]
  },
  {
    id: 'project-3',
    title: 'Health & Fitness App',
    description: 'A mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations.',
    imgUrl: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop',
    liveLink: 'https://apps.apple.com/example',
    repoLink: 'https://github.com/yourusername/fitness-app',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit', 'Google Fit'],
    category: 'Mobile',
    features: [
      'Workout tracking with progress visualization',
      'Meal planning and nutrition tracking',
      'Health metrics dashboard',
      'Social sharing and community features'
    ]
  },
  {
    id: 'project-4',
    title: 'Banking Portal Redesign',
    description: 'Complete redesign of a banking portal focused on improving user experience, accessibility, and modern design principles.',
    imgUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1748&auto=format&fit=crop',
    liveLink: 'https://banking.example.com',
    repoLink: 'https://github.com/yourusername/banking-portal',
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Zeplin'],
    category: 'UI/UX',
    features: [
      'User research and journey mapping',
      'Accessibility compliance (WCAG 2.1)',
      'Interactive prototypes',
      'Design system creation'
    ]
  },
  {
    id: 'project-5',
    title: 'Personal Portfolio',
    description: 'My personal developer portfolio showcasing projects, skills, and experience with an interactive and engaging design.',
    imgUrl: 'https://images.unsplash.com/photo-1545665277-5937489579f2?q=80&w=2070&auto=format&fit=crop',
    liveLink: 'https://yourportfolio.com',
    repoLink: 'https://github.com/yourusername/portfolio',
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Three.js'],
    category: 'Frontend',
    features: [
      'Interactive 3D elements',
      'Smooth page transitions',
      'Dark/light mode toggle',
      'Performance optimized animations'
    ]
  }
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalRef = useRef(null);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProject(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };

  // Get the selected project's data
  const projectData = selectedProject ? 
    projectsData.find(project => project.id === selectedProject) : null;

  return (
    <section className={`${styles.paddings} relative`} id="explore">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1D] to-[#0D0D2D] -z-10" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat bg-center" />
      </div>
      
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
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white py-8
                        bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 
                        bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(147,51,234,0.5)]">
            Explore <br className="md:block hidden" /> My Projects
          </h1>
          
          <p className="text-gray-400 max-w-xl mx-auto mt-4 mb-8 px-4 md:px-0">
            Discover my latest work across web development, design, and creative coding. 
            Each project represents my passion for building innovative digital experiences.
          </p>
        </motion.div>

        {/* Mobile Category Dropdown */}
        <div className="md:hidden px-4 mb-6">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-between w-full py-3 px-4 rounded-lg
                     bg-gray-800/80 text-white border border-gray-700
                     focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500"></span>
              <span>{selectedCategory}</span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
                className="mt-2 py-2 rounded-lg bg-gray-800/90 backdrop-blur-sm 
                         border border-gray-700 shadow-xl z-20 relative"
              >
                {['All', 'Frontend', 'Backend', 'UI/UX', 'Mobile'].map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-4 py-2 text-sm
                              ${selectedCategory === category 
                                ? 'bg-violet-600/20 text-violet-300' 
                                : 'text-gray-300 hover:bg-gray-700/50'}`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Project filter tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden md:flex flex-wrap justify-center gap-4 mb-12"
        >
          {['All', 'Frontend', 'Backend', 'UI/UX', 'Mobile'].map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                        ${selectedCategory === category ? 
                          'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30' : 
                          'bg-gray-800/30 text-gray-300 border border-gray-700'}`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project cards grid with responsive layout */}
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
        
        {/* CTA for more projects */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <button
            className="cyber-glitch-button px-6 py-2 font-medium rounded-full shadow-lg shadow-purple-800/20 relative group"
          >
            <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
            <div className="cyber-glitch-scanline absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100"></div>
            <div className="cyber-glitch-text relative z-20 flex items-center text-white">
               View all of them on github
            </div>
          </button>
        </motion.div>
      </motion.div>
      
      {/* Project modal - Full screen on mobile */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={projectData} 
            onClose={() => setSelectedProject(null)}
            modalRef={modalRef}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ id, imgUrl, title, description, technologies, category, index, setSelectedProject }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.25 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative rounded-xl overflow-hidden shadow-xl 
                bg-gradient-to-br from-gray-900/90 to-gray-800/90
                border border-gray-700/50 h-[350px] md:h-[400px]
                hover:shadow-violet-600/20 hover:shadow-2xl
                transition-all duration-500"
    >
      {/* Image overlay with gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={imgUrl} 
          alt={title} 
          className="w-full h-full object-cover object-center
                    transition-all duration-700 ease-out
                    group-hover:scale-110 group-hover:filter-none
                    scale-105 brightness-[0.7] filter"
        />
        <div className="absolute inset-0 bg-gradient-to-t 
                      from-gray-900 via-gray-900/70 to-transparent" />
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
        {/* Project category badge */}
        <div className="mb-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="inline-block px-3 py-1 rounded-full 
                     bg-violet-500/20 backdrop-blur-sm 
                     text-violet-300 text-xs font-medium"
          >
            {category}
          </motion.div>
        </div>
      
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 
                       group-hover:text-violet-300 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies && technologies.slice(0, 3).map((tech, i) => (
              <span key={i} className="px-2 py-1 text-xs font-medium rounded-md
                                     bg-gray-800/80 text-gray-300">
                {tech}
              </span>
            ))}
            {technologies && technologies.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md
                             bg-gray-800/80 text-gray-300">
                +{technologies.length - 3}
              </span>
            )}
          </div>
          
          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProject(id)}
            className="w-full py-3 rounded-lg 
                     bg-gradient-to-r from-violet-600 to-indigo-600
                     text-white font-medium text-sm
                     hover:shadow-lg hover:shadow-violet-600/30
                     transition-all duration-300"
          >
            View Project
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose, modalRef }) => {
  if (!project) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 
                 overflow-hidden shadow-2xl border border-gray-700/50
                 w-full h-full md:h-auto md:max-h-[90vh] md:rounded-2xl
                 overflow-y-auto"
      >
        {/* Close button - make it more visible on mobile */}
        <button 
          onClick={onClose}
          className="fixed md:absolute top-4 right-4 z-50 p-3 rounded-full 
                   bg-black/50 text-white
                   backdrop-blur-md shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Hero image */}
        <div className="w-full h-56 sm:h-64 md:h-80 relative">
          <img 
            src={project.imgUrl} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          
          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 p-6 max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-300 text-xs font-medium">
                Featured Project
              </span>
              <span className="h-1 w-1 bg-gray-500 rounded-full"></span>
              <span className="text-gray-400 text-sm">{project.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
          </div>
        </div>
        
        {/* Content with improved mobile layout */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Overview</h3>
              <p className="text-gray-400 mb-6">
                {project.description}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Key Features</h3>
              <ul className="space-y-2 mb-6">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-violet-400 mt-1">•</span>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Sidebar - stacks vertically on mobile */}
            <div className="md:w-64 space-y-6 mt-6 md:mt-0">
              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies && project.technologies.map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-medium rounded-md
                                           bg-gray-800 text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action buttons - full width on mobile */}
              <div className="space-y-3">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-2 py-3 rounded-lg
                           bg-gradient-to-r from-violet-600 to-indigo-600
                           text-white font-medium
                           hover:shadow-lg hover:shadow-violet-600/30
                           transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Live Demo
                </a>
                
                <a 
                  href={project.repoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-2 py-3 rounded-lg
                           bg-gray-800 border border-gray-700
                           text-white font-medium
                           hover:bg-gray-700
                           transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Repo
                </a>
              </div>
            </div>
          </div>
          
          {/* Additional gallery section - responsive grid */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Project Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <img 
                    src={`/api/placeholder/600/340`} 
                    alt="Project screenshot" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Explore;