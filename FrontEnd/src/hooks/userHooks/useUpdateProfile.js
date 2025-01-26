import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from '../../redux/userStore/userSlice';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const useUpdateProfile = (user) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword field
    profilepic: '',
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirmPassword visibility
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: '',
        confirmPassword: '',
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

    // Basic validation for matching passwords
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(updateProfileStart());
    try {
      // If you want to send the profile pic, handle it as FormData.
      // Otherwise, if not uploading a file, just use JSON.stringify
      const updatedData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        profilepic: formData.profilepic, // Assuming the profile picture is a URL or base64
      };

      const res = await fetch('/api/user/updateProfile', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json", // Using JSON for the payload
        },
        body: JSON.stringify(updatedData), // Sending the data as JSON
      });

      const data = await res.json();
      if (data.error) {
        dispatch(updateProfileFailure(data.error));
      }

      dispatch(updateProfileSuccess(data));
      toast.success('Profile updated successfully');
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      toast.error(error.message);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return {
    formData,
    profilePicFile,
    fileInputRef,
    passwordVisible,
    confirmPasswordVisible,
    handleChange,
    handleProfilePicChange,
    handleAvatarClick,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};

export default useUpdateProfile;
