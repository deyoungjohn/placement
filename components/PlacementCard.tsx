import React from 'react';
import { Placement, User } from '../types';

interface PlacementCardProps {
  placement: Placement;
  user: User | null;
  onApply: (company: string) => void;
}

const PlacementCard: React.FC<PlacementCardProps> = ({ placement, user, onApply }) => {
  return (
    <div className="group relative w-full h-[520px] rounded-[32px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-slate-900 dark:border dark:border-slate-700">
      
      {/* Background Image with Zoom Effect */}
      <img 
        src={placement.image} 
        alt={placement.companyName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      />

      {/* Verified Badge - Pops from image top right */}
      {placement.verified && (
        <div className="absolute top-5 right-5 z-20 animate-float-delayed">
          <div className="bg-white/95 backdrop-blur-md text-slate-900 px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg border border-white/50">
            <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm4.458 2.75a.75.75 0 00-1.06-1.06l-4.5 4.5a.75.75 0 000 1.06l1.5 1.5a.75.75 0 101.06-1.06l-1.5-1.5 4.5-4.5z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
          </div>
        </div>
      )}

      {/* Dark Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 z-10" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
        
        {/* Push content to bottom */}
        <div className="mt-auto">
          <h3 className="text-3xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-md">
            {placement.companyName}
          </h3>
          
          <p className="text-slate-200 text-sm mb-5 leading-relaxed line-clamp-2 drop-shadow-sm font-medium opacity-90">
            {placement.description}
          </p>

          {/* Tags & Rating Row */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {/* Rating Pill */}
            <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold">{placement.rating}</span>
            </div>

            {/* Location Pill */}
            <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm">
              {placement.location}
            </div>

            {/* Role Pill - Shortened for design */}
            <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm truncate max-w-[120px]">
              {placement.role.replace('Development', 'Dev')}
            </div>

            {/* Stipend Pill */}
            <div className={`backdrop-blur-md border px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${
              placement.stipend 
                ? 'bg-green-500/20 border-green-400/30 text-green-300' 
                : 'bg-red-500/20 border-red-400/30 text-red-300'
            }`}>
              {placement.stipend ? 'Paid' : 'Unpaid'}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onApply(placement.companyName)}
            className="w-full bg-white text-slate-950 font-extrabold text-base py-4 rounded-full transition-all duration-300 hover:bg-brand-50 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center"
          >
            {user ? 'APPLY NOW' : 'Log in to Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlacementCard;