import React from 'react';

interface MenPageProps {
  onBackClick: () => void;
}

const MenPage: React.FC<MenPageProps> = ({ onBackClick }) => {
  const subCategories = [
    "New In Men",
    "Bags",
    "Ready-To-Wear",
    "Shoes",
    "Small Leather Goods",
    "Travel",
    "Accessories",
    "Jewelry & Watches",
    "Gifts",
  ];

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
      <h1 className="text-4xl font-serif text-gray-900 mb-12">Men</h1>
      <ul className="space-y-5">
        {subCategories.map((category) => (
          <li key={category}>
            <button onClick={(e) => e.preventDefault()} className="text-lg text-gray-800 hover:text-black">
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenPage; 