import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import JournalUpload from './components/JournalUpload';
import JournalList from './components/JournalList';
import JournalDetail from './components/JournalDetail'; 
import Home from "./pages/Home";
import ManageJournal from "./pages/ManageJournal";
import LogoutPage from "./pages/LogoutPage";
import JournalSubmission from "./components/JournalSubmission";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import About from "./components/About";
import Guide from "./components/Guide";
import Contact from "./components/Contact";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navigation />
                
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
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/updateprofile" element={<UpdateProfile />} />
                        <Route path="/journals/uploads" element={<JournalUpload />} />
                        <Route path="/submission" element={<JournalSubmission />} />
                        <Route path="/manage-journals" element={<ManageJournal />} />
                        
                        {/* Protected Routes
                        // <Route element={<ProtectedRoute />}>
                        //     <Route path="/dashboard" element={<Dashboard />} />
                        //     <Route path="/updateprofile" element={<UpdateProfile />} />
                        //     <Route path="/journals/uploads" element={<JournalUpload />} />
                        //     <Route path="/submission" element={<JournalSubmission />} />
                        //     <Route path="/manage-journals" element={<ManageJournal />} />
                        // </Route>
                         */}
                        {/* Not Found Route */}

                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </main>
                
                <Footer />
            </div>
        </Router>
    );
}

export default App;