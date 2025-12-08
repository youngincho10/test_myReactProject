import React from 'react';

interface ProfileCardProps {
  name: string;
  likes: string[];
  introduction: string;
  imageUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, likes, introduction, imageUrl }) => {
  return (
    <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 duration-500 ease-in-out">
      <div className="relative">
        <img className="w-full h-64 object-cover object-center" src={imageUrl} alt={`${name} 프로필`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-4xl font-bold text-white tracking-wide">{name}</h1>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">좋아하는 것</h2>
          <div className="flex flex-wrap gap-2">
            {likes.map((like) => (
              <span
                key={like}
                className="px-4 py-1.5 text-sm font-semibold text-indigo-800 bg-indigo-100 dark:bg-indigo-900 dark:text-indigo-200 rounded-full transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-800 cursor-default"
              >
                {like}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700"></div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">자기소개</h2>
          <blockquote className="border-l-4 border-indigo-500 pl-4">
            <p className="text-gray-700 dark:text-gray-300 italic text-lg">"{introduction}"</p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
