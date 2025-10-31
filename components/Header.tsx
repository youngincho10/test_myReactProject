import React from 'react';
import { categories } from '../constants';

interface HeaderProps {
  onOpenCreateModal: () => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const navCategories = ['전체', ...categories];

const Header: React.FC<HeaderProps> = ({ onOpenCreateModal, activeCategory, onSelectCategory }) => {
  return (
    <header className="sticky top-0 z-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-20">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            나의 웹사이트
          </h1>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 transition-colors"
          >
            <PlusIcon />
            새 사이트 만들기
          </button>
        </div>
        <nav className="flex items-center space-x-2 sm:space-x-4 border-t border-slate-200 dark:border-slate-700">
          {navCategories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`py-3 px-2 sm:px-3 text-sm sm:text-base font-medium transition-colors duration-200 border-b-2 
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