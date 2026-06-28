import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Search({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('users');

  useEffect(() => {
    if (searchTerm.length < 2) { setResults([]); return; }
    const delay = setTimeout(() => {
      fetch(`/api/search?q=${searchTerm}&type=${searchType}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setResults(data.users || data.projects || []))
        .catch(() => { });
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, searchType]);

  const handleSwipe = async (targetId) => {
    await fetch('/api/match/swipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ targetId, direction: 'right' })
    });
    alert('Interest sent!');
  };

  return (
    <div className="search-page">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🚀 Innovator's Adda</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/projects">Projects</Link>
          <Link to="search" className="active">Search</Link>
          <Link to="/match">Match</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </nav>

      <div className="search-content">
        <div className="search-header">
          <h1>🔍 Discover Innovators</h1>
          <p>Find talented students across IITs and NITs</p>
        </div>

        <div className="search-controls">
          <div className="search-bar">
            <input
              type="text"
              className="search-input-large"
              placeholder="Search by name, skills, interests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <div className="results-section">
          <div className="results-header">
            <h2>Found {results.length} innovators</h2>
          </div>

          <div className="users-grid">
            {results.map(u => (
              <div key={u.id} className="user-card-detailed">
                <div className="user-card-header">
                  <div className="user-avatar-large">🎓</div>
                  <div className="user-header-info">
                    <h3>{u.name}</h3>
                    <p className="user-details">{u.email}</p>
                  </div>
                </div>

                <div className="user-card-body">
                  <p className="user-bio">{u.bio || ''}</p>


                  <div className="user-skills-section">
                    <strong>Skills:</strong>
                    <div className="skills-with-endorsements">
                      {(u.skills || []).slice(0, 5).map(skill => (
                        <div key={skill} className="skill-with-endorse">
                          <span className="skill-tag">{skill}</span>
                          <button
                            className="btn-endorse"
                            onClick={() => handleSwipe(u.id)}
                            title="Express interest"
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>

                <div className="user-card-footer">
                  <button className="btn-connect" onClick={() => handleSwipe(u.id)}>💬 Connect</button>
                  <button className="btn-view-profile" onClick={() => window.location.href = `/profile/${u.id}`}>View Profile</button>
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="no-results">
              <p>😔 No users found matching your criteria.</p>
              <p>Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
