import { useState, useEffect } from 'react';
import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(() => {
    // Vérifier si le dark mode est activé au chargement
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('darkMode') === 'true' ||
        document.documentElement.classList.contains('dark')
      );
    }
    return false;
  });
  const [notifications] = useState(3);

  useEffect(() => {
    // Appliquer le dark mode au chargement
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section - Menu & Search */}
        <div className="flex items-center flex-1 space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-500 dark:text-gray-400 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800
                         border border-gray-200 dark:border-gray-700 rounded-lg
                         text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                         focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Button */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-500 dark:text-gray-400 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle with Animation */}
          <button
            onClick={toggleDarkMode}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-500 dark:text-gray-400 transition-all duration-300
                     hover:scale-110 active:scale-95"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="relative w-5 h-5">
              <Sun
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  darkMode
                    ? 'rotate-0 scale-100 opacity-100'
                    : 'rotate-90 scale-0 opacity-0'
                }`}
              />
              <Moon
                className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                  darkMode
                    ? '-rotate-90 scale-0 opacity-0'
                    : 'rotate-0 scale-100 opacity-100'
                }`}
              />
            </div>
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-500 dark:text-gray-400 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full
                             flex items-center justify-center text-[10px] text-white font-medium">
                {notifications}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Admin
              </p>
            </div>
            <button className="relative group">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=3B82F6&color=fff"
                alt="User"
                className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700
                         group-hover:ring-blue-500 dark:group-hover:ring-blue-400 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2
                             border-white dark:border-gray-900 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800
                     border border-gray-200 dark:border-gray-700 rounded-lg
                     text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     focus:border-transparent transition-all"
          />
        </div>
      </div>
    </header>
  );
}
