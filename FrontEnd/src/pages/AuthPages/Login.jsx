import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username,password } = formData;

    if (!username ||  !password) {
      setError('All fields are required');
      return;
    }

    // Proceed with form submission
    setError('');
    console.log('Form submitted', formData);
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
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
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
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className={`${theme.primary} text-white font-semibold w-full py-2 rounded-md hover:opacity-90 transition-opacity`}
          >
           Login
          </button>
        </form>
      <div className='flex items-center justify-center gap-4 mt-3'>
      <span className={`block text-sm font-small mb-1 ${theme.text}`}>{"Don't have an account?"}</span>
      <Link to="/signup" className={`block text-sm font-small mb-1 ${theme.text} hover:underline hover:text-black`} > Sign up</Link>
      </div>
        <Link
            to="/forget-password"
            className={`block text-md font-semibold mb-1 ${theme.text} hover:underline hover:text-blue-600 text-center`}
          >
           Forget Password
        </Link>
      </div>
    </div>
  );
}