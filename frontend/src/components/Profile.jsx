import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { skillsList } from '../data/dummy';

function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSave = () => {
    // Save to localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const updatedUser = { ...currentUser, ...editedUser };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
    window.location.reload();
  };

  return (
    <div className="profile-page">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🚀 Innovator's Adda</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile" className="active">Profile</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/search">Search</Link>
          <Link to="/match">Match</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </nav>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar-large">{user.avatar}</div>
          <div className="profile-info">
            <h1>{user.name} {user.verified && <span className="verified-badge">✓ Verified</span>}</h1>
            <p className="profile-subtitle">{user.institute} • {user.branch} • {user.year}</p>
            <p className="profile-email">📧 {user.email}</p>
            <button 
              className="btn-edit" 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>📝 Bio</h2>
            {isEditing ? (
              <textarea
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                rows="4"
                className="edit-input"
              />
            ) : (
              <p>{user.bio}</p>
            )}
          </div>

          <div className="profile-section">
            <h2>🎯 Looking For</h2>
            {isEditing ? (
              <input
                type="text"
                value={editedUser.looking}
                onChange={(e) => setEditedUser({ ...editedUser, looking: e.target.value })}
                placeholder="What are you looking for?"
                className="edit-input"
              />
            ) : (
              <p>{user.looking || 'Not specified'}</p>
            )}
          </div>

          <div className="profile-section">
            <h2>💪 Skills</h2>
            <div className="skills-grid">
              {user.skills.map(skill => (
                <div key={skill} className="skill-badge">
                  <span>{skill}</span>
                  {user.endorsements[skill] && (
                    <span className="endorsement-count">
                      👍 {user.endorsements[skill]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="skill-selector">
                <p>Add more skills:</p>
                <select 
                  onChange={(e) => {
                    if (!editedUser.skills.includes(e.target.value)) {
                      setEditedUser({ 
                        ...editedUser, 
                        skills: [...editedUser.skills, e.target.value] 
                      });
                    }
                  }}
                  className="skill-select"
                >
                  <option value="">Select a skill</option>
                  {skillsList.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="profile-section">
            <h2>🎨 Interests</h2>
            <div className="interests-list">
              {user.interests.map(interest => (
                <span key={interest} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>🚀 Projects ({user.projects.length})</h2>
            {user.projects.length > 0 ? (
              <div className="projects-list">
                {user.projects.map(projectId => (
                  <div key={projectId} className="project-item">
                    Project {projectId}
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects yet. <Link to="/projects">Start one!</Link></p>
            )}
          </div>

          {isEditing && (
            <button onClick={handleSave} className="btn-save">
              💾 Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
