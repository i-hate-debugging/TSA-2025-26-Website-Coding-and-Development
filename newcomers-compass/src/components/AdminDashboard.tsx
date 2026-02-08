'use client';

import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, deleteDoc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Resource, PendingResource } from '@/types/resource';

interface AdminDashboardProps {
  onSignOut?: () => void;
}

export default function AdminDashboard({ onSignOut }: AdminDashboardProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [pendingResources, setPendingResources] = useState<PendingResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [activeTab, setActiveTab] = useState<'resources' | 'pending'>('resources');
  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    description: '',
    website: '',
    imageUrl: ''
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchResources();
        fetchPendingResources();
      } else {
        setResources([]);
        setPendingResources([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const fetchResources = async () => {
    try {
      const q = query(collection(db, 'resources'));
      const querySnapshot = await getDocs(q);
      const resourcesData: Resource[] = querySnapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
          id: data.id, // Use YOUR custom numeric ID from data
          firestoreId: doc.id, // Keep Firebase ID for reference
          ...data
        };
      });
      setResources(resourcesData);
      console.log('Fetched resources:', resourcesData.map(r => ({ 
        customId: r.id,           // Your numeric ID
        firebaseId: (r as any).firestoreId, // Firebase ID
        customIdType: typeof r.id,
        title: r.title 
      })));
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const fetchPendingResources = async () => {
    try {
      const q = query(collection(db, 'pending_resources'));
      const querySnapshot = await getDocs(q);
      const pendingData: PendingResource[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PendingResource[];
      setPendingResources(pendingData);
    } catch (error) {
      console.error('Error fetching pending resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resource: Resource) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        const firebaseId = (resource as any).firestoreId;
        if (firebaseId) {
          await deleteDoc(doc(db, 'resources', firebaseId));
          fetchResources();
        } else {
          console.error('No Firebase document ID found for deletion');
        }
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const handleApprovePending = async (pendingResource: PendingResource) => {
    if (confirm('Are you sure you want to approve this submission?')) {
      try {
        // Convert pending resource to regular resource
        const approvedResource = {
          title: pendingResource.name,
          category: mapCategory(pendingResource.category),
          description: pendingResource.description,
          website: pendingResource.websiteUrl,
          imageUrl: pendingResource.imageUrl
        };
        
        await addDoc(collection(db, 'resources'), approvedResource);
        await deleteDoc(doc(db, 'pending_resources', pendingResource.id));
        
        fetchResources();
        fetchPendingResources();
      } catch (error) {
        console.error('Error approving pending resource:', error);
      }
    }
  };

  const handleRejectPending = async (id: string) => {
    if (confirm('Are you sure you want to reject this submission?')) {
      try {
        await deleteDoc(doc(db, 'pending_resources', id));
        fetchPendingResources();
      } catch (error) {
        console.error('Error rejecting pending resource:', error);
      }
    }
  };

  const mapCategory = (oldCategory: string): 'Education' | 'Food' | 'Social' | 'Transit' | 'Other' => {
    const categoryMap: Record<string, 'Education' | 'Food' | 'Social' | 'Transit' | 'Other'> = {
      'Essential Services': 'Other',
      'Social & Community': 'Social',
      'Education/ESL': 'Education',
      'Transportation': 'Transit'
    };
    return categoryMap[oldCategory] || 'Other';
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
    
    // Scroll to the form after a short delay to ensure state update
    setTimeout(() => {
      const formElement = document.getElementById('resource-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSave = async () => {
    try {
      console.log('Saving resource:', { editingResource, hasId: editingResource?.id });
      console.log('Current user:', user);
      console.log('User authenticated:', !!user);
      console.log('All resources in state:', resources.map(r => ({ 
        customId: r.id, 
        firebaseId: (r as any).firestoreId,
        title: r.title 
      })));
      
      if (editingResource && editingResource.id) {
        console.log('Attempting to update document with custom ID:', editingResource.id, 'Type:', typeof editingResource.id);
        
        // Use Firebase document ID for Firestore operations
        const firebaseId = (editingResource as any).firestoreId;
        console.log('Using Firebase document ID:', firebaseId);
        
        if (firebaseId) {
          const docRef = doc(db, 'resources', firebaseId);
          
          // First verify document exists
          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              console.log('Document exists, updating...');
              await updateDoc(docRef, formData);
              console.log('Updated document:', firebaseId);
            } else {
              console.error('Firebase document does not exist!');
            }
          } catch (docError) {
            console.error('Error checking document existence:', docError);
          }
        } else {
          console.error('No Firebase document ID found!');
        }
      } else {
        console.log('Creating new document...');
        const newDoc = await addDoc(collection(db, 'resources'), formData);
        console.log('Created new document:', newDoc.id);
        
        // Update the newly created resource with its ID
        await updateDoc(newDoc, { id: newDoc.id });
        console.log('Updated new document with ID:', newDoc.id);
      }
      setEditingResource(null);
      setFormData({
        title: '',
        category: 'Education',
        description: '',
        website: '',
        imageUrl: ''
      });
      fetchResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      console.error('Error details:', (error as any)?.code, (error as any)?.message);
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

      {/* Tab Navigation */}
      <div className="bg-white border-b" style={{borderColor: '#EBD9D1'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'resources' ? '#B87C4C' : 'transparent',
                color: activeTab === 'resources' ? '#B87C4C' : '#748DAE'
              }}
            >
              Published Resources ({resources.length})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'pending' ? '#FFA4A4' : 'transparent',
                color: activeTab === 'pending' ? '#FFA4A4' : '#748DAE'
              }}
            >
              Pending Submissions ({pendingResources.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'resources' ? (
          <>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                <p className="text-sm font-medium" style={{color: '#748DAE'}}>Transit</p>
                <p className="text-3xl font-bold mt-2" style={{color: '#B87C4C'}}>{resources.filter(r => r.category === 'Transit').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#B87C4C', opacity: 0.2}}>
                <svg className="w-6 h-6" style={{color: '#B87C4C'}} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border" style={{borderColor: '#EBD9D1'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{color: '#748DAE'}}>Other</p>
                <p className="text-3xl font-bold mt-2" style={{color: '#EBD9D1'}}>{resources.filter(r => r.category === 'Other').length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#EBD9D1', opacity: 0.3}}>
                <svg className="w-6 h-6" style={{color: '#748DAE'}} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Resource Form */}
        <div id="resource-form" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6" style={{color: '#B87C4C'}}>
            {editingResource ? 'Edit Resource' : 'Add New Resource'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1', color: '#333'}}
              >
                <option value="Education">Education</option>
                <option value="Food">Food</option>
                <option value="Social">Social</option>
                <option value="Transit">Transit</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1', color: '#333'}}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" style={{color: '#748DAE'}}>Image URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all"
                style={{borderColor: '#EBD9D1', color: '#333'}}
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
                  <th className="text-left py-3 px-4 font-semibold" style={{color: '#748DAE'}}>Title</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{color: '#748DAE'}}>Category</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{color: '#748DAE'}}>Website</th>
                  <th className="text-left py-3 px-4 font-semibold" style={{color: '#748DAE'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource) => (
                  <tr key={resource.id} className="border-b" style={{borderColor: '#EBD9D1'}}>
                    <td className="py-3 px-4" style={{color: '#333'}}>{resource.title}</td>
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
                          onClick={() => handleDelete(resource)}
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
          </>
        ) : (
          /* Pending Resources Section */
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6" style={{color: '#B87C4C'}}>
              Pending Submissions ({pendingResources.length})
            </h3>
            {pendingResources.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#EBD9D1'}}>
                  <svg className="w-8 h-8" style={{color: '#748DAE'}} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h-.5a1 1 0 00-.5.5v.5a2 2 0 002 2h.5a1 1 0 00.5-.5v-.5a2 2 0 012-2H14a2 2 0 002-2V7a2 2 0 00-2-2h-.5a1 1 0 00-.5.5V6a2 2 0 01-2 2H10a2 2 0 01-2-2v-.5a1 1 0 00-.5-.5H7a2 2 0 01-2-2V5z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{color: '#748DAE'}}>No pending submissions</h3>
                <p className="text-gray-600">All submitted resources have been reviewed</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingResources.map((pending) => (
                  <div key={pending.id} className="border rounded-xl p-6" style={{borderColor: '#EBD9D1'}}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2" style={{color: '#B87C4C'}}>{pending.name}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#EBD9D1', color: '#748DAE'}}>
                            {pending.category}
                          </span>
                          {pending.submitterName && (
                            <span className="text-sm" style={{color: '#748DAE'}}>
                              Submitted by: {pending.submitterName}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{pending.description}</p>
                        {pending.websiteUrl && (
                          <a 
                            href={pending.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium hover:underline"
                            style={{color: '#748DAE'}}
                          >
                            Visit Website →
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleApprovePending(pending)}
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                          style={{backgroundColor: '#A8BBA3', color: 'white'}}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectPending(pending.id)}
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                          style={{backgroundColor: '#FFA4A4', color: 'white'}}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    {pending.submitterEmail && (
                      <div className="text-sm" style={{color: '#748DAE'}}>
                        Contact: {pending.submitterEmail}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
