import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types/UserProgress';
import { supportedLanguages } from '../data/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const currentLanguage = supportedLanguages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 mb-2">
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Practice Language</span>
      </div>
      
      <div className="relative">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-gray-400 transition-colors duration-200"
        >
          {supportedLanguages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.nativeName} ({language.name})
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      
      {currentLanguage && (
        <p className="text-xs text-gray-500 mt-1">
          Selected: {currentLanguage.nativeName}
        </p>
      )}
    </div>
  );
};

export default LanguageSelector;