import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../../services/blogService'; // Assuming you have this service
import BlogPost from './BlogPost';
import LoadingSpinner from '../Common/LoadingSpinner';

const BlogPostContainer = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);
        setBlog(response.data);
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!blog) return <div>Blog post not found</div>;

  return (
    <BlogPost
      title={blog.title}
      author={blog.author.username}
      date={new Date(blog.createdAt).toLocaleDateString()}
      content={blog.content}
      tags={blog.tags || []}
      imageUrl={blog.imageUrl || "/api/placeholder/800/400"}
    />
  );
};

export default BlogPostContainer;