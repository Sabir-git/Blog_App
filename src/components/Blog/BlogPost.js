import React from 'react';

const BlogPost = ({ 
  title = "My Amazing Blog Post",
  author = "John Doe",
  date = "April 11, 2025",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus vel lorem finibus, non facilisis orci porta.",
  tags = ["React", "JavaScript", "Web Development"],
  imageUrl = "/api/placeholder/800/400"
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-64 object-cover rounded-lg mb-6" 
      />
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{date}</span>
        <div>
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <span className="text-gray-600 font-semibold">
            {author.split(' ').map(name => name[0]).join('')}
          </span>
        </div>
        <span className="text-gray-700">{author}</span>
      </div>
      
      <div className="prose max-w-none">
        {typeof content === 'string' ? (
          <p className="text-gray-700 leading-relaxed">{content}</p>
        ) : content}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="ml-1">Like</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span className="ml-1">Comment</span>
            </button>
          </div>
          <button className="flex items-center text-gray-500 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            <span className="ml-1">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;