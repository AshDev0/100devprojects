import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  // Close menu on route change only
  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      prevPathname.current = location.pathname;
      onClose();
    }
  }, [location.pathname, onClose]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-60 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      ></div>

      {/* Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-70 md:hidden transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close menu"
          tabIndex={isOpen ? 0 : -1}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Logo in Menu */}
        <div className="pt-6 px-6 pb-2">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center space-x-1"
            tabIndex={isOpen ? 0 : -1}
          >
            <span className="text-xl font-bold text-blue-600">100</span>
            <span className="text-xl font-bold text-gray-800">DevProjects</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-gray-200"></div>

        {/* Menu Items */}
        <nav className="pt-4 px-6">
          <ul className="space-y-1">
            {[
              { path: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { path: '/projects', label: 'Projects', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
              { path: '/blog', label: 'Blog', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
              { path: '/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon}></path>
                    </svg>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="my-4 border-t border-gray-200"></div>

          {/* Social Links */}
          <div className="space-y-1">
            <a
              href="https://github.com/AshDev0/100devprojects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              tabIndex={isOpen ? 0 : -1}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">GitHub</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
