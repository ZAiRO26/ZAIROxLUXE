import React from 'react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const navSections = {
  main: [
    { id: 'new-in', title: 'New In' },
    { id: 'handbags', title: 'Handbags' },
    { id: 'women', title: 'Women' },
    { id: 'men', title: 'Men' },
    { id: 'children', title: 'Children' },
    { id: 'travel', title: 'Travel' },
    { id: 'jewelry-watches', title: 'Jewelry & Watches' },
    { id: 'decor-lifestyle', title: 'Décor & Lifestyle' },
    { id: 'fragrances-makeup', title: 'Fragrances & Make-Up' },
    { id: 'gifts', title: 'Gifts' },
  ],
  secondary: [
    { id: 'services', title: 'RAANA Services' },
    { id: 'world-of-raana', title: 'World of RAANA' },
    { id: 'store-locator', title: 'Store Locator' },
  ],
  user: [
    { id: 'sign-in', title: 'Sign In' },
    { id: 'my-orders', title: 'My Orders' },
    { id: 'contact-us', title: 'Contact Us' },
  ],
};

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" onClick={onClose}>
      <div
        className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg p-8 overflow-y-auto transform transition-transform duration-300 translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="space-y-8 mt-8">
          <ul className="space-y-4">
            {navSections.main.map(item => (
              <li key={item.id}><button onClick={() => handleLinkClick(item.id)} className="text-lg font-medium text-gray-800 hover:text-black">{item.title}</button></li>
            ))}
          </ul>
          <hr />
          <ul className="space-y-4">
            {navSections.secondary.map(item => (
              <li key={item.id}><button onClick={() => handleLinkClick(item.id)} className="text-sm text-gray-700 hover:text-black">{item.title}</button></li>
            ))}
          </ul>
          <hr />
          <ul className="space-y-4">
            {navSections.user.map(item => (
              <li key={item.id}><button onClick={() => handleLinkClick(item.id)} className="text-sm underline text-gray-700 hover:text-black">{item.title}</button></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideMenu; 