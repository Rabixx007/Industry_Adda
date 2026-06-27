import React from 'react';
import { Link } from 'react-router-dom';
import { projects, users } from '../data/dummy';

function Dashboard({ user, onLogout }) {
  const recentProjects = projects.slice(0, 4);
  const suggestedUsers = users.filter(u => u.id !== user.id).slice(0, 3);

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🚀 Innovator's Adda</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/search">Search</Link>
          <Link to="/match">Match</Link>
          <Link to="/messages">Messages</Link>
          <button onClick={onLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back, {user.name}! {user.avatar}</h1>
          <p className="subtitle">{user.institute} • {user.branch} • {user.year}</p>
          <div className="quick-actions">
            <Link to="/projects" className="action-card">
              <span className="icon">📋</span>
              <h3>Browse Projects</h3>
              <p>Find exciting projects to join</p>
            </Link>
            <Link to="/match" className="action-card">
              <span className="icon">💡</span>
              <h3>Find Co-founders</h3>
              <p>Swipe to match with ideas</p>
            </Link>
            <Link to="/search" className="action-card">
              <span className="icon">🔍</span>
              <h3>Search Talent</h3>
              <p>Connect with innovators</p>
            </Link>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>🔥 Trending Projects</h2>
              <Link to="/projects" className="view-all">View All →</Link>
            </div>
            <div className="project-grid">
              {recentProjects.map(project => (
                <div key={project.id} className="project-card-mini">
                  <div className="project-header">
                    <h3>{project.title}</h3>
                    <span className="likes">❤️ {project.likes}</span>
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <span className="status">{project.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>👥 Suggested Connections</h2>
              <Link to="/search" className="view-all">View All →</Link>
            </div>
            <div className="user-list">
              {suggestedUsers.map(u => (
                <div key={u.id} className="user-card-mini">
                  <div className="user-avatar">{u.avatar}</div>
                  <div className="user-info">
                    <h4>{u.name} {u.verified && '✓'}</h4>
                    <p>{u.institute}</p>
                    <div className="user-skills">
                      {u.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{users.length}+</span>
            <span className="stat-label">Active Innovators</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{projects.length}+</span>
            <span className="stat-label">Live Projects</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">15+</span>
            <span className="stat-label">Institutes Connected</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100+</span>
            <span className="stat-label">Collaborations</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
