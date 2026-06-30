import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function TinderMatch({ user }) {
  const [candidates, setCandidates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('/api/search?q=a', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCandidates((data.users || []).filter(u => u.id !== user.id)))
      .catch(() => { });
  }, []);

  const currentCandidate = candidates[currentIndex];

  const handleSwipe = async (direction) => {
    setSwipeDirection(direction);
    if (direction === 'right' && currentCandidate) {
      const res = await fetch('/api/match/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ targetId: currentCandidate.id, direction: 'right' })
      });
      const data = await res.json();
      if (data.matched) {
        setTimeout(() => alert(`🎉 It's a Match with ${currentCandidate.name}!`), 300);
      }
    }
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') handleSwipe('left');
    if (e.key === 'ArrowRight') handleSwipe('right');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, candidates]);

  if (!currentCandidate) {
    return (
      <div className="tinder-page">
       <Navbar />
        <div className="no-projects">
          <h2>No more people to show</h2>
          <Link to="/search">Browse via Search</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="tinder-page">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🚀 Innovator's Adda</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/search">Search</Link>
          <Link to="/match" className="active">Match</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </nav>

      <div className="tinder-content">
        <div className="tinder-header">
          <h1>💡 Find Your Co-founder</h1>
          <p>Swipe right to express interest, left to pass</p>
          <div className="match-counter">
            <span>❤️ {matches.length} matches</span>
            <span>📋 {currentIndex + 1}/{candidates.length}</span>
          </div>
        </div>

        <div className="tinder-card-container">
          <div
            className={`tinder-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
          >
            <div className="card-overlay left">❌ PASS</div>
            <div className="card-overlay right">❤️ INTERESTED</div>

            <div className="card-content">
              <div className="card-image-section">
                <div className="project-icon">💼</div>
              </div>

              <div className="card-info">
                <h2>{currentCandidate.name}</h2>
                <p className="project-desc-large">{currentCandidate.bio || 'No bio'}</p>

                <div className="tech-stack-section">
                  <h3>🧰 Skills:</h3>
                  <div className="skill-badges">
                    {(currentCandidate.skills || []).map(skill => (
                      <span key={skill} className="skill-badge">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tinder-actions">
          <button
            className="btn-swipe btn-pass"
            onClick={() => handleSwipe('left')}
          >
            <span className="btn-icon">❌</span>
            <span>Pass</span>
          </button>

          <button
            className="btn-swipe btn-info"
            onClick={() => alert(`Candidate: ${currentCandidate.name}\n\nBio: ${currentCandidate.bio || 'No bio'}`)}
          >
            <span className="btn-icon">ℹ️</span>
            <span>Info</span>
          </button>

          <button
            className="btn-swipe btn-like"
            onClick={() => handleSwipe('right')}
          >
            <span className="btn-icon">❤️</span>
            <span>Interested</span>
          </button>
        </div>

        <div className="keyboard-hint">
          <p>💡 Tip: Use ← → arrow keys to swipe</p>
        </div>
      </div>
    </div>
  );
}

export default TinderMatch;
