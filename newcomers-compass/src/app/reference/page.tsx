import Header from '@/components/Header';
import Footer from '@/components/Footer';

const sources = [
  {
    name: 'Technology Student Association (TSA) High School Competitive Events Guide 2025-2026 - Webmaster',
    details: 'Official event rules and required documentation.'
  },
  {
    name: 'Next.js Documentation',
    url: 'https://nextjs.org/docs',
    details: 'Routing, App Router structure, and build configuration.'
  },
  {
    name: 'React Documentation',
    url: 'https://react.dev/learn',
    details: 'Component structure and state management patterns.'
  },
  {
    name: 'Firebase Documentation',
    url: 'https://firebase.google.com/docs',
    details: 'Authentication, Firestore, and hosting guidance.'
  },
  {
    name: 'Tailwind CSS Documentation',
    url: 'https://tailwindcss.com/docs',
    details: 'Utility-first styling and responsive layout patterns.'
  },
  {
    name: 'Google Fonts - Geist',
    url: 'https://fonts.google.com/specimen/Geist',
    details: 'Web font used for site typography (Open Font License).'
  }
];

export default function ReferencePage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FCF9EA'}}>
      <Header activeSection="reference" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 border" style={{borderColor: '#EBD9D1'}}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#B87C4C'}}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2H8a3 3 0 015.83-1H16a1 1 0 110 2h-2.17A3.001 3.001 0 0114 11a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{color: '#B87C4C'}}>Reference Page</h1>
              <p className="text-sm" style={{color: '#748DAE'}}>Sources, permissions, and required TSA documents</p>
            </div>
          </div>

          <p className="text-sm mb-8" style={{color: '#748DAE'}}>
            All pages in this site were developed during the 2025-2026 school year.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{color: '#B87C4C'}}>Required TSA Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
                <h3 className="text-lg font-semibold mb-2" style={{color: '#748DAE'}}>Student Copyright Checklist</h3>
                <p className="text-sm text-gray-600 mb-4">Completed PDF checklist for copyright compliance.</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/StudentCopyrightChecklist.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#BADFDB', color: '#748DAE'}}
                  >
                    View PDF
                  </a>
                  <a
                    href="/StudentCopyrightChecklist.pdf"
                    download
                    className="px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#FFA4A4', color: 'white'}}
                  >
                    Download
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
                <h3 className="text-lg font-semibold mb-2" style={{color: '#748DAE'}}>Work Log</h3>
                <p className="text-sm text-gray-600 mb-4">Completed project work log for this entry.</p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/TSA-worklog.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#BADFDB', color: '#748DAE'}}
                  >
                    View PDF
                  </a>
                  <a
                    href="/TSA-worklog.pdf"
                    download
                    className="px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
                    style={{backgroundColor: '#FFA4A4', color: 'white'}}
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{color: '#B87C4C'}}>Sources and References</h2>
            <ul className="space-y-4">
              {sources.map((source) => (
                <li key={source.name} className="bg-gray-50 rounded-xl p-4 border" style={{borderColor: '#EBD9D1'}}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold transition-colors"
                      style={{color: '#748DAE'}}
                    >
                      {source.name}
                    </a>
                  ) : (
                    <p className="font-semibold" style={{color: '#748DAE'}}>{source.name}</p>
                  )}
                  <p className="text-sm mt-2 text-gray-600">{source.details}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4" style={{color: '#B87C4C'}}>Framework and Template Statement</h2>
            <div className="bg-gray-50 rounded-xl p-4 border text-sm text-gray-600" style={{borderColor: '#EBD9D1'}}>
              This website was built from scratch by the team using Next.js, React, Tailwind CSS, and Firebase.
              No pre-built templates or themes were used.
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4" style={{color: '#B87C4C'}}>Copyrighted Materials and Permissions</h2>
            <div className="bg-gray-50 rounded-xl p-4 border text-sm text-gray-600" style={{borderColor: '#EBD9D1'}}>
              No copyrighted text, images, audio, or video from external sources are included in this site at the time of submission.
              If any copyrighted materials are added in the future, written permission will be documented here.
            </div>
          </section>
        </div>
      </main>

      <Footer activeSection="reference" />
    </div>
  );
}
