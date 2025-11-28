import React, { useState } from 'react';
import type { Player } from './types';
import { PLAYERS } from './constants';
import SelectionScreen from './components/SelectionScreen';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleReset = () => {
    setSelectedPlayer(null);
  };

  return (
    <main
      className="relative min-h-screen w-full text-white flex items-center justify-center p-4 font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('https://lh3.googleusercontent.com/gg-dl/ABS2GSlu8FgORSVx3pqL-JgGqY1gOT1DTFKmJ3RQfK3x9sdZdyRe5JdQffg6tp76fALlw8RD08E-KlHZHO60zQeykv4M0VCB03L8nyju1apIfxbAqxrBZfnkbnLF0c34EFZBInqcRdz8FcKaZyX16JPgYpBgRRq0mgww-T2wBZerO0ZqlxqaMQ=s1024-rj')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0c24]/90 via-[#3d1933]/90 to-[#5e2b2a]/90 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md mx-auto">
        {selectedPlayer ? (
          <ResultScreen selectedPlayer={selectedPlayer} onReset={handleReset} />
        ) : (
          <SelectionScreen players={PLAYERS} onSelect={handleSelectPlayer} />
        )}
      </div>
    </main>
  );
};

export default App;
