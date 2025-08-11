import React from 'react';
import { Mic, Eye, TrendingUp, Award, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface HomePageProps {
  onStartPractice: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartPractice }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Learn to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Speak</span>
            <br />
            Without Hearing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            HearMeSpeak uses visual AI feedback to teach speech through sight, not sound. 
            Practice pronunciation with animated guides and real-time feedback.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartPractice}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <Mic className="w-5 h-5" />
            <span>Start Learning</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <VolumeX className="w-4 h-4" />
            <span>No audio required</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Visual Pronunciation</h3>
          <p className="text-gray-600 leading-relaxed">
            See animated mouth shapes, lip positions, and tongue movements for every syllable. 
            Learn through clear visual guides instead of audio cues.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
            <Mic className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Speech Analysis</h3>
          <p className="text-gray-600 leading-relaxed">
            Speak into your microphone and get instant visual feedback. 
            See what you said and how to improve with color-coded accuracy.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
          <p className="text-gray-600 leading-relaxed">
            Track your improvement with detailed analytics, achievement badges, 
            and daily streaks to keep you motivated.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Learn speech in three simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Watch & Learn</h3>
            <p className="text-gray-600">
              See how to form each word with animated mouth positions and visual guides
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Practice Speaking</h3>
            <p className="text-gray-600">
              Speak the word into your microphone and see what the AI heard
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Get Feedback</h3>
            <p className="text-gray-600">
              Receive instant visual feedback and track your progress over time
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-blue-600">500+</div>
          <div className="text-gray-600">Practice Words</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-purple-600">95%</div>
          <div className="text-gray-600">Accuracy Rate</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-green-600">24/7</div>
          <div className="text-gray-600">Available</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-orange-600">Free</div>
          <div className="text-gray-600">To Use</div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;