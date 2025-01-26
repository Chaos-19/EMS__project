import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userStore/userSlice';
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from '../../contexts/ThemeContext';

const ProfileMenu = () => {
  const { theme, isLightMode } = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    // Add any additional logout logic here
  };

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setTimeout(() => setDropdownOpen(false), 100);
    }
  };

  return (
    <div className="relative" onBlur={handleBlur}>
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {currentUser?.profilePicture ? (
          <img src={currentUser.profilePicture} alt="Profile" className="h-8 w-8 rounded-full" />
        ) : (
          <UserCircleIcon className={`h-8 w-8 ${theme.text}`} />
        )}
        <span className="font-semibold">{currentUser?.name}</span>
      </button>
      {dropdownOpen && (
        <div ref={dropdownRef} className={`absolute right-0 mt-2 w-48 ${theme.background} border border-gray-200 rounded-md shadow-lg`}>
          <Link
            to="/my-events"
            className={`block px-4 py-2 ${isLightMode ? theme.text : 'text-black'} hover:bg-gray-100`}
          >
            My Events
          </Link>
          <Link
            to="/updateProfile"
            className={`block px-4 py-2 ${isLightMode ? theme.text : 'text-black'} hover:bg-gray-100`}
          >
            Edit Profile
          </Link>
          <Link
            to="/create-event"
            className={`block px-4 py-2 ${isLightMode ? theme.text : 'text-black'} hover:bg-gray-100`}
          >
            Create Event
          </Link>
          <button
            onClick={handleLogout}
            className={`block w-full text-left px-4 py-2 ${isLightMode ? theme.text : 'text-black'} hover:bg-gray-100`}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;