interface FooterProps {
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

export default function Footer({ activeSection = 'home', setActiveSection }: FooterProps) {
  return (
    <footer className="text-white" style={{backgroundColor: '#9B6B47'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4" style={{color: '#FCF9EA'}}>
              The Newcomer's Compass
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Your friendly guide to navigating our community. We're here to help you feel at home, discover local treasures, and build meaningful connections.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{color: '#FCF9EA'}}>Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => setActiveSection?.('directory')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center w-full text-left"
                >
                  <span className="mr-2">→</span> Resource Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection?.('spotlights')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center w-full text-left"
                >
                  <span className="mr-2">→</span> Community Spotlights
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection?.('submit')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center w-full text-left"
                >
                  <span className="mr-2">→</span> Submit Resource
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection?.('admin')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center w-full text-left"
                >
                  <span className="mr-2">→</span> Admin Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection?.('copyright')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center w-full text-left"
                >
                  <span className="mr-2">→</span> Copyright Guidelines
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveSection?.('worklog')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center w-full text-left"
                >
                  <span className="mr-2">→</span> TSA Worklog
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6" style={{color: '#FFA4A4'}}>Emergency Contacts</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-3 animate-pulse" style={{backgroundColor: '#FFA4A4'}}></span>
                <span className="font-medium">Emergency:</span> 911
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: '#BADFDB'}}></span>
                <span className="font-medium">Police:</span> (555) 123-4567
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: '#F5CBCB'}}></span>
                <span className="font-medium">Fire:</span> (555) 234-5678
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: '#FFBDBD'}}></span>
                <span className="font-medium">Crisis Line:</span> (555) 988-1313
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8" style={{borderTopColor: '#EBD9D1'}}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200 text-center md:text-left mb-4 md:mb-0" style={{color: '#FCF9EA'}}>
              © 2026 The Newcomer's Compass. Made with ❤️ for our community.
            </p>
            <div className="flex space-x-6 text-sm" style={{color: '#FCF9EA'}}>
              <a href="#" className="transition-colors" style={{color: '#FCF9EA'}}>Privacy Policy</a>
              <a href="#" className="transition-colors" style={{color: '#FCF9EA'}}>Terms of Service</a>
              <a href="#" className="transition-colors" style={{color: '#FCF9EA'}}>Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
