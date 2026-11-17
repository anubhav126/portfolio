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
  Sparkles,
  Milestone,
  BookOpen,
} from 'lucide-react';
import { personalInfo } from '../constants';

const navItems = [
  { label: 'About', href: '#about', icon: Sparkles },
  { label: 'Projects', href: '#projects', icon: Code2 },
  { label: 'Journey', href: '#journey', icon: Milestone },
  { label: 'Articles', href: '#articles', icon: BookOpen },
];

const Navbar = ({ onOpenSearch }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const sections = navItems.map((item) => item.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openResume = () => {
    window.open(personalInfo.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40">
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 border-b border-neutral-200/80 shadow-sm py-3'
            : 'bg-white/80 border-b border-neutral-200/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark with playful hover rotation */}
          <a href="#about" className="flex items-center gap-3 group focus:outline-none">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 via-primary-500 to-primary-400 flex items-center justify-center text-white shadow-sm shadow-primary-500/30"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                <span className="font-serif font-bold text-lg text-neutral-900 group-hover:text-primary-500 transition-colors">
                  Anubhav Adhikari
                </span>
              </div>
              <p className="text-xs text-neutral-500 hidden sm:block">
                Software Engineer • HCLTech
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links with animated active indicator */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/80 p-1.5 rounded-xl border border-neutral-200/60 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors z-10 ${
                    isActive
                      ? 'text-primary-600 font-semibold'
                      : 'text-neutral-700 hover:text-neutral-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenSearch}
              type="button"
              className="flex items-center gap-2 h-[38px] px-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-500 hover:text-neutral-800 text-xs transition-colors shadow-sm group"
              aria-label="Search portfolio"
            >
              <Search className="w-3.5 h-3.5 text-primary-500 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 rounded">
                ⌘K
              </kbd>
            </motion.button>

            {/* Resume Button with energetic hover */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              onClick={openResume}
              type="button"
              className="btn-primary !h-[38px] !px-4 !text-xs font-semibold relative overflow-hidden group shadow-sm shadow-primary-500/20"
            >
              <FileText className="w-3.5 h-3.5 group-hover:rotate-6 transition-transform" />
              <span>Resume</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-5 shadow-md overflow-hidden"
            >
              <div className="flex flex-col gap-1 mb-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-500 font-semibold'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-primary-500" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-neutral-100">
                <button
                  onClick={openResume}
                  type="button"
                  className="btn-secondary !h-10 !w-full !text-xs justify-center"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
