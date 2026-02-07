import { Link, useLocation } from 'react-router-dom';
import { useState, useCallback } from 'react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-display font-bold text-blue-600 group-hover:scale-110 transition-transform">
                100
              </span>
              <span className="text-2xl font-display font-bold text-gray-800">
                DevProjects
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-medium transition-all ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* GitHub Button (Desktop) */}
            <a
              href="https://github.com/AshDev0/100devprojects/tree/main/100devprojects"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-medium"
            >
              GitHub
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};

export default Header;