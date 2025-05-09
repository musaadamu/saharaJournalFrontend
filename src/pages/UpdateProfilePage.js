import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaBuilding, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaSave } from "react-icons/fa";

const UpdateProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.auth);

    // Form states
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bio, setBio] = useState(user?.bio || "");
    const [institution, setInstitution] = useState(user?.institution || "");
    const [showPassword, setShowPassword] = useState(false);

    // Validation states
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("personal"); // "personal" or "security"

    // Handle error messages from Redux
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    // Handle successful profile update
    useEffect(() => {
        if (isSubmitted && !loading && !error) {
            toast.success("Profile updated successfully!");
            setIsSubmitted(false);
            setPassword("");
            setConfirmPassword("");
        }
    }, [isSubmitted, loading, error]);

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (password && password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        if (password && password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Show validation errors
            Object.values(formErrors).forEach(error => {
                toast.error(error);
            });
            return;
        }

        // Prepare update data
        const updateData = {
            name,
            email,
            bio,
            institution
        };

        // Only include password if it's provided
        if (password) {
            updateData.password = password;
        }

        dispatch(updateUserProfile(updateData));
        setIsSubmitted(true);
    };

    // Get initials for avatar
    const getInitials = () => {
        if (name && name.trim()) {
            const nameParts = name.trim().split(' ');
            if (nameParts.length > 1) {
                return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
            }
            return name.charAt(0).toUpperCase();
        }
        return user?.email?.charAt(0).toUpperCase() || "U";
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back button and page title */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mr-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                </div>

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Profile header with avatar */}
                    <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-8 py-12 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-lg">
                                {getInitials()}
                            </div>
                            <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
                                <h2 className="text-2xl font-bold">{name || user?.email}</h2>
                                <p className="text-blue-100 mt-1">{institution || "No institution specified"}</p>
                                <p className="text-blue-200 mt-4 max-w-lg">
                                    {bio || "No bio information provided. You can add details about yourself in the form below."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tab navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                                    activeTab === "personal"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                } transition-colors`}
                                onClick={() => setActiveTab("personal")}
                            >
                                Personal Information
                            </button>
                            <button
                                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                                    activeTab === "security"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                } transition-colors`}
                                onClick={() => setActiveTab("security")}
                            >
                                Security
                            </button>
                        </nav>
                    </div>

                    {/* Form content */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit}>
                            {/* Personal Information Tab */}
                            {activeTab === "personal" && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaUser className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className={`block w-full pl-10 pr-3 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`block w-full pl-10 pr-3 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                            {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                                        </div>

                                        {/* Institution Field */}
                                        <div>
                                            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                                                Institution/Organization
                                            </label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaBuilding className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="institution"
                                                    type="text"
                                                    value={institution}
                                                    onChange={(e) => setInstitution(e.target.value)}
                                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Enter your institution or organization"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio Field */}
                                    <div>
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                            Bio/About Me
                                        </label>
                                        <textarea
                                            id="bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            rows="4"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Tell us about yourself, your research interests, and your academic background"
                                        ></textarea>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Brief description for your profile. URLs are hyperlinked.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === "security" && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <p className="text-sm text-blue-700">
                                                    Leave the password fields blank if you don't want to change your password.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                            New Password
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={`block w-full pl-10 pr-10 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="Enter new password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                                            </button>
                                        </div>
                                        {formErrors.password && <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>}
                                        <p className="mt-1 text-sm text-gray-500">
                                            Password must be at least 6 characters long.
                                        </p>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirm New Password
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="confirmPassword"
                                                type={showPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className={`block w-full pl-10 pr-3 py-2 border ${formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                        {formErrors.confirmPassword && <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => navigate("/dashboard")}
                                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving Changes...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <FaSave className="mr-2" />
                                            Save Changes
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfilePage;
