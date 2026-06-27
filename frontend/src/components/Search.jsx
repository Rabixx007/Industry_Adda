import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { users, institutes, skillsList } from '../data/dummy';

function Search({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstitute, setFilterInstitute] = useState('all');
  const [filterSkill, setFilterSkill] = useState('all');
  const [searchType, setSearchType] = useState('users'); // 'users' or 'skills'

  const filteredUsers = users.filter(u => {
    if (u.id === user.id) return false;
    
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInstitute = filterInstitute === 'all' || u.institute === filterInstitute;
    const matchesSkill = filterSkill === 'all' || u.skills.includes(filterSkill);
    
    return matchesSearch && matchesInstitute && matchesSkill;
  });

  const handleEndorse = (userId, skill) => {
    // Simulate endorsement
    alert(`You endorsed ${users.find(u => u.id === userId)?.name} for ${skill}!`);
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

          <div className="filter-section">
            <div className="filter-group">
              <label>Institute:</label>
              <select 
                value={filterInstitute}
                onChange={(e) => setFilterInstitute(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Institutes</option>
                {institutes.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Skill:</label>
              <select 
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Skills</option>
                {skillsList.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <button 
              className="btn-reset"
              onClick={() => {
                setSearchTerm('');
                setFilterInstitute('all');
                setFilterSkill('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="results-section">
          <div className="results-header">
            <h2>Found {filteredUsers.length} innovators</h2>
          </div>

          <div className="users-grid">
            {filteredUsers.map(u => (
              <div key={u.id} className="user-card-detailed">
                <div className="user-card-header">
                  <div className="user-avatar-large">{u.avatar}</div>
                  <div className="user-header-info">
                    <h3>{u.name} {u.verified && <span className="verified-icon">✓</span>}</h3>
                    <p className="user-institute">{u.institute}</p>
                    <p className="user-details">{u.branch} • {u.year}</p>
                  </div>
                </div>

                <div className="user-card-body">
                  <p className="user-bio">{u.bio}</p>
                  
                  {u.looking && (
                    <div className="looking-for">
                      <strong>🎯 Looking for:</strong> {u.looking}
                    </div>
                  )}

                  <div className="user-skills-section">
                    <strong>Skills:</strong>
                    <div className="skills-with-endorsements">
                      {u.skills.slice(0, 5).map(skill => (
                        <div key={skill} className="skill-with-endorse">
                          <span className="skill-tag">{skill}</span>
                          {u.endorsements[skill] && (
                            <span className="endorsement-badge">
                              👍 {u.endorsements[skill]}
                            </span>
                          )}
                          <button 
                            className="btn-endorse"
                            onClick={() => handleEndorse(u.id, skill)}
                            title="Endorse this skill"
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="user-interests-section">
                    <strong>Interests:</strong>
                    <div className="interests-tags">
                      {u.interests.map(interest => (
                        <span key={interest} className="interest-tag-small">{interest}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="user-card-footer">
                  <button className="btn-connect">💬 Connect</button>
                  <button className="btn-view-profile">View Profile</button>
                </div>
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
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
