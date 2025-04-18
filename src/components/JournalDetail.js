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

                // Create an array of URLs to try in order
                const urlsToTry = [];

                if (isProduction) {
                    // For production (Render backend)
                    // API endpoint first
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/api/journals/${id}/download/${fileType}`);

                    // Direct file endpoint with different patterns
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/direct-file/journals/${id}.${fileType}`);

                    // Static file URLs with different patterns
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/uploads/journals/${id}.${fileType}`);
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/uploads/${id}.${fileType}`);

                    // Try with the original filename pattern from error logs
                    // This is a special case for the specific file we know is failing
                    if (id === '67e3f4b941fce07f84b315b5') {
                        urlsToTry.push(`https://saharabackend-v190.onrender.com/uploads/journals/1742992568931-Research%20Proposal.${fileType}`);
                    }

                    // Try with API prefix
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/api/direct-file/journals/${id}.${fileType}`);
                    urlsToTry.push(`https://saharabackend-v190.onrender.com/api/uploads/journals/${id}.${fileType}`);
                } else {
                    // For local development
                    // API endpoint first
                    urlsToTry.push(`http://localhost:5000/api/journals/${id}/download/${fileType}`);

                    // Direct file endpoint
                    urlsToTry.push(`http://localhost:5000/direct-file/journals/${id}.${fileType}`);

                    // Static file URLs
                    urlsToTry.push(`http://localhost:5000/uploads/journals/${id}.${fileType}`);
                    urlsToTry.push(`http://localhost:5000/uploads/${id}.${fileType}`);
                }

                // For convenience in the rest of the code
                const apiUrl = urlsToTry[0];
                const directFileUrl = urlsToTry[1];
                const staticFileUrl = urlsToTry[2];

                console.log('URLs to try:', { apiUrl, directFileUrl, staticFileUrl });

                try {
                    // Try using fetch API to try all URLs in sequence
                    toast.info(`Attempting to download file...`);

                    let response = null;
                    let successUrl = null;

                    // Try each URL in sequence until one works
                    for (let i = 0; i < urlsToTry.length; i++) {
                        const url = urlsToTry[i];
                        try {
                            toast.info(`Trying URL ${i+1} of ${urlsToTry.length}...`);
                            console.log(`Trying URL: ${url}`);

                            response = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Accept': '*/*',
                                },
                                credentials: 'omit', // Don't send cookies
                                mode: 'cors', // Explicitly set CORS mode
                                cache: 'no-cache' // Don't use cached response
                            });

                            if (response.ok) {
                                successUrl = url;
                                console.log(`Success with URL: ${url}`);
                                break; // Exit the loop if we found a working URL
                            } else {
                                console.log(`Failed with URL ${url}: ${response.status} ${response.statusText}`);
                            }
                        } catch (fetchError) {
                            console.log(`Error with URL ${url}:`, fetchError.message);
                            // Continue to the next URL
                        }
                    }

                    // If none of the URLs worked, throw an error
                    if (!response || !response.ok) {
                        throw new Error(`All ${urlsToTry.length} download URLs failed`);
                    }

                    // If we got here, we have a successful response
                    toast.success(`Found working URL: ${successUrl}`);
                    console.log(`Download successful from: ${successUrl}`);

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

                    // As a last resort, try all URLs in new tabs
                    toast.info(`Opening download in new tab as last resort...`);

                    // Try each URL in a new tab with increasing delays
                    urlsToTry.forEach((url, index) => {
                        setTimeout(() => {
                            toast.info(`Trying URL ${index+1} of ${urlsToTry.length} in new tab...`);
                            console.log(`Opening in new tab: ${url}`);
                            window.open(url, '_blank');
                        }, index * 1000); // Stagger the openings by 1 second each
                    });

                    // Also try a diagnostic URL to help debug
                    setTimeout(() => {
                        const diagnosticUrl = isProduction
                            ? `https://saharabackend-v190.onrender.com/check-file/${id}/${fileType}`
                            : `http://localhost:5000/check-file/${id}/${fileType}`;

                        toast.info(`Opening diagnostic URL in new tab...`);
                        window.open(diagnosticUrl, '_blank');
                    }, urlsToTry.length * 1000 + 1000);
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