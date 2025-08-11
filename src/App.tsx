import React, { useState } from 'react';
import { Mic, MicOff, Award, TrendingUp, Home, BookOpen, BarChart3 } from 'lucide-react';
import HomePage from './components/HomePage';
import PracticeInterface from './components/PracticeInterface';
import ProgressDashboard from './components/ProgressDashboard';
import { UserProgress } from './types/UserProgress';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'practice' | 'progress'>('home');
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalWordsLearned: 24,
    currentStreak: 7,
    weeklyGoal: 50,
    weeklyProgress: 32,
    achievements: ['First Word', '7 Day Streak', 'Perfect Score'],
    recentSessions: [
      { date: '2025-01-21', wordsCompleted: 5, accuracy: 92 },
      { date: '2025-01-20', wordsCompleted: 8, accuracy: 88 },
      { date: '2025-01-19', wordsCompleted: 3, accuracy: 95 }
    ]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HearMeSpeak</span>
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentView === 'home'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Home"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </button>
              
              <button
                onClick={() => setCurrentView('practice')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentView === 'practice'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Practice"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Practice</span>
              </button>
              
              <button
                onClick={() => setCurrentView('progress')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  currentView === 'progress'
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Progress"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Progress</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && <HomePage onStartPractice={() => setCurrentView('practice')} />}
        {currentView === 'practice' && <PracticeInterface userProgress={userProgress} setUserProgress={setUserProgress} />}
        {currentView === 'progress' && <ProgressDashboard userProgress={userProgress} />}
      </main>
    </div>
  );
}

export default App;