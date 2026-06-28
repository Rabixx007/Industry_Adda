import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSave = async () => {
    const res = await fetch('/api/users/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: editedUser.name,
        bio: editedUser.bio,
        skills: editedUser.skills,
        github: editedUser.github,
        linkedin: editedUser.linkedin,
        avatar: editedUser.avatar
      })
    });
    if (res.ok) setIsEditing(false);
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
          <div className="profile-avatar-large">🎓</div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="profile-email">📧 {user.email}</p>
            <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>📝 Bio</h2>
            {isEditing ? (
              <textarea
                value={editedUser.bio || ''}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                rows="4"
                className="edit-input"
              />
            ) : (
              <p>{user.bio || 'No bio yet.'}</p>
            )}
          </div>

          <div className="profile-section">
            <h2>💪 Skills</h2>
            <div className="skills-grid">
              {(user.skills || []).map(skill => (
                <div key={skill} className="skill-badge">
                  <span>{skill}</span>
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="skill-selector">
                <p>Add skill (press Enter):</p>
                <input
                  type="text"
                  placeholder="e.g. React"
                  className="edit-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      setEditedUser({ ...editedUser, skills: [...(editedUser.skills || []), e.target.value] });
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="profile-section">
            <h2>🔗 Links</h2>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedUser.github || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, github: e.target.value })}
                  placeholder="GitHub URL"
                  className="edit-input"
                />
                <input
                  type="text"
                  value={editedUser.linkedin || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, linkedin: e.target.value })}
                  placeholder="LinkedIn URL"
                  className="edit-input"
                />
              </>
            ) : (
              <>
                {user.github && <p>GitHub: <a href={user.github} target="_blank" rel="noreferrer">{user.github}</a></p>}
                {user.linkedin && <p>LinkedIn: <a href={user.linkedin} target="_blank" rel="noreferrer">{user.linkedin}</a></p>}
                {!user.github && !user.linkedin && <p>No links added yet.</p>}
              </>
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