import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './ArchiveJournals.css';

// Use environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ArchiveJournals = () => {
    const navigate = useNavigate();
    const [archivedJournals, setArchivedJournals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0
    });

    useEffect(() => {
        fetchArchivedJournals();
    }, []);

    const fetchArchivedJournals = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching archived journals from:', API_BASE_URL);
            const response = await axios.get(`${API_BASE_URL}/journals/archived`, {
                params: { 
                    page, 
                    limit: 10,
                    sortBy: 'archivedAt',
                    order: 'desc'
                },
                withCredentials: true
            });

            console.log('API Response:', response.data);

            if (!response.data) {
                throw new Error('No data received from server');
            }

            // Handle both array response and paginated response formats
            const journalsData = Array.isArray(response.data) ? 
                response.data : 
                response.data.journals || [];
                
            const paginationData = response.data.pagination || {
                currentPage: page,
                totalPages: 1,
                totalJournals: journalsData.length
            };

            setArchivedJournals(journalsData);
            setPagination(paginationData);
        } catch (err) {
            console.error('Fetch archived journals error:', err);
            let errorMsg = 'Failed to fetch archived journals';
            
            if (err.response) {
                errorMsg = err.response.data?.message || 
                         (err.response.status === 401 ? 'Please login to view archived journals' : 
                         err.response.status === 404 ? 'Archived journals endpoint not found' : 
                         'Server error occurred');
                
                if (err.response.status === 401) {
                    navigate('/login');
                }
            } else if (err.request) {
                errorMsg = 'Network error - unable to reach server';
            } else {
                errorMsg = err.message || 'Error fetching archived journals';
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async (id) => {
        try {
            await axios.put(`${API_BASE_URL}/journals/${id}/restore`, {}, {
                withCredentials: true
            });
            
            // Remove the restored journal from the list
            setArchivedJournals(archivedJournals.filter(journal => journal._id !== id));
            toast.success('Journal restored successfully');
        } catch (err) {
            console.error('Restore journal error:', err);
            toast.error('Failed to restore journal');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this journal? This action cannot be undone.')) {
            return;
        }
        
        try {
            await axios.delete(`${API_BASE_URL}/journals/${id}`, {
                withCredentials: true
            });
            
            // Remove the deleted journal from the list
            setArchivedJournals(archivedJournals.filter(journal => journal._id !== id));
            toast.success('Journal permanently deleted');
        } catch (err) {
            console.error('Delete journal error:', err);
            toast.error('Failed to delete journal');
        }
    };

    const handleDownload = async (id, fileType) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/journals/${id}/download/${fileType}`, {
                responseType: 'blob',
                withCredentials: true
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const journal = archivedJournals.find(j => j._id === id);
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

    if (loading) return <div className="loading-spinner">Loading archived journals...</div>;

    return (
        <div className="archive-journals-container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="header flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Archived Journals</h2>
                <Link 
                    to="/journals" 
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                    Back to Journals
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {archivedJournals.length === 0 && !loading ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No archived journals found</p>
                    <p className="mt-2">Archived journals will appear here</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {archivedJournals.map((journal) => (
                            <div key={journal._id} className="archive-journal-card border rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {journal.title || 'Untitled Journal'}
                                </h3>
                                <p className="text-gray-600 mt-2 line-clamp-2">
                                    {journal.abstract || 'No abstract available'}
                                </p>
                                <div className="mt-2 text-xs text-gray-500">
                                    Archived on: {new Date(journal.archivedAt || journal.updatedAt).toLocaleDateString()}
                                </div>
                                <div className="actions mt-4 flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => handleRestore(journal._id)} 
                                        className="text-green-500 hover:text-green-700"
                                    >
                                        Restore
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(journal._id)} 
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete Permanently
                                    </button>
                                    <button 
                                        onClick={() => handleDownload(journal._id, 'pdf')} 
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {pagination.totalPages > 1 && (
                        <div className="pagination flex justify-between items-center mt-6">
                            <button 
                                onClick={() => fetchArchivedJournals(pagination.currentPage - 1)} 
                                disabled={pagination.currentPage === 1} 
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <button 
                                onClick={() => fetchArchivedJournals(pagination.currentPage + 1)} 
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
};

export default ArchiveJournals;