import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  const [user, setUser] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    if (tokens) {
      const accessToken = JSON.parse(tokens).access_token;
      if (accessToken) {
        return jwtDecode(accessToken);
      }
    }
    return null;
  });

  const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwtDecode(response.data.access_token));
      localStorage.setItem('authTokens', JSON.stringify(response.data));
    }
    return response;
  };

  const registerUser = async (name, email, password, role) => {
    return await api.post('/auth/register', { name, email, password, role });
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    registerUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access_token));
    } else {
      setUser(null);
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;