import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ profile, isOpen, onClose }: ProfileModalProps) {
  const [showSensitive, setShowSensitive] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Username</label>
            <p className="text-lg font-semibold">{profile.username}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Sensitive Data</label>
              <p className="font-mono">
                BIN: {showSensitive ? profile.bin : '•'.repeat(profile.bin.length)}
                <br />
                Proxy: {showSensitive ? profile.proxy : '•'.repeat(profile.proxy.length)}
              </p>
            </div>
            <button
              onClick={() => setShowSensitive(!showSensitive)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {showSensitive ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Total Hits</label>
            <p className="text-lg font-semibold">{profile.totalHits}</p>
          </div>
        </div>
      </div>
    </div>
  );
}