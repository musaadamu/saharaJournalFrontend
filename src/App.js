import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfilePage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import JournalUpload from './components/JournalUpload';
import JournalList from './components/JournalList';
import JournalDetail from './components/JournalDetail';
import Home from "./pages/Home";
import ManageJournal from "./pages/ManageJournal";
import LogoutPage from "./pages/LogoutPage";
import JournalSubmission from "./components/JournalSubmission";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Guide from "./components/Guide";
import Contact from "./components/Contact";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Get user from localStorage if available
    const storedUser = localStorage.getItem('authUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <Router>
            <div className={`flex flex-col min-h-screen ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <Navigation user={user} toggleSidebar={toggleSidebar} />

                <main className="flex-grow">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        <Route path="/resetpassword/:token" element={<ResetPassword />} />
                        <Route path="/about" element={<About />} />

                        <Route path="/guide" element={<Guide />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/logout" element={<LogoutPage />} />
                        <Route path="/journals" element={<JournalList />} />
                        <Route path="/journals/:id" element={<JournalDetail />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />

                        {/* Protected Routes - Only require login, not admin */}
                        <Route path="/dashboard" element={
                            <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/updateprofile" element={
                            <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                                <UpdateProfile />
                            </ProtectedRoute>
                        } />
                        <Route path="/submission" element={
                            <ProtectedRoute allowedRoles={["admin", "author", "user"]}>
                                <JournalSubmission />
                            </ProtectedRoute>
                        } />

                        {/* Admin-only Routes - Only accessible to admin users */}
                        <Route path="/journals/uploads" element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <JournalUpload />
                            </ProtectedRoute>
                        } />
                        <Route path="/manage-journals" element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <ManageJournal />
                            </ProtectedRoute>
                        } />
                        {/* Not Found Route */}

                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;