'use client';

import Link from 'next/link';
import { useState } from 'react';
import AssistanceChat from '@/components/AssistanceChat';

interface HeaderProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export default function Header({ activeSection = 'home', setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const hasSectionNav = typeof setActiveSection === 'function';

  const navItems = [
    { id: 'directory', label: 'Directory', section: 'directory' as const, href: '/?section=directory', variant: 'nav' as const },
    { id: 'spotlights', label: 'Spotlights', section: 'spotlights' as const, href: '/?section=spotlights', variant: 'nav' as const },
    { id: 'submit', label: 'Submit Resource', section: 'submit' as const, href: '/?section=submit', variant: 'nav' as const },
    { id: 'admin', label: 'Admin', section: 'admin' as const, href: '/?section=admin', variant: 'nav' as const },
    { id: 'reference', label: 'Reference', href: '/reference', variant: 'nav' as const },
    { id: 'assistance', label: 'Get Assistance', href: '/assistance', variant: 'cta' as const }
  ] as const;

  const renderNavItem = (item: typeof navItems[number], isMobile = false) => {
    const isActive = activeSection === item.id;
    const isCta = item.variant === 'cta';
    const className = isCta
      ? `inline-flex items-center justify-center px-6 ${isMobile ? 'py-3 w-full' : 'py-2'} rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg${isMobile ? ' text-center' : ''}`
      : `font-medium transition-colors${isMobile ? ' py-2 text-left' : ''}`;
    const style = isCta
      ? { backgroundColor: '#FFA4A4', color: 'white' }
      : { color: isActive ? '#B87C4C' : '#748DAE' };

    if (item.id === 'assistance') {
      const assistanceLabel = isChatOpen ? 'X' : item.label;
      const assistanceClassName = isCta
        ? `${className} min-w-[150px]`
        : className;

      return (
        <div key={item.id} className={isMobile ? 'w-full' : 'relative'}>
          <button
            onClick={() => {
              setIsChatOpen((prev) => !prev);
              if (isMobile) {
                setIsMenuOpen(false);
              }
            }}
            className={assistanceClassName}
            style={style}
            aria-expanded={isChatOpen}
            aria-controls="assistance-chat"
          >
            <span className="leading-none">{assistanceLabel}</span>
            {isChatOpen && <span className="sr-only">Close assistance chat</span>}
          </button>

          {!isMobile && isChatOpen && (
            <div id="assistance-chat" className="absolute right-0 top-full mt-4 w-[380px] z-50">
              <div className="relative">
                <div
                  className="absolute right-8 -top-2 h-4 w-4 rotate-45 border-l border-t"
                  style={{backgroundColor: 'white', borderColor: '#EBD9D1'}}
                />
                <AssistanceChat />
              </div>
            </div>
          )}
        </div>
      );
    }

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
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100 relative">
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

          <button
            className="font-medium transition-colors md:hidden"
            style={{color: '#748DAE'}}
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

      {isChatOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsChatOpen(false)}
            aria-label="Close chat"
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="absolute right-4 top-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow z-10"
                style={{backgroundColor: '#FFA4A4', color: 'white'}}
                aria-label="Close chat"
              >
                ×
              </button>
              <AssistanceChat />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
