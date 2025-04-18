// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong>
//                         <a
//                             href={journal.pdfUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             View PDF
//                         </a>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong>
//                         <a
//                             href={journal.pdfUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download PDF
//                         </a>
//                     </p>
//                 )}

//                 {journal?.docxFilePath && (
//                     <p>
//                         <strong>Word Document:</strong>
//                         <a
//                             href={journal.docxFilePath}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download Word Document
//                         </a>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     const handleDownload = async (fileType) => {
//         try {
//             const { data } = await api.get(`/journals/${id}/download/${fileType}`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
//         } catch (err) {
//             toast.error(`Failed to download ${fileType.toUpperCase()} file`);
//         }
//     };

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong>
//                         <button
//                             onClick={() => handleDownload('pdf')}
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download PDF
//                         </button>
//                     </p>
//                 )}

//                 {journal?.docxFilePath && (
//                     <p>
//                         <strong>Word Document:</strong>
//                         <button
//                             onClick={() => handleDownload('docx')}
//                             className="text-blue-600 hover:underline"
//                         >
//                             Download Word Document
//                         </button>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;


// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     const handleDownload = async (fileType) => {
//         try {
//             const { data } = await api.get(`/journals/${id}/download/${fileType}`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
//         } catch (err) {
//             toast.error(`Failed to download ${fileType.toUpperCase()} file`);
//         }
//     };

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {journal?.pdfUrl && (
//                     <p>
//                         <strong>PDF:</strong> {' '}
//                         <button
//                             onClick={() => handleDownload('pdf')}
//                             className="text-blue-600 hover:underline ml-2"
//                         >
//                             Download PDF
//                         </button>
//                     </p>
//                 )}

//                 {journal?.docxFilePath && (
//                     <p>
//                         <strong>Word Document:</strong> {' '}
//                         <button
//                             onClick={() => handleDownload('docx')}
//                             className="text-blue-600 hover:underline ml-2"
//                         >
//                             Download Word Document
//                         </button>
//                     </p>
//                 )}

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import { useParams } from 'react-router-dom';
// import './JournalDetails.css';

// const JournalDetail = () => {
//     const { id } = useParams(); // Get the journal ID from the URL
//     const [journal, setJournal] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchJournal = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error('Failed to fetch journal details');

//                 const data = await response.json();
//                 console.log("Journal data:", data); // Debug log
//                 setJournal(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournal();
//     }, [id]);

//     const handleDownload = async (fileType) => {
//         try {
//             const { data } = await api.get(`/journals/${id}/download/${fileType}`, { responseType: 'blob' });
//             const url = window.URL.createObjectURL(new Blob([data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             toast.success(`Journal downloaded as ${fileType.toUpperCase()}`);
//         } catch (err) {
//             toast.error(`Failed to download ${fileType.toUpperCase()} file`);
//         }
//     };

//     if (loading) return <p className="text-gray-600">Loading...</p>;
//     if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

//     return (
//         <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

//             <div className="space-y-3">
//                 <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
//                 <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

//                 {/* Always show the PDF download button, like in JournalList */}
//                 <p>
//                     <strong>PDF:</strong> {' '}
//                     <button
//                         onClick={() => handleDownload('pdf')}
//                         className="text-blue-600 hover:underline ml-2"
//                     >
//                         Download PDF
//                     </button>
//                 </p>

//                 {/* Always show the Word download button, like in JournalList */}
//                 <p>
//                     <strong>Word Document:</strong> {' '}
//                     <button
//                         onClick={() => handleDownload('docx')}
//                         className="text-blue-600 hover:underline ml-2"
//                     >
//                         Download Word Document
//                     </button>
//                 </p>

//                 <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
//                 <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
//                 <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
//             </div>
//         </div>
//     );
// };

// export default JournalDetail;

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { downloadJournalFile } from '../utils/fileDownload';
import './JournalDetails.css';

const JournalDetail = () => {
    const { id } = useParams(); // Get the journal ID from the URL
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                console.log('Fetching journal details for ID:', id);
                const response = await api.journals.getById(id);
                console.log("Journal data:", response.data); // Debug log
                setJournal(response.data);
            } catch (err) {
                console.error('Error fetching journal:', err);
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id]);

    const handleDownload = async (fileType) => {
        console.log(`Downloading ${fileType} file for journal ID:`, id);
        try {
            // Show loading toast
            const toastId = toast.loading(`Preparing ${fileType.toUpperCase()} download...`);

            // Determine if we're in production or development
            const isProduction = process.env.NODE_ENV === 'production';

            // Get the backend URL
            const backendUrl = isProduction
                ? 'https://saharabackend-v190.onrender.com'
                : 'http://localhost:5000';

            console.log('Environment:', { isProduction, NODE_ENV: process.env.NODE_ENV });
            console.log('Using backend URL:', backendUrl);
            console.log('API base URL:', api.defaults.baseURL);

            try {
                // First try using the API service directly
                if (!isProduction) {
                    try {
                        console.log('Trying direct API download...');
                        const response = await api.journals.download(id, fileType);

                        // Create a download link
                        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
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
                    } catch (apiError) {
                        console.error('API download failed:', apiError);
                        // Continue to fallback methods
                    }
                }

                // Use the downloadJournalFile utility as fallback
                const success = await downloadJournalFile(
                    api.defaults.baseURL,
                    id,
                    fileType,
                    journal?.title || 'journal'
                );

                // If the utility function didn't handle the toast, dismiss it
                if (!success) {
                    toast.dismiss(toastId);
                    toast.error(`Failed to download ${fileType.toUpperCase()} file. Please try again.`);
                }
            } catch (downloadError) {
                // If the utility fails, try a direct approach
                toast.dismiss(toastId);
                toast.info(`Trying alternative download method...`);

                // Determine if we're in production based on hostname
                const isLocalhost = window.location.hostname === 'localhost';
                const isProduction = !isLocalhost;

                console.log('Environment detection:', { isProduction, hostname: window.location.hostname });

                // Use only the known working path with different base URLs
                const urlsToTry = [];

                if (isProduction) {
                    // For production (Render backend)
                    // Primary API endpoint - this is the path that works locally
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/api/journals/${id}/download/${fileType}`);

                    // Add a fallback without the /api prefix in case the server is configured differently
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/journals/${id}/download/${fileType}`);
                } else {
                    // For local development - the known working path
                    urlsToTry.push(`http://localhost:5000/api/journals/${id}/download/${fileType}`);
                }

                // For convenience in the rest of the code
                const apiUrl = urlsToTry[0];
                const directFileUrl = urlsToTry.length > 1 ? urlsToTry[1] : urlsToTry[0];
                const staticFileUrl = urlsToTry.length > 1 ? urlsToTry[1] : urlsToTry[0];

                console.log('URLs to try:', { apiUrl, directFileUrl, staticFileUrl });

                try {
                    // Try using fetch API with the primary URL
                    toast.info(`Attempting to download file...`);
                    console.log(`Trying primary URL: ${apiUrl}`);

                    // Try the primary URL first
                    let response = await fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'Accept': '*/*',
                        },
                        credentials: 'omit', // Don't send cookies
                        mode: 'cors', // Explicitly set CORS mode
                        cache: 'no-cache' // Don't use cached response
                    });

                    // If the primary URL fails and we have a fallback, try it
                    if (!response.ok && urlsToTry.length > 1) {
                        console.log(`Primary URL failed, trying fallback: ${directFileUrl}`);
                        toast.info(`Trying fallback URL...`);

                        response = await fetch(directFileUrl, {
                            method: 'GET',
                            headers: {
                                'Accept': '*/*',
                            },
                            credentials: 'omit', // Don't send cookies
                            mode: 'cors', // Explicitly set CORS mode
                            cache: 'no-cache' // Don't use cached response
                        });

                        if (!response.ok) {
                            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                        } else {
                            console.log(`Success with fallback URL`);
                            toast.success(`Download successful`);
                        }
                    } else if (response.ok) {
                        console.log(`Success with primary URL`);
                        toast.success(`Download successful`);
                    } else {
                        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
                    }

                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', `${journal?.title || 'journal'}.${fileType}`);
                    document.body.appendChild(link);
                    link.click();

                    // Clean up
                    setTimeout(() => {
                        window.URL.revokeObjectURL(blobUrl);
                        link.remove();
                    }, 100);

                    toast.success(`File downloaded successfully`);
                } catch (fetchError) {
                    console.error('Fetch download failed:', fetchError);
                    toast.error(`Direct download failed: ${fetchError.message}`);

                    // As a last resort, try opening the URLs in new tabs
                    toast.info(`Opening download in new tab as last resort...`);

                    // Open the primary URL in a new tab
                    console.log(`Opening primary URL in new tab: ${apiUrl}`);
                    window.open(apiUrl, '_blank');

                    // If we have a fallback URL, open it after a short delay
                    if (urlsToTry.length > 1) {
                        setTimeout(() => {
                            toast.info(`Trying fallback URL in new tab...`);
                            console.log(`Opening fallback URL in new tab: ${directFileUrl}`);
                            window.open(directFileUrl, '_blank');
                        }, 1500);
                    }
                }
            }
        } catch (error) {
            console.error('Download error:', error);
            toast.error(`Error downloading file: ${error.message}`);
        }
    };

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>

            <div className="space-y-3">
                <p className="text-justify"><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
                <p><strong>Content:</strong> {journal?.content || 'Download PDF or WORD file'}</p>

                {/* Always show the PDF download button, like in JournalList */}
                <p>
                    <strong>PDF:</strong> {' '}
                    <button
                        onClick={() => handleDownload('pdf')}
                        className="text-blue-600 hover:underline ml-2"
                    >
                        Download PDF
                    </button>
                </p>

                {/* Always show the Word download button, like in JournalList */}
                <p>
                    <strong>Word Document:</strong> {' '}
                    <button
                        onClick={() => handleDownload('docx')}
                        className="text-blue-600 hover:underline ml-2"
                    >
                        Download Word Document
                    </button>
                </p>

                <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
                <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
                <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
            </div>
        </div>
    );
};

export default JournalDetail;