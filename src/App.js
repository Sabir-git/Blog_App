import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BlogList from './components/Blog/BlogList';
import BlogPost from './components/Blog/BlogPost';
import CreateBlog from './components/Blog/CreateBlog';
import EditBlog from './components/Blog/EditBlog';
import PrivateRoute from './components/Common/PrivateRoute';
import { AuthProvider } from './components/Auth/AuthContext';
import './index.css';
//import { Routes, Route } from 'react-router-dom';
import BlogPostContainer from './components/Blog/BlogPostContaine';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPostContainer />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route 
                path="/create-blog" 
                element={
                  <PrivateRoute>
                    <CreateBlog />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/edit-blog/:id" 
                element={
                  <PrivateRoute>
                    <EditBlog />
                  </PrivateRoute>
                } 
              />
            </Routes>
            
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;