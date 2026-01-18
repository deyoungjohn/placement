import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onLogout, darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-sm py-4' 
        : 'bg-transparent py-6'
    }`}>
      {/* Updated Container with more padding on large screens */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Modern Icon Logo */}
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30 text-white transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none transition-colors">Placement<span className="text-brand-500">Finder</span></h1>
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 transition-colors">Student Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-brand-400 hover:text-brand-600 transition-all focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Logged in as</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors">{user.email.split('@')[0]}</span>
              </div>
              <button 
                onClick={onLogout}
                className="bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/50"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-sm font-medium text-slate-500 dark:text-slate-400">Are you a student?</span>
              <button 
                onClick={onOpenAuth}
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;