import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>&copy; {new Date().getFullYear()} 케빈빈의 사이트모음. All Rights Reserved.</p>
        <p className="mt-2">학교 주소: 경기도 성남시 분당구 하오개로 351번길 4</p>
      </div>
    </footer>
  );
};

export default Footer;