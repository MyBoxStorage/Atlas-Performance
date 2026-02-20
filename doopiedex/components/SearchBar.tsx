'use client';

import React, { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID or Species..."
          className="flex-1 px-4 py-2 rounded-lg border-2 border-rose-300/60 bg-white/95 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/30 transition-all duration-200 ease-in-out placeholder:text-slate-400 text-slate-700"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-all duration-200 ease-in-out font-semibold hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </button>
      </div>
    </form>
  );
}

