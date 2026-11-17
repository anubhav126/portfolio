'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  BookOpen,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { articles } from '../constants';

const Insights = () => {
  return (
    <section id="articles" className="py-16 md:py-24 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 • Technical Publications</span>
            </div>
            <h2 className="font-display-2 text-neutral-900 tracking-tight">
              Engineering Deep Dives & Articles.
            </h2>
            <p className="font-body-lg text-neutral-600 mt-2 max-w-xl">
              Exploring low-level internals, scalable system designs, and computer networking concepts published on Hashnode.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://anubhav1206.hashnode.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary self-start md:self-auto group"
          >
            <span>View All on Hashnode</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Articles Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {articles.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="portfolio-card overflow-hidden bg-white border border-neutral-200 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Header Image Preview */}
                <div className="relative aspect-[21/9] w-full bg-neutral-100 overflow-hidden border-b border-neutral-100">
                  <Image
                    src={art.coverImage}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge-orange">{art.category}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-neutral-900/90 px-2.5 py-1 rounded-md text-[11px] text-white flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3 h-3 text-primary-400" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    {art.date}
                  </div>

                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-primary-500 transition-colors"
                  >
                    <h3 className="font-heading-2 text-neutral-900 leading-snug mb-3 line-clamp-2">
                      {art.title}
                    </h3>
                  </a>

                  <p className="font-body text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 py-4 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-primary-500" />
                  Hashnode Publication
                </span>

                <a
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-text font-semibold text-xs flex items-center gap-1 group/btn"
                >
                  <span>Read Full Article</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
