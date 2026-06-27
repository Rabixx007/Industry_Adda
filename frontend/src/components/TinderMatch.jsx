import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, users } from '../data/dummy';

function TinderMatch({ user }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [matches, setMatches] = useState([]);

  // Filter out user's own projects
  const availableProjects = projects.filter(p => p.authorId !== user.id);

  const currentProject = availableProjects[currentIndex];
  const projectAuthor = currentProject ? users.find(u => u.id === currentProject.authorId) : null;

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    
    if (direction === 'right' && currentProject) {
      // It's a match!
      setMatches([...matches, currentProject]);
      setTimeout(() => {
        alert(`🎉 It's a Match! You liked "${currentProject.title}". Check your messages to connect!`);
      }, 300);
    }

    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex((currentIndex + 1) % availableProjects.length);
    }, 300);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') handleSwipe('left');
    if (e.key === 'ArrowRight') handleSwipe('right');
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  if (availableProjects.length === 0) {
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
        <div className="no-projects">
          <h2>No more projects to show</h2>
          <Link to="/projects">Browse all projects</Link>
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
            <span>📋 {currentIndex + 1}/{availableProjects.length}</span>
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
                <div className="project-category-badge">{currentProject.category}</div>
              </div>

              <div className="card-info">
                <h2>{currentProject.title}</h2>
                <p className="project-desc-large">{currentProject.description}</p>

                {currentProject.competition && (
                  <div className="competition-tag-large">
                    🏆 {currentProject.competition}
                  </div>
                )}

                <div className="author-section">
                  <div className="author-avatar-large">{projectAuthor?.avatar}</div>
                  <div className="author-details">
                    <h4>{projectAuthor?.name} {projectAuthor?.verified && '✓'}</h4>
                    <p>{projectAuthor?.institute}</p>
                    <p className="author-branch">{projectAuthor?.branch} • {projectAuthor?.year}</p>
                  </div>
                </div>

                <div className="skills-needed-section">
                  <h3>🔧 Skills Needed:</h3>
                  <div className="skill-badges">
                    {currentProject.skillsNeeded.map(skill => (
                      <span 
                        key={skill} 
                        className={`skill-badge ${user.skills.includes(skill) ? 'match' : ''}`}
                      >
                        {skill} {user.skills.includes(skill) && '✓'}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tags-section">
                  {currentProject.tags.map(tag => (
                    <span key={tag} className="tag-large">{tag}</span>
                  ))}
                </div>

                <div className="status-section">
                  <span className="status-badge-large">{currentProject.status}</span>
                  <span className="likes-large">❤️ {currentProject.likes} interested</span>
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
            onClick={() => alert(`Project Status: ${currentProject.status}\n\nAuthor: ${projectAuthor?.name}\nInstitute: ${projectAuthor?.institute}`)}
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
