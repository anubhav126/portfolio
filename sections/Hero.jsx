'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Cpu,
  Sparkles,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { personalInfo, stats } from '../constants';

const techBadges = [
  { name: 'Java & Spring Boot', color: '#6DB33F' },
  { name: 'Apache Kafka', color: '#E535AB' },
  { name: 'Python & LangChain', color: '#3776AB' },
  { name: 'Vector Databases (RAG)', color: '#8B5CF6' },
  { name: 'React.js & Next.js', color: '#F97316' },
  { name: 'SQL & PostgreSQL', color: '#336791' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'TypeScript', color: '#3178C6' },
];

const Hero = () => {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Tilt Physics for Profile Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 260, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
    setGlarePos({ x: x * 100, y: y * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const openResume = () => {
    window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="about"
      className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-neutral-50 to-neutral-50 dark:from-[#090D16] dark:via-[#090D16] dark:to-[#0B0F19] overflow-hidden transition-colors duration-200"
    >
      {/* Subtle interactive background grid */}
      <div className="absolute inset-0 grid-bg-pattern opacity-35 dark:opacity-20 pointer-events-none" />

      {/* Floating background aura */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-10 right-1/4 w-[420px] h-[260px] bg-gradient-to-br from-primary-100/60 to-primary-200/30 dark:from-primary-950/40 dark:to-primary-900/10 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability & Education Badges */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium shadow-sm cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Software Engineer • 3+ Yrs Experience</span>
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-medium shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-primary-500" />
            <span>Ramaiah University (CGPA 8.6/10)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-medium shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-primary-500" />
            <span>Bengaluru, India</span>
          </div>
        </motion.div>

        {/* Main Display Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display-1 text-neutral-900 dark:text-white tracking-tight mb-4 sm:mb-5 text-3xl sm:text-4xl lg:text-5xl"
            >
              Architecting scalable event-driven systems &{' '}
              <span className="relative inline-block text-primary-500 dark:text-primary-400">
                <span className="relative z-10">intelligent RAG</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  className="absolute bottom-1.5 left-0 h-3 bg-primary-100 dark:bg-primary-950/80 -z-0 rounded-sm"
                />
              </span>
              {' '}pipelines.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-body-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base"
            >
              Hello! I'm <strong className="text-neutral-900 dark:text-white font-semibold">{personalInfo.name}</strong>, a Software Engineer with 3 years of experience specializing in high-throughput event-driven systems using <strong className="text-neutral-900 dark:text-white font-semibold">Java, Spring Boot, and Apache Kafka</strong>, Python-based <strong className="text-neutral-900 dark:text-white font-semibold">RAG assistants with LangChain & vector databases</strong>, scalable test automation across 1,000+ workflows, and modern full-stack web applications with <strong className="text-neutral-900 dark:text-white font-semibold">React & Next.js</strong>.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-8 sm:mb-10"
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="btn-primary shadow-sm shadow-primary-500/25 group !h-10 sm:!h-11 !text-xs sm:!text-sm"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={openResume}
                className="btn-secondary group !h-10 sm:!h-11 !text-xs sm:!text-sm dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200"
              >
                <FileText className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                <span>View Resume</span>
              </motion.button>
            </motion.div>

            {/* Quick Tech Highlights with playful physics */}
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold mb-3">
                Core Technical Skills (From Resume)
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techBadges.map((t, idx) => (
                  <motion.span
                    key={t.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.35 + idx * 0.04 }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      boxShadow: `0 6px 16px -2px ${t.color}33`,
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-sm cursor-default transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: 3D Perspective Tilt Card */}
          <div className="lg:col-span-5 perspective-[1000px] w-full">
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="portfolio-card p-5 sm:p-7 md:p-8 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 relative overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Dynamic Interactive Cursor Glare Effect */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(249, 115, 22, 0.12), transparent 70%)`,
                  opacity: glarePos.opacity,
                }}
              />

              {/* Card Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-5 relative z-10">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-400 text-white flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    AA
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white leading-tight">
                      Software Engineer
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Distributed & AI Systems • Bengaluru</p>
                  </div>
                </div>
                <span className="badge-orange flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-spin" />
                  3 Yrs Exp
                </span>
              </div>

              {/* Event-Driven Architecture Highlight Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-3.5 sm:p-4 border border-neutral-200/80 dark:border-neutral-700/60 mb-5 relative z-10 overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Layers className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-0.5">
                      Production Architecture & Scale
                    </h4>
                    <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                      Kafka & Spring Boot Distributed Pipelines
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                      Architected Kafka consumers ingesting 3–5 topics into relational SQL databases, boosting data processing speed by 15–25%.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Key Competencies List Directly from Resume */}
              <div className="space-y-2.5 mb-6 text-xs text-neutral-700 dark:text-neutral-300 relative z-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Java, Spring Boot & Apache Kafka Event Streams</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Python RAG Assistant using LangChain & Vector DBs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Python Test Automation covering 1,000+ workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Full-Stack Web with React.js, Next.js & Appwrite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>IEEE Published Author (CKD ML Model: 97.5% Accuracy)</span>
                </div>
              </div>

              {/* Card Footer action */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between relative z-10">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">IEEE & Hashnode Publications</span>
                <a
                  href="#articles"
                  className="btn-text group/link"
                >
                  <span>View Research & Articles</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row with interactive hover bounce */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
          {stats.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="portfolio-card p-4 sm:p-5 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-left hover:border-primary-300 dark:hover:border-primary-500/50 relative overflow-hidden group shadow-sm hover:shadow-md transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl sm:text-3xl font-bold font-serif text-neutral-900 dark:text-white mb-1">
                <span className="text-primary-500 dark:text-primary-400">{s.value}</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                {s.label}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {s.hint}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
