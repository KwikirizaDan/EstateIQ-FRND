import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';

const Layout = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            RealEstate
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/properties" className="text-gray-600 hover:text-gray-800">
              Properties
            </Link>
            <Link to="/listings" className="text-gray-600 hover:text-gray-800">
              Listings
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-800">
                  Profile
                </Link>
                <Link to="/deals" className="text-gray-600 hover:text-gray-800">
                  Deals
                </Link>
                <Link to="/conversations" className="text-gray-600 hover:text-gray-800">
                  Messages
                </Link>
                {user.role === 'admin' && (
                  <Link to="/users" className="text-gray-600 hover:text-gray-800">
                    Users
                  </Link>
                )}
                {user.role === 'broker' && (
                  <Link to="/leads" className="text-gray-600 hover:text-gray-800">
                    Leads
                  </Link>
                )}
                <button
                  onClick={logoutUser}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">
        <Outlet />
      </main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Layout;