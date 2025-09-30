import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setProfile(response.data);
      } catch (error) {
        toast.error('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (!profile) {
    return <div className="text-center text-red-500 mt-10">Could not load profile.</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-600">
            {profile.name.charAt(0)}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-200 pt-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Role</dt>
            <dd className="mt-1 text-lg text-gray-900 capitalize">{profile.role}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Verification Status</dt>
            <dd className="mt-1">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  profile.is_verified
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {profile.is_verified ? 'Verified' : 'Not Verified'}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProfilePage;