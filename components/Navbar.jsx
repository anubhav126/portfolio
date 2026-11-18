'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  FileText,
  Code2,
  ExternalLink,
  User,
  Milestone,
  BookOpen,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react';
import { personalInfo } from '../constants';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'About', href: '#about', icon: User, desc: 'Overview & Systems Architecture' },
  { label: 'Projects', href: '#projects', icon: Code2, desc: 'Production Systems & Architecture' },
  { label: 'Journey', href: '#journey', icon: Milestone, desc: 'Timeline & IEEE Publication' },
  { label: 'Articles', href: '#articles', icon: BookOpen, desc: 'Technical Writing & System Design' },
];

const Navbar = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 180;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key or desktop resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const openResume = () => {
    window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40">
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#090D16]/95 border-b border-neutral-200/80 dark:border-neutral-800 shadow-sm py-2.5 sm:py-3'
            : 'bg-white/80 dark:bg-[#090D16]/80 border-b border-neutral-200/40 dark:border-neutral-800/60 py-3 sm:py-4'
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark with playful hover rotation */}
          <a href="#about" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-primary-500 via-primary-500 to-primary-400 flex items-center justify-center text-white shadow-sm shadow-primary-500/30 flex-shrink-0"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-5 sm:h-5"
              >
                <path
                  d="M12 2L2 22H22L12 2Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="14" r="3" fill="#F97316" />
              </svg>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base sm:text-lg text-neutral-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  Anubhav Adhikari
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Software Engineer • Distributed Systems
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links with animated active indicator */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 dark:bg-neutral-900/80 p-1.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors z-10 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenSearch}
              type="button"
              className="flex items-center justify-center gap-2 h-[38px] px-2.5 sm:px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-100 text-xs transition-colors shadow-sm group"
              aria-label="Search portfolio"
            >
              <Search className="w-3.5 h-3.5 text-primary-500 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded">
                ⌘K
              </kbd>
            </motion.button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Resume Button (Desktop & Tablet only in header; Mobile gets dedicated CTA in menu) */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              onClick={openResume}
              type="button"
              className="hidden sm:inline-flex btn-primary !h-[38px] !px-3.5 !text-xs font-semibold relative overflow-hidden group shadow-sm shadow-primary-500/20"
            >
              <FileText className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Dimmed backdrop to close on outside click */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-neutral-900/30 dark:bg-black/60 backdrop-blur-sm -z-10 md:hidden"
              />

              {/* Elevated Modern Drawer */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="md:hidden border-t border-neutral-200/80 dark:border-neutral-800 bg-white/98 dark:bg-[#0B0F19]/98 backdrop-blur-xl px-4 pt-3.5 pb-6 shadow-2xl overflow-hidden"
              >
                {/* Navigation items list */}
                <div className="space-y-1.5 mb-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.substring(1);
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-950/40 border border-primary-200/80 dark:border-primary-800/60 shadow-sm'
                            : 'hover:bg-neutral-100/80 dark:hover:bg-neutral-800/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                              isActive
                                ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/30'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-500 group-hover:bg-primary-50 dark:group-hover:bg-neutral-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <div
                              className={`text-sm font-semibold leading-tight ${
                                isActive
                                  ? 'text-primary-600 dark:text-primary-400'
                                  : 'text-neutral-800 dark:text-neutral-200 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                              }`}
                            >
                              {item.label}
                            </div>
                            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center pl-2">
                          {isActive ? (
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all" />
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Drawer Footer Actions */}
                <div className="pt-3 border-t border-neutral-200/80 dark:border-neutral-800/80 space-y-3">
                  {/* Primary View Full Resume CTA Button */}
                  <button
                    onClick={openResume}
                    type="button"
                    className="btn-primary !h-11 !w-full !rounded-xl !text-sm font-semibold justify-center shadow-md shadow-primary-500/20"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Full Resume</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>

                  {/* Quick Connect Channels in Drawer */}
                  <div className="flex items-center justify-between pt-1 px-1 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>Connect & Links</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={personalInfo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={personalInfo.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
