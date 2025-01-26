import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { UserCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useUpdateProfile from '../../hooks/userHooks/useUpdateProfile';

const UpdateProfile = () => {
  const { theme } = useTheme();
  const { user } = useSelector((state) => state.user);
  
  const {
    formData,
    fileInputRef,
    passwordVisible,
    confirmPasswordVisible,
    handleChange,
    handleProfilePicChange,
    handleAvatarClick,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useUpdateProfile(user);

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} pt-20`}>
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full mt-20 mb-10">
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center relative">
            {formData.profilepic ? (
              <img
                src={formData.profilepic}
                alt="Profile"
                className="h-24 w-24 rounded-full mx-auto cursor-pointer"
                onClick={handleAvatarClick}
              />
            ) : (
              <UserCircleIcon
                className="h-24 w-24 mx-auto text-gray-500 cursor-pointer"
                onClick={handleAvatarClick}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              ref={fileInputRef}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
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
            />
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {passwordVisible ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className={`block text-sm font-medium mb-1 ${theme.text}`} htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {confirmPasswordVisible ? <EyeSlashIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`${theme.primary} bg-blue-500 text-white font-semibold w-full py-2 rounded-md hover:opacity-90 transition-opacity`}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
