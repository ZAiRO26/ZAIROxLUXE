import React, { useState, useEffect } from 'react';
import WomenPage from './WomenPage';
import MenPage from './MenPage';
import ChildrenPage from './ChildrenPage';
import GenericPage from './GenericPage';
import SideMenu from './SideMenu';

const genericPageTitles: { [key: string]: string } = {
  'new-in': 'New In',
  'handbags': 'Handbags',
  'travel': 'Travel',
  'jewelry-watches': 'Jewelry & Watches',
  'decor-lifestyle': 'Décor & Lifestyle',
  'fragrances-makeup': 'Fragrances & Make-Up',
  'gifts': 'Gifts',
  'services': 'RAANA Services',
  'world-of-raana': 'World of RAANA',
  'store-locator': 'Store Locator',
  'sign-in': 'Sign In',
  'my-orders': 'My Orders',
  'contact-us': 'Contact Us',
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const renderHomePage = () => (
    <>
      <section 
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/NAOMI.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">
              RAANA
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light tracking-wide">
              A NEW ERA OF LUXURY
            </p>
            <a href="#featured-products" className="raana-button text-lg px-8 py-4 hover:scale-105 transition-transform duration-300 inline-block">
              SHOP NOW
            </a>
          </div>
        </div>
      </section>

      <section 
        className="relative py-40 bg-cover bg-center" 
        style={{ backgroundImage: "url('/raana-red.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center text-white">
          <h2 className="text-6xl font-serif mb-8">RAANA Lido</h2>
          <div className="flex justify-center space-x-6">
            <button 
              onClick={() => handleNavClick('women')}
              className="bg-white text-black px-12 py-4 font-semibold tracking-widest hover:bg-gray-200 transition-colors"
            >
              FOR HER
            </button>
            <button 
              onClick={() => handleNavClick('men')}
              className="bg-white text-black px-12 py-4 font-semibold tracking-widest hover:bg-gray-200 transition-colors"
            >
              FOR HIM
            </button>
          </div>
        </div>
      </section>

      <section id="featured-products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">FEATURED COLLECTIONS</h2>
            <p className="text-lg text-gray-600">Discover the latest in luxury fashion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "GG Marmont Bag",
                price: "$2,980",
                image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Ace Sneakers",
                price: "$790",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=712&q=80"
              },
              {
                name: "Dionysus Bag",
                price: "$3,200",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80"
              }
            ].map((product, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden bg-gray-100 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brand-story" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">THE RAANA STORY</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in Florence in 1921, RAANA is one of the world's leading luxury fashion brands. 
                With its unique vision, innovative design approach, and distinctive craftsmanship, 
                RAANA has become a symbol of Italian excellence worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Today, under the creative direction of Alessandro Michele, RAANA continues to push 
                boundaries and redefine luxury for a new generation.
              </p>
              <a href="#brand-story" className="raana-button-outline hover:scale-105 transition-transform duration-300 inline-block">
                LEARN MORE
              </a>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="RAANA Store"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderContent = () => {
    if (activePage === 'home') {
      return renderHomePage();
    }
    if (activePage === 'women') {
      return <WomenPage onBackClick={() => handleNavClick('home')} />;
    }
    if (activePage === 'men') {
      return <MenPage onBackClick={() => handleNavClick('home')} />;
    }
    if (activePage === 'children') {
      return <ChildrenPage onBackClick={() => handleNavClick('home')} />;
    }
    if (genericPageTitles[activePage]) {
      return <GenericPage title={genericPageTitles[activePage]} onBackClick={() => handleNavClick('home')} />;
    }
    return renderHomePage();
  };

  return (
    <div className="min-h-screen bg-white">
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onNavigate={handleNavClick} />
      <nav className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled || activePage !== 'home' ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`mr-4 p-2 ${isScrolled || activePage !== 'home' ? 'text-gray-700' : 'text-white'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className={`text-2xl font-bold ${isScrolled || activePage !== 'home' ? 'text-black' : 'text-white'}`}>
                RAANA
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => alert('Search clicked!')}
                className={`p-2 ${isScrolled || activePage !== 'home' ? 'text-gray-700' : 'text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => alert('Profile clicked!')}
                className={`p-2 ${isScrolled || activePage !== 'home' ? 'text-gray-700' : 'text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={() => alert('Cart clicked!')}
                className={`p-2 ${isScrolled || activePage !== 'home' ? 'text-gray-700' : 'text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {renderContent()}
      </main>

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RAANA</h3>
              <p className="text-gray-400">
                Discover the world of RAANA luxury fashion, accessories, and lifestyle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">SHOP</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavClick('women')} className="hover:text-white transition-colors">Women</button></li>
                <li><button onClick={() => handleNavClick('men')} className="hover:text-white transition-colors">Men</button></li>
                <li><button onClick={() => handleNavClick('children')} className="hover:text-white transition-colors">Kids</button></li>
                <li><button onClick={() => handleNavClick('fragrances-makeup')} className="hover:text-white transition-colors">Beauty</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">CUSTOMER SERVICE</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavClick('contact-us')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors">Shipping</button></li>
                <li><button className="hover:text-white transition-colors">Returns</button></li>
                <li><button onClick={() => handleNavClick('my-orders')} className="hover:text-white transition-colors">My Orders</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleNavClick('world-of-raana')} className="hover:text-white transition-colors">About RAANA</button></li>
                <li><button onClick={() => handleNavClick('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => handleNavClick('store-locator')} className="hover:text-white transition-colors">Store Locator</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RAANA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
