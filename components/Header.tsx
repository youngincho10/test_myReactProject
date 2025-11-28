import React from 'react';
import { categories } from '../constants';

interface HeaderProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const navCategories = ['\uc804\uccb4', ...categories];

const Header: React.FC<HeaderProps> = ({ activeCategory, onSelectCategory }) => {
  return (
    <header className="bg-slate-50 dark:bg-slate-900 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-500 font-semibold">AI Studio</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {'\uc990\uaca8\ucc3e\ub294 AI \uc2a4\ud29c\ub514\uc624 \uc571 \ubaa8\uc74c\uc9d1'}
          </h1>
        </div>
        <nav className="flex items-center justify-center flex-wrap gap-2 border-t border-slate-200 dark:border-slate-700 py-4">
          {navCategories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`py-2 px-4 text-sm sm:text-base font-medium transition-colors duration-200 border-b-2 
                ${
                  activeCategory === category
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
