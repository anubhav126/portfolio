'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  FileText,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  BookOpen,
} from 'lucide-react';
import { personalInfo, socials } from '../constants';
import PeerlistIcon from './PeerlistIcon';
import ThemeToggle from './ThemeToggle';

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  'Twitter / X': Twitter,
  Hashnode: BookOpen,
  Peerlist: PeerlistIcon,
};

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-[#070A11] text-neutral-900 dark:text-neutral-100 border-t border-neutral-200/80 dark:border-neutral-800 py-10 sm:py-12 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-neutral-200/80 dark:border-neutral-800">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-primary-500/25"
              >
                AA
              </motion.div>
              <span className="font-serif font-bold text-lg text-neutral-900 dark:text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              Software Engineer with 3+ years of experience specializing in scalable event-driven systems using Java, Spring Boot, and Apache Kafka, Python RAG assistants, and modern web applications with Next.js & React.
            </p>
          </div>

          {/* Direct Email & Resume Links */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-all border border-neutral-200 dark:border-neutral-800 shadow-sm"
            >
              <Mail className="w-4 h-4 text-primary-500" />
              <span>{personalInfo.email}</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !h-10 !px-4 !text-xs font-semibold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </motion.a>

            <ThemeToggle />
          </div>
        </div>

        {/* Social Channels Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-6 sm:pt-8">
          {socials.map((s) => {
            const Icon = socialIcons[s.name] || ExternalLink;
            return (
              <motion.a
                key={s.name}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-500/50 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-950/60 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white truncate">
                      {s.name}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                      {s.handle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 flex-shrink-0 transition-colors" />
              </motion.a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
