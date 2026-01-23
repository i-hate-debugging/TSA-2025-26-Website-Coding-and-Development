import Header from '@/components/Header';
import ResourceDirectory from '@/components/ResourceDirectory';
import CommunitySpotlights from '@/components/CommunitySpotlights';
import ResourceSubmissionForm from '@/components/ResourceSubmissionForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#FCF9EA'}}>
      <Header />
      
      <main>
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
                <a
                  href="#directory"
                  className="px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl" style={{backgroundColor: '#BADFDB', color: '#748DAE'}}
                >
                  Explore Resources
                </a>
                <a
                  href="#spotlights"
                  className="px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105" style={{backgroundColor: 'transparent', border: '3px solid #A8BBA3', color: '#A8BBA3'}}
                >
                  Community Highlights
                </a>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20" style={{background: 'linear-gradient(to top, #FCF9EA, transparent)'}}></div>
        </section>

        <CommunitySpotlights />
        <ResourceDirectory />
        <ResourceSubmissionForm />
      </main>
      
      <Footer />
    </div>
  );
}
