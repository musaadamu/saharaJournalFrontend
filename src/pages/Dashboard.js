import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import "./Dashboard.css"; // Import the new CSS file

const Dashboard = () => {
    const { user, loading: userLoading, error: userError } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!userLoading && !user) {
            navigate("/login", { replace: true });
        }
    }, [user, userLoading, navigate]);

    const fetchJournals = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/journals", {
                params: {
                    limit: 10,
                    sortBy: "createdAt",
                    order: "desc",
                },
            });

            const { journals } = response.data;

            if (!journals || !Array.isArray(journals)) {
                throw new Error("Invalid response format");
            }

            setJournals(journals);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch journals";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchJournals();
        }
    }, [user]);

    if (userLoading || loading) return <p>Loading...</p>;

    if (userError || error) {
        return <div className="text-red-500">{userError || error}</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Navigation Bar */}
            <nav className="dashboard-nav">
                <div className="nav-content">
                    <div className="nav-logo">Sahara Journal</div>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About Us</Link>
                        <Link to="/submissions" className="nav-link">Make Submissions</Link>
                        <Link to="/current-issue" className="nav-link">Current Issue</Link>
                        <Link to="/archive" className="nav-link">Archive</Link>
                        {user?.role === "admin" && (
                            <Link to="/manage-journals" className="nav-link">Manage Journals</Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="dashboard-content">
                <h2 className="dashboard-title">Welcome to Dashboard</h2>
                <p className="dashboard-user">User: {user?.email}</p>
                {journals.length > 0 ? (
                    <div className="journal-list">
                        {journals.map((journal) => (
                            <div key={journal._id} className="journal-card">
                                <h3 className="journal-title">{journal.title}</h3>
                                <p className="journal-abstract">{journal.abstract}</p>
                                <span className={`journal-status ${
                                    journal.status === "Published" ? "status-published" : "status-draft"
                                }`}>
                                    {journal.status}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-journals">No journals available</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;