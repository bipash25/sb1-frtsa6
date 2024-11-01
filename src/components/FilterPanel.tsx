import React from 'react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const handleFilterChange = (key: keyof FilterState) => {
    if (key === 'showAll' || key === 'allHits') {
      setFilters({
        showAll: key === 'showAll',
        allHits: key === 'allHits',
        stripe: false,
        adyen: false,
      });
    } else {
      setFilters({
        ...filters,
        showAll: false,
        allHits: false,
        [key]: !filters[key],
      });
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-3">
        {Object.entries(filters).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleFilterChange(key as keyof FilterState)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
      </div>
    </div>
  );
}