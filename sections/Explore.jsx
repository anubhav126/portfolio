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
  <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-800 text-gray-300">
    {tech}
  </span>
);

const MobileFrame = ({ children }) => (
  <div className="relative mx-auto w-full max-w-[300px]">
    <div className="relative mx-auto border-[12px] border-gray-900 rounded-[40px] shadow-xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl z-10"></div>
      {/* Screen Content */}
      <div className="relative aspect-[9/19.5] bg-gray-900 overflow-hidden">
        {children}
      </div>
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-700 rounded-full"></div>
    </div>
  </div>
);

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const modalRef = useRef(null);
  const projectModalRef = useRef(null);

  const filteredProjects = useMemo(() => {
    return selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);
  }, [selectedCategory]);

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
          {CATEGORIES.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={clsx(
                'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                selectedCategory === category
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-gray-800/30 text-gray-300 border border-gray-700'
              )}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Cards */}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <button
            className="cyber-glitch-button px-8 py-3 font-medium rounded-full shadow-lg shadow-neon-purple/20 relative group"
          >
            <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
            <div className="cyber-glitch-text relative z-20 flex items-center text-white">
              <Github className="w-5 h-5 inline mr-2" /> View all on GitHub
            </div>
          </button>
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

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
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
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 3).map((tech, i) => (
              <TechTag key={i} tech={tech} />
            ))}
            {technologies.length > 3 && <TechTag tech={`+${technologies.length - 3}`} />}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedProject(id)}
            className="cyber-glitch-button w-full py-3 font-medium rounded-full shadow-lg shadow-neon-purple/20 relative group"
            aria-label={`View details for ${title}`}
          >
            <div className="cyber-glitch-bg absolute inset-0 rounded-full"></div>
            <div className="cyber-glitch-text relative z-20 flex items-center justify-center text-white">
              <Eye className="w-5 h-5 inline mr-2" /> View Project
            </div>
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
            className="fixed md:absolute top-4 right-4 z-50 p-3 rounded-full bg-black/50 text-white backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
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

          <div ref={projectModalRef} className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Overview</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
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

              <div className="md:w-64 space-y-6 mt-6 md:mt-0">
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
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="modal-button w-full py-3 font-medium rounded-lg"
                    >
                      <Eye className="w-5 h-5 inline mr-2" /> Live Demo
                    </a>
                  )}
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-button w-full py-3 font-medium rounded-lg"
                  >
                    <Github className="w-5 h-5 inline mr-2" /> GitHub Repo
                  </a>
                </div>
              </div>
            </div>

            {project.galleryImages && (
              <div className="mt-10">
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
                        <div className="relative aspect-video bg-gray-800">
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${index + 1}`}
                            width={800}
                            height={450}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="bg-black/50 p-2 rounded-full">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
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
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
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