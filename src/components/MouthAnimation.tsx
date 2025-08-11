import React, { useEffect, useState } from 'react';
import { WordData } from '../types/UserProgress';

interface MouthAnimationProps {
  word: WordData;
  isAnimating: boolean;
}

const MouthAnimation: React.FC<MouthAnimationProps> = ({ word, isAnimating }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    if (!isAnimating) {
      setCurrentPosition(0);
      return;
    }

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex < word.mouthPositions.length) {
        setCurrentPosition(currentIndex);
        timeoutId = setTimeout(() => {
          currentIndex++;
          animate();
        }, word.mouthPositions[currentIndex]?.duration || 500);
      } else {
        setCurrentPosition(0);
      }
    };

    animate();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isAnimating, word.mouthPositions]);

  const getLipStyle = () => {
    if (!word.mouthPositions[currentPosition]) {
      return { 
        upperLip: { height: '8px', borderRadius: '20px 20px 5px 5px' },
        lowerLip: { height: '12px', borderRadius: '5px 5px 20px 20px' },
        opening: { height: '4px', width: '60px' }
      };
    }

    const position = word.mouthPositions[currentPosition];
    let lipStyles = {
      upperLip: { height: '8px', borderRadius: '20px 20px 5px 5px', transition: 'all 0.3s ease' },
      lowerLip: { height: '12px', borderRadius: '5px 5px 20px 20px', transition: 'all 0.3s ease' },
      opening: { height: '4px', width: '60px', transition: 'all 0.3s ease' }
    };

    switch (position.shape) {
      case 'open':
        lipStyles.upperLip.height = '6px';
        lipStyles.lowerLip.height = '10px';
        lipStyles.opening.height = '20px';
        lipStyles.opening.width = '50px';
        break;
      case 'rounded':
        lipStyles.upperLip.height = '10px';
        lipStyles.upperLip.borderRadius = '25px 25px 8px 8px';
        lipStyles.lowerLip.height = '14px';
        lipStyles.lowerLip.borderRadius = '8px 8px 25px 25px';
        lipStyles.opening.height = '8px';
        lipStyles.opening.width = '35px';
        break;
      case 'wide':
        lipStyles.upperLip.height = '6px';
        lipStyles.lowerLip.height = '8px';
        lipStyles.opening.height = '3px';
        lipStyles.opening.width = '80px';
        break;
      case 'pursed':
        lipStyles.upperLip.height = '12px';
        lipStyles.upperLip.borderRadius = '30px 30px 10px 10px';
        lipStyles.lowerLip.height = '16px';
        lipStyles.lowerLip.borderRadius = '10px 10px 30px 30px';
        lipStyles.opening.height = '6px';
        lipStyles.opening.width = '25px';
        break;
      default: // closed
        lipStyles.upperLip.height = '8px';
        lipStyles.lowerLip.height = '10px';
        lipStyles.opening.height = '2px';
        lipStyles.opening.width = '60px';
    }

    return lipStyles;
  };

  const getTonguePosition = () => {
    if (!word.mouthPositions[currentPosition]) return 'translate(0, 0)';
    
    const position = word.mouthPositions[currentPosition];
    switch (position.tongue) {
      case 'high':
        return 'translate(0, -10px)';
      case 'low':
        return 'translate(0, 10px)';
      default: // mid
        return 'translate(0, 0)';
    }
  };

  const lipStyles = getLipStyle();

  return (
    <div className="relative w-40 h-48 flex items-center justify-center">
      {/* Face outline - more realistic */}
      <div className="absolute w-36 h-44 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 rounded-full border border-amber-400 shadow-inner" 
           style={{ borderRadius: '50% 50% 45% 45%' }} />
      
      {/* Face shadow/contour */}
      <div className="absolute w-32 h-40 bg-gradient-to-b from-transparent via-amber-300 to-amber-400 opacity-30 rounded-full"
           style={{ borderRadius: '50% 50% 45% 45%', top: '8px' }} />
      
      {/* Eyes */}
      <div className="absolute top-12 left-10">
        <div className="w-8 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-800 rounded-full">
            <div className="w-1 h-1 bg-white rounded-full ml-1 mt-1"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-12 right-10">
        <div className="w-8 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center">
          <div className="w-4 h-4 bg-gray-800 rounded-full">
            <div className="w-1 h-1 bg-white rounded-full ml-1 mt-1"></div>
          </div>
        </div>
      </div>
      
      {/* Eyebrows */}
      <div className="absolute top-10 left-11 w-6 h-1 bg-amber-800 rounded-full transform -rotate-12"></div>
      <div className="absolute top-10 right-11 w-6 h-1 bg-amber-800 rounded-full transform rotate-12"></div>
      
      {/* Nose */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <div className="w-4 h-6 bg-gradient-to-b from-amber-300 to-amber-400 rounded-full shadow-sm"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-amber-400 rounded-full"></div>
        {/* Nostrils */}
        <div className="absolute bottom-1 left-1 w-1 h-1 bg-amber-600 rounded-full"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-amber-600 rounded-full"></div>
      </div>
      
      {/* Mouth area with realistic lips */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
        {/* Upper lip */}
        <div
          className="bg-gradient-to-b from-red-300 to-red-400 border border-red-500 shadow-sm"
          style={{
            width: lipStyles.opening.width,
            ...lipStyles.upperLip,
            marginBottom: '1px'
          }}
        />
        
        {/* Mouth opening */}
        <div
          className="bg-gray-900 relative overflow-hidden"
          style={{
            width: lipStyles.opening.width,
            ...lipStyles.opening,
            borderRadius: '2px'
          }}
        >
          {/* Teeth */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white border-b border-gray-300"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white border-t border-gray-300"></div>
          
          {/* Tongue */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-2 bg-pink-400 rounded-full transition-all duration-300 shadow-sm"
            style={{ transform: `translate(-50%, -50%) ${getTonguePosition()}` }}
          />
        </div>
        
        {/* Lower lip */}
        <div
          className="bg-gradient-to-t from-red-400 to-red-300 border border-red-500 shadow-sm"
          style={{
            width: lipStyles.opening.width,
            ...lipStyles.lowerLip,
            marginTop: '1px'
          }}
        />
      </div>

      {/* Animation indicator */}
      {isAnimating && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            {word.syllables.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPosition ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Syllable labels */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
        {isAnimating && word.syllables[currentPosition] && (
          <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
            {word.syllables[currentPosition]}
          </span>
        )}
      </div>
    </div>
  );
};

export default MouthAnimation;