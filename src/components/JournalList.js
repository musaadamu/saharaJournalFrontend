
// export default JournalList;
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './JournalList.css';

// Import the API service
import api from '../services/api';

const JournalList = () => {
    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0
    });

    // Define fetchJournals with useCallback to avoid dependency issues
    const fetchJournals = useCallback(async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            console.log('Fetching journals using API service');
            const response = await api.journals.getAll({
                page,
                limit: 10,
                sortBy: 'createdAt',
                order: 'desc'
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

            setJournals(journalsData);
            setPagination(paginationData);
        } catch (err) {
            console.error('Fetch journals error:', err);
            let errorMsg = 'Failed to fetch journals';

            if (err.response) {
                errorMsg = err.response.data?.message ||
                         (err.response.status === 401 ? 'Please login to view journals' :
                         err.response.status === 404 ? 'Journal endpoint not found' :
                         'Server error occurred');

                // Redirect to login if unauthorized
                if (err.response.status === 401) {
                    navigate('/login');
                }
            } else if (err.request) {
                errorMsg = 'Network error - unable to reach server';
            } else {
                errorMsg = err.message || 'Error fetching journals';
            }

            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchJournals();
    }, [fetchJournals]);

    const handleDownload = async (id, fileType) => {
        try {
            console.log(`Downloading ${fileType} file for journal ID:`, id);
            const response = await api.journals.download(id, fileType);

            const url = window.URL.createObjectURL(new Blob([response.data]));
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

    return (
        <div className="journal-list-container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="header flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Journal List</h2>
                <Link
                    to="/journals/new"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    + New Journal
                </Link>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {journals.length === 0 && !loading ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg">No journals available</p>
                    <p className="mt-2">Start by creating a new journal!</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {journals.map((journal) => (
                            <div key={journal._id} className="journal-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <h3
                                    className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
                                    onClick={() => navigate(`/journals/${journal._id}`)}
                                >
                                    {journal.title || 'Untitled Journal'}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {journal.abstract || 'No abstract available'}
                                </p>
                                <span className="status mt-2 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    Published
                                </span>
                                <div className="actions mt-4 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => navigate(`/journals/${journal._id}`)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDownload(journal._id, 'pdf')}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download PDF
                                    </button>
                                    <button
                                        onClick={() => handleDownload(journal._id, 'docx')}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm flex items-center text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Download DOCX
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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
};

export default JournalList;