'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import { Eye, Github, X } from 'lucide-react'; 
import styles from '../styles';
import { staggerContainer } from '../utils/motion';
import { TitleText, TypingText } from '../components';

// Project Images
const projectImages = {
  'storage-app': [
    { src: require('../public/StorageLogin.png'), alt: 'Storage App Login' },
    // { src: require('../public/StorageHome.png'), alt: 'Storage App Home' },
    { src: require('../public/Storage1.png'), alt: 'Storage App File View' },
    { src: require('../public/Storage2.png'), alt: 'Storage App Mobile' }
  ],
  'reverse-proxy': [
    { src: require('../public/blog3.png'), alt: 'Reverse Proxy Diagram' },
    { src: require('../public/profileImage.jpg'), alt: 'Code Screenshot' }
  ],
  'movie-app': [
    { src: require('../public/img1.jpg'), alt: 'Movie App Home' },
    { src: require('../public/img2.jpg'), alt: 'Movie App Details' },
    { src: require('../public/img3.jpg'), alt: 'Movie App Search' },
    { src: require('../public/img4.jpg'), alt: 'Movie App Profile' }
  ],
  'ai-generator': [
    { src: require('../public/AI1.png'), alt: 'AI Generator Home' },
    { src: require('../public/AI2.png'), alt: 'AI Generator Results' },
    { src: require('../public/AI3.png'), alt: 'AI Generator Community' },
    { src: require('../public/AI4.png'), alt: 'AI Generator Mobile' }
  ],
  'portfolio': [
    { src: require('../public/portfolioImage.png'), alt: 'Portfolio Home' },
    { src: require('../public/omen.png'), alt: 'Portfolio Projects' },
    { src: require('../public/mobileAppHome.jpg'), alt: 'Portfolio Mobile' }
  ]
};

const CATEGORIES = ['All', 'Frontend', 'Backend', 'AI', 'Mobile'];

const projectsData = [
  {
    id: 'storage-app',
    title: 'Storage Management App',
    description: 'A secure cloud storage solution with file management capabilities built with React, Next.js, and Appwrite backend.',
    coverImage: projectImages['storage-app'][0],
    liveLink: 'https://anubhav-storage-app.vercel.app/',
    repoLink: 'https://github.com/anubhav126/storage-management-app',
    technologies: ['React', 'Next.js', 'Appwrite', 'Tailwind CSS'],
    category: 'Frontend',
    features: [
      'Secure authentication with Google or email',
      'File uploads with progress tracking',
      'Preview documents, images, and videos',
      'File organization with folders and tags',
      'Role-based access control'
    ],
    gallery: projectImages['storage-app'],
    isMobile: false
  },
  {
    id: 'reverse-proxy',
    title: 'Node.js Reverse Proxy',
    description: 'High-performance load balancer and reverse proxy server implementation in Node.js with cluster support.',
    coverImage: projectImages['reverse-proxy'][0],
    repoLink: 'https://github.com/anubhav126/reverse-proxy',
    technologies: ['Node.js', 'TypeScript', 'Express'],
    category: 'Backend',
    features: [
      'Multi-process architecture using cluster module',
      'Round-robin load balancing',
      'Configuration-based routing',
      'Health checks and failover',
      'Request/response transformation'
    ],
    gallery: projectImages['reverse-proxy'],
    isMobile: false
  },
  {
    id: 'movie-app',
    title: 'Movie Recommendation App',
    description: 'Personalized movie suggestions based on mood and preferences with social sharing features.',
    coverImage: projectImages['movie-app'][0],
    liveLink: 'https://drive.google.com/file/d/1LmnVa7fA13hzaxp9MMk_i7HeeLG5so1i/view?usp=drive_link',
    repoLink: 'https://github.com/yourusername/fitness-app',
    technologies: ['React Native', 'Expo', 'TMDB API', 'Firebase'],
    category: 'Mobile',
    features: [
      'Mood-based recommendation engine',
      'Watchlist and favorites',
      'Social sharing and reviews',
      'Offline viewing capability',
      'Dark/light mode support'
    ],
    gallery: projectImages['movie-app'],
    isMobile: true
  },
  {
    id: 'ai-generator',
    title: 'AI Image Generator',
    description: 'Text-to-image generation web app using OpenAI API with community sharing features.',
    coverImage: projectImages['ai-generator'][0],
    liveLink: 'https://anubhav-ai-image-generator.netlify.app',
    repoLink: 'https://github.com/anubhav1206/AI-image-generator',
    technologies: ['React', 'OpenAI API', 'Node.js', 'Tailwind CSS'],
    category: 'AI',
    features: [
      'DALL-E integration for image generation',
      'Prompt suggestions and history',
      'Community gallery',
      'Download and share creations',
      'Responsive design'
    ],
    gallery: projectImages['ai-generator'],
    isMobile: false
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description: 'Interactive portfolio showcasing skills, projects, and experience with 3D elements.',
    coverImage: projectImages['portfolio'][0],
    liveLink: 'https://yourportfolio.com',
    repoLink: 'https://github.com/yourusername/portfolio',
    technologies: ['Next.js', 'Framer Motion', 'Three.js', 'Tailwind CSS'],
    category: 'Frontend',
    features: [
      'Interactive 3D components',
      'Smooth page transitions',
      'Dark/light mode toggle',
      'Performance optimized',
      'Accessibility focused'
    ],
    gallery: projectImages['portfolio'],
    isMobile: false
  }
];

const TechTag = ({ tech }) => (
  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700/80 hover:text-violet-300 transition-all duration-200 cursor-default">
    {tech}
  </span>
);

const MobileFrame = ({ children }) => (
  <div className="relative mx-auto w-full max-w-[300px]">
    <div className="relative mx-auto border-[12px] border-gray-900 rounded-[40px] shadow-xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10"></div>
      <div className="absolute top-20 right-[-12px] w-[3px] h-10 bg-gray-800 rounded-r-lg"></div>
      <div className="absolute top-32 left-[-12px] w-[3px] h-8 bg-gray-800 rounded-l-lg"></div>
      <div className="absolute top-44 left-[-12px] w-[3px] h-8 bg-gray-800 rounded-l-lg"></div>
      <div className="relative aspect-[9/19.5] bg-gray-900 overflow-hidden shadow-inner">
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
        {children}
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-700 rounded-full"></div>
    </div>
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/20 blur-md rounded-full"></div>
  </div>
);

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700/50 h-[360px] hover:shadow-violet-500/20 transition-all duration-300"
      onClick={onClick}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <motion.div 
          className="absolute inset-0 opacity-0 bg-gradient-to-r from-violet-600/20 to-blue-600/20"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="mb-auto">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-300 text-xs font-medium"
          >
            {project.category}
          </motion.span>
        </div>

        <div>
          <motion.h3 
            className="text-xl font-bold mb-2"
            animate={{ 
              color: isHovered ? '#c4b5fd' : '#ffffff',
              textShadow: isHovered ? '0 0 8px rgba(139, 92, 246, 0.5)' : 'none' 
            }}
          >
            {project.title}
          </motion.h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <TechTag key={i} tech={tech} />
            ))}
            {project.technologies.length > 3 && (
              <TechTag tech={`+${project.technologies.length - 3}`} />
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full py-2.5 font-medium rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"></span>
            <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-full"></span>
            <span className="relative z-20 flex items-center justify-center text-white text-sm">
              <Eye className="w-4 h-4 inline mr-2" /> View Details
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [zoomedImage, setZoomedImage] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Header */}
          <div className="relative h-64 sm:h-72 md:h-80 w-full">
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-violet-500/20 backdrop-blur-sm text-violet-300 text-xs font-medium">
                  {project.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm relative ${
                  activeTab === tab.id ? 'text-violet-300' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">Project Description</h3>
                    <p className="text-gray-400 mb-6">{project.description}</p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <TechTag key={i} tech={tech} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-2.5 text-center font-medium rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Eye className="w-4 h-4 inline mr-2" /> Live Demo
                        </motion.a>
                      )}
                      <motion.a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2.5 text-center font-medium rounded-lg bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-4 h-4 inline mr-2" /> View Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                        <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-violet-400">•</span>
                        </div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.gallery.map((img, index) => (
                      <motion.div 
                        key={index} 
                        className="relative rounded-lg overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setZoomedImage(img)}
                      >
                        {project.isMobile ? (
                          <MobileFrame>
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-contain"
                            />
                          </MobileFrame>
                        ) : (
                          <div className="aspect-video bg-gray-800 relative">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              className="object-cover"
                            />
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-10 right-0 z-50 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full rounded-lg overflow-hidden shadow-2xl border border-gray-700/30">
                {project.isMobile ? (
                  <MobileFrame>
                    <Image
                      src={zoomedImage.src}
                      alt={zoomedImage.alt}
                      fill
                      className="object-contain"
                    />
                  </MobileFrame>
                ) : (
                  <Image
                    src={zoomedImage.src}
                    alt={zoomedImage.alt}
                    width={1200}
                    height={800}
                    className="w-full h-auto max-h-[80vh] object-contain"
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

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    const categoryFiltered = selectedCategory === 'All'
      ? projectsData
      : projectsData.filter(project => project.category === selectedCategory);
    
    if (!searchQuery.trim()) return categoryFiltered;
    
    const query = searchQuery.toLowerCase();
    return categoryFiltered.filter(project => 
      project.title.toLowerCase().includes(query) || 
      project.description.toLowerCase().includes(query) ||
      project.technologies.some(tech => tech.toLowerCase().includes(query))
    );
  }, [selectedCategory, searchQuery]);

  return (
    <main className={`${styles.paddings} relative`} id="projects">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1D] to-[#0D0D2D] -z-10" />
      <div className="absolute inset-0 opacity-20 -z-10 bg-[url('/grid-pattern.svg')]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| My Work" textStyles="text-center" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white py-4 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-500 bg-clip-text text-transparent">
            Project Portfolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            A curated collection of my work showcasing full-stack development, design, and problem-solving skills.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8"
        >
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2.5 pl-10 pr-4 bg-gray-800/70 backdrop-blur-md text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                    : 'bg-gray-800/30 text-gray-300 border border-gray-700 hover:border-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center text-gray-400 text-sm"
        >
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="sync">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg text-white font-medium mb-2">No projects found</h3>
            <p className="text-gray-400 text-center max-w-md mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2 bg-violet-600 text-white rounded-full text-sm font-medium hover:bg-violet-700 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="https://github.com/anubhav126"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium hover:from-violet-700 hover:to-indigo-700 transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5 mr-2" /> View All on GitHub
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={projectsData.find(p => p.id === selectedProject)}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Explore;