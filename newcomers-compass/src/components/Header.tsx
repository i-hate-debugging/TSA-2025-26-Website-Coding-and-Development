'use client';

import { useState } from 'react';

interface HeaderProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export default function Header({ activeSection = 'home', setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button 
              onClick={() => setActiveSection?.('home')}
              className="flex items-center"
            >
              <h1 className="text-2xl font-bold" style={{color: '#B87C4C'}}>The Newcomer's Compass</h1>
            </button>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveSection?.('directory')}
              className="font-medium transition-colors" 
              style={{color: activeSection === 'directory' ? '#B87C4C' : '#748DAE'}}
            >
              Directory
            </button>
            <button 
              onClick={() => setActiveSection?.('spotlights')}
              className="font-medium transition-colors" 
              style={{color: activeSection === 'spotlights' ? '#B87C4C' : '#748DAE'}}
            >
              Spotlights
            </button>
            <button 
              onClick={() => setActiveSection?.('submit')}
              className="font-medium transition-colors" 
              style={{color: activeSection === 'submit' ? '#B87C4C' : '#748DAE'}}
            >
              Submit Resource
            </button>
            <button 
              onClick={() => setActiveSection?.('admin')}
              className="font-medium transition-colors" 
              style={{color: activeSection === 'admin' ? '#B87C4C' : '#748DAE'}}
            >
              Admin
            </button>
            <button 
              onClick={() => setActiveSection?.('copyright')}
              className="font-medium transition-colors" 
              style={{color: activeSection === 'copyright' ? '#B87C4C' : '#748DAE'}}
            >
              Copyright
            </button>
            <button 
              onClick={() => setActiveSection?.('worklog')}
              className="font-medium transition-colors" 
              style={{color: activeSection === 'worklog' ? '#B87C4C' : '#748DAE'}}
            >
              Worklog
            </button>
            <button 
              onClick={() => setActiveSection?.('home')}
              className="px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg" 
              style={{backgroundColor: '#FFA4A4', color: 'white'}}
            >
              Get Help Now
            </button>
          </nav>

          <button className="font-medium transition-colors" style={{color: '#748DAE'}}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => { setActiveSection?.('directory'); setIsMenuOpen(false); }}
                className="font-medium py-2 transition-colors text-left" 
                style={{color: activeSection === 'directory' ? '#B87C4C' : '#748DAE'}}
              >
                Directory
              </button>
              <button 
                onClick={() => { setActiveSection?.('spotlights'); setIsMenuOpen(false); }}
                className="font-medium py-2 transition-colors text-left" 
                style={{color: activeSection === 'spotlights' ? '#B87C4C' : '#748DAE'}}
              >
                Spotlights
              </button>
              <button 
                onClick={() => { setActiveSection?.('submit'); setIsMenuOpen(false); }}
                className="font-medium py-2 transition-colors text-left" 
                style={{color: activeSection === 'submit' ? '#B87C4C' : '#748DAE'}}
              >
                Submit Resource
              </button>
              <button 
                onClick={() => { setActiveSection?.('admin'); setIsMenuOpen(false); }}
                className="font-medium py-2 transition-colors text-left" 
                style={{color: activeSection === 'admin' ? '#B87C4C' : '#748DAE'}}
              >
                Admin
              </button>
              <button 
                onClick={() => { setActiveSection?.('copyright'); setIsMenuOpen(false); }}
                className="font-medium py-2 transition-colors text-left" 
                style={{color: activeSection === 'copyright' ? '#B87C4C' : '#748DAE'}}
              >
                Copyright
              </button>
              <button 
                onClick={() => { setActiveSection?.('worklog'); setIsMenuOpen(false); }}
                className="font-medium py-2 transition-colors text-left" 
                style={{color: activeSection === 'worklog' ? '#B87C4C' : '#748DAE'}}
              >
                Worklog
              </button>
              <button 
                onClick={() => { setActiveSection?.('home'); setIsMenuOpen(false); }}
                className="px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg w-full" 
                style={{backgroundColor: '#FFA4A4', color: 'white'}}
              >
                Get Help Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
