import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, RotateCcw, CheckCircle, XCircle, Play, Pause, Globe } from 'lucide-react';
import MouthAnimation from './MouthAnimation';
import LanguageSelector from './LanguageSelector';
import { UserProgress, WordData } from '../types/UserProgress';
import { practiceWordsByLanguage } from '../data/languages';

interface PracticeInterfaceProps {
  userProgress: UserProgress;
  setUserProgress: (progress: UserProgress) => void;
}

const PracticeInterface: React.FC<PracticeInterfaceProps> = ({ userProgress, setUserProgress }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'partial' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const practiceWords = practiceWordsByLanguage[selectedLanguage] || practiceWordsByLanguage['en'];
  const currentWord = practiceWords[currentWordIndex];

  // Reset word index when language changes
  useEffect(() => {
    setCurrentWordIndex(0);
    setTranscript('');
    setFeedback(null);
    setAccuracy(null);
  }, [selectedLanguage]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Set language for speech recognition
      const langMap: Record<string, string> = {
        'en': 'en-US',
        'te': 'te-IN',
        'hi': 'hi-IN',
        'es': 'es-ES',
        'fr': 'fr-FR'
      };
      recognitionRef.current.lang = langMap[selectedLanguage] || 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript.toLowerCase().trim();
        setTranscript(spokenText);
        
        // Calculate accuracy
        const targetWord = currentWord.word.toLowerCase();
        const similarity = calculateSimilarity(spokenText, targetWord);
        setAccuracy(similarity);
        
        if (similarity >= 90) {
          setFeedback('correct');
        } else if (similarity >= 60) {
          setFeedback('partial');
        } else {
          setFeedback('incorrect');
        }
        
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setFeedback('incorrect');
      };
    }
  }, [currentWord, selectedLanguage]);

  const calculateSimilarity = (spoken: string, target: string): number => {
    if (spoken === target) return 100;
    
    // Simple similarity calculation based on common characters
    const spokenChars = spoken.split('');
    const targetChars = target.split('');
    let matches = 0;
    
    spokenChars.forEach(char => {
      if (targetChars.includes(char)) {
        matches++;
      }
    });
    
    return Math.round((matches / Math.max(spokenChars.length, targetChars.length)) * 100);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      setFeedback(null);
      setAccuracy(null);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const playAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  const nextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % practiceWords.length);
    setTranscript('');
    setFeedback(null);
    setAccuracy(null);
  };

  const resetPractice = () => {
    setTranscript('');
    setFeedback(null);
    setAccuracy(null);
    stopListening();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Language Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />
      </div>

      {/* Progress Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Practice Session</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Word {currentWordIndex + 1} of {practiceWords.length}</span>
            <div className="flex space-x-1">
              {practiceWords.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentWordIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / practiceWords.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(((currentWordIndex + 1) / practiceWords.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Main Practice Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Visual Guide */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-gray-900">{currentWord.word}</h3>
            <p className="text-xl text-gray-600">{currentWord.phonetic}</p>
            <div className="flex justify-center space-x-2">
              {currentWord.syllables.map((syllable, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                >
                  {syllable}
                </span>
              ))}
            </div>
          </div>

          {/* Mouth Animation */}
          <div className="flex justify-center">
            <MouthAnimation word={currentWord} isAnimating={isAnimating} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={playAnimation}
              disabled={isAnimating}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
            >
              {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isAnimating ? 'Playing...' : 'Show Pronunciation'}</span>
            </button>
          </div>
        </div>

        {/* Speech Practice */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 text-center">Your Turn to Speak</h3>
          
          {/* Microphone Button */}
          <div className="flex justify-center">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105'
              }`}
              disabled={!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>
          </div>

          <p className="text-center text-gray-600">
            {isListening ? 'Listening... Speak now!' : 'Click to start speaking'}
          </p>

          {/* Feedback Display */}
          {transcript && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-center text-gray-700">
                  <span className="font-medium">You said:</span> "{transcript}"
                </p>
              </div>

              {feedback && (
                <div className={`p-4 rounded-xl border-2 ${
                  feedback === 'correct' 
                    ? 'bg-green-50 border-green-200' 
                    : feedback === 'partial'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center justify-center space-x-2">
                    {feedback === 'correct' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      feedback === 'correct' 
                        ? 'text-green-800' 
                        : feedback === 'partial'
                        ? 'text-yellow-800'
                        : 'text-red-800'
                    }`}>
                      {feedback === 'correct' 
                        ? 'Perfect!' 
                        : feedback === 'partial'
                        ? 'Close! Try again'
                        : 'Try again'}
                    </span>
                    {accuracy && (
                      <span className="text-sm text-gray-600">({accuracy}% match)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetPractice}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            
            <button
              onClick={nextWord}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Next Word
            </button>
          </div>
        </div>
      </div>

      {/* Speech Recognition Not Available */}
      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800 font-medium">
            Speech recognition is not available in your browser. 
            Please use Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticeInterface;