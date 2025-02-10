import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from "../../contexts/ThemeContext";
import useForgetPassword from '../../hooks/authHooks/useForgetPassword';

function ForgetPassword() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { email, loading, handleChange, handleSubmit } = useForgetPassword();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <motion.div
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full mt-20 mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={`text-2xl ${theme.text} font-bold mb-6 text-center`}>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className={`block ${theme.text} mb-2`}>Email Address</label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:bg-gray-600 ${theme.text}`}
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgetPassword;