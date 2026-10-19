'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export default function SearchAndFilter({
  searchQuery,
  onSearchChange,
  categories,
  activeCategory,
  onCategoryChange,
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Search Bar */}
      <div className="liquid-glass rounded-2xl px-4 py-2.5 flex items-center gap-3 focus-within:border-sky-400/60">
        <Search className="w-4 h-4 text-sky-400 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search links, 4K wallpapers, tools..."
          aria-label="Search links"
          className="w-full bg-transparent text-xs sm:text-sm placeholder:opacity-50 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-3.5 h-3.5 opacity-70" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div
        role="tablist"
        aria-label="Link Categories"
        className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-sky-400 text-[#071638] shadow-lg shadow-sky-400/25'
                  : 'glass-pill opacity-80 hover:opacity-100'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

