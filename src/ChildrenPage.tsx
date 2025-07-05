import React from 'react';

interface ChildrenPageProps {
  onBackClick: () => void;
}

const ChildrenPage: React.FC<ChildrenPageProps> = ({ onBackClick }) => {
  const subCategories = [
    "Baby",
    "Girls",
    "Boys",
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
      <h1 className="text-4xl font-serif text-gray-900 mb-12">Children</h1>
      
      <div className="mb-12 text-center">
        <img 
          src="https://i.ibb.co/6g3S0zX/gucci-children.png" 
          alt="Children with a stroller" 
          className="w-full max-w-md mx-auto h-auto object-cover"
        />
        <p className="mt-4 text-gray-800 text-lg">RAANA Stroller</p>
      </div>

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

export default ChildrenPage; 