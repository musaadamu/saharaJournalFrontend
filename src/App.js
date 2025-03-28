// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfilePage";
import NotFound from "./pages/NotFound"; // Handle 404
import ProtectedRoute from "./components/ProtectedRoute"; // Wrapper for protected routes
import JournalUpload from './components/JournalUpload';
import JournalList from './components/JournalList';
import JournalDetail from './components/JournalDetail'; 
import Home from "./pages/Home";
import ManageJournal from "./pages/ManageJournal";
import LogoutPage from "./pages/LogoutPage"; // Import the new Logout page

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/resetpassword/:token" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="//journals/uploads" element={<JournalUpload />} />
                <Route path="/journals" element={<JournalList />} />
                <Route path="/journals/:id" element={<JournalDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home /> } />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/manage-journals" element={<ManageJournal />} />
                
                {/* <Route
                    path="/manage-journals"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManageJournal />
                        </ProtectedRoute>
                    }
                /> */}
                {/* Protected Routes
                <Route 
                    path="/dashboard" 
                    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
                />
                <Route 
                    path="/updateprofile" 
                    element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} 
                />
                <Route 
                    path="/journals/uploads" 
                    element={<ProtectedRoute><JournalUpload /></ProtectedRoute>} 
                />
                <Route 
                    path="/journals" 
                    element={<ProtectedRoute><JournalList /></ProtectedRoute>} 
                />
                <Route 
                    path="journals/:id" 
                    element={<ProtectedRoute><JournalDetail /></ProtectedRoute>} 
                /> */}

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;