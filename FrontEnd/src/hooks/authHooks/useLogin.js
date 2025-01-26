import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userStore/userSlice';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (username, password) => {
        dispatch(loginStart());
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();
            if (data.error) {
                setError(data.error); // Set error state if needed
                toast.error(data.error);
                return dispatch(loginFailure(data.error));
            }
            
            // Dispatch login success action
            localStorage.setItem('token', data.token); // Save token in localStorage
            dispatch(loginSuccess(data.validUser)); 

            // Handle successful login (e.g., redirect to dashboard)
            toast.success('Login successful');
            navigate('/'); // Adjust the path as needed
        } catch (error) {
            dispatch(loginFailure(error.message));
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, login };
};

export default useLogin;