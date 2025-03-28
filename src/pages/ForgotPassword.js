import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail, clearMessages } from '../redux/slices/forgotPasswordSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { message, error, loading } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearMessages());
        }
        if (message) {
            toast.success(message);
            dispatch(clearMessages());
        }
    }, [error, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter a valid email.");
            return;
        }
        dispatch(sendResetEmail(email.trim()));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border rounded-md"
                    />
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-md text-white ${email ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"}`}
                        disabled={!email || loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
