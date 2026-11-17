'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Code2,
  BookOpen,
  Milestone,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { projects, articles, journeyTimeline } from '../constants';

const SearchDialog = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const inputRef = useRef(null);

  // Build unified search index
  const searchableItems = useMemo(() => {
    const list = [];

    // Projects
    projects.forEach((p) => {
      list.push({
        type: 'Project',
        id: p.id,
        title: p.title,
        subtitle: `${p.category} • ${p.technologies.slice(0, 3).join(', ')}`,
        icon: Code2,
        url: `#projects`,
        externalUrl: p.liveUrl || p.repoUrl,
        keywords: [p.title, p.category, ...p.technologies, p.description].join(' ').toLowerCase(),
      });
    });

    // Articles
    articles.forEach((a) => {
      list.push({
        type: 'Article',
        id: a.id,
        title: a.title,
        subtitle: `${a.category} • ${a.readTime}`,
        icon: BookOpen,
        url: `#articles`,
        externalUrl: a.url,
        keywords: [a.title, a.category, a.summary].join(' ').toLowerCase(),
      });
    });

    // Journey
    journeyTimeline.forEach((j, i) => {
      list.push({
        type: 'Journey',
        id: `journey-${i}`,
        title: `${j.year}: ${j.title}`,
        subtitle: `${j.organization} • ${j.location}`,
        icon: Milestone,
        url: `#journey`,
        externalUrl: null,
        keywords: [j.year, j.title, j.organization, j.description, ...j.tags].join(' ').toLowerCase(),
      });
    });

    return list;
  }, []);

  // Filter items based on query and category
  const filteredItems = useMemo(() => {
    let result = searchableItems;
    if (activeCategory !== 'All') {
      result = result.filter((item) => item.type === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (item) => item.title.toLowerCase().includes(q) || item.keywords.includes(q)
      );
    }
    return result.slice(0, 8);
  }, [searchableItems, query, activeCategory]);

  const handleSelect = useCallback((item) => {
    onClose();
    if (item.externalUrl && !item.url.startsWith('#')) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
    } else if (item.url) {
      const element = document.querySelector(item.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onClose]);

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation & global ⌘K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, handleSelect]);

  if (!isOpen) return null;

  const categories = ['All', 'Project', 'Article', 'Journey'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop (lightweight overlay, zero repaint lag) */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-neutral-900/50 transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 gap-3">
            <Search className="w-5 h-5 text-primary-500 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search projects, system designs, avionics..."
              className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-md">
              ESC
            </kbd>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-neutral-50 border-b border-neutral-200 overflow-x-auto text-xs">
            <span className="text-neutral-400 font-medium mr-1">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-[340px] overflow-y-auto p-2">
            {filteredItems.length === 0 ? (
              <div className="py-10 text-center text-neutral-500">
                <p className="text-sm">No matching items found for "{query}".</p>
                <p className="text-xs text-neutral-400 mt-1">
                  Try searching for "Next.js", "Airbus", "Reverse Proxy", or "React".
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary-100/60 text-neutral-900 border border-primary-200'
                          : 'hover:bg-neutral-50 text-neutral-700 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? 'bg-primary-500 text-white'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-neutral-900 truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 uppercase tracking-wider">
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-primary-500 pl-2">
                        {item.externalUrl ? (
                          <ExternalLink className="w-4 h-4 opacity-70" />
                        ) : (
                          <ArrowRight className="w-4 h-4 opacity-70" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 border-t border-neutral-200 text-[11px] text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white border border-neutral-200 rounded">↑</kbd>
                <kbd className="px-1 bg-white border border-neutral-200 rounded">↓</kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 bg-white border border-neutral-200 rounded">↵</kbd>
                <span>to select</span>
              </span>
            </div>
            <span>Press <kbd className="px-1 bg-white border border-neutral-200 rounded">ESC</kbd> to exit</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchDialog;
