'use client';

import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Resource } from '@/types/resource';

interface AdminDashboardProps {
  onSignOut?: () => void;
}

export default function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Social',
    description: '',
    website: '',
    imageUrl: ''
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchResources();
      } else {
        setResources([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const fetchResources = async () => {
    try {
      const q = query(collection(db, 'resources'));
      const querySnapshot = await getDocs(q);
      const resourcesData: Resource[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      setResources(resourcesData);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteDoc(doc(db, 'resources', id));
        fetchResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      category: resource.category,
      description: resource.description,
      website: resource.website,
      imageUrl: resource.imageUrl || ''
    });
  };

  const handleSave = async () => {
    try {
      if (editingResource) {
        const docRef = doc(db, 'resources', editingResource.id);
        await updateDoc(docRef, formData);
      } else {
        await addDoc(collection(db, 'resources'), formData);
      }
      setEditingResource(null);
      setFormData({
        title: '',
        category: 'Social',
        description: '',
        website: '',
        imageUrl: ''
      });
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      onSignOut?.();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#FCF9EA'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderBottomColor: '#B87C4C'}}></div>
          <p className="text-lg" style={{color: '#748DAE'}}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#FCF9EA'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{borderBottomColor: '#B87C4C'}}></div>
          <p className="text-lg" style={{color: '#748DAE'}}>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FCF9EA'}}>
      {/* Admin Header */}
      <div className="bg-white shadow-lg border-b" style={{borderColor: '#EBD9D1'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#B87C4C'}}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{color: '#B87C4C'}}>Admin Dashboard</h1>
                <p className="text-sm" style={{color: '#748DAE'}}>Manage your resources efficiently</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-semibold" style={{color: '#B87C4C'}}>{user.email}</p>
                <p className="text-xs" style={{color: '#748DAE'}}>Administrator</p>
              </div>
              <button
                onClick={handleSignOut}
                className="px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                style={{backgroundColor: '#FFA4A4', color: 'white'}}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{color: '#748DAE'}}>Total Resources</p>
                <p className="text-3xl font-bold mt-2" style={{color: '#B87C4C'}}>{resources.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#EBD9D1'}}>
                <svg className="w-6 h-6" style={{color: '#B87C4C'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h-.5a1 1 0 00-.5.5v.5a2 2 0 002 2h.5a1 1 0 00.5-.5v-.5a2 2 0 012-2H14a2 2 0 002-2V7a2 2 0 00-2-2h-.5a1 1 0 00-.5.5V6a2 2 0 01-2 2H10a2 2 0 01-2-2v-.5a1 1 0 00-.5-.5H7a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{color: '#748DAE'}}>Social</p>
                <p className="text-3xl font-bold mt-2" style={{color: '#A8BBA3'}}>{resources.filter(r => r.category === 'Social').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#A8BBA3', opacity: 0.2}}>
                <svg className="w-6 h-6" style={{color: '#A8BBA3'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{color: '#748DAE'}}>Food</p>
                <p className="text-3xl font-bold mt-2" style={{color: '#FFA4A4'}}>{resources.filter(r => r.category === 'Food').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#FFA4A4', opacity: 0.2}}>
                <svg className="w-6 h-6" style={{color: '#FFA4A4'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2H8a3 3 0 015.83-1H16a1 1 0 110 2h-2.17A3.001 3.001 0 0114 11a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{color: '#748DAE'}}>Education</p>
                <p className="text-3xl font-bold mt-2" style={{color: '#748DAE'}}>{resources.filter(r => r.category === 'Education').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#748DAE', opacity: 0.2}}>
                <svg className="w-6 h-6" style={{color: '#748DAE'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Resource Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6" style={{color: '#B87C4C'}}>
            {editingResource ? 'Edit Resource' : 'Add New Resource'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1'}}
              >
                <option value="Social">Social</option>
                <option value="Food">Food</option>
                <option value="Education">Education</option>
                <option value="Transit">Transit</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1'}}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1'}}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
              style={{backgroundColor: '#A8BBA3', color: 'white'}}
            >
              {editingResource ? 'Update' : 'Add'} Resource
            </button>
            {editingResource && (
              <button
                onClick={() => {
                  setEditingResource(null);
                  setFormData({
                    title: '',
                    category: 'Social',
                    description: '',
                    website: '',
                    imageUrl: ''
                  });
                }}
                className="px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg bg-gray-200 text-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Resources List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-6" style={{color: '#B87C4C'}}>
            Manage Resources ({resources.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{borderColor: '#EBD9D1'}}>
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Website</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource.id} className="border-b" style={{borderColor: '#EBD9D1'}}>
                    <td className="py-3 px-4">{resource.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#BADFDB', color: '#748DAE'}}>
                        {resource.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <a href={resource.website} target="_blank" rel="noopener noreferrer" style={{color: '#748DAE'}}>
                        {resource.website}
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="px-3 py-1 rounded text-sm font-medium transition-colors"
                          style={{backgroundColor: '#A8BBA3', color: 'white'}}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="px-3 py-1 rounded text-sm font-medium transition-colors"
                          style={{backgroundColor: '#FFA4A4', color: 'white'}}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
