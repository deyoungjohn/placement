import React, { useState, useRef, useEffect } from 'react';
import { RoleType, LocationType } from '../types';

interface FiltersProps {
  selectedRole: RoleType | 'All Roles';
  selectedLocation: LocationType | 'All Locations';
  onRoleChange: (role: RoleType | 'All Roles') => void;
  onLocationChange: (loc: LocationType | 'All Locations') => void;
  resultCount: number;
}

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: any) => void;
  icon: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative group" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800 border-2 rounded-2xl px-5 py-4 text-left transition-all duration-200 ease-in-out outline-none ${
          isOpen 
            ? 'border-brand-500 bg-white dark:bg-slate-800 ring-4 ring-brand-500/10' 
            : 'border-transparent dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`text-slate-400 dark:text-slate-500 transition-colors ${isOpen ? 'text-brand-500 dark:text-brand-400' : 'group-hover:text-brand-500 dark:group-hover:text-brand-400'}`}>
            {icon}
          </div>
          <span className={`font-semibold truncate ${value.startsWith('All') ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-slate-200'}`}>
            {value}
          </span>
        </div>
        <svg 
          className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180 text-brand-500 dark:text-brand-400' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu with Ease In/Out Animation */}
      <div 
        className={`absolute z-50 left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden origin-top transition-all duration-200 ease-out transform ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-600 py-2">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-5 py-3 cursor-pointer text-sm font-medium transition-colors duration-150 flex items-center justify-between ${
                value === option 
                  ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {option}
              {value === option && (
                <svg className="w-4 h-4 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Filters: React.FC<FiltersProps> = ({ 
  selectedRole, 
  selectedLocation, 
  onRoleChange, 
  onLocationChange,
  resultCount 
}) => {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3 rounded-[2rem] shadow-soft border border-white dark:border-slate-700 mb-12 max-w-5xl mx-auto z-40 relative transition-all">
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Role Filter */}
          <CustomSelect 
            label="Interest"
            value={selectedRole}
            options={['All Roles', ...Object.values(RoleType).filter(r => r !== 'All Roles')]}
            onChange={onRoleChange}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          {/* Location Filter */}
          <CustomSelect 
            label="Location"
            value={selectedLocation}
            options={['All Locations', ...Object.values(LocationType).filter(l => l !== 'All Locations')]}
            onChange={onLocationChange}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>

        <div className="w-full md:w-auto px-8 bg-brand-50 dark:bg-brand-900/20 rounded-2xl flex items-center justify-center md:justify-end text-brand-900 dark:text-brand-100 border border-brand-100 dark:border-brand-800 min-h-[60px] transition-colors">
           <div className="text-center md:text-right">
             <span className="block text-2xl font-bold leading-none">{resultCount}</span>
             <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Results</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;