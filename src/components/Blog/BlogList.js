import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs, deleteBlog } from '../../services/blogService';
import LoadingSpinner from '../Common/LoadingSpinner';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (err) {
      setError('Failed to fetch blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlog(id);
        // Update the state to remove the deleted blog
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (err) {
        setError('Failed to delete blog post');
        console.error(err);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="blog-list-container">
      <h2>Recent Blog Posts</h2>
      {error && <div className="error-message">{error}</div>}
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.title}</h3>
              <p className="blog-meta">
                By {blog.author.username} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="blog-excerpt">
                {blog.content.substring(0, 150)}...
              </p>
              <div className="blog-actions">
                <Link to={`/blog/${blog.id}`} className="read-more">
                  Read More
                </Link>
                <button 
  style={{
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    cursor: 'pointer'
  }}
  onClick={() => handleDelete(blog.id)}
>
  Delete
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;