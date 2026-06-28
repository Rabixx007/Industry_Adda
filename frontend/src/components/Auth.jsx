import React, { useState } from 'react';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    institute: '',
    year: '',
    branch: '',
    skills: '',
    interests: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      onLogin(data.user);
    } else {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Registration failed'); return; }
      onLogin(data.user);
    }
  };





  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🚀 Innovator's Adda</h1>
          <p className="tagline">Connect. Collaborate. Create.</p>
        </div>

        <div className="auth-tabs">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Institute Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={isLogin ? "rahul.sharma@iitd.ac.in" : "your.email@institute.ac.in"}
              required
            />
            {!isLogin && (
              <small>Use your official IIT/NIT/IIIT email (.ac.in)</small>
            )}
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <label>Institute *</label>
                <select
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Institute</option>
                  {institutes.map(inst => (
                    <option key={inst} value={inst}>{inst}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Year *</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="5th Year">5th Year</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Branch *</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Python, ML (comma separated)"
                />
              </div>

              <div className="form-group">
                <label>Interests</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="Web Dev, AI, Blockchain (comma separated)"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            {isLogin ? 'Login' : 'Register'}
          </button>

          {isLogin && (
            <div className="demo-hint">
              <small>💡 Demo accounts: Use any email from dummy data (e.g., rahul.sharma@iitd.ac.in)</small>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Auth;
