import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function ManageJournal() {
    const { user } = useSelector((state) => state.auth);
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/unauthorized");
            return;
        }

        fetchJournals();
    }, [user, navigate]);

    const fetchJournals = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/journals`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                params: { 
                    page, 
                    limit: 10,
                    sortBy: 'createdAt',
                    order: 'desc'
                }
            });

            if (!response.ok) {
                throw new Error(response.status === 401 ? 'Unauthorized access' : 
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
            const errorMsg = err.message || 'Failed to fetch journals';
            setError(errorMsg);
            toast.error(errorMsg);

            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this journal?")) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/journals/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete journal");
            
            setJournals((prev) => prev.filter((journal) => journal._id !== id));
            toast.success("Journal deleted successfully");
        } catch (err) {
            console.error("Error deleting journal:", err);
            toast.error("Failed to delete journal");
        }
    };

    const handleView = (id) => {
        navigate(`/journals/${id}`);
    };

    const handleAdd = () => {
        navigate("/journals/uploads");
    };

    const handleDownload = async (id, fileType) => {
        try {
            const response = await fetch(`${API_BASE_URL}/journals/${id}/download/${fileType}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                responseType: 'blob'
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

    if (loading) return <div className="loading-spinner">Loading journals...</div>;
    if (error) return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Manage Journals</h1>

            <button
                onClick={handleAdd}
                className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Upload New Journal
            </button>

            {journals.length === 0 ? (
                <p className="text-center py-5">No journals available.</p>
            ) : (
                <>
                    <ul className="space-y-3">
                        {journals.map((journal) => (
                            <li key={journal._id} className="p-3 border rounded flex justify-between items-center">
                                <span className="font-semibold">{journal.title || 'Untitled Journal'}</span>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleView(journal._id)}
                                        className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDownload(journal._id, 'pdf')}
                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        PDF
                                    </button>
                                    <button
                                        onClick={() => handleDownload(journal._id, 'docx')}
                                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        DOCX
                                    </button>
                                    <button
                                        onClick={() => handleDelete(journal._id)}
                                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {pagination.totalPages > 1 && (
                        <div className="pagination flex justify-between items-center mt-6">
                            <button 
                                onClick={() => fetchJournals(pagination.currentPage - 1)} 
                                disabled={pagination.currentPage === 1} 
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <button 
                                onClick={() => fetchJournals(pagination.currentPage + 1)} 
                                disabled={pagination.currentPage === pagination.totalPages} 
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}