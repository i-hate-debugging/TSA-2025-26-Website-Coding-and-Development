import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WorklogPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FCF9EA'}}>
      <Header activeSection="worklog" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: '#B87C4C'}}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{color: '#B87C4C'}}>TSA Work Log</h1>
              <p className="text-sm" style={{color: '#748DAE'}}>Project timeline and progress tracking</p>
            </div>
          </div>

          <div className="aspect-video mb-8">
            <iframe
              src="/TSA-worklog.pdf"
              className="w-full h-full rounded-lg"
              title="TSA Work Log"
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
              <span>Download TSA Work Log</span>
            </a>
          </div>
        </div>
      </main>

      <Footer activeSection="worklog" />
    </div>
  );
}
