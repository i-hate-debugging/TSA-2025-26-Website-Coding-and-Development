'use client';

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ResourceSubmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Education',
    description: '',
    websiteUrl: '',
    address: '',
    phone: '',
    email: '',
    hours: '',
    submitterName: '',
    submitterEmail: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const categories = ['Education', 'Food', 'Social', 'Transit', 'Other'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const resourceData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status: 'pending',
        createdAt: new Date()
      };

      await addDoc(collection(db, 'pending_resources'), resourceData);
      
      setSubmitMessage('Thank you for your submission! It will be reviewed shortly.');
      setFormData({
        name: '',
        category: 'Education',
        description: '',
        websiteUrl: '',
        address: '',
        phone: '',
        email: '',
        hours: '',
        submitterName: '',
        submitterEmail: '',
        tags: ''
      });
    } catch (error) {
      console.error('Error submitting resource:', error);
      setSubmitMessage('Error submitting resource. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24" style={{backgroundColor: '#F7F4EA'}}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: '#B87C4C'}}>
            Suggest a New Resource
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us grow our community directory by sharing valuable resources you've discovered.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="websiteUrl"
                value={formData.websiteUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours
              </label>
              <input
                type="text"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                placeholder="e.g., Mon-Fri 9AM-5PM"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., free, families, spanish"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="submitterName"
                value={formData.submitterName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="submitterEmail"
                value={formData.submitterEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all" style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 w-full font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" style={{backgroundColor: '#A8BBA3', color: 'white'}}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Resource'}
          </button>

          {submitMessage && (
            <div className={`mt-6 p-6 rounded-xl text-center font-medium ${
              submitMessage.includes('Thank you') 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
