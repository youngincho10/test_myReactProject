
import React from 'react';
import type { Player } from '../types';

interface SelectionScreenProps {
  players: Player[];
  onSelect: (player: Player) => void;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({ players, onSelect }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">날두냐 메시냐</h1>
        <p className="text-lg text-gray-300">둘 중 하나를 지옥으로 보내야 한다면?</p>
        <p className="text-lg text-amber-300 font-semibold">🔥 누구를 선택하시겠습니까? 🔥</p>
      </header>
      <div className="w-full space-y-6">
        {players.map((player) => (
          <div
            key={player.id}
            onClick={() => onSelect(player)}
            className="w-full bg-white/5 border border-white/20 rounded-3xl p-6 backdrop-blur-md cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105"
          >
            <div className="flex flex-col items-center space-y-4">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg ${player.logoBgColor}`}
              >
                <span className={`text-5xl font-black ${player.logoTextColor}`}>{player.logo}</span>
              </div>
              <h2 className="text-3xl font-bold">{player.name}</h2>
              <div className="w-full bg-black/20 rounded-xl p-3 text-center">
                <p className="text-gray-200">{player.country}</p>
                <p className="text-gray-300 text-sm">{player.ballonDors}회 발롱도르</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectionScreen;
