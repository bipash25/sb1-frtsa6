import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  canToggleVisibility?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  type = 'text',
  canToggleVisibility = false,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const displayValue = !isVisible && canToggleVisibility && value 
    ? '•'.repeat(value.length) 
    : value;

  return (
    <div className="relative">
      <input
        type={type}
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder=" "
      />
      <label
        className={`absolute left-4 transition-all pointer-events-none
          ${isFocused || value ? 'text-xs -top-2 bg-white dark:bg-gray-900 px-1' : 'text-gray-500 top-2'}`}
      >
        {label}
      </label>
      
      {canToggleVisibility && value && (
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-4 top-2.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}