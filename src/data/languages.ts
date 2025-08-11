import { Language, WordData } from '../types/UserProgress';

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' }
];

export const practiceWordsByLanguage: Record<string, WordData[]> = {
  en: [
    {
      word: 'hello',
      phonetic: '/həˈloʊ/',
      language: 'en',
      difficulty: 'beginner',
      syllables: ['hel', 'lo'],
      mouthPositions: [
        { shape: 'wide', tongue: 'low', duration: 500 },
        { shape: 'rounded', tongue: 'mid', duration: 600 }
      ]
    },
    {
      word: 'water',
      phonetic: '/ˈwɔtər/',
      language: 'en',
      difficulty: 'beginner',
      syllables: ['wa', 'ter'],
      mouthPositions: [
        { shape: 'rounded', tongue: 'low', duration: 400 },
        { shape: 'open', tongue: 'high', duration: 500 }
      ]
    },
    {
      word: 'beautiful',
      phonetic: '/ˈbjutəfəl/',
      language: 'en',
      difficulty: 'intermediate',
      syllables: ['beau', 'ti', 'ful'],
      mouthPositions: [
        { shape: 'closed', tongue: 'mid', duration: 400 },
        { shape: 'wide', tongue: 'high', duration: 300 },
        { shape: 'rounded', tongue: 'low', duration: 500 }
      ]
    }
  ],
  te: [
    {
      word: 'నమస్కారం',
      phonetic: '/namaskaːram/',
      language: 'te',
      difficulty: 'beginner',
      syllables: ['న', 'మస్', 'కా', 'రం'],
      mouthPositions: [
        { shape: 'open', tongue: 'mid', duration: 400 },
        { shape: 'closed', tongue: 'low', duration: 300 },
        { shape: 'wide', tongue: 'mid', duration: 400 },
        { shape: 'rounded', tongue: 'low', duration: 500 }
      ]
    },
    {
      word: 'నీరు',
      phonetic: '/niːru/',
      language: 'te',
      difficulty: 'beginner',
      syllables: ['నీ', 'రు'],
      mouthPositions: [
        { shape: 'wide', tongue: 'high', duration: 500 },
        { shape: 'rounded', tongue: 'mid', duration: 400 }
      ]
    },
    {
      word: 'అందమైన',
      phonetic: '/andamaina/',
      language: 'te',
      difficulty: 'intermediate',
      syllables: ['అం', 'ద', 'మై', 'న'],
      mouthPositions: [
        { shape: 'open', tongue: 'low', duration: 400 },
        { shape: 'open', tongue: 'mid', duration: 300 },
        { shape: 'wide', tongue: 'mid', duration: 400 },
        { shape: 'open', tongue: 'high', duration: 400 }
      ]
    }
  ],
  hi: [
    {
      word: 'नमस्ते',
      phonetic: '/namasteː/',
      language: 'hi',
      difficulty: 'beginner',
      syllables: ['न', 'मस्', 'ते'],
      mouthPositions: [
        { shape: 'open', tongue: 'mid', duration: 400 },
        { shape: 'closed', tongue: 'low', duration: 300 },
        { shape: 'wide', tongue: 'high', duration: 500 }
      ]
    },
    {
      word: 'पानी',
      phonetic: '/paːniː/',
      language: 'hi',
      difficulty: 'beginner',
      syllables: ['पा', 'नी'],
      mouthPositions: [
        { shape: 'closed', tongue: 'low', duration: 500 },
        { shape: 'wide', tongue: 'high', duration: 400 }
      ]
    }
  ]
};