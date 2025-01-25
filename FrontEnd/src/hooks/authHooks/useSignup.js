import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputValidation = ({ fullName, username, email, password, confirmPassword }) => {
        if (!fullName || !username || !email || !password || !confirmPassword) {
            toast.error('All fields are required');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        if(password.length < 6){
            toast.error('Password must be at least 6 characters');
            return false;
        }
        const validateEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };
        if (!validateEmail(email)) {
            toast.error('Invalid email format');
            return false;
        }
        return true;
    };

    const signup = async ({ fullName, username, email, password, confirmPassword }) => {
        const success = handleInputValidation({ fullName, username, email, password, confirmPassword });

        if (!success) {
            return;
        }

        setLoading(true);
        setError(null); // Clear previous errors
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, username, email, password, confirmPassword })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //set the email in the sessionStorage to be used in the verifyEmail page
            sessionStorage.setItem('pendingVerificationEmail', email);
            
            navigate("/verifyEmail");
            toast.success('Signup successful');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, signup };
};

export default useSignup;