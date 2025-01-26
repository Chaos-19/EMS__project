import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from '../../redux/userStore/userSlice';
import { useTheme } from '../../contexts/ThemeContext';
import { UserCircleIcon } from "@heroicons/react/24/outline";

const UpdateProfile = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    profilepic: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: '',
        profilepic: user.profilepic,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setFormData((prev) => ({
        ...prev,
        profilepic: URL.createObjectURL(file),
      }));
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfileStart());
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (profilePicFile) {
        formDataToSend.append('profilepic', profilePicFile);
      }

      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(updateProfileSuccess(data.user));
      toast.success('Profile updated successfully');
      navigate('/dashboard');
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      toast.error(error.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.background} pt-20` }>
      <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-md w-full mt-20 mb-10">
        <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center relative">
            {formData.profilepic ? (
              <img src={formData.profilepic} alt="Profile" className="h-24 w-24 rounded-full mx-auto cursor-pointer" onClick={handleAvatarClick} />
            ) : (
              <UserCircleIcon className="h-24 w-24 mx-auto text-gray-500 cursor-pointer" onClick={handleAvatarClick} />
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
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100 focus:outline-none focus:ring focus:border-blue-300"
            />
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