
import React from 'react';
import type { Player } from '../types';

interface ResultScreenProps {
  selectedPlayer: Player;
  onReset: () => void;
}

const HeartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-24 w-24 text-pink-300/50"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);


const ResultScreen: React.FC<ResultScreenProps> = ({ selectedPlayer, onReset }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 bg-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-md animate-fade-in">
      <HeartIcon />
      <h1 className="text-3xl font-bold">생명은 다 소중합니다</h1>

      <div className="w-full bg-black/20 rounded-xl p-4 text-center">
        <p className="text-gray-200">
          <span className="font-semibold">{selectedPlayer.name}</span>을 선택하셨군요...
        </p>
        <p className="text-gray-300">하지만 우리는 누구도 지옥에 보낼 수 없습니다</p>
      </div>

      <div className="w-full bg-black/20 rounded-xl p-4 text-center border border-purple-400/30">
        <p className="text-gray-200 leading-relaxed">
        모든 축구 선수들은 자신만의 방식으로<br /> 세계를 감동시켰습니다.<br />
        비교가 아닌 존중과 감사를 전해요! ✨
        </p>
      </div>

      <button
        onClick={onReset}
        className="px-8 py-3 bg-white text-gray-900 font-bold rounded-full transition-transform duration-200 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        다시 선택하기
      </button>
    </div>
  );
};

export default ResultScreen;
