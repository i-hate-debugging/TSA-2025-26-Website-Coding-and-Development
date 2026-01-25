'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export default function Header({ activeSection = 'home', setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hasSectionNav = typeof setActiveSection === 'function';

  const navItems = [
    { id: 'directory', label: 'Directory', section: 'directory' as const, href: '/?section=directory', variant: 'nav' as const },
    { id: 'spotlights', label: 'Spotlights', section: 'spotlights' as const, href: '/?section=spotlights', variant: 'nav' as const },
    { id: 'submit', label: 'Submit Resource', section: 'submit' as const, href: '/?section=submit', variant: 'nav' as const },
    { id: 'admin', label: 'Admin', section: 'admin' as const, href: '/?section=admin', variant: 'nav' as const },
    { id: 'reference', label: 'Reference', href: '/reference', variant: 'nav' as const },
    { id: 'home', label: 'Get Help Now', section: 'home' as const, href: '/', variant: 'cta' as const }
  ] as const;

  const renderNavItem = (item: typeof navItems[number], isMobile = false) => {
    const isActive = activeSection === item.id;
    const isCta = item.variant === 'cta';
    const className = isCta
      ? `px-6 ${isMobile ? 'py-3 w-full' : 'py-2'} rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg${isMobile ? ' text-center' : ''}`
      : `font-medium transition-colors${isMobile ? ' py-2 text-left' : ''}`;
    const style = isCta
      ? { backgroundColor: '#FFA4A4', color: 'white' }
      : { color: isActive ? '#B87C4C' : '#748DAE' };

    if (hasSectionNav && 'section' in item && item.section) {
      return (
        <button
          key={item.id}
          onClick={() => {
            setActiveSection?.(item.section);
            if (isMobile) {
              setIsMenuOpen(false);
            }
          }}
          className={className}
          style={style}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href}
        className={className}
        style={style}
        onClick={() => {
          if (isMobile) {
            setIsMenuOpen(false);
          }
        }}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {hasSectionNav ? (
              <button
                onClick={() => setActiveSection?.('home')}
                className="flex items-center"
              >
                <h1 className="text-2xl font-bold" style={{color: '#B87C4C'}}>The Newcomer's Compass</h1>
              </button>
            ) : (
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold" style={{color: '#B87C4C'}}>The Newcomer's Compass</h1>
              </Link>
            )}
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => renderNavItem(item))}
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
              {navItems.map((item) => renderNavItem(item, true))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
