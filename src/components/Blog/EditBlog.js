// src/components/Blog/EditBlog.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { getBlogById, updateBlog } from '../../services/blogService';
import LoadingSpinner from '../Common/LoadingSpinner';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        const blog = response.data;
        
        // Check if the current user is the author
        if (blog.author.id !== currentUser?.id) {
          setError('You can only edit your own blogs');
          return;
        }
        
        setTitle(blog.title);
        setContent(blog.content);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await updateBlog(id, { title, content });
      navigate(`/blog/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error && error.includes('can only edit your own')) {
    return (
      <div className="edit-blog-container">
        <div className="error-message">{error}</div>
        <button 
          onClick={() => navigate('/')} 
          className="back-btn"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog Post</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="15"
            required
          />
        </div>
        <div className="button-group">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={() => navigate(`/blog/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;