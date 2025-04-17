import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearMessages } from '../redux/slices/forgotPasswordSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { message, error, loading } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        dispatch(clearMessages()); // Clear previous messages when component mounts
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            toast.success(message);
            setTimeout(() => navigate('/login'), 2000); // Redirect after success
        }
        if (error) {
            toast.error(error);
        }
    }, [message, error, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ token, password }));
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-sm text-gray-600"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    disabled={loading}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
