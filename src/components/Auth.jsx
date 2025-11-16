import React, { useState } from 'react';
import { users, institutes } from '../data/dummy';

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

  const validateEmail = (email) => {
    // Check if email is from valid institute domain
    const validDomains = ['iit', 'nit', 'iiit', 'bits'];
    const domain = email.split('@')[1]?.toLowerCase() || '';
    return validDomains.some(d => domain.includes(d)) && email.includes('.ac.in');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login logic
      const user = users.find(u => u.email === formData.email);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials. Try: rahul.sharma@iitd.ac.in');
      }
    } else {
      // Registration logic
      if (!validateEmail(formData.email)) {
        setError('Please use your official institute email (.ac.in domain from IIT/NIT/IIIT/BITS)');
        return;
      }

      if (!formData.name || !formData.institute || !formData.year || !formData.branch) {
        setError('Please fill all required fields');
        return;
      }

      // Simulate email verification
      setEmailSent(true);
      setTimeout(() => {
        const newUser = {
          id: String(users.length + 1),
          name: formData.name,
          email: formData.email,
          institute: formData.institute,
          year: formData.year,
          branch: formData.branch,
          skills: formData.skills.split(',').map(s => s.trim()),
          interests: formData.interests.split(',').map(i => i.trim()),
          bio: formData.bio,
          looking: '',
          projects: [],
          endorsements: {},
          avatar: '🎓',
          verified: true
        };
        
        // Store registered users in localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        onLogin(newUser);
      }, 2000);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card verification-card">
          <div className="verification-icon">✉️</div>
          <h2>Verify Your Email</h2>
          <p>We've sent a verification link to <strong>{formData.email}</strong></p>
          <div className="spinner-small"></div>
          <p className="verification-text">Verifying... (simulated for demo)</p>
        </div>
      </div>
    );
  }

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
