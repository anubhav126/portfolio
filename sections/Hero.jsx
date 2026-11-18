'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  MapPin,
  GraduationCap,
  Briefcase,
} from 'lucide-react';
import { personalInfo, stats } from '../constants';
import ArchitectureTerminal from '../components/ArchitectureTerminal';

const techBadges = [
  { name: 'Java & Spring Boot', color: '#6DB33F' },
  { name: 'Apache Kafka', color: '#E535AB' },
  { name: 'Python & LangChain', color: '#3776AB' },
  { name: 'Vector DBs (RAG)', color: '#8B5CF6' },
  { name: 'Next.js & React', color: '#F97316' },
  { name: 'PostgreSQL & SQL', color: '#336791' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'TypeScript', color: '#3178C6' },
];

const Hero = () => {
  const openResume = () => {
    window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="about"
      className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 bg-white dark:bg-[#090D16] transition-colors duration-200 border-b border-neutral-200/70 dark:border-neutral-800"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability & Education Badges */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-400 text-xs font-medium cursor-default">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>Software Engineer • 3+ Yrs Experience</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-medium">
            <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
            <span>Ramaiah University (CGPA 8.6/10)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" />
            <span>Bengaluru, India</span>
          </div>
        </motion.div>

        {/* Main Display Headline & Architectural Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-serif text-neutral-900 dark:text-white tracking-tight mb-4 sm:mb-5 text-3xl sm:text-4xl lg:text-[42px] leading-[1.18]"
            >
              Building distributed event systems, intelligent search & cloud platforms.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base max-w-xl"
            >
              Hi, I’m <strong className="text-neutral-900 dark:text-white font-semibold">{personalInfo.name}</strong>. I specialize in architecting high-throughput event consumers using <strong className="text-neutral-900 dark:text-white font-semibold">Java, Spring Boot, and Apache Kafka</strong>, building Python-based <strong className="text-neutral-900 dark:text-white font-semibold">RAG assistants with LangChain & vector databases</strong>, test automation across 1,000+ workflows, and responsive web apps with <strong className="text-neutral-900 dark:text-white font-semibold">Next.js & React</strong>.
            </motion.p>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18 }}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-8"
            >
              <a
                href="#projects"
                className="btn-primary shadow-sm !h-10 sm:!h-11 !text-xs sm:!text-sm group"
              >
                <span>View Systems & Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={openResume}
                type="button"
                className="btn-secondary !h-10 sm:!h-11 !text-xs sm:!text-sm dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-200 group"
              >
                <FileText className="w-4 h-4 text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Core Tech Stack Badges */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-semibold mb-2.5">
                Core Engineering Stack
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techBadges.map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-default"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive System Architecture Blueprint Terminal */}
          <div className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <ArchitectureTerminal />
            </motion.div>
          </div>
        </div>

        {/* Engineering Performance & Impact Specs Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200/80 dark:border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((s, index) => (
              <div key={index} className="flex flex-col">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white tracking-tight">
                  <span className="text-primary-600 dark:text-primary-400">{s.value}</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-1">
                  {s.label}
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-snug">
                  {s.hint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
