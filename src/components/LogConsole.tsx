import React from 'react';
import { Trash2 } from 'lucide-react';
import { Log } from '../types';

interface LogConsoleProps {
  logs: Log[];
  clearLogs: () => void;
}

export default function LogConsole({ logs, clearLogs }: LogConsoleProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Logs Console</h2>
        <button
          onClick={clearLogs}
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Clear logs"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-2 rounded-lg ${
              log.status === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}
          >
            <span className="text-gray-500 dark:text-gray-400">
              [{new Date(log.timestamp).toLocaleTimeString()}]
            </span>{' '}
            <span className="font-semibold">[{log.type.toUpperCase()}]</span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}