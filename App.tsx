import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import PlacementCard from './components/PlacementCard';
import AuthModal from './components/AuthModal';
import HowItWorksModal from './components/HowItWorksModal';
import { placements } from './data/placements';
import { RoleType, LocationType, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  
  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      // Default to Light Mode (false) if no preference is saved, ignoring system preference
      return false; 
    }
    return false;
  });

  // Apply theme class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Filter States
  const [selectedRole, setSelectedRole] = useState<RoleType | 'All Roles'>('All Roles');
  const [selectedLocation, setSelectedLocation] = useState<LocationType | 'All Locations'>('All Locations');

  // Logic: Filtering the array based on user selection
  const filteredPlacements = useMemo(() => {
    return placements.filter((p) => {
      const roleMatch = selectedRole === 'All Roles' || p.role === selectedRole;
      const locationMatch = selectedLocation === 'All Locations' || p.location === selectedLocation;
      return roleMatch && locationMatch;
    });
  }, [selectedRole, selectedLocation]);

  const handleLoginSuccess = (email: string, uid: string) => {
    setUser({ email, uid });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleApply = (companyName: string) => {
    alert(`Application protocol initiated for ${companyName}.\n\nIn a full production build, this would send your CV to the company's HR endpoint.`);
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-brand-100 selection:text-brand-900 flex flex-col transition-colors duration-300">
      
      {/* Background Blobs for Modern Aesthetic - Adapted for Dark Mode */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-200/40 dark:bg-brand-900/20 blur-[100px] animate-pulse transition-colors duration-500"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-100/60 dark:bg-accent-900/20 blur-[120px] transition-colors duration-500"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-100/50 dark:bg-purple-900/20 blur-[80px] transition-colors duration-500"></div>
      </div>

      <Navbar 
        user={user} 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onLogout={handleLogout} 
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-grow">
        <Hero 
          onCtaClick={() => document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' })} 
          onHowItWorksClick={() => setIsHowItWorksOpen(true)}
        />
        
        {/* Main Content Container with extra padding for large screens */}
        <div id="listings" className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24 py-16">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors">Curated Opportunities</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">
              Browse through verified listings from top technology firms across Abuja. 
              Use the filters to narrow down by your area of interest.
            </p>
          </div>

          <Filters 
            selectedRole={selectedRole}
            selectedLocation={selectedLocation}
            onRoleChange={setSelectedRole}
            onLocationChange={setSelectedLocation}
            resultCount={filteredPlacements.length}
          />

          {/* Results Grid */}
          {filteredPlacements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlacements.map((placement) => (
                <PlacementCard 
                  key={placement.id} 
                  placement={placement} 
                  user={user}
                  onApply={handleApply}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-100 dark:border-slate-800 shadow-soft transition-all">
              <div className="bg-slate-50 dark:bg-slate-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                <svg className="h-10 w-10 text-slate-400 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white transition-colors">No placements found</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400 transition-colors">Try adjusting your filters to find more opportunities.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-t border-slate-100 dark:border-slate-800 py-12 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white font-bold">IT</div>
                <span className="font-bold text-slate-900 dark:text-white transition-colors">Abuja Placement</span>
             </div>
             <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-right transition-colors">
               &copy; 2025 Computer Engineering Department.<br/>
               IT Project • Built with React & Firebase.
             </p>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}

export default App;
