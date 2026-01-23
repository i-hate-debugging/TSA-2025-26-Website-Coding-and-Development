'use client';

import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Resource } from '@/types/resource';

export default function AdminDashboard() {
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
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return <div>Please sign in to access the admin dashboard.</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderBottomColor: '#A8BBA3'}}></div>
      </div>
    );
  }

  return (
    <section className="py-24" style={{backgroundColor: '#F7F4EA'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold" style={{color: '#B87C4C'}}>
            Admin Dashboard
          </h2>
          <button
            onClick={handleSignOut}
            className="px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            style={{backgroundColor: '#FFA4A4', color: 'white'}}
          >
            Sign Out
          </button>
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
    </section>
  );
}
