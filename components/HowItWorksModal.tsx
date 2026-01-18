import React from 'react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      title: "Define Your Profile",
      desc: "Select your course (e.g., Computer Engineering) and your specific area of interest (e.g., Hardware, Networking). The system uses this to filter out irrelevant listings."
    },
    {
      title: "Smart Search",
      desc: "Browse our database of Abuja-based tech companies. Use the \"Tech Focus\" filter to find placements that actually match your Industrial Training requirements."
    },
    {
      title: "Verify the Experience",
      desc: "Don’t guess. Check the \"Verified\" tags and read reviews from past students to confirm that the company offers hands-on practical training."
    },
    {
      title: "Bookmark & Connect",
      desc: "Save your favorite placements to your dashboard. When you are ready, use the provided contact details to apply directly to the company."
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl w-full max-w-3xl overflow-hidden relative z-10 animate-float transform scale-100 max-h-[90vh] overflow-y-auto transition-colors">
        <div className="p-8 md:p-12">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight mb-2 transition-colors">
                Find a Verified Tech <br/>
                <span className="text-brand-600 dark:text-brand-400">Placement in 4 Steps</span>
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-full text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white transition-colors flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed border-b border-slate-100 dark:border-slate-700 pb-8 transition-colors">
            Stop relying on word-of-mouth. Our system filters out non-technical roles so you can focus on gaining real skills.
          </p>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex-col items-center hidden md:flex">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-slate-700 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-xl border border-brand-100 dark:border-slate-600 shadow-sm transition-colors group-hover:bg-brand-600 group-hover:text-white dark:group-hover:text-white">
                    {index + 1}
                  </div>
                  {index !== steps.length - 1 && (
                     <div className="w-0.5 h-full bg-slate-100 dark:bg-slate-700 my-2 transition-colors"></div>
                  )}
                </div>
                
                {/* Mobile Numbering */}
                <div className="md:hidden flex-shrink-0">
                   <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-slate-700 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg border border-brand-100 dark:border-slate-600 transition-colors">
                    {index + 1}
                  </div>
                </div>

                <div className="pb-2">
                   <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 transition-colors">{step.title}</h4>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg transition-colors">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-end transition-colors">
            <button 
              onClick={onClose}
              className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-1"
            >
              Got it, let's start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;