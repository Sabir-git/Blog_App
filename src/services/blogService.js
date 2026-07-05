import api from './api';

const API_URL = '/blogs'; // baseURL is already set in api.js

// Get all blogs
export const getAllBlogs = () => {
  return api.get(API_URL);
};

// Get blog by ID
export const getBlogById = (id) => {
  return api.get(`${API_URL}/${id}`);
};

// Create new blog
export const createBlog = (blog) => {
  return api.post(API_URL, blog);
};

// Update blog
export const updateBlog = (id, blog) => {
  return api.put(`${API_URL}/${id}`, blog);
};

// Delete blog
export const deleteBlog = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

// Search blogs
export const searchBlogs = (keyword) => {
  return api.get(`${API_URL}/search?keyword=${keyword}`);
};

// Get blogs by author
export const getBlogsByAuthor = (author) => {
  return api.get(`${API_URL}/author/${author}`);
};

// Get blogs by tag
export const getBlogsByTag = (tag) => {
  return api.get(`${API_URL}/tag/${tag}`);
};

// Get latest blogs
export const getLatestBlogs = () => {
  return api.get(`${API_URL}/latest`);
};

const blogService = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlogs,
  getBlogsByAuthor,
  getBlogsByTag,
  getLatestBlogs
};

export default blogService;
