import React from 'react';
import { BookOpen } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin`}></div>
      {text && <span className="text-sage-600 font-medium">{text}</span>}
    </div>
  );
};

export const QuranLoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} animate-pulse-slow`}>
        <BookOpen className="w-full h-full text-sage-600" />
      </div>
      {text && <span className="text-sage-600 font-medium">{text}</span>}
    </div>
  );
};

export default LoadingSpinner; 