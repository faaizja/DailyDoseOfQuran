import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

const VerseCard = ({ 
  arabicText, 
  translation, 
  surah, 
  ayah, 
  variant = 'default',
  className = '',
  showIcon = true 
}) => {
  const variants = {
    default: 'card-glass',
    accent: 'card-glass gradient-accent',
    sage: 'card-glass gradient-sage',
    simple: 'bg-cream-50 rounded-xl p-4 border border-sage-100'
  };

  return (
    <div className={`${variants[variant]} ${className} animate-scale-in`}>
      <div className="text-center">
        {showIcon && (
          <div className="flex justify-center mb-4">
            <div className="bg-sage-100 p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-sage-600" />
            </div>
          </div>
        )}
        
        <div className="arabic-text-large text-sage-800 mb-4 leading-loose">
          {arabicText}
        </div>
        
        <div className="text-lg text-sage-700 mb-3 italic font-medium leading-relaxed">
          "{translation}"
        </div>
        
        <div className="text-sm text-muted border-t border-sage-200 pt-3">
          {surah} ({ayah})
        </div>
      </div>
    </div>
  );
};

export const VerseCardWithHeart = ({ 
  arabicText, 
  translation, 
  surah, 
  ayah, 
  variant = 'default',
  className = '',
  onLike,
  isLiked = false
}) => {
  const variants = {
    default: 'card-glass',
    accent: 'card-glass gradient-accent',
    sage: 'card-glass gradient-sage',
    simple: 'bg-cream-50 rounded-xl p-4 border border-sage-100'
  };

  return (
    <div className={`${variants[variant]} ${className} animate-scale-in relative group`}>
      <div className="text-center">
        <div className="arabic-text-large text-sage-800 mb-4 leading-loose">
          {arabicText}
        </div>
        
        <div className="text-lg text-sage-700 mb-3 italic font-medium leading-relaxed">
          "{translation}"
        </div>
        
        <div className="text-sm text-muted border-t border-sage-200 pt-3">
          {surah} ({ayah})
        </div>
      </div>
      
      {onLike && (
        <button
          onClick={onLike}
          className="absolute top-4 right-4 p-2 rounded-full bg-cream-50/80 backdrop-blur-sm border border-sage-200 hover:bg-sage-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-sage-500'}`} 
          />
        </button>
      )}
    </div>
  );
};

export default VerseCard; 