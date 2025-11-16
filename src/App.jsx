import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProjectBoard from './components/ProjectBoard';
import Search from './components/Search';
import Messaging from './components/Messaging';
import TinderMatch from './components/TinderMatch';
import AnimatedBg from './components/AnimatedBg';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <AnimatedBg />
      <div className="app-container">
        {!currentUser ? (
          <Routes>
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard user={currentUser} onLogout={handleLogout} />} />
            <Route path="/profile" element={<Profile user={currentUser} />} />
            <Route path="/projects" element={<ProjectBoard user={currentUser} />} />
            <Route path="/search" element={<Search user={currentUser} />} />
            <Route path="/messages" element={<Messaging user={currentUser} />} />
            <Route path="/match" element={<TinderMatch user={currentUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
