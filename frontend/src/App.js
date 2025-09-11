import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import './App.css';

import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage
    setUser(null); // Reset user state
  };

  return (
    <div className="App">
      <div className="main-content">
        {user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />}
      </div>
      <Footer />
    </div>
  );
}

export default App;
