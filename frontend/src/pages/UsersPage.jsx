import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const UsersPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/');
        setUsers(response.data);
      } catch (error) {
        toast.error('You do not have permission to view this page.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'admin') {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (user?.role !== 'admin') {
    return (
      <div className="text-center text-red-500 mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="mt-2">You are not authorized to view this page.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map(u => (
                <tr key={u.id} className="hover:bg-gray-100">
                  <td className="py-4 px-6 whitespace-nowrap">{u.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{u.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap capitalize">{u.role}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        u.is_verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {u.is_verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;