import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import useVerifyEmail from "../../hooks/authHooks/useVerifyEmail";

const EmailVerificationPage = () => {
    const { theme } = useTheme();
    const { loading, error, verifyEmail, useResendCode } = useVerifyEmail();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const email = "user@example.com"; // Replace with the actual email
    const { canResend, resendCooldown, resendVerificationCode } = useResendCode(email);

    // Handle change for the code inputs
    const handleChange = (index, value) => {
        const newCode = [...code];

        // Handle pasted content
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);

            // Focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            
            // Move focus to the next input field if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        await verifyEmail(verificationCode);
    };

    return (
        <div
            className='min-h-screen flex items-center justify-center'
            style={{ 
                backgroundImage: 'url("https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                backgroundSize: 'cover',
                backgroundPosition: 'center' 
            }}
        >
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }} 
                className='bg-white bg-opacity-30 backdrop-filter 
                backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md'
            >
                <h2 className={`text-3xl font-bold text-center mb-6 ${theme.text}`}>
                    Verify Your Email
                </h2>
                <p className={`text-center ${theme.textSecondary} font-semibold mb-6`}>
                    Enter the 6-digit code sent to your email address.
                </p>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='flex justify-between'>
                        {code.map((digit, index) => (
                            <input 
                                key={index} 
                                ref={(el) => (inputRefs.current[index] = el)} 
                                type='text' 
                                maxLength='1' 
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)} 
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`w-12 h-12 text-center text-2xl font-bold
                                bg-gray-700 bg-opacity-30 focus:bg-white focus:bg-opacity-100
                                ${theme.text} border-2 border-gray-600 rounded-lg
                                focus:border-blue-500 focus:outline-none`} 
                            />
                        ))}
                    </div>
                    
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        type='submit' 
                        disabled={loading || code.some((digit) => !digit)}
                        className={`w-full bg-gradient-to-r from-blue-500 to-sky-900
                        ${theme.text} font-bold py-3 px-4 rounded-lg shadow-lg
                        hover:from-sky-900 hover:to-indigo-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-opacity-50 disabled:opacity-50`}
                    >
                        {loading ? "Verifying..." : "Verify Email"}
                    </motion.button>
                    
                    <div className="text-center mt-4">
                        {canResend ? (
                            <button
                                onClick={resendVerificationCode}
                                className={`w-full bg-gradient-to-r from-blue-500 to-sky-900
                        ${theme.text} font-bold py-3 px-4 rounded-lg shadow-lg
                        hover:from-sky-900 hover:to-indigo-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        focus:ring-opacity-50 disabled:opacity-50`}
                            >
                                Send Code Again
                            </button>
                        ) : (
                            <p className="text-gray-500">{`You can request a new code in ${resendCooldown}s`}</p>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EmailVerificationPage;