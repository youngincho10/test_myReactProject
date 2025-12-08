import { KeyConfig } from './types';

// Using specific seed numbers to ensure consistent but distinct images
export const KEY_CONFIGS: KeyConfig[] = [
  {
    key: 'a',
    label: 'A',
    imageUrl: 'https://picsum.photos/seed/gradient_a/600/1000',
    color: 'from-pink-500 to-rose-500',
    gradient: 'rgba(236, 72, 153, 0.4)',
  },
  {
    key: 's',
    label: 'S',
    imageUrl: 'https://picsum.photos/seed/gradient_s/600/1000',
    color: 'from-purple-500 to-indigo-500',
    gradient: 'rgba(168, 85, 247, 0.4)',
  },
  {
    key: 'd',
    label: 'D',
    imageUrl: 'https://picsum.photos/seed/gradient_d/600/1000',
    color: 'from-indigo-500 to-blue-500',
    gradient: 'rgba(99, 102, 241, 0.4)',
  },
  {
    key: 'f',
    label: 'F',
    imageUrl: 'https://picsum.photos/seed/gradient_f/600/1000',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'rgba(59, 130, 246, 0.4)',
  },
  {
    key: 'j',
    label: 'J',
    imageUrl: 'https://picsum.photos/seed/gradient_j/600/1000',
    color: 'from-yellow-500 to-amber-500',
    gradient: 'rgba(234, 179, 8, 0.4)',
  },
  {
    key: 'k',
    label: 'K',
    imageUrl: 'https://picsum.photos/seed/gradient_k/600/1000',
    color: 'from-orange-500 to-red-500',
    gradient: 'rgba(249, 115, 22, 0.4)',
  },
  {
    key: 'l',
    label: 'L',
    imageUrl: 'https://picsum.photos/seed/gradient_l/600/1000',
    color: 'from-red-500 to-pink-500',
    gradient: 'rgba(239, 68, 68, 0.4)',
  },
];

export const VALID_KEYS = new Set(KEY_CONFIGS.map(c => c.key));