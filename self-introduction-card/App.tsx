import React from 'react';
import ProfileCard from './components/ProfileCard';

const App: React.FC = () => {
  const profileData = {
    name: '케빈',
    likes: ['게임', '축구', '맨유', '코딩'],
    introduction: '케빈은 케빈이다',
    imageUrl: 'https://file2.nocutnews.co.kr/newsroom/image/2023/06/21/202306210855316394_0.jpg',
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <ProfileCard
        name={profileData.name}
        likes={profileData.likes}
        introduction={profileData.introduction}
        imageUrl={profileData.imageUrl}
      />
    </main>
  );
};

export default App;
