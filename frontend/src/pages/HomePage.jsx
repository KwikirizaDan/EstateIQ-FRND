// HomePage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await api.get('/properties/');
        setProperties(response.data);
      } catch (error) {
        toast.error('Failed to fetch properties.');
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="flex flex-1">
      {/* Filters Sidebar */}
      <aside className="w-80 hidden lg:block border-r border-slate-200/80 dark:border-slate-800/80 p-6 space-y-6 overflow-y-auto">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
          <input 
            className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary" 
            placeholder="Search by address, city, or ZIP" 
            type="text"
          />
        </div>
        
        <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Filters</h2>
        
        {/* Budget Filter */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Budget</label>
          <div className="relative pt-1">
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-2 rounded-full bg-primary" style={{marginLeft: '20%', width: '60%'}}></div>
            </div>
            <div className="absolute -top-1" style={{left: '20%'}}>
              <div className="h-4 w-4 rounded-full bg-primary border-2 border-white dark:border-background-dark shadow"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 absolute left-1/2 -translate-x-1/2 mt-2">$500k</span>
            </div>
            <div className="absolute -top-1" style={{left: '80%'}}>
              <div className="h-4 w-4 rounded-full bg-primary border-2 border-white dark:border-background-dark shadow"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 absolute left-1/2 -translate-x-1/2 mt-2">$2M</span>
            </div>
          </div>
        </div>
        
        {/* Property Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="property-type">Property Type</label>
          <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="property-type">
            <option>All</option>
            <option>Single Family</option>
            <option>Condo</option>
            <option>Townhouse</option>
            <option>Plot</option>
            <option>Land</option>
          </select>
        </div>
        
        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="bedrooms">Bedrooms</label>
            <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="bedrooms">
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="bathrooms">Bathrooms</label>
            <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="bathrooms">
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
            </select>
          </div>
        </div>
        
        {/* Square Footage */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Square Footage</label>
          <div className="relative pt-1">
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
              <div className="h-2 rounded-full bg-primary" style={{marginLeft: '10%', width: '75%'}}></div>
            </div>
            <div className="absolute -top-1" style={{left: '10%'}}>
              <div className="h-4 w-4 rounded-full bg-primary border-2 border-white dark:border-background-dark shadow"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 absolute left-1/2 -translate-x-1/2 mt-2">500</span>
            </div>
            <div className="absolute -top-1" style={{left: '85%'}}>
              <div className="h-4 w-4 rounded-full bg-primary border-2 border-white dark:border-background-dark shadow"></div>
              <span className="text-xs text-slate-500 dark:text-slate-400 absolute left-1/2 -translate-x-1/2 mt-2">5000</span>
            </div>
          </div>
        </div>
        
        {/* Year Built & Lot Size */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="year-built">Year Built</label>
            <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="year-built">
              <option>Any</option>
              <option>2020+</option>
              <option>2010+</option>
              <option>2000+</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="lot-size">Lot Size</label>
            <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="lot-size">
              <option>Any</option>
              <option>1/4 acre</option>
              <option>1/2 acre</option>
              <option>1+ acre</option>
            </select>
          </div>
        </div>
        
        {/* Property Features */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="features">Property Features</label>
          <select className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-background-light dark:bg-background-dark text-sm focus:ring-primary focus:border-primary" id="features">
            <option>Select features</option>
            <option>Swimming Pool</option>
            <option>Garage</option>
            <option>Garden</option>
          </select>
        </div>
        
        <button className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors">
          Apply Filters
        </button>
        
        {/* Top Brokers Section */}
        <div className="pt-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Top Brokers</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img alt="Broker Avatar" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAOuDyYRHiIVqEHzrWG6BHWoZycwLKYL5lLjE0YOZ2c_RM9upkjvmkqvOa59dRbv4rFSN9TYu4DHXNJT7VdLLG7YV3M82OEcHVxU93tAfkj4cGxh_5yLqJmbJykhtdIymH_tpz0N1VFRFj4zJBxuNsy39wkIiI6Yxb5cOnkaDJP3zd3vMto7bRVhOJ1guR6xup4mf7iIEF4ZoOEJ2t2dsJ6vX0jYoKLdZTBovimtJHzKIcfc9BeM6dfV9Q--s6yG6xRaFjfUrVZX59"/>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Olivia Chen</h3>
                <a className="text-sm text-primary hover:underline" href="#">View listings</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt="Broker Avatar" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRSYBmzz1iYSGrIVzkNquRDQmb4pTqcLLmQMjEqzLM4lp4hj55qXylo1onX2bjLA5x2r94JNwkpu1x-OIIFKQqXL1EQjP4tOHEsTu1nTMlYYhC_HQH_XWp0CIyuszW9h2YErma1tfAtIiEicYFjggEaaWW5P2Wi7yrFdyxbLsNKDtUmWuuImsmVPC9dUOzxZe5odS6q_DeKTGpCTMtbVMfMpwN8xwnYAu8-S2mguLBkyaW90N65j7ozxXBmuMIx66ReYxv2c3O_Sum"/>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Benjamin Carter</h3>
                <a className="text-sm text-primary hover:underline" href="#">View listings</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt="Broker Avatar" className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkzA4i6JQz4GY4bs8IrwHRr8FYUmtY3Flyjor7AS7TVT4kqWUZEd9wwSGaC2g8IUjp6-aTMngzDuIvJh3y8m1haYcRSaqbSsNlBiFsNMNeIsJhPwN4p7UTSz9VLFVPAwgRREElCMQAHENm8Ro4whT3I2Sg0S3fBc0gteaB4g6FrIiRqOMW0LRS2yjox8FJmFchl_1HTe4Q3lTX19qV77jaKnn8crAr8l8yityxfVOffIB-qpyKnXbojYpmZnE-d4YlFnPZ3gsqTD64"/>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200">Sophia Rodriguez</h3>
                <a className="text-sm text-primary hover:underline" href="#">View listings</a>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Map Section */}
      <div className="flex-1 bg-slate-200 dark:bg-slate-900/50">
        <div className="relative h-full">
          <MapContainer 
            center={[0.3476, 32.5825]} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {properties.map(property => (
              <Marker key={property.id} position={[property.latitude, property.longitude]}>
                <Popup>
                  <div className="p-2">
                    <strong className="text-lg">{property.title}</strong><br />
                    <p className="text-sm text-gray-600 my-1">{property.description}</p>
                    <p className="text-primary font-bold">Price: ${property.price.toLocaleString()}</p>
                    {property.bedrooms && <p>Bedrooms: {property.bedrooms}</p>}
                    {property.bathrooms && <p>Bathrooms: {property.bathrooms}</p>}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Map Controls */}
          <div className="absolute top-6 right-6 space-y-2">
            <div className="flex flex-col rounded-lg shadow-lg bg-background-light dark:bg-background-dark">
              <button className="p-2.5 rounded-t-lg hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
                <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">add</span>
              </button>
              <button className="p-2.5 rounded-b-lg border-t border-slate-200 dark:border-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
                <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">remove</span>
              </button>
            </div>
            <button className="p-2.5 rounded-lg shadow-lg bg-background-light dark:bg-background-dark hover:bg-slate-200/60 dark:hover:bg-slate-800/60">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">my_location</span>
            </button>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-8 p-6">
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-4">
          🚀 Tailwind Test
        </h1>
        <p className="text-gray-700 mb-6">
          If Tailwind is set up correctly, this card should look neat: rounded
          corners, shadows, bold text, and spacing.
        </p>
        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Click Me
        </button>
      </div>

      {/* Alert */}
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded w-full max-w-md">
        <p className="font-bold">Success!</p>
        <p>Tailwind CSS is working perfectly 🎉</p>
      </div>
    </div>
    </div>
    
  );
};

export default HomePage;