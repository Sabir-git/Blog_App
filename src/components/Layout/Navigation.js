// src/components/Layout/Navigation.js
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  
  // Function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <nav className="main-nav">
      <ul>
        <li className={isActive('/')}>
          <Link to="/">Home</Link>
        </li>
        
        {currentUser ? (
          <>
            <li className={isActive('/create-blog')}>
              <Link to="/create-blog">Create Post</Link>
            </li>
            <li className={isActive(`/profile/${currentUser.id}`)}>
              <Link to={`/profile/${currentUser.id}`}>My Profile</Link>
            </li>
            <li className={isActive('/my-blogs')}>
              <Link to="/my-blogs">My Blogs</Link>
            </li>
          </>
        ) : (
          <>
            <li className={isActive('/login')}>
              <Link to="/login">Login</Link>
            </li>
            <li className={isActive('/register')}>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;