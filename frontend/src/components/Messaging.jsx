import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;

function Messaging({ user }) {
  const [matches, setMatches] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io('http://localhost', {
      path: '/socket.io',
      withCredentials: true
    });

    socket.on('new_message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on('matched', ({ with: userId }) => {
      loadMatches();
    });

    fetch('/api/match/matches', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const matchList = Array.isArray(data) ? data : (data.matches || []);
        Promise.all(matchList.map(m => {
          const otherId = m.user1_id === user.id ? m.user2_id : m.user1_id;
          return fetch(`/api/users/${otherId}`, { credentials: 'include' })
            .then(r => r.json());
        })).then(users => setMatches(users));
      });

    return () => socket.disconnect();
  }, []);

  const loadMatches = () => {
    fetch('/api/match/matches', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const matchList = data.matches || [];
        Promise.all(matchList.map(m => {
          const otherId = m.user1 === user.id ? m.user2 : m.user1;
          return fetch(`/api/users/${otherId}`, { credentials: 'include' })
            .then(r => r.json());
        })).then(users => setMatches(users));
      });
  };

  useEffect(() => {
    if (!selectedUser) return;
    fetch(`/api/messages/${selectedUser.id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setMessages(data.messages || []));
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;
    socket.emit('send_message', { receiverId: selectedUser.id, content: newMessage });
    setNewMessage('');
  };

  return (
    <div className="messaging-page">
      <nav className="navbar">
        <div className="nav-brand"><h2>🚀 Innovator's Adda</h2></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/search">Search</Link>
          <Link to="/match">Match</Link>
          <Link to="/messages" className="active">Messages</Link>
        </div>
      </nav>

      <div className="messaging-container">
        <div className="conversations-sidebar">
          <div className="sidebar-header"><h2>💬 Messages</h2></div>
          <div className="conversations-list">
            {matches.length === 0 ? (
              <div className="no-conversations">
                <p>No matches yet</p>
                <Link to="/match">Find people to match</Link>
              </div>
            ) : (
              matches.map(m => (
                <div
                  key={m.id}
                  className={`conversation-item ${selectedUser?.id === m.id ? 'active' : ''}`}
                  onClick={() => setSelectedUser(m)}
                >
                  <div className="conv-avatar">🎓</div>
                  <div className="conv-info">
                    <div className="conv-header"><h4>{m.name}</h4></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="chat-area">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="chat-avatar">🎓</div>
                  <div><h3>{selectedUser.name}</h3></div>
                </div>
              </div>

              <div className="messages-area">
                {messages.map((msg, i) => (
                  <div key={i} className={`message ${msg.sender_id === user.id ? 'sent' : 'received'}`}>
                    <div className="message-content">
                      <p>{msg.content}</p>
                      <span className="message-time">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="message-input-area">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                />
                <button type="submit" className="btn-send">Send 📤</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messaging;