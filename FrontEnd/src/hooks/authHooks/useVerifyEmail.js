import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { verifyEmailStart, verifyEmailSuccess, verifyEmailFailure, resendVerificationStart, resendVerificationSuccess, resendVerificationFailure } from '../../redux/userStore/userSlice';

const useVerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Verify Email and Remove from Session Storage
    const verifyEmail = async (code) => {
        setLoading(true);
        setError(null); // Clear previous errors
        dispatch(verifyEmailStart());
        try {
            const res = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });

            const data = await res.json();
            if (data.error) {
                dispatch(verifyEmailFailure(data.error));
            }

            // Remove email from sessionStorage after successful verification
            sessionStorage.removeItem('pendingVerificationEmail');

            // Dispatch verify email success action
            dispatch(verifyEmailSuccess(data));

            // Handle successful verification (e.g., redirect to home page)
            toast.success('Email verified successfully');
            navigate('/');
        } catch (error) {
            dispatch(verifyEmailFailure(error.message));
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Updated Resend Code Hook
    const useResendCode = () => {
        const [canResend, setCanResend] = useState(true);
        const [resendCooldown, setResendCooldown] = useState(0);
        const [email, setEmail] = useState(null);

        // Retrieve email from sessionStorage when component mounts
        useEffect(() => {
            const storedEmail = sessionStorage.getItem('pendingVerificationEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            } else {
                toast.error('No email found. Please sign up again.');
            }
        }, []);

        const resendVerificationCode = async () => {
            if (!canResend || !email) {
                toast.error('No email found. Please sign up again.');
                return;
            }

            setCanResend(false);
            dispatch(resendVerificationStart());
            const success = await sendResendRequest(email);
            if (success) {
                // Start cooldown timer for 60 seconds
                setResendCooldown(60);
                const timer = setInterval(() => {
                    setResendCooldown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setCanResend(true);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
                dispatch(resendVerificationSuccess());
            } else {
                setCanResend(true);
                dispatch(resendVerificationFailure('Failed to resend verification code'));
            }
        };

        const sendResendRequest = async (email) => {
            try {
                const res = await fetch('/api/auth/resend-verification-code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Failed to resend verification code');

                toast.success('Verification code sent again!');
                return true;
            } catch (error) {
                toast.error(error.message);
                return false;
            }
        };

        return { canResend, resendCooldown, resendVerificationCode };
    };

    return { loading, error, verifyEmail, useResendCode };
};

export default useVerifyEmail;