'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ResourceDirectory from '@/components/ResourceDirectory';
import CommunitySpotlights from '@/components/CommunitySpotlights';
import ResourceSubmissionForm from '@/components/ResourceSubmissionForm';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboard from '@/components/AdminDashboard';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch(activeSection) {
      case 'directory':
        return <ResourceDirectory />;
      case 'spotlights':
        return <CommunitySpotlights />;
      case 'submit':
        return <ResourceSubmissionForm />;
      case 'admin':
        return (
          <AdminAuth 
            onLoginSuccess={() => {
              console.log('Login success callback received');
              setActiveSection('admin-dashboard');
            }} 
          />
        );
      case 'admin-dashboard':
        return <AdminDashboard onSignOut={() => setActiveSection('admin')} />;
      case 'copyright':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#B87C4C'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{color: '#B87C4C'}}>Student Copyright Checklist</h1>
                  <p className="text-sm" style={{color: '#748DAE'}}>Essential guide for copyright compliance</p>
                </div>
              </div>
              
              <div className="aspect-video mb-8">
                <iframe
                  src="/StudentCopyrightChecklist.pdf"
                  className="w-full h-full rounded-lg"
                  title="Student Copyright Checklist"
                />
              </div>

              <div className="text-center">
                <a
                  href="/StudentCopyrightChecklist.pdf"
                  download
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                  style={{backgroundColor: '#FFA4A4', color: 'white'}}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Download Student Copyright Checklist</span>
                </a>
              </div>
            </div>
          </div>
        );
      case 'worklog':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#B87C4C'}}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{color: '#B87C4C'}}>TSA Worklog</h1>
                  <p className="text-sm" style={{color: '#748DAE'}}>Project timeline and progress tracking</p>
                </div>
              </div>
              
              <div className="aspect-video mb-8">
                <iframe
                  src="/TSA-worklog.pdf"
                  className="w-full h-full rounded-lg"
                  title="TSA Worklog"
                />
              </div>

              <div className="text-center">
                <a
                  href="/TSA-worklog.pdf"
                  download
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                  style={{backgroundColor: '#FFA4A4', color: 'white'}}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Download TSA Worklog</span>
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            <section className="relative py-32 overflow-hidden" style={{backgroundColor: '#F7F4EA'}}>
              <div className="absolute inset-0 bg-white opacity-30"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{color: '#B87C4C'}}>
                    Welcome Home
                  </h1>
                  <p className="text-xl md:text-2xl mb-12 leading-relaxed" style={{color: '#748DAE'}}>
                    Your friendly guide to thriving in our community. Discover resources, 
                    connect with neighbors, and make this place truly yours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                      onClick={() => setActiveSection('directory')}
                      className="px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl" 
                      style={{backgroundColor: '#BADFDB', color: '#748DAE'}}
                    >
                      Explore Resources
                    </button>
                    <button
                      onClick={() => setActiveSection('spotlights')}
                      className="px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105" 
                      style={{backgroundColor: 'transparent', border: '3px solid #A8BBA3', color: '#A8BBA3'}}
                    >
                      Community Highlights
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20" style={{background: 'linear-gradient(to top, #FCF9EA, transparent)'}}></div>
            </section>

            <CommunitySpotlights />
            <ResourceDirectory />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FCF9EA'}}>
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        {renderContent()}
      </main>
      
      <Footer activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}
