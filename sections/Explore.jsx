'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ExternalLink,
  Github,
  ChevronRight,
  X,
  CheckCircle2,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { projects } from '../constants';

const categories = ['All', 'Full-Stack', 'Backend & Systems', 'AI & Full-Stack'];

const Explore = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openProjectModal = (proj) => {
    setSelectedProject(proj);
    setActiveGalleryIndex(0);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>01 • Production Architecture & Systems</span>
            </div>
            <h2 className="font-display-2 text-neutral-900 tracking-tight">
              Featured Projects & Systems.
            </h2>
            <p className="font-body-lg text-neutral-600 mt-2 max-w-xl">
              From enterprise cloud storage to multi-process reverse proxies and commercial avionics software.
            </p>
          </div>

          {/* Fluid Sliding Category Filter Pills with layoutId */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-neutral-200 shadow-sm relative">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  type="button"
                  className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-colors z-10 ${
                    isSelected
                      ? 'text-white font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-primary-500 rounded-xl shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid with spring entrance and smooth hover */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="portfolio-card flex flex-col justify-between overflow-hidden group bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div>
                  {/* Image Preview Container */}
                  <div
                    onClick={() => openProjectModal(project)}
                    className="relative aspect-video w-full bg-neutral-100 overflow-hidden cursor-pointer border-b border-neutral-100"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-108 transition-transform duration-500 ease-out"
                      priority={idx < 2}
                    />
                    <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-4">
                      <span className="text-xs text-white font-medium flex items-center gap-1.5 bg-neutral-900/90 px-3 py-1.5 rounded-lg shadow-sm">
                        <Maximize2 className="w-3.5 h-3.5 text-primary-400" />
                        View Architecture & Specs
                      </span>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="badge-orange">{project.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-primary-500 uppercase tracking-wider">
                        {project.tag}
                      </span>
                    </div>

                    <h3
                      onClick={() => openProjectModal(project)}
                      className="font-heading-2 text-neutral-900 hover:text-primary-500 transition-colors cursor-pointer mb-2.5 line-clamp-1"
                    >
                      {project.title}
                    </h3>

                    <p className="font-body text-neutral-600 line-clamp-3 mb-4 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="badge-neutral text-[11px] !py-0.5 !px-2 group-hover:border-neutral-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="badge-neutral text-[11px] !py-0.5 !px-2">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => openProjectModal(project)}
                    type="button"
                    className="btn-text text-xs group/btn"
                  >
                    <span>Details & Specs</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-white border border-transparent hover:border-neutral-200 transition-colors shadow-sm"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}

                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary !h-[34px] !px-3 !text-xs group/live"
                      >
                        <span>Live App</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProjectModal}
              className="fixed inset-0 bg-neutral-900/60 transition-opacity"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
                <div>
                  <span className="badge-orange mb-1">{selectedProject.category}</span>
                  <h3 className="font-heading-2 text-neutral-900">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={closeProjectModal}
                  className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto p-6 space-y-6">
                {/* Active Image Showcase */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div>
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
                      <Image
                        src={selectedProject.gallery[activeGalleryIndex].src}
                        alt={selectedProject.gallery[activeGalleryIndex].caption}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute bottom-3 left-3 bg-neutral-900/90 px-3 py-1.5 rounded-lg text-xs text-white">
                        {selectedProject.gallery[activeGalleryIndex].caption}
                      </div>
                    </div>

                    {/* Thumbnail Selector */}
                    {selectedProject.gallery.length > 1 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                        {selectedProject.gallery.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveGalleryIndex(i)}
                            className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                              activeGalleryIndex === i
                                ? 'border-primary-500 scale-105 shadow-sm'
                                : 'border-neutral-200 opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Image
                              src={img.src}
                              alt={img.caption}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Description & Engineering Highlights */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                    Overview
                  </h4>
                  <p className="font-body text-neutral-700 leading-relaxed text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">
                    Technical Specifications & Architectural Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                    Technologies & Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t) => (
                      <span key={t} className="badge-orange !px-3 !py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-between px-6 py-4 bg-neutral-50 border-t border-neutral-200">
                <button onClick={closeProjectModal} className="btn-tertiary !h-10 !text-xs">
                  Close Preview
                </button>

                <div className="flex items-center gap-2">
                  {selectedProject.repoUrl && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-tertiary !h-10 !text-xs"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Source Code</span>
                    </a>
                  )}

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !h-10 !text-xs"
                    >
                      <span>Open Live Application</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Explore;
