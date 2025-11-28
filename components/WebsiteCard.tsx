import React from 'react';
import { Link } from 'react-router-dom';
import { Website } from '../types';

interface WebsiteCardProps {
  website: Website;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const isInternal = website.url.startsWith('/');

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <img className="w-full h-48 object-cover" src={website.thumbnailUrl} alt={website.title} />
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs uppercase tracking-widest text-indigo-500 font-semibold">{website.category}</span>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 mt-2">{website.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow">{website.description}</p>
        {isInternal ? (
          <Link
            to={website.url}
            className="mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {'\ubc14\ub85c\uac00\uae30'}
          </Link>
        ) : (
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {'\uc571 \uc5f4\uae30'}
          </a>
        )}
      </div>
    </div>
  );
};

export default WebsiteCard;
