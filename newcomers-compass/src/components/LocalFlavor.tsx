'use client';

import { useState } from 'react';

export default function LocalFlavor() {
  const [activeTab, setActiveTab] = useState<'itineraries' | 'glossary'>('itineraries');

  const itineraries = [
    {
      title: "Saturday with Kids",
      duration: "Full Day",
      targetAudience: "Families with children",
      activities: [
        { time: "9:00 AM", activity: "Breakfast at Local Cafe", location: "Main Street Cafe", description: "Kid-friendly breakfast with play area" },
        { time: "10:30 AM", activity: "Library Story Time", location: "Public Library", description: "Free stories and crafts for ages 3-8" },
        { time: "12:00 PM", activity: "Picnic in Central Park", location: "Central Park", description: "Bring lunch and enjoy playground" },
        { time: "2:00 PM", activity: "Children's Museum", location: "City Children's Museum", description: "Interactive exhibits and activities" },
        { time: "4:00 PM", activity: "Ice Cream Treat", location: "Sweet Scoops", description: "Local favorite ice cream shop" }
      ]
    },
    {
      title: "A Quiet Morning for Remote Workers",
      duration: "Half Day",
      targetAudience: "Remote professionals",
      activities: [
        { time: "7:00 AM", activity: "Coffee & WiFi", location: "Quiet Bean Cafe", description: "Early morning coffee shop with reliable WiFi" },
        { time: "9:00 AM", activity: "Co-working Space", location: "The Hub", description: "Day pass available, quiet work environment" },
        { time: "12:00 PM", activity: "Healthy Lunch", location: "Green Garden", description: "Fresh salads and grain bowls" }
      ]
    }
  ];

  const glossaryTerms = [
    {
      term: "The Loop",
      definition: "Downtown area where the main bus routes circle",
      example: "Meet me at The Loop for the 2:15 bus",
      category: "Transportation"
    },
    {
      term: "Market Day",
      definition: "Every Saturday when farmers sell fresh produce at the town square",
      example: "Don't miss Market Day for the best local vegetables",
      category: "Events"
    },
    {
      term: "The Hill",
      definition: "Residential area on the east side known for great views",
      example: "She lives up on The Hill with the best sunset views",
      category: "Neighborhoods"
    },
    {
      term: "First Friday",
      definition: "Monthly art walk and street festival on the first Friday of each month",
      example: "First Friday is perfect for meeting local artists",
      category: "Events"
    },
    {
      term: "The Junction",
      definition: "Popular intersection with shops, cafes, and the main train stop",
      example: "Get off at The Junction for the best shopping",
      category: "Landmarks"
    }
  ];

  return (
    <section id="local-flavor" className="py-24" style={{backgroundColor: '#F7F4EA'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#B87C4C'}}>
            Local Flavor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our community like a local with curated itineraries and insider knowledge.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex">
            <button
              onClick={() => setActiveTab('itineraries')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                activeTab === 'itineraries'
                  ? 'text-white shadow-lg'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              🗓️ Itineraries
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                activeTab === 'glossary'
                  ? 'text-white shadow-lg'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              📖 Local Lingo
            </button>
          </div>
        </div>

        {activeTab === 'itineraries' && (
          <div className="space-y-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">A Day in the Life</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Curated experiences designed to help you discover the best of our community
              </p>
            </div>
            {itineraries.map((itinerary, index) => (
              <div key={index} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="p-8" style={{backgroundColor: '#A8BBA3'}}>
                  <div className="text-white">
                    <h4 className="text-2xl font-bold mb-4">{itinerary.title}</h4>
                    <div className="flex gap-6 text-white/90">
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {itinerary.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        {itinerary.targetAudience}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 space-y-4">
                  {itinerary.activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="flex gap-6 items-start">
                      <div className="flex-shrink-0 w-24 text-sm font-bold text-green-600 pt-1">
                        {activity.time}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <h5 className="font-bold text-lg text-gray-900 mb-2">{activity.activity}</h5>
                        <p className="text-green-600 font-medium mb-2">📍 {activity.location}</p>
                        <p className="text-gray-600">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'glossary' && (
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Local Lingo Glossary</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn the language of our community with these essential terms and phrases
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {glossaryTerms.map((term, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">{term.term}</h4>
                    <span className="text-sm px-4 py-2 text-white rounded-full font-medium" style={{backgroundColor: '#A8BBA3'}}>
                      {term.category}
                    </span>
                  </div>
                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">{term.definition}</p>
                  {term.example && (
                    <div className="rounded-xl p-4 border" style={{backgroundColor: '#BADFDB', borderColor: '#9ECAD6'}}>
                      <p className="text-sm font-medium italic" style={{color: '#748DAE'}}>
                        Example: "{term.example}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
