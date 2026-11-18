'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Terminal,
  GraduationCap,
  GitPullRequest,
  BookOpen,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';
import { journeyTimeline } from '../constants';

const yearIcons = {
  'Nov 2023 – Present': Layers,
  '2024': Award,
  'Aug 2019 – May 2023': GraduationCap,
  '2022 – 2023': GitPullRequest,
};

const World = () => {
  return (
    <section id="journey" className="py-16 md:py-24 bg-white border-y border-neutral-200/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>02 • Career Timeline & Milestones</span>
          </div>
          <h2 className="font-display-2 text-neutral-900 tracking-tight">
            The Engineering Journey.
          </h2>
          <p className="font-body-lg text-neutral-600 mt-2">
            From academic excellence at Ramaiah University (CGPA 8.6/10) to distributed event streaming at HCLTech and published IEEE research.
          </p>
        </div>

        {/* Timeline Stream with animated vertical beam */}
        <div className="relative ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-12">
          {/* Animated vertical gradient track */}
          <div className="absolute left-0 sm:left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-primary-500 via-primary-300 to-neutral-200" />

          {journeyTimeline.map((item, idx) => {
            const Icon = yearIcons[item.year] || Building2;
            const isInProgress = item.status === 'In Progress';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Year Marker on Left (Desktop) */}
                <div className="hidden sm:block absolute -left-[180px] top-1 text-right w-32">
                  <span className="font-serif font-bold text-base text-neutral-900 group-hover:text-primary-500 transition-colors">
                    {item.year}
                  </span>
                  <div className="text-[11px] font-medium text-neutral-400">
                    {item.badge}
                  </div>
                </div>

                {/* Animated Timeline Node Point */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-125 z-10 ${
                    isInProgress
                      ? 'border-primary-500 text-primary-500 shadow-sm shadow-primary-500/30'
                      : 'border-neutral-300 text-neutral-500 group-hover:border-primary-400 group-hover:text-primary-500'
                  }`}
                >
                  {isInProgress ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500" />
                    </span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-primary-500 transition-colors" />
                  )}
                </div>

                {/* Milestone Card with interactive hover */}
                <motion.div
                  whileHover={{ y: -4, x: 2 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="portfolio-card p-6 bg-neutral-50/70 hover:bg-white border border-neutral-200 relative overflow-hidden group/card shadow-sm hover:shadow-md transition-all"
                >
                  {/* Left accent bar on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-400 opacity-0 group-hover/card:opacity-100 transition-opacity" />

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    {/* Mobile year badge */}
                    <span className="sm:hidden badge-orange">{item.year}</span>

                    {/* Status indicator */}
                    {isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        In Progress
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Completed
                      </span>
                    )}

                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        {item.organization}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading-2 text-neutral-900 group-hover/card:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-body text-neutral-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Skills / Tech Tags with hover pop */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="badge-neutral text-[11px] !py-0.5 !px-2 group-hover/card:border-neutral-300 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default World;
