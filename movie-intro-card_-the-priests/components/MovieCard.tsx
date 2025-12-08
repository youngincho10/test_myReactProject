
import React from 'react';

const FilmIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v2H4V4zm0 4h16v12H4V8zm2 2v2h2v-2H6zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H6zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"></path>
  </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
  </svg>
);

const MovieCard: React.FC = () => {
  const movie = {
    title: '검은 사제들',
    englishTitle: 'The Priests',
    year: 2015,
    director: '장재현',
    cast: ['김윤석', '강동원'],
    genres: ['공포', '스릴러', '미스터리'],
    synopsis: '뺑소니 교통사고 이후 의문의 증상에 시달리는 한 소녀. 잦은 돌출 행동으로 교단의 눈 밖에 난 김신부는 모두의 반대와 의심 속, 소녀를 구하기 위한 자신만의 계획을 준비한다.',
    imageUrl: 'https://i.namu.wiki/i/DbAqLOoTaDGuJUwwqhiYDC1egqLUfy0kZy-gCAviWnBjG_3dexIeocTl_CTmdCycZOVmpKzKJcntBF1LY_pZ5asVv3iIzYX-BaB5MfLNmhQhik00Q1jebo6lrvzpVmDApcR-vDMEbsxcPGruKN6_iQ.webp',
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-2xl shadow-black/50 overflow-hidden max-w-sm md:max-w-4xl w-full mx-auto my-8 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img 
            className="h-96 w-full object-cover md:h-full md:w-64" 
            src={movie.imageUrl} 
            alt={`${movie.title} 포스터`} 
          />
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-wide text-sm text-red-500 font-semibold">{movie.year}</div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-white">{movie.title}</h1>
            <h2 className="text-lg text-gray-400 mb-4">{movie.englishTitle}</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span key={genre} className="px-3 py-1 bg-gray-700 text-gray-200 text-xs font-semibold rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            <p className="mt-2 text-gray-300 leading-relaxed">{movie.synopsis}</p>

            <div className="mt-6 space-y-4 text-gray-400">
              <div className="flex items-center">
                <FilmIcon className="w-5 h-5 mr-3 text-red-500" />
                <div>
                  <span className="font-semibold text-gray-200">감독:</span> {movie.director}
                </div>
              </div>
              <div className="flex items-start">
                <UserIcon className="w-5 h-5 mr-3 text-red-500 mt-1" />
                <div>
                  <span className="font-semibold text-gray-200">주연:</span>
                  <ul className="list-inside list-disc ml-1">
                    {movie.cast.map((actor) => (
                      <li key={actor}>{actor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
