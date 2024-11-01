import React from 'react';
import { Sun, Moon, User } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  openProfile: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme, openProfile }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Control Panel
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button
            onClick={openProfile}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open profile"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}