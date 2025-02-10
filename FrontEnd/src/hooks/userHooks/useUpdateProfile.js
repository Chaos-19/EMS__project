import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from '../../redux/userStore/userSlice';
import toast from 'react-hot-toast';

const useUpdateProfile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Accessing currentUser from Redux
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilepic: '',
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Set initial form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName,
        username: currentUser.username,
        email: currentUser.email,
        password: '',
        confirmPassword: '',
        profilepic: currentUser.profilepic,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilepic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    dispatch(updateProfileStart());

    try {
      const updatedData = new FormData();
      updatedData.append('fullName', formData.fullName);
      updatedData.append('username', formData.username);
      updatedData.append('email', formData.email);
      updatedData.append('password', formData.password);
      if (selectedFile) {
        updatedData.append('profilepic', selectedFile);
      }

      const res = await fetch(`/api/user/updateProfile/${currentUser._id}`, {
        method: 'PUT',
        body: updatedData,
      });

      const data = await res.json();

      if (data.error) {
        dispatch(updateProfileFailure(data.error));
        toast.error(data.error);
        return;
      }

      // Update Redux store with the new user data
      dispatch(updateProfileSuccess(data));

      toast.success('Profile updated successfully');
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      toast.error(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  return {
    formData,
    passwordVisible,
    confirmPasswordVisible,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleImageChange, // Add this to handle image change
  };
};

export default useUpdateProfile;