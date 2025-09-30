// components/Header.jsx
import React from 'react';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
  };

  return (
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
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">EstateIQ</h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary" href="#">Leads</a>
          <a className="text-sm font-medium text-primary dark:text-primary font-bold" href="#">Listings</a>
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary" href="#">Clients</a>
          <a className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary" href="#">Deals</a>
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
            <a className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-lg" href="/login">Login</a>
            <a className="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90" href="/signup">Sign Up</a>
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
                  onClick={handleLogout}
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
  );
};

export default Header;