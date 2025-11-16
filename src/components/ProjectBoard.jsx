import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, users, competitions, skillsList } from '../data/dummy';

function ProjectBoard({ user }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    skillsNeeded: [],
    category: '',
    competition: ''
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'competition' && project.competition) ||
                         (filter === 'research' && project.category === 'Research') ||
                         (filter === 'startup' && project.status.includes('Co-founder'));
    return matchesSearch && matchesFilter;
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    // Save project to localStorage
    const newProj = {
      ...newProject,
      id: `project${projects.length + 1}`,
      authorId: user.id,
      likes: 0,
      status: 'Looking for team',
      tags: newProject.category ? [newProject.category] : []
    };
    
    const savedProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    savedProjects.push(newProj);
    localStorage.setItem('userProjects', JSON.stringify(savedProjects));
    
    setShowCreateModal(false);
    setNewProject({ title: '', description: '', skillsNeeded: [], category: '', competition: '' });
  };

  return (
    <div className="project-board">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🚀 Innovator's Adda</h2>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/projects" className="active">Projects</Link>
          <Link to="/search">Search</Link>
          <Link to="/match">Match</Link>
          <Link to="/messages">Messages</Link>
        </div>
      </nav>

      <div className="project-board-content">
        <div className="board-header">
          <h1>📋 Project Board</h1>
          <button 
            className="btn-create"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Project
          </button>
        </div>

        <div className="board-controls">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''} 
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'competition' ? 'active' : ''} 
              onClick={() => setFilter('competition')}
            >
              Competitions
            </button>
            <button 
              className={filter === 'research' ? 'active' : ''} 
              onClick={() => setFilter('research')}
            >
              Research
            </button>
            <button 
              className={filter === 'startup' ? 'active' : ''} 
              onClick={() => setFilter('startup')}
            >
              Startups
            </button>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => {
            const author = users.find(u => u.id === project.authorId);
            return (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <h3>{project.title}</h3>
                  <span className="likes-badge">❤️ {project.likes}</span>
                </div>
                
                <p className="project-description">{project.description}</p>
                
                <div className="project-meta">
                  <div className="author-info">
                    <span className="author-avatar">{author?.avatar}</span>
                    <span>{author?.name}</span>
                    <span className="institute-tag">{author?.institute}</span>
                  </div>
                </div>

                {project.competition && (
                  <div className="competition-badge">
                    🏆 {project.competition}
                  </div>
                )}

                <div className="skills-needed">
                  <strong>Skills Needed:</strong>
                  <div className="skill-tags">
                    {project.skillsNeeded.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-footer">
                  <span className="status-badge">{project.status}</span>
                  <button className="btn-interest">💬 Express Interest</button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>No projects found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button onClick={() => setShowCreateModal(false)} className="modal-close">×</button>
            </div>
            
            <form onSubmit={handleCreateProject} className="create-project-form">
              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe your project..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile">Mobile</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="IoT">IoT</option>
                  <option value="Research">Research</option>
                </select>
              </div>

              <div className="form-group">
                <label>Competition (Optional)</label>
                <select
                  value={newProject.competition}
                  onChange={(e) => setNewProject({ ...newProject, competition: e.target.value })}
                >
                  <option value="">None</option>
                  {competitions.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Skills Needed</label>
                <div className="skill-checkboxes">
                  {skillsList.slice(0, 12).map(skill => (
                    <label key={skill} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newProject.skillsNeeded.includes(skill)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewProject({ 
                              ...newProject, 
                              skillsNeeded: [...newProject.skillsNeeded, skill] 
                            });
                          } else {
                            setNewProject({ 
                              ...newProject, 
                              skillsNeeded: newProject.skillsNeeded.filter(s => s !== skill) 
                            });
                          }
                        }}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-submit">Create Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectBoard;
