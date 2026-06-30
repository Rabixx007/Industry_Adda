import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

function Profile({ user, onLogout }) {
  const { id } = useParams();
  const isOwnProfile = !id || id === user.id;
  const [viewedUser, setViewedUser] = useState(isOwnProfile ? user : null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    if (isOwnProfile) {
      setViewedUser(user);
    } else {
      fetch(`/api/users/${id}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => setViewedUser(data))
        .catch(err => console.error('Failed to load profile:', err));
    }
  }, [id, isOwnProfile, user]);

  const handleConnect = async () => {
    await fetch('/api/match/swipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ targetId: id, direction: 'right' })
    });
  };

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
      <Navbar onLogout={onLogout} />
      {!viewedUser ? <p>Loading...</p> : (
        <>

          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-avatar-large">🎓</div>
              <div className="profile-info">
                <h1>{viewedUser.name}</h1>
                {isOwnProfile && <p className="profile-email">📧 {viewedUser.email}</p>}
                {isOwnProfile ? (
                  <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                ) : (
                  <button className="btn-connect" onClick={handleConnect}>💬 Connect</button>
                )}
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
                  <p>{viewedUser.bio || 'No bio yet.'}</p>
                )}
              </div>

              <div className="profile-section">
                <h2>💪 Skills</h2>
                <div className="skills-grid">
                  {(viewedUser.skills || []).map(skill => (
                    <div key={skill} className="skill-badge">
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
                {isOwnProfile && isEditing && (
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
                    {viewedUser.github && <p>GitHub: <a href={viewedUser.github} target="_blank" rel="noreferrer">{viewedUser.github}</a></p>}
                    {viewedUser.linkedin && <p>LinkedIn: <a href={viewedUser.linkedin} target="_blank" rel="noreferrer">{viewedUser.linkedin}</a></p>}
                    {!viewedUser.github && !viewedUser.linkedin && <p>No links added yet.</p>}
                  </>
                )}
              </div>

              {isOwnProfile && isEditing && (
                <button onClick={handleSave} className="btn-save">
                  💾 Save Changes
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;