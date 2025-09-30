import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Layout = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_330)">
                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
            <Link to="/" className="text-xl font-bold text-slate-900 dark:text-white">EstateIQ</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary" to="/leads">Leads</Link>
            <Link className="text-sm font-medium text-primary dark:text-primary font-bold" to="/listings">Listings</Link>
            <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary" to="/clients">Clients</Link>
            <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary" to="/deals">Deals</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
            <input className="w-full max-w-xs rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary" placeholder="Search" type="text"/>
          </div>
          
          {/* Conditional rendering based on login status */}
          {!user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-lg" to="/login">Login</Link>
              <Link className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90" to="/register">Sign Up</Link>
            </div>
          ) : (
            <>
              <button className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
                <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
              </button>
              <div className="flex items-center gap-2">
                <img 
                  alt="User Avatar" 
                  className="h-10 w-10 rounded-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuClUFzYAxfFW9ia0Z8HRtHh1vakKtIMPAvvMyBKP8ktmXhmztC3IBEmqYk-L2xq79Fv2JDbJc3WN5Gp5W3rybE9DetIdG8VfTTaFW_e2HxM3NN221r4YT1kF8t1kul38Fe_uIhN7F-cBq5IGLj7Fw7qxKYAu8I5Oa_dsxq9r6cDoASkJ0stac173n5AJN8H0xHtAvMyjLj0iRm_eYh3cbqEmewYK0jWXzkr6m80MS_cbWWiU29XKMHB5GCREg4APNPytWQrFB2ASrQX"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name || user.email}</p>
                  <button 
                    onClick={logoutUser}
                    className="text-xs text-slate-500 hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
};

export default Layout;