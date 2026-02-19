import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const savedPosts = localStorage.getItem('noxifyPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    const savedMessages = localStorage.getItem('noxifyMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const updatedPosts = [...posts, { id: Date.now(), content: newPost, likes: 0, comments: [] }];
      setPosts(updatedPosts);
      localStorage.setItem('noxifyPosts', JSON.stringify(updatedPosts));
      setNewPost('');
      toast.success('Post shared successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      });
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const updatedMessages = [...messages, { id: Date.now(), content: newMessage, sender: 'You' }];
      setMessages(updatedMessages);
      localStorage.setItem('noxifyMessages', JSON.stringify(updatedMessages));
      setNewMessage('');
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('noxifyPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-bold text-white">
              JK
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">John Karma</h2>
              <p className="text-purple-400">Senior Architect</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">About</h3>
            <p className="text-gray-300">Cybersecurity specialist with 15 years of experience in building secure systems.</p>
          </div>
          <div className="mt-6">
            <form onSubmit={handlePostSubmit}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What's on your mind?"
                rows="3"
              ></textarea>
              <button
                type="submit"
                className="mt-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Share
              </button>
            </form>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold text-white">
                  JK
                </div>
                <div>
                  <h3 className="font-bold text-white">John Karma</h3>
                  <p className="text-sm text-gray-300">Senior Architect</p>
                </div>
              </div>
              <p className="text-white mb-4">{post.content}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-purple-400 hover:text-purple-300 transition duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {post.likes} Likes
                </button>
                <button className="flex items-center text-blue-400 hover:text-blue-300 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global Chat Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Global Chat</h2>
          <div className="h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === 'You' ? 'bg-purple-500/30 text-white' : 'bg-blue-500/30 text-white'}`}>
                  <p className="font-semibold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleMessageSubmit} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-white/10 backdrop-blur-lg rounded-lg p-3 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;