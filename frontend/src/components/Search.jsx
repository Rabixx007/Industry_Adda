import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function Search({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('users');
  const [requestedIds, setRequestedIds] = useState(new Set());
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    const hasQuery = searchTerm.length >= 2;
    const hasSkills = skillFilter.trim().length > 0;
    if (!hasQuery && !hasSkills) { setResults([]); return; }

    const delay = setTimeout(() => {
      const qParam = hasQuery ? `q=${encodeURIComponent(searchTerm)}` : 'q=';
      const skillsParam = hasSkills ? `&skills=${encodeURIComponent(skillFilter)}` : '';
      fetch(`/api/search?${qParam}&type=${searchType}${skillsParam}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setResults(data.users || data.projects || []))
        .catch(() => { });
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, searchType, skillFilter]);
  const handleSwipe = async (targetId) => {
    try {
      const res = await fetch('/api/match/swipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ targetId, direction: 'right' })
      });
      if (res.ok) {
        setRequestedIds(prev => new Set(prev).add(targetId));
      }
    } catch (err) {
      console.error('Swipe failed:', err);
    }
  };

  return (
    <div className="search-page">
      <Navbar />

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
          <div className="skill-filter-bar">
            <input
              type="text"
              className="search-input-skill"
              placeholder="Filter by skills (comma-separated, e.g. React, Node)"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
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
                  <button
                    className="btn-connect"
                    onClick={() => handleSwipe(u.id)}
                    disabled={requestedIds.has(u.id)}
                  >
                    {requestedIds.has(u.id) ? '✓ Requested' : '💬 Connect'}
                  </button>
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
