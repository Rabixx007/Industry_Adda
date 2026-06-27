import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { messages, users } from '../data/dummy';

function Messaging({ user }) {
  const [conversations, setConversations] = useState(() => {
    // Get unique conversations
    const convos = new Map();
    messages.forEach(msg => {
      const otherUserId = msg.from === user.id ? msg.to : msg.from;
      if (!convos.has(otherUserId)) {
        convos.set(otherUserId, []);
      }
      convos.get(otherUserId).push(msg);
    });
    return Array.from(convos.entries()).map(([userId, msgs]) => ({
      user: users.find(u => u.id === userId),
      messages: msgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
      unread: msgs.filter(m => m.to === user.id && !m.read).length
    }));
  });

  const [selectedConversation, setSelectedConversation] = useState(
    conversations.length > 0 ? conversations[0] : null
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const msg = {
      id: `msg${Date.now()}`,
      from: user.id,
      to: selectedConversation.user.id,
      content: newMessage,
      timestamp: new Date(),
      read: false
    };

    // Add to conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.user.id === selectedConversation.user.id) {
        return {
          ...conv,
          messages: [...conv.messages, msg]
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(c => c.user.id === selectedConversation.user.id));
    setNewMessage('');
  };

  return (
    <div className="messaging-page">
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
          <Link to="/messages" className="active">Messages</Link>
        </div>
      </nav>

      <div className="messaging-container">
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <h2>💬 Messages</h2>
          </div>
          
          <div className="conversations-list">
            {conversations.length === 0 ? (
              <div className="no-conversations">
                <p>No messages yet</p>
                <Link to="/search">Find people to connect</Link>
              </div>
            ) : (
              conversations.map(conv => (
                <div
                  key={conv.user.id}
                  className={`conversation-item ${selectedConversation?.user.id === conv.user.id ? 'active' : ''}`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  <div className="conv-avatar">{conv.user.avatar}</div>
                  <div className="conv-info">
                    <div className="conv-header">
                      <h4>{conv.user.name}</h4>
                      {conv.unread > 0 && (
                        <span className="unread-badge">{conv.unread}</span>
                      )}
                    </div>
                    <p className="conv-preview">
                      {conv.messages[conv.messages.length - 1].content.substring(0, 40)}...
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="chat-area">
          {selectedConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="chat-avatar">{selectedConversation.user.avatar}</div>
                  <div>
                    <h3>{selectedConversation.user.name}</h3>
                    <p>{selectedConversation.user.institute}</p>
                  </div>
                </div>
              </div>

              <div className="messages-area">
                {selectedConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`message ${msg.from === user.id ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{msg.content}</p>
                      <span className="message-time">
                        {new Date(msg.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="message-input-area">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                />
                <button type="submit" className="btn-send">
                  Send 📤
                </button>
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
