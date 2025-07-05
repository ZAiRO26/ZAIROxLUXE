import React from 'react';

interface GenericPageProps {
  title: string;
  onBackClick: () => void;
}

const GenericPage: React.FC<GenericPageProps> = ({ title, onBackClick }) => {
  return (
    <div className="pt-32 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto pb-24">
      <button
        onClick={onBackClick}
        className="flex items-center text-xs font-medium text-gray-700 hover:text-black mb-8 tracking-widest"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        BACK
      </button>
      <h1 className="text-4xl font-serif text-gray-900 mb-12">{title}</h1>
      <p className="text-lg text-gray-600">This is a placeholder page for {title}. Content will be added soon.</p>
    </div>
  );
};

export default GenericPage; 