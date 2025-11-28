
import React from 'react';
import MovieCard from './components/MovieCard';

const App: React.FC = () => {
  return (
    <main className="bg-gray-900 min-h-screen w-full flex items-center justify-center p-4 font-sans">
      <MovieCard />
    </main>
  );
};

export default App;
