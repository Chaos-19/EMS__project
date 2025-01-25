import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/authHooks/useSignup';

export default function Signup() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { loading, error, signup } = useSignup(); 
  
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full mt-20 mb-10">
        <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <button
            type="submit"
            className={`${theme.primary} bg-blue-500 text-white font-semibold w-full py-2 rounded-md hover:opacity-90 transition-opacity`}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <div className='flex items-center justify-center gap-4 mt-3'>
          <span className={`block text-sm font-small mb-1 ${theme.text}`}>Already have an account?</span>
          <Link to="/login" className={`block text-sm font-small mb-1 ${theme.text} hover:underline hover:text-black`}>Log in</Link>
        </div>
      </div>
    </div>
  );
}