


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api"; // adjust path as needed
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// Custom CSS for tabs
import './ManageJournal.css';

// Known Cloudinary URLs for direct access as a last resort
const CLOUDINARY_PDF_URLS = [
    'https://res.cloudinary.com/musaadamu/raw/upload/v1746729149/UploadFiles/1746729142888-1746729142665-tagans5.pdf',
    'https://res.cloudinary.com/musaadamu/raw/upload/v1746728320/UploadFiles/1746728285131-1746728284548-Tagans4.pdf',
    'https://res.cloudinary.com/musaadamu/raw/upload/v1746723286/UploadFiles/1746723283897-1746723283544-Tangas1.pdf'
];

// Helper function to try all Cloudinary URLs as a last resort
const tryAllCloudinaryUrls = (title) => {
    toast.info(`Trying direct Cloudinary access as last resort...`);

    // Try to find a matching URL based on title
    let urlIndex = 0;
    if (title) {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('tagans5')) urlIndex = 0;
        else if (titleLower.includes('tagans4')) urlIndex = 1;
        else if (titleLower.includes('tangas1')) urlIndex = 2;
    }

    // Open the URL as a fallback
    window.open(CLOUDINARY_PDF_URLS[urlIndex], '_blank');

    // If we're not sure which URL is correct, try the others after a delay
    setTimeout(() => {
        toast.info(`Trying alternative Cloudinary URL...`);
        window.open(CLOUDINARY_PDF_URLS[(urlIndex + 1) % 3], '_blank');
    }, 3000);
};

export default function ManageJournal() {
    // We don't need to check for user role here as it's handled by the ProtectedRoute component
    // State for journals
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJournals: 0
    });

    // State for submissions
    const [submissions, setSubmissions] = useState([]);
    const [submissionsLoading, setSubmissionsLoading] = useState(true);
    const [submissionsError, setSubmissionsError] = useState("");
    const [submissionsPagination, setSubmissionsPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalSubmissions: 0
    });

    // Tab state
    const [tabIndex, setTabIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchJournals();
        fetchSubmissions();
    }, []);

    const fetchJournals = async (page = 1) => {
        setLoading(true);
        setError('');
        try {
            const response = await api.journals.getAll({
                page,
                limit: 10,
                sortBy: 'createdAt',
                order: 'desc'
            });

            const journalsData = Array.isArray(response.data)
                ? response.data
                : response.data.journals || [];

            const paginationData = response.data.pagination || {
                currentPage: page,
                totalPages: 1,
                totalJournals: journalsData.length
            };

            setJournals(journalsData);
            setPagination(paginationData);
        } catch (err) {
            console.error("Error fetching journals:", err);
            let errorMsg = "Failed to fetch journals";

            if (err.code === 'ECONNABORTED') {
                errorMsg = 'Request timed out. Server may be slow or unavailable.';
            } else if (err.response) {
                errorMsg = err.response.data?.message ||
                    (err.response.status === 401 ? 'Please login to view journals' :
                        err.response.status === 404 ? 'Journal endpoint not found' :
                            'Server error occurred');

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
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this journal?")) return;

        try {
            const response = await api.delete(`/journals/${id}`);

            if (response.status === 200 || response.status === 204) {
                setJournals((prev) => prev.filter((journal) => journal._id !== id));
                toast.success("Journal deleted successfully");
            } else {
                throw new Error("Failed to delete journal");
            }
        } catch (err) {
            console.error("Error deleting journal:", err);
            toast.error(err.response?.data?.message || "Failed to delete journal");
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
            // Show loading toast
            const toastId = toast.loading(`Preparing ${fileType.toUpperCase()} download...`);

            console.log(`Downloading ${fileType} file for journal ID:`, id);

            // Try using the API service's download method which has built-in fallbacks
            try {
                const response = await api.journals.download(id, fileType);

                // If we get a response, we can either:
                // 1. Create a download link from the blob (works well in development)
                if (process.env.NODE_ENV !== 'production') {
                    // Create a download link
                    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    const journal = journals.find(j => j._id === id);
                    link.href = blobUrl;
                    link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    setTimeout(() => {
                        window.URL.revokeObjectURL(blobUrl);
                        link.remove();
                    }, 100);

                    toast.dismiss(toastId);
                    toast.success(`File downloaded as ${fileType.toUpperCase()}`);
                    return;
                }
            } catch (apiError) {
                console.error('API download failed:', apiError);
                // Continue to direct URL approach
            }

            // Fallback to direct URL approach (works better in production)
            // Get the base URL
            const baseUrl = api.defaults.baseURL || 'https://saharabackend-v190.onrender.com/api';

            // Create the direct download URL
            const downloadUrl = `${baseUrl}/journals/${id}/direct-download/${fileType}`;

            console.log('Using direct download URL:', downloadUrl);

            // Open the URL in a new tab
            window.open(downloadUrl, '_blank');

            toast.dismiss(toastId);
            toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
        } catch (err) {
            console.error(`Error downloading ${fileType} file:`, err);
            toast.error(`Failed to download ${fileType.toUpperCase()} file`);

            // As a last resort, try using the Cloudinary URLs directly
            if (fileType === 'pdf') {
                try {
                    // Find the journal to get its title
                    const journal = journals.find(j => j._id === id);
                    if (journal) {
                        // Use the helper function to try all Cloudinary URLs
                        tryAllCloudinaryUrls(journal.title);
                    }
                } catch (cloudinaryError) {
                    console.error('Cloudinary direct access failed:', cloudinaryError);
                }
            }
        }
    };

    // Submissions functions
    const fetchSubmissions = async (page = 1) => {
        setSubmissionsLoading(true);
        setSubmissionsError('');
        try {
            const response = await api.submissions.getAll({
                page,
                limit: 10,
                sortBy: 'createdAt',
                order: 'desc'
            });

            const submissionsData = Array.isArray(response.data)
                ? response.data
                : response.data.submissions || [];

            const paginationData = response.data.pagination || {
                currentPage: page,
                totalPages: 1,
                totalSubmissions: submissionsData.length
            };

            setSubmissions(submissionsData);
            setSubmissionsPagination(paginationData);
        } catch (err) {
            console.error("Error fetching submissions:", err);
            let errorMsg = "Failed to fetch submissions";

            if (err.code === 'ECONNABORTED') {
                errorMsg = 'Request timed out. Server may be slow or unavailable.';
            } else if (err.response) {
                errorMsg = err.response.data?.message ||
                    (err.response.status === 401 ? 'Please login to view submissions' :
                        err.response.status === 404 ? 'Submissions endpoint not found' :
                            'Server error occurred');

                if (err.response.status === 401) {
                    navigate('/login');
                }
            } else if (err.request) {
                errorMsg = 'Network error - unable to reach server';
            } else {
                errorMsg = err.message || 'Error fetching submissions';
            }

            setSubmissionsError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setSubmissionsLoading(false);
        }
    };

    const handleSubmissionDownload = async (id, fileType) => {
        try {
            // Show loading toast
            const toastId = toast.loading(`Preparing ${fileType.toUpperCase()} download...`);

            console.log(`Downloading ${fileType} file for submission ID:`, id);

            // Try using the API service's download method which has built-in fallbacks
            try {
                const response = await api.submissions.download(id, fileType);

                // If we get a response, we can either:
                // 1. Create a download link from the blob (works well in development)
                if (process.env.NODE_ENV !== 'production') {
                    // Create a download link
                    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    const submission = submissions.find(s => s._id === id);
                    link.href = blobUrl;
                    link.setAttribute('download', `${submission?.title || 'submission'}.${fileType}`);
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    setTimeout(() => {
                        window.URL.revokeObjectURL(blobUrl);
                        link.remove();
                    }, 100);

                    toast.dismiss(toastId);
                    toast.success(`File downloaded as ${fileType.toUpperCase()}`);
                    return;
                }
            } catch (apiError) {
                console.error('API download failed:', apiError);
                // Continue to direct URL approach
            }

            // Fallback to direct URL approach (works better in production)
            // Get the base URL
            const baseUrl = api.defaults.baseURL || 'https://saharabackend-v190.onrender.com/api';

            // Create the direct download URL
            const downloadUrl = `${baseUrl}/submissions/${id}/direct-download/${fileType}`;

            console.log('Using direct download URL:', downloadUrl);

            // Open the URL in a new tab
            window.open(downloadUrl, '_blank');

            toast.dismiss(toastId);
            toast.success(`Opening ${fileType.toUpperCase()} file in new tab`);
        } catch (err) {
            console.error(`Error downloading ${fileType} file:`, err);
            toast.error(`Failed to download ${fileType.toUpperCase()} file`);

            // As a last resort, try using the Cloudinary URLs directly
            const submission = submissions.find(s => s._id === id);
            if (submission) {
                try {
                    // For DOCX files, try the stored Cloudinary URL if available
                    if (fileType === 'docx' && submission.docxCloudinaryUrl) {
                        toast.info(`Trying direct Cloudinary access as last resort...`);
                        window.open(submission.docxCloudinaryUrl, '_blank');
                    }
                    // For PDF files, try our known Cloudinary URLs
                    else if (fileType === 'pdf') {
                        // Use the helper function to try all Cloudinary URLs
                        tryAllCloudinaryUrls(submission.title);
                    }
                } catch (cloudinaryError) {
                    console.error('Cloudinary direct access failed:', cloudinaryError);
                }
            }
        }
    };

    const handleSubmissionDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this submission?")) return;

        try {
            const response = await api.submissions.delete(id);

            if (response.status === 200 || response.status === 204) {
                setSubmissions((prev) => prev.filter((submission) => submission._id !== id));
                toast.success("Submission deleted successfully");
            } else {
                throw new Error("Failed to delete submission");
            }
        } catch (err) {
            console.error("Error deleting submission:", err);
            toast.error(err.response?.data?.message || "Failed to delete submission");
        }
    };

    const handlePublishSubmission = async (id) => {
        if (!window.confirm("Are you sure you want to publish this submission?")) return;

        try {
            await api.submissions.updateStatus(id, "published");
            toast.success("Submission published successfully");
            fetchSubmissions();
        } catch (err) {
            console.error("Error publishing submission:", err);
            toast.error(err.response?.data?.message || "Failed to publish submission");
        }
    };

    if (loading && submissionsLoading) return <div className="loading-spinner">Loading content...</div>;

    return (
        <div className="journal-management-container">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b pb-3">Journal Management Dashboard</h1>

            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <TabList>
                    <Tab>Published Journals</Tab>
                    <Tab>Submitted Journals</Tab>
                </TabList>

                {/* Published Journals Tab Panel */}
                <TabPanel>
                    <div className="section-header">
                        <h2>Published Journals</h2>
                        <p>Manage and distribute published academic journals</p>
                    </div>

                    {loading ? (
                        <div className="loading-spinner">Loading journals...</div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : (
                        <>
                            <button
                                onClick={handleAdd}
                                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                Upload New Journal
                            </button>

                            {journals.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-base font-medium text-gray-600">No published journals available</p>
                                    <p className="text-sm text-gray-500 mt-1">Upload a new journal to get started</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid gap-6">
                                        {journals.map((journal) => (
                                            <div key={journal._id} className="journal-card">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="title">{journal.title || 'Untitled Journal'}</h3>
                                                    <span className="status published">Published</span>
                                                </div>

                                                <p className="abstract">{journal.abstract || 'No abstract available'}</p>

                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {journal.keywords && journal.keywords.map((keyword, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="button-group">
                                                    <button
                                                        onClick={() => handleView(journal._id)}
                                                        className="view-btn"
                                                    >
                                                        View Details
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownload(journal._id, 'pdf')}
                                                        className="download-btn"
                                                    >
                                                        Download PDF
                                                    </button>
                                                    <button
                                                        onClick={() => handleDownload(journal._id, 'docx')}
                                                        className="download-btn"
                                                    >
                                                        Download DOCX
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(journal._id)}
                                                        className="delete-btn"
                                                    >
                                                        Delete
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
                                            >
                                                ← Previous
                                            </button>
                                            <span className="page-info">
                                                Page {pagination.currentPage} of {pagination.totalPages}
                                            </span>
                                            <button
                                                onClick={() => fetchJournals(pagination.currentPage + 1)}
                                                disabled={pagination.currentPage === pagination.totalPages}
                                            >
                                                Next →
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </TabPanel>

                {/* Submitted Journals Tab Panel */}
                <TabPanel>
                    <div className="section-header">
                        <h2>Submitted Journals</h2>
                        <p>Review and process journal submissions before publishing</p>
                    </div>

                    {submissionsLoading ? (
                        <div className="loading-spinner">Loading submissions...</div>
                    ) : submissionsError ? (
                        <div className="error-message">{submissionsError}</div>
                    ) : (
                        <>
                            <div className="mb-4 p-3 bg-yellow-50 border-l-3 border-yellow-400 rounded-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-2">
                                        <h3 className="text-xs font-medium text-yellow-800">Submission Management</h3>
                                        <div className="mt-1 text-xs text-yellow-700">
                                            <p>Review submitted journals, download for evaluation, and publish approved content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {submissions.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <p className="text-base font-medium text-gray-600">No submissions available</p>
                                    <p className="text-sm text-gray-500 mt-1">New submissions will appear here</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid gap-6">
                                        {submissions.map((submission) => (
                                            <div key={submission._id} className="submission-card">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h3 className="title">{submission.title || 'Untitled Submission'}</h3>
                                                    <span className="status submitted">{submission.status || 'Pending'}</span>
                                                </div>

                                                <p className="abstract">{submission.abstract || 'No abstract available'}</p>

                                                <div className="keywords">
                                                    {submission.keywords && submission.keywords.map((keyword, idx) => (
                                                        <span key={idx} className="keyword">{keyword}</span>
                                                    ))}
                                                </div>

                                                <div className="authors">
                                                    <span className="font-medium">Authors: </span>
                                                    {submission.authors && submission.authors.map((author, idx) => (
                                                        <span key={idx}>
                                                            {author}{idx < submission.authors.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="button-group">
                                                    <button
                                                        onClick={() => handleSubmissionDownload(submission._id, 'docx')}
                                                        className="download-btn"
                                                    >
                                                        Download DOCX
                                                    </button>
                                                    <button
                                                        onClick={() => handlePublishSubmission(submission._id)}
                                                        className="publish-btn"
                                                    >
                                                        Publish
                                                    </button>
                                                    <button
                                                        onClick={() => handleSubmissionDelete(submission._id)}
                                                        className="delete-btn"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {submissionsPagination.totalPages > 1 && (
                                        <div className="pagination">
                                            <button
                                                onClick={() => fetchSubmissions(submissionsPagination.currentPage - 1)}
                                                disabled={submissionsPagination.currentPage === 1}
                                            >
                                                ← Previous
                                            </button>
                                            <span className="page-info">
                                                Page {submissionsPagination.currentPage} of {submissionsPagination.totalPages}
                                            </span>
                                            <button
                                                onClick={() => fetchSubmissions(submissionsPagination.currentPage + 1)}
                                                disabled={submissionsPagination.currentPage === submissionsPagination.totalPages}
                                            >
                                                Next →
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </TabPanel>
            </Tabs>
        </div>
    );
}
