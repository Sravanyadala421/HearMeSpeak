import React from 'react';
import { Award, TrendingUp, Target, Calendar, Star, Trophy, Flame } from 'lucide-react';
import { UserProgress } from '../types/UserProgress';

interface ProgressDashboardProps {
  userProgress: UserProgress;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userProgress }) => {
  const weeklyProgressPercentage = (userProgress.weeklyProgress / userProgress.weeklyGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-lg text-gray-600">Track your speech learning journey</p>
      </div>

      {/* Key Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Words Learned</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{userProgress.totalWordsLearned}</div>
          <div className="text-sm text-green-600 mt-1">+3 this week</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Current Streak</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{userProgress.currentStreak}</div>
          <div className="text-sm text-gray-500 mt-1">days in a row</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Weekly Goal</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{userProgress.weeklyProgress}</div>
          <div className="text-sm text-gray-500 mt-1">of {userProgress.weeklyGoal} words</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-600">Achievements</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{userProgress.achievements.length}</div>
          <div className="text-sm text-gray-500 mt-1">badges earned</div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Goal Progress</h2>
          <span className="text-sm text-gray-600">{Math.round(weeklyProgressPercentage)}% complete</span>
        </div>
        
        <div className="space-y-4">
          <div className="flex-1 bg-gray-200 rounded-full h-4">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 relative"
              style={{ width: `${Math.min(weeklyProgressPercentage, 100)}%` }}
            >
              {weeklyProgressPercentage >= 100 && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>0 words</span>
            <span>{userProgress.weeklyProgress} / {userProgress.weeklyGoal} words</span>
            <span>{userProgress.weeklyGoal} words</span>
          </div>
        </div>
      </div>

      {/* Recent Sessions and Achievements */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Sessions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
          </div>
          
          <div className="space-y-4">
            {userProgress.recentSessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">
                    {new Date(session.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {session.wordsCompleted} words completed
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className={`text-sm font-semibold ${
                    session.accuracy >= 90 ? 'text-green-600' : 
                    session.accuracy >= 70 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {session.accuracy}% accuracy
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(session.accuracy / 20) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
          </div>
          
          <div className="space-y-4">
            {userProgress.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{achievement}</div>
                  <div className="text-sm text-gray-600">Recently earned</div>
                </div>
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
            ))}
            
            {/* Next Achievement Preview */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-60">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-600">Speed Learner</div>
                <div className="text-sm text-gray-500">Complete 10 words in one session</div>
              </div>
              <div className="text-sm text-gray-500">7/10</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Learning Insights</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Average Accuracy</div>
            <div className="text-xs text-green-600">↑ 12% from last week</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-purple-600">4.2</div>
            <div className="text-sm text-gray-600">Words per Session</div>
            <div className="text-xs text-green-600">↑ 0.8 from last week</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-600">12min</div>
            <div className="text-sm text-gray-600">Avg Session Time</div>
            <div className="text-xs text-gray-500">↔ Same as last week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;