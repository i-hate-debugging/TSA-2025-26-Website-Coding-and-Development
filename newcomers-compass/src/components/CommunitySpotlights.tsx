export default function CommunitySpotlights() {
  const spotlights = [
    {
      title: "Public Library ESL Program",
      description: "Build your English skills in a welcoming community environment. Free classes for all levels, from beginner to advanced, with certified instructors and conversation practice groups.",
      features: ["Free classes", "All levels welcome", "Conversation practice", "Certified instructors"],
      icon: "📚",
      color: "#9ECAD6"
    },
    {
      title: "Neighborhood Welcome Committee",
      description: "Get connected with local buddies who can help you navigate your new community. Home visits, neighborhood tours, and personalized support for newcomers.",
      features: ["Home visits", "Buddy program", "Neighborhood tours", "Personalized support"],
      icon: "🏠",
      color: "#F5CBCB"
    },
    {
      title: "Transit Advocacy Group",
      description: "Master local transportation with confidence. Learn how to navigate buses and trains, get help with trip planning, and understand transit systems.",
      features: ["Transit navigation", "Trip planning", "System guides", "Route assistance"],
      icon: "🚌",
      color: "#FFBDBD"
    }
  ];

  return (
    <section id="spotlights" className="py-24" style={{backgroundColor: '#F7F4EA'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#B87C4C'}}>
            Community Spotlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the heart of our community through these featured resources that make newcomers feel right at home.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spotlights.map((spotlight, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{backgroundColor: '#EBD9D1'}}></div>
              <div className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300" style={{backgroundColor: spotlight.color}}>
                  {spotlight.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{spotlight.title}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{spotlight.description}</p>
                <ul className="space-y-3">
                  {spotlight.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-500 flex items-center">
                      <svg className="w-5 h-5 mr-3 flex-shrink-0" style={{color: '#A8BBA3'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
