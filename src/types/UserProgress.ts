export interface UserProgress {
  totalWordsLearned: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  achievements: string[];
  recentSessions: SessionData[];
}

export interface SessionData {
  date: string;
  wordsCompleted: number;
  accuracy: number;
}

export interface WordData {
  word: string;
  phonetic: string;
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  syllables: string[];
  mouthPositions: MouthPosition[];
}

export interface MouthPosition {
  shape: 'open' | 'closed' | 'rounded' | 'wide' | 'pursed';
  tongue: 'low' | 'mid' | 'high';
  duration: number;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}