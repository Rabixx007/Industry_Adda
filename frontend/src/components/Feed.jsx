import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './Navbar';

function Feed({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [comments, setComments] = useState({});
  const [commentDraft, setCommentDraft] = useState({});
  const observerTarget = useRef(null);

  const loadPosts = useCallback(async (cursorParam) => {
    if (loading) return;
    setLoading(true);
    try {
      const url = cursorParam
        ? `/api/posts/feed?cursor=${encodeURIComponent(cursorParam)}`
        : '/api/posts/feed';
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      setPosts(prev => cursorParam ? [...prev, ...data.posts] : data.posts);
      setCursor(data.nextCursor);
      setHasMore(!!data.nextCursor);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    loadPosts(null);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadPosts(cursor);
        }
      },
      { threshold: 1.0 }
    );
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => { if (target) observer.unobserve(target); };
  }, [cursor, hasMore, loading, loadPosts]);

  const handlePost = async () => {
    if (!content.trim() && !imageFile) return;
    setPosting(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (imageFile) formData.append('image', imageFile);
      const res = await fetch('/api/posts', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(prev => [{ ...data.post, name: user.name, avatar: user.avatar, like_count: '0', liked_by_me: false, comment_count: '0' }, ...prev]);
        setContent('');
        setImageFile(null);
      }
    } catch (err) {
      console.error('Failed to create post:', err);
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, liked_by_me: !p.liked_by_me, like_count: String(Number(p.like_count) + (p.liked_by_me ? -1 : 1)) }
      : p
    ));
    try {
      await fetch(`/api/posts/${postId}/like`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      console.error('Failed to like post:', err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE', credentials: 'include' });
      if (res.ok) setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const toggleComments = async (postId) => {
    const isOpen = openComments[postId];
    setOpenComments(prev => ({ ...prev, [postId]: !isOpen }));
    if (!isOpen && !comments[postId]) {
      try {
        const res = await fetch(`/api/posts/${postId}/comments`, { credentials: 'include' });
        const data = await res.json();
        setComments(prev => ({ ...prev, [postId]: data.comments }));
      } catch (err) {
        console.error('Failed to load comments:', err);
      }
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentDraft[postId];
    if (!text || !text.trim()) return;
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ content: text })
      });
      if (res.ok) {
        const data = await res.json();
        setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), data.comment] }));
        setCommentDraft(prev => ({ ...prev, [postId]: '' }));
        setPosts(prev => prev.map(p => p.id === postId
          ? { ...p, comment_count: String(Number(p.comment_count) + 1) }
          : p
        ));
      }
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div className="feed-page">
      <Navbar onLogout={onLogout} />

      <div className="feed-container">
        <div className="post-composer">
          <textarea
            placeholder="Share an idea, project update, or thought..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
          <div className="composer-actions">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImageFile(e.target.files[0] || null)}
            />
            <button onClick={handlePost} disabled={posting}>
              {posting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>

        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <a href={`/profile/${post.user_id}`} className="post-author">
                {post.avatar && <img src={post.avatar} alt="" className="avatar-sm" />}
                <span>{post.name}</span>
              </a>
              {post.user_id === user.id && (
                <button onClick={() => handleDelete(post.id)} className="btn-delete-post">🗑️</button>
              )}
            </div>

            {post.content && <p className="post-content">{post.content}</p>}
            {post.image_url && <img src={post.image_url} alt="" className="post-image" />}

            <div className="post-actions">
              <button onClick={() => handleLike(post.id)} className={post.liked_by_me ? 'liked' : ''}>
                {post.liked_by_me ? '❤️' : '🤍'} {post.like_count}
              </button>
              <button onClick={() => toggleComments(post.id)}>
                💬 {post.comment_count}
              </button>
            </div>

            {openComments[post.id] && (
              <div className="comments-section">
                {(comments[post.id] || []).map(c => (
                  <div key={c.id} className="comment">
                    <strong>{c.name}:</strong> {c.content}
                  </div>
                ))}
                <div className="comment-input">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentDraft[post.id] || ''}
                    onChange={e => setCommentDraft(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleAddComment(post.id)}
                  />
                  <button onClick={() => handleAddComment(post.id)}>Send</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {hasMore && <div ref={observerTarget} className="feed-loading">Loading more...</div>}
        {!hasMore && posts.length > 0 && <p className="feed-end">You're all caught up!</p>}
      </div>
    </div>
  );
}

export default Feed;