import React, { useState, useEffect } from 'react';
import { placements } from '../data/placements';

interface HeroProps {
  onCtaClick: () => void;
  onHowItWorksClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick, onHowItWorksClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Get exactly 5 cards
  const carouselItems = placements.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % carouselItems.length);
    }, 3500); // Change slide every 3.5 seconds
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const getCardStyle = (index: number) => {
    // Calculate relative position to the active index
    // We want a circular buffer: 0, 1, 2, 3, 4
    const length = carouselItems.length;
    // Calculate distance accounting for wrap-around
    const diff = (index - activeIndex + length) % length;

    // Logic for visual positioning
    // diff 0 = Center (Active)
    // diff 1 = Right (Next)
    // diff 4 (aka -1) = Left (Prev)
    // diff 2 = Far Right
    // diff 3 = Far Left
    
    if (diff === 0) {
      // CENTER: In focus, full scale, top z-index
      return "z-30 scale-100 opacity-100 translate-x-0 shadow-2xl";
    } else if (diff === 1) {
      // RIGHT: Waiting to enter, smaller, shifted right
      return "z-20 scale-90 opacity-60 translate-x-[60%] shadow-xl";
    } else if (diff === length - 1) {
      // LEFT: Exiting, smaller, shifted left
      return "z-20 scale-90 opacity-60 -translate-x-[60%] shadow-xl";
    } else if (diff === 2) {
      // FAR RIGHT: Hidden behind right
      return "z-10 scale-75 opacity-0 translate-x-[120%]";
    } else {
      // FAR LEFT: Hidden behind left
      return "z-10 scale-75 opacity-0 -translate-x-[120%]";
    }
  };

  return (
    <div className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Updated Container with more padding on large screens */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left z-20">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1.5 mb-8 shadow-sm cursor-default hover:border-brand-300 dark:hover:border-brand-500 transition-colors animate-float">
              <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">2024 Abuja Placement List</span>
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight transition-colors">
              Launch Your <br className="hidden lg:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">Tech Career</span> Faster
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed transition-colors">
              Connect directly with verified IT firms in Abuja. We automate the search so you can focus on your Industrial Training defense.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onCtaClick}
                className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-1"
              >
                Find Placements
              </button>
              <button 
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 text-lg font-bold px-8 py-4 rounded-full transition-all hover:shadow-lg"
              >
                How it Works
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200 flex items-center justify-center overflow-hidden transition-transform hover:-translate-y-1">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Avatar" className="w-full h-full" />
                    </div>
                  ))}
               </div>
               <div className="text-sm">
                  <span className="font-bold text-brand-600 dark:text-brand-400 block transition-colors">500+ Students</span>
                  <span className="text-slate-500 dark:text-slate-400 transition-colors">already placed in Abuja</span>
               </div>
            </div>
          </div>

          {/* Right Visuals - Animated 3D Carousel */}
          <div className="flex-1 w-full relative h-[400px] flex items-center justify-center perspective-1000">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-200 to-accent-200 dark:from-brand-900/40 dark:to-accent-900/40 rounded-full blur-[80px] -z-10 opacity-60"></div>

            {/* Carousel Items */}
            <div className="relative w-[320px] h-[380px]">
              {carouselItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    absolute top-0 left-0 w-full h-full bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-700
                    transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${getCardStyle(index)}
                  `}
                >
                  {/* Image Section - Takes up top 60% */}
                  <div className="h-[60%] w-full relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.companyName}
                      className="w-full h-full object-cover"
                    />
                     {/* "Available" / Verified Tag similar to reference */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur text-brand-600 dark:text-brand-400 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      Available now
                    </div>
                  </div>

                  {/* Text Section - Bottom 40% */}
                  <div className="h-[40%] p-6 flex flex-col justify-center bg-white dark:bg-slate-800 transition-colors">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 truncate transition-colors">
                      {item.companyName}
                    </h3>
                    
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 transition-colors">
                      {item.description}
                    </p>
                    
                    <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                      {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;