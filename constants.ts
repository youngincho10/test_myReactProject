import { Website } from './types';

export const categories = ['\uc601\ud654', '\ucd95\uad6c', '\ube44\uc8fc\uc5bc', '\uc790\uae30\uc18c\uac1c'];

export const initialWebsites: Website[] = [
  {
    id: 'site-movie-card',
    title: '\ubb34\ube44 \uce74\ub4dc - \uac10\ud310: \uc218\ud61c',
    description:
      '\ud504\ub9ac\uc2a4\ud2b8 \uc601\ud654 \ub85c\uace0 \uce74\ub4dc \ubc0f \ucd08\uacfc\uc801\uc778 \uc774\ubbf8\uc9c0\ub85c \ubbf8\ub974\ub294 \uc7ac\ubbf8\uc788\ub294 \uc11c\uc2dd.',
    thumbnailUrl: 'https://i.namu.wiki/i/Cpk_hpi0LRgOxtSPdsxAfFtiOqcfUn5igpBhjR44MhzLKy506R4tUXLd4jeONOcWg75iC5bCYVypbCNKt2AvhRXWxFW87RKvVXorpNY7Wicve0mJyxbg9pCwTE29yK7az-4S7OBYTQ2GfkBf3RHMDA.webp',
    url: '/movie-card',
    category: '\uc601\ud654',
  },
  {
    id: 'site-ronaldo-vs-messi',
    title: '\ud638\ub0a0\ub450 vs \uba54\uc2dc - \ub204\uad6c\ub97c \uc0b4\ub9b4 \uac83\uc778\uac00?',
    description:
      '\ub450 \ucd1d\uc8fc\uc758 \uc120\ud0dd \uacbd\uc7c1\uc744 \ud50c\ub808\uc774\ud558\uace0 \ub2f9\uc2e0\uc758 \uc120\ud0dd\uc744 \uacb0\uacfc\ud654\ud574 \uc90d\ub2c8\ub2e4.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80',
    url: '/ronaldo-vs-messi',
    category: '\ucd95\uad6c',
  },
  {
    id: 'site-keyrise-visualizer',
    title: 'Keyrise Visualizer - \ud0a4 \uc785\ub825 \uc544\ud2b8',
    description:
      'ASDFJKL \ud0a4\ub97c \ub204\ub974\uac70\ub098 \ud130\uce58\ud558\uba74 \uadf8\ub798\ub518 \ubc14\uac00 \uc0ac\ub77c \uc788\ub294 \ube44\uc8fc\uc5bc\ub85c \ubcc0\ud568. \uc774\ubbf8\uc9c0 \uc5c5\ub85c\ub4dc\ub85c \ucee4\uc2a4\ud140\ud558\uae30\uae4c\uc9c0!',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Klavier_Tastatur.jpg',
    url: '/keyrise-visualizer',
    category: '\ube44\uc8fc\uc5bc',
  },
  {
    id: 'site-self-introduction',
    title: '케빈 소개 카드',
    description:
      '케빈을 알아보세요!',
    thumbnailUrl: 'https://images.khan.co.kr/article/2018/12/25/l_2018122502001059900223452.jpg',
    url: '/self-introduction',
    category: '\uc790\uae30\uc18c\uac1c',
  },
  {
    id: 'site-random-selector',
    title: '랜덤 선택기',
    description:
      '메뉴/팀/당번 등을 랜덤으로 뽑아줘요.',
    thumbnailUrl: 'https://wwwcong.com/web/product/big/202202/0ddb26da5562a537acc2f9160920cce1.png',
    url: '/랜덤-선택기',
    category: '\uc790\uae30\uc18c\uac1c',
  },
  {
    id: 'site-mang-ai',
    title: '맹맹맹.ai',
    description:
      '나를 맹구의 선수로',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhrb9IwyRHDEphLc3isE05ENsCNm2o3ec_jw&s',
    url: '/mangai',
    category: '축구',
  },
];
