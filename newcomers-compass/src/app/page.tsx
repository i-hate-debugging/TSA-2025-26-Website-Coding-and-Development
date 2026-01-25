'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ResourceDirectory from '@/components/ResourceDirectory';
import CommunitySpotlights from '@/components/CommunitySpotlights';
import ResourceSubmissionForm from '@/components/ResourceSubmissionForm';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboard from '@/components/AdminDashboard';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const searchParams = useSearchParams();
  const requestedSection = searchParams.get('section');
  const homeActions = [
    {
      title: 'Explore the Directory',
      description: 'Browse community resources by category or search keywords.',
      action: () => setActiveSection('directory'),
      buttonLabel: 'Open Directory',
      accent: '#BADFDB'
    },
    {
      title: 'Meet the Spotlights',
      description: 'Discover featured programs that help newcomers thrive.',
      action: () => setActiveSection('spotlights'),
      buttonLabel: 'View Spotlights',
      accent: '#F5CBCB'
    },
    {
      title: 'Submit a Resource',
      description: 'Share a local organization or service to help others.',
      action: () => setActiveSection('submit'),
      buttonLabel: 'Submit Resource',
      accent: '#9ECAD6'
    },
    {
      title: 'Admin Portal',
      description: 'Review submissions and manage the resource list.',
      action: () => setActiveSection('admin'),
      buttonLabel: 'Go to Admin',
      accent: '#EBD9D1'
    }
  ];

  useEffect(() => {
    if (!requestedSection) {
      return;
    }

    const allowedSections = new Set([
      'home',
      'directory',
      'spotlights',
      'submit',
      'admin',
      'admin-dashboard'
    ]);

    if (allowedSections.has(requestedSection)) {
      setActiveSection(requestedSection);
    }
  }, [requestedSection]);

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
      default:
        return (
          <>
            <section className="relative py-24 overflow-hidden" style={{backgroundColor: '#F7F4EA'}}>
              <div className="absolute inset-0 bg-white opacity-30"></div>
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{color: '#B87C4C'}}>
                    Welcome to The Newcomer's Compass
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 leading-relaxed" style={{color: '#748DAE'}}>
                    A friendly starting point for new neighbors. Learn the essentials, find trusted services,
                    and connect with people who can help you feel at home.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                      onClick={() => setActiveSection('directory')}
                      className="px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
                      style={{backgroundColor: '#BADFDB', color: '#748DAE'}}
                    >
                      Start with Resources
                    </button>
                    <button
                      onClick={() => setActiveSection('submit')}
                      className="px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
                      style={{backgroundColor: 'transparent', border: '3px solid #A8BBA3', color: '#A8BBA3'}}
                    >
                      Share a Resource
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-20" style={{background: 'linear-gradient(to top, #FCF9EA, transparent)'}}></div>
            </section>

            <section className="py-16" style={{backgroundColor: '#FCF9EA'}}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#B87C4C'}}>
                    Get Started in Three Steps
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Use the Compass to discover what you need today, connect with community supports,
                    and contribute ideas that help future newcomers.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['Discover', 'Connect', 'Contribute'].map((step, index) => (
                    <div key={step} className="bg-white rounded-2xl shadow-lg p-8 border" style={{borderColor: '#EBD9D1'}}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4" style={{backgroundColor: '#B87C4C'}}>
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{color: '#748DAE'}}>
                        {step}
                      </h3>
                      <p className="text-gray-600">
                        {step === 'Discover' && 'Search for services by category, location, or need.'}
                        {step === 'Connect' && 'Learn about welcoming programs and local support groups.'}
                        {step === 'Contribute' && 'Suggest resources so the directory stays current.'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16" style={{backgroundColor: '#F7F4EA'}}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#B87C4C'}}>
                    What You Can Do
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Choose a path that fits your needs, whether you are looking for help or offering it.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {homeActions.map((action) => (
                    <div key={action.title} className="bg-white rounded-2xl shadow-lg p-8 border" style={{borderColor: '#EBD9D1'}}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{backgroundColor: action.accent}}>
                        <span className="text-2xl">★</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3" style={{color: '#748DAE'}}>
                        {action.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{action.description}</p>
                      <button
                        onClick={action.action}
                        className="px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                        style={{backgroundColor: '#B87C4C', color: 'white'}}
                      >
                        {action.buttonLabel}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="py-16" style={{backgroundColor: '#FCF9EA'}}>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border text-center" style={{borderColor: '#EBD9D1'}}>
                  <h2 className="text-3xl font-bold mb-4" style={{color: '#B87C4C'}}>
                    TSA Documentation Hub
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Find required competition documents, sources, and permissions in one place.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/reference"
                      className="px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                      style={{backgroundColor: '#BADFDB', color: '#748DAE'}}
                    >
                      Reference Page
                    </Link>
                    <Link
                      href="/worklog"
                      className="px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                      style={{backgroundColor: '#FFA4A4', color: 'white'}}
                    >
                      View Work Log
                    </Link>
                  </div>
                </div>
              </div>
            </section>
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
