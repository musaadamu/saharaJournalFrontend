// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../services/api";
// import "./Dashboard.css"; // Import the new CSS file

// const Dashboard = () => {
//     const { user, loading: userLoading, error: userError } = useSelector((state) => state.auth);
//     const navigate = useNavigate();

//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         if (!userLoading && !user) {
//             navigate("/login", { replace: true });
//         }
//     }, [user, userLoading, navigate]);

//     const fetchJournals = async () => {
//         try {
//             setLoading(true);
//             setError("");

//             const response = await api.get("/journals", {
//                 params: {
//                     limit: 10,
//                     sortBy: "createdAt",
//                     order: "desc",
//                 },
//             });

//             const { journals } = response.data;

//             if (!journals || !Array.isArray(journals)) {
//                 throw new Error("Invalid response format");
//             }

//             setJournals(journals);
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || err.message || "Failed to fetch journals";
//             setError(errorMessage);
//             toast.error(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (user) {
//             fetchJournals();
//         }
//     }, [user]);

//     if (userLoading || loading) return <p>Loading...</p>;

//     if (userError || error) {
//         return <div className="text-red-500">{userError || error}</div>;
//     }

//     return (
//         <div className="dashboard-container">
//             {/* Navigation Bar */}
//             <nav className="dashboard-nav">
//                 <div className="nav-content">
//                     <div className="nav-logo">Sahara Journal</div>
//                     <div className="nav-links">
//                         <Link to="/" className="nav-link">Home</Link>
//                         <Link to="/about" className="nav-link">About Us</Link>
//                         <Link to="/submissions" className="nav-link">Make Submissions</Link>
//                         <Link to="/current-issue" className="nav-link">Current Issue</Link>
//                         <Link to="/archive" className="nav-link">Archive</Link>
//                         {user?.role === "admin" && (
//                             <Link to="/manage-journals" className="nav-link">Manage Journals</Link>
//                         )}
//                     </div>
//                 </div>
//             </nav>

//             {/* Dashboard Content */}
//             <div className="dashboard-content">
//                 <h2 className="dashboard-title">Welcome to Dashboard</h2>
//                 <p className="dashboard-user">User: {user?.email}</p>
//                 {journals.length > 0 ? (
//                     <div className="journal-list">
//                         {journals.map((journal) => (
//                             <div key={journal._id} className="journal-card">
//                                 <h3 className="journal-title">{journal.title}</h3>
//                                 <p className="journal-abstract">{journal.abstract}</p>
//                                 <span className={`journal-status ${
//                                     journal.status === "Published" ? "status-published" : "status-draft"
//                                 }`}>
//                                     {journal.status}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="no-journals">No journals available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Dashboard.css"; // Import the CSS file

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Dashboard = () => {
    const { user, loading: userLoading, error: userError } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0
    });

    useEffect(() => {
        if (!userLoading && !user) {
            navigate("/login", { replace: true });
        }
    }, [user, userLoading, navigate]);

    const fetchJournals = async (page = 1) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_BASE_URL}/journals`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    'Content-Type': 'application/json'
                },
                params: {
                    page,
                    limit: 10,
                    sortBy: "createdAt",
                    order: "desc",
                }
            });

            if (!response.ok) {
                throw new Error(response.status === 401 ? 'Please login to view journals' : 
                               response.status === 404 ? 'No journals found' : 
                               'Failed to fetch journals');
            }

            const data = await response.json();
            
            // Handle both array response and paginated response
            const journalsData = Array.isArray(data) ? 
                data : 
                data.journals || [];
                
            const paginationData = data.pagination || {
                currentPage: page,
                totalPages: 1,
                totalJournals: journalsData.length
            };
            
            setJournals(journalsData);
            setPagination(paginationData);
        } catch (err) {
            console.error('Fetch journals error:', err);
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch journals";
            setError(errorMessage);
            toast.error(errorMessage);

            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchJournals();
        }
    }, [user]);

    if (userLoading || loading) return <div className="loading-spinner">Loading dashboard...</div>;

    if (userError || error) {
        return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{userError || error}</div>;
    }

    const handleViewJournal = (id) => {
        navigate(`/journals/${id}`);
    };

    const handleDownload = async (id, fileType) => {
        try {
            const response = await fetch(`${API_BASE_URL}/journals/${id}/download/${fileType}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!response.ok) throw new Error(`Failed to download ${fileType} file`);
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            const journal = journals.find(j => j._id === id);
            link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
        } catch (err) {
            console.error('Download error:', err);
            toast.error(`Failed to download ${fileType.toUpperCase()} file`);
        }
    };

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
                    <>
                        <div className="journal-list">
                            {journals.map((journal) => (
                                <div key={journal._id} className="journal-card">
                                    <h3 
                                        className="journal-title cursor-pointer hover:underline"
                                        onClick={() => handleViewJournal(journal._id)}
                                    >
                                        {journal.title || 'Untitled Journal'}
                                    </h3>
                                    <p className="journal-abstract">
                                        {journal.abstract || 'No abstract available'}
                                    </p>
                                    <span className={`journal-status ${
                                        journal.status === "Published" ? "status-published" : "status-draft"
                                    }`}>
                                        {journal.status || 'Draft'}
                                    </span>
                                    
                                    <div className="journal-actions">
                                        <button 
                                            onClick={() => handleViewJournal(journal._id)}
                                            className="action-button view-button"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => handleDownload(journal._id, 'pdf')}
                                            className="action-button pdf-button"
                                        >
                                            PDF
                                        </button>
                                        <button 
                                            onClick={() => handleDownload(journal._id, 'docx')}
                                            className="action-button docx-button"
                                        >
                                            DOCX
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {pagination.totalPages > 1 && (
                            <div className="pagination">
                                <button 
                                    onClick={() => fetchJournals(pagination.currentPage - 1)} 
                                    disabled={pagination.currentPage === 1} 
                                    className="pagination-button prev-button"
                                >
                                    Previous
                                </button>
                                <span className="page-info">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>
                                <button 
                                    onClick={() => fetchJournals(pagination.currentPage + 1)} 
                                    disabled={pagination.currentPage === pagination.totalPages} 
                                    className="pagination-button next-button"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="no-journals">No journals available</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;