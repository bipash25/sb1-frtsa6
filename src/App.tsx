import React, { useState, useEffect } from 'react';
import { Log, UserProfile, FilterState } from './types';
import Navbar from './components/Navbar';
import InputField from './components/InputField';
import LogConsole from './components/LogConsole';
import FilterPanel from './components/FilterPanel';
import ProfileModal from './components/ProfileModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [bin, setBin] = useState('');
  const [proxy, setProxy] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    showAll: true,
    allHits: false,
    stripe: false,
    adyen: false,
  });

  const profile: UserProfile = {
    username: 'Demo User',
    bin,
    proxy,
    totalHits: logs.length,
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Simulate real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['stripe', 'adyen', 'other'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      const status = Math.random() > 0.2 ? 'success' : 'error';
      
      const newLog: Log = {
        id: Date.now().toString(),
        type,
        message: `${status === 'success' ? 'Successfully processed' : 'Failed to process'} ${type} transaction`,
        timestamp: new Date(),
        status,
      };

      setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep last 100 logs
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    if (filters.showAll) return true;
    if (filters.allHits) return log.status === 'success';
    return (
      (filters.stripe && log.type === 'stripe') ||
      (filters.adyen && log.type === 'adyen')
    );
  });

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
         style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover' } : undefined}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        openProfile={() => setIsProfileOpen(true)}
      />
      
      <div className="pt-16 h-screen flex">
        {/* Left Panel - Filters */}
        <div className="w-64 hidden md:block">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Settings Section */}
          <div className="p-4 space-y-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <InputField
              label="BIN"
              value={bin}
              onChange={setBin}
              canToggleVisibility
            />
            <InputField
              label="Proxy"
              value={proxy}
              onChange={setProxy}
              canToggleVisibility
            />
            <InputField
              label="Background URL"
              value={backgroundUrl}
              onChange={setBackgroundUrl}
            />
          </div>
          
          {/* Logs Section */}
          <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
            <LogConsole
              logs={filteredLogs}
              clearLogs={() => setLogs([])}
            />
          </div>
        </div>
      </div>

      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}

export default App;