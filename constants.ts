import { Website } from './types';

export const categories = ['\ud559\uc2b5', '\uac74\uac15', '\uac8c\uc784'];

export const initialWebsites: Website[] = [
  {
    id: 'site-ai-english',
    title: '\uc601\ub2e8\uc5b4 \uc554\uae30 \uc571',
    description:
      'AI \uc2a4\ud29c\ub514\uc624\uc5d0\uc11c \ub9cc\ub4e0 \ub9de\ucda4\ud615 \uc601\ub2e8\uc5b4 \ud559\uc2b5 \ud30c\ud2b8\ub108\uc785\ub2c8\ub2e4. \ub9e4\uc77c \uc0c8\ub85c\uc6b4 \ud034\uc988\ub85c \uc554\uae30\ub97c \ub3c4\uc640\uc918\uc694.',
    thumbnailUrl: 'https://picsum.photos/seed/vocabulary/500/300',
    url: 'https://ai.studio/apps/drive/1ulPHXkPUp-PvBCCsa6ea_X4oou9KoF4K',
    category: '\ud559\uc2b5',
  },
  {
    id: 'site-ai-food-health',
    title: '\uc74c\uc2dd \uac74\uac15\ub3c4 \ud3c9\uac00 \uc571',
    description:
      '\uc0ac\uc9c4 \ud55c \uc7a5\ub9cc \uc5c5\ub85c\ub4dc\ud558\uba74 \uc601\uc591 \ubc38\ub7f0\uc2a4\ub97c \ubd84\uc11d\ud558\uace0 \ub354 \uac74\uac15\ud55c \ub300\uc548\uc744 \uc81c\uc548\ud574 \uc90d\ub2c8\ub2e4.',
    thumbnailUrl: 'https://picsum.photos/seed/healthyfood/500/300',
    url: 'https://ai.studio/apps/drive/1toSQ8utE3LicEWpOUtw_0oy2NNGN-KT7',
    category: '\uac74\uac15',
  },
  {
    id: 'site-ai-fps',
    title: '\ud3c9~\ubc94\ud55c FPS \uac8c\uc784',
    description:
      '\uc77c\ubc18\uc801\uc778 \ub4ef \ud558\uc9c0\ub9cc \uc2a4\ud14c\uc774\uc9c0\ub9c8\ub2e4 \ubcc0\ud558\ub294 \uaddc\uce59\uc73c\ub85c \uc0c9\ub2e4\ub978 \uc7ac\ubbf8\ub97c \uc8fc\ub294 AI \uc2a4\ud29c\ub514\uc624 FPS \uc2e4\ud5d8\uc791.',
    thumbnailUrl: 'https://picsum.photos/seed/fpsgame/500/300',
    url: 'https://ai.studio/apps/drive/12n6Vp-8y7d2bfT8MU1v8APYUsy5IdSPp',
    category: '\uac8c\uc784',
  },
];
