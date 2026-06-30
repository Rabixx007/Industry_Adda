import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


function ProjectBoard({ user }) {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tech_stack: '',
    github: '',
    live_url: ''
  });

  useEffect(() => {
    fetch('/api/projects/me', { credentials: 'include' }).then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(() => { });
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        ...newProject,
        tech_stack: newProject.tech_stack.split(',').map(s => s.trim())
      })
    });
    if (res.ok) {
      const data = await res.json();
      setProjects([...projects, data.project]);
      setShowCreateModal(false);
      setNewProject({ title: '', description: '', tech_stack: '', github: '', live_url: '' });
    }
  };

  return (
    <div className="project-board">
      <Navbar />

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
            return (
              <div key={project.id} className="project-card">
                <div className="project-card-header">
                  <h3>{project.title}</h3>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-meta">
                  <div className="author-info">
                    <span className="author-avatar">👤</span>
                    <span>Unknown</span>
                  </div>
                </div>

                <div className="tech-stack">
                  <strong>Tech Stack:</strong>
                  <div className="skill-tags">
                    {(project.tech_stack || []).map(tag => (
                      <span key={tag} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="project-footer">
                  <span className="status-badge">Open</span>
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
                <label>Tech Stack *</label>
                <input
                  type="text"
                  value={newProject.tech_stack}
                  onChange={(e) => setNewProject({ ...newProject, tech_stack: e.target.value })}
                  placeholder="Enter technologies, separated by commas"
                  required
                />
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
