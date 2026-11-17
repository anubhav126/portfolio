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

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  'Twitter / X': Twitter,
  Hashnode: BookOpen,
  Peerlist: PeerlistIcon,
};

const Footer = () => {
  return (
    <footer className="bg-neutral-50 text-neutral-900 border-t border-neutral-200/80 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-neutral-200/80">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-primary-500/25"
              >
                AA
              </motion.div>
              <span className="font-serif font-bold text-lg text-neutral-900">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs text-neutral-600 max-w-md leading-relaxed">
              Software Engineer at <span className="text-primary-600 font-semibold">HCLTech</span>. Building scalable web platforms, distributed systems, and aerospace avionics software for the Airbus A350-1000F.
            </p>
          </div>

          {/* Direct Email & Resume Links */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-xs font-medium text-neutral-800 transition-all border border-neutral-200 shadow-sm"
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
          </div>
        </div>

        {/* Social Channels Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-8">
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
                className="p-3.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-primary-300 text-neutral-600 hover:text-neutral-900 transition-all shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 group-hover:bg-primary-100 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-neutral-600 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-semibold text-neutral-900 truncate">
                      {s.name}
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">
                      {s.handle}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-primary-500 flex-shrink-0 transition-colors" />
              </motion.a>
            );
          })}
        </div>

        {/* Bottom Bar (Duplicate back to top button REMOVED) */}
        <div className="pt-6 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <span className="text-[11px] text-neutral-400">
            Engineered with Next.js & Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
