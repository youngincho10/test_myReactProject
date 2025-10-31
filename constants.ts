import { Website } from './types';

export const categories = ['게임', '축구', '음식'];

export const initialWebsites: Website[] = [
  {
    id: 'site-1',
    title: '게임 리뷰 사이트',
    description: '최신 게임 리뷰와 공략을 다루는 사이트입니다.',
    thumbnailUrl: 'https://picsum.photos/seed/game1/500/300',
    category: '게임',
  },
  {
    id: 'site-2',
    title: '축구 팬 커뮤니티',
    description: '국내외 축구 소식과 팬들의 이야기를 나누는 공간입니다.',
    thumbnailUrl: 'https://picsum.photos/seed/soccer1/500/300',
    category: '축구',
  },
  {
    id: 'site-3',
    title: '우리 동네 맛집',
    description: '숨겨진 동네 맛집을 찾고 공유하는 플랫폼입니다.',
    thumbnailUrl: 'https://picsum.photos/seed/food1/500/300',
    category: '음식',
  },
  {
    id: 'site-4',
    title: '인디 게임 개발 일지',
    description: '1인 개발자의 인디 게임 제작 과정을 기록합니다.',
    thumbnailUrl: 'https://picsum.photos/seed/game2/500/300',
    category: '게임',
  },
];