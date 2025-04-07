// // // import React, { useState, useEffect } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { toast } from 'react-toastify';
// // // import api from '../services/api';
// // // import './JournalSubmission.css';

// // // const JournalSubmission = () => {
// // //     const navigate = useNavigate();
// // //     const [submissions, setSubmissions] = useState([]);
// // //     const [formData, setFormData] = useState({
// // //         title: '',
// // //         abstract: '',
// // //         keywords: '',
// // //         author: '',
// // //         wordFileUrl: ''
// // //     });
// // //     const [editingId, setEditingId] = useState(null);
// // //     const [error, setError] = useState('');
// // //     const [loading, setLoading] = useState(true);

// // //     useEffect(() => {
// // //         fetchSubmissions();
// // //     }, []);

// // //     const fetchSubmissions = async () => {
// // //         setLoading(true);
// // //         setError('');
// // //         try {
// // //             const { data } = await api.get('/submissions', {
// // //                 params: { sortBy: 'createdAt', order: 'desc' }
// // //             });
// // //             setSubmissions(data.submissions || []);

// // //         } catch (err) {
// // //             const errorMessage = err.response?.data?.message || 'Failed to fetch submissions';
// // //             setError(errorMessage);
// // //             toast.error(errorMessage);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);
// // //         try {
// // //             if (editingId) {
// // //                 await api.put(`/submissions/${editingId}`, formData);
// // //                 toast.success('Submission updated successfully');
// // //             } else {
// // //                 await api.post('/submissions', formData);
// // //                 toast.success('Journal submitted successfully');
// // //             }
// // //             setFormData({ title: '', abstract: '', keywords: '', author: '', wordFileUrl: '' });
// // //             setEditingId(null);
// // //             fetchSubmissions();
// // //         } catch (err) {
// // //             const errorMessage = err.response?.data?.message || 'Submission failed';
// // //             toast.error(errorMessage);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const handleEdit = (submission) => {
// // //         setFormData({
// // //             title: submission.title,
// // //             abstract: submission.abstract,
// // //             keywords: Array.isArray(submission.keywords) ? submission.keywords.join(', ') : submission.keywords,
// // //             author: submission.author,
// // //             wordFileUrl: submission.wordFileUrl
// // //         });
// // //         setEditingId(submission._id);
// // //     };

// // //     const handleDelete = async (id) => {
// // //         try {
// // //             await api.delete(`/submissions/${id}`);
// // //             toast.success('Submission deleted successfully');
// // //             fetchSubmissions();
// // //         } catch (err) {
// // //             const errorMessage = err.response?.data?.message || 'Failed to delete submission';
// // //             toast.error(errorMessage);
// // //         }
// // //     };

// // //     if (loading) return <div className="loading-spinner">Loading...</div>;


// // //     return (
// // //         <div className="journal-submission-container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
// // //             <div className="header flex flex-col sm:flex-row justify-between items-center mb-6">
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Journal Submissions</h2>
// // //                 <Link 
// // //                     to="/journals" 
// // //                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// // //                 >
// // //                     + New Submission
// // //                 </Link>
// // //             </div>

// // //             {error && (
// // //                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
// // //                     <span className="block sm:inline">{error}</span>
// // //                 </div>
// // //             )}

// // //             <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Title</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="title" 
// // //                         value={formData.title} 
// // //                         onChange={handleChange} 
// // //                         placeholder="Journal Title" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Abstract</label>
// // //                     <textarea 
// // //                         name="abstract" 
// // //                         value={formData.abstract} 
// // //                         onChange={handleChange} 
// // //                         placeholder="Journal Abstract" 
// // //                         className="w-full p-2 border rounded-md h-32"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Keywords (comma separated)</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="keywords" 
// // //                         value={formData.keywords} 
// // //                         onChange={handleChange} 
// // //                         placeholder="e.g. science, research, medicine" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Author</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="author" 
// // //                         value={formData.author} 
// // //                         onChange={handleChange} 
// // //                         placeholder="Author Name" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Word File URL</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="wordFileUrl" 
// // //                         value={formData.wordFileUrl} 
// // //                         onChange={handleChange} 
// // //                         placeholder="URL to the Word document" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <button 
// // //                     type="submit" 
// // //                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// // //                     disabled={loading}
// // //                 >
// // //                     {loading ? 'Processing...' : (editingId ? 'Update Submission' : 'Submit Journal')}
// // //                 </button>
// // //             </form>

// // //             <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Submissions</h3>
            
// // //             {submissions.length === 0 ? (
// // //                 <div className="text-center py-10 text-gray-500">
// // //                     <p className="text-lg">No submissions available</p>
// // //                     <p className="mt-2">Submit your first journal above!</p>
// // //                 </div>
// // //             ) : (
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // //                     {submissions.map(submission => (
// // //                         <div key={submission._id} className="submission-card border rounded-lg p-4 hover:shadow-md transition-shadow">
// // //                             <h3 className="text-lg font-semibold text-blue-600">
// // //                                 {submission.title}
// // //                             </h3>
// // //                             <p className="text-gray-600 mt-2 line-clamp-2">{submission.abstract}</p>
// // //                             <div className="mt-2 text-sm text-gray-500">
// // //                                 Author: {submission.author}
// // //                             </div>
// // //                             <div className="actions mt-4 flex flex-wrap gap-2">
// // //                                 <button 
// // //                                     onClick={() => handleEdit(submission)} 
// // //                                     className="text-blue-500 hover:text-blue-700"
// // //                                 >
// // //                                     Edit
// // //                                 </button>
// // //                                 <button 
// // //                                     onClick={() => handleDelete(submission._id)} 
// // //                                     className="text-red-500 hover:text-red-700"
// // //                                 >
// // //                                     Delete
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default JournalSubmission;

// // // import React, { useState, useEffect } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { toast } from 'react-toastify';
// // // import api from '../services/api';
// // // import './JournalSubmission.css';

// // // const JournalSubmission = () => {
// // //     const navigate = useNavigate();
// // //     const [submissions, setSubmissions] = useState([]);
// // //     const [formData, setFormData] = useState({
// // //         title: '',
// // //         abstract: '',
// // //         keywords: '',
// // //         author: '',
// // //         wordFileUrl: ''
// // //     });
// // //     const [editingId, setEditingId] = useState(null);
// // //     const [error, setError] = useState('');
// // //     const [loading, setLoading] = useState(true);

// // //     useEffect(() => {
// // //         fetchSubmissions();
// // //     }, []);

// // //     const fetchSubmissions = async () => {
// // //         setLoading(true);
// // //         setError('');
// // //         try {
// // //             const response = await api.get('/submissions', {
// // //                 params: { sortBy: 'createdAt', order: 'desc' }
// // //             });
            
// // //             // Ensure we always have an array, handling different response structures
// // //             const submissionsData = Array.isArray(response.data) 
// // //                 ? response.data 
// // //                 : (response.data?.submissions || []);
                
// // //             setSubmissions(submissionsData);


// // //         } catch (err) {
// // //             const errorMessage = err.response?.data?.message || 'Failed to fetch submissions';
// // //             setError(errorMessage);
// // //             toast.error(errorMessage);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setLoading(true);
// // //         try {
// // //             if (editingId) {
// // //                 await api.put(`/submissions/${editingId}`, formData);
// // //                 toast.success('Submission updated successfully');
// // //             } else {
// // //                 await api.post('/submissions', formData);
// // //                 toast.success('Journal submitted successfully');
// // //             }
// // //             setFormData({ title: '', abstract: '', keywords: '', author: '', wordFileUrl: '' });
// // //             setEditingId(null);
// // //             fetchSubmissions();
// // //         } catch (err) {
// // //             const errorMessage = err.response?.data?.message || 'Submission failed';
// // //             toast.error(errorMessage);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const handleEdit = (submission) => {
// // //         setFormData({
// // //             title: submission.title,
// // //             abstract: submission.abstract,
// // //             keywords: Array.isArray(submission.keywords) ? submission.keywords.join(', ') : submission.keywords,
// // //             author: submission.author,
// // //             wordFileUrl: submission.wordFileUrl
// // //         });
// // //         setEditingId(submission._id);
// // //     };

// // //     const handleDelete = async (id) => {
// // //         try {
// // //             await api.delete(`/submissions/${id}`);
// // //             toast.success('Submission deleted successfully');
// // //             fetchSubmissions();
// // //         } catch (err) {
// // //             const errorMessage = err.response?.data?.message || 'Failed to delete submission';
// // //             toast.error(errorMessage);
// // //         }
// // //     };

// // //     if (loading) return <div className="loading-spinner">Loading...</div>;
// // //     if (!Array.isArray(submissions)) {
// // //         return (
// // //             <div className="error-message">
// // //                 Error: Invalid submissions data format
// // //             </div>
// // //         );
// // //     }



// // //     return (
// // //         <div className="journal-submission-container max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
// // //             <div className="header flex flex-col sm:flex-row justify-between items-center mb-6">
// // //                 <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Journal Submissions</h2>
// // //                 <Link 
// // //                     to="/journals" 
// // //                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// // //                 >
// // //                     + New Submission
// // //                 </Link>
// // //             </div>

// // //             {error && (
// // //                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
// // //                     <span className="block sm:inline">{error}</span>
// // //                 </div>
// // //             )}

// // //             <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Title</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="title" 
// // //                         value={formData.title} 
// // //                         onChange={handleChange} 
// // //                         placeholder="Journal Title" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Abstract</label>
// // //                     <textarea 
// // //                         name="abstract" 
// // //                         value={formData.abstract} 
// // //                         onChange={handleChange} 
// // //                         placeholder="Journal Abstract" 
// // //                         className="w-full p-2 border rounded-md h-32"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Keywords (comma separated)</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="keywords" 
// // //                         value={formData.keywords} 
// // //                         onChange={handleChange} 
// // //                         placeholder="e.g. science, research, medicine" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Author</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="author" 
// // //                         value={formData.author} 
// // //                         onChange={handleChange} 
// // //                         placeholder="Author Name" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                     <label className="block text-gray-700 mb-2">Word File URL</label>
// // //                     <input 
// // //                         type="text" 
// // //                         name="wordFileUrl" 
// // //                         value={formData.wordFileUrl} 
// // //                         onChange={handleChange} 
// // //                         placeholder="URL to the Word document" 
// // //                         className="w-full p-2 border rounded-md"
// // //                         required 
// // //                     />
// // //                 </div>
// // //                 <button 
// // //                     type="submit" 
// // //                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
// // //                     disabled={loading}
// // //                 >
// // //                     {loading ? 'Processing...' : (editingId ? 'Update Submission' : 'Submit Journal')}
// // //                 </button>
// // //             </form>

// // //             <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Submissions</h3>
            
// // //             {submissions.length === 0 ? (
// // //                 <div className="text-center py-10 text-gray-500">
// // //                     <p className="text-lg">No submissions available</p>
// // //                     <p className="mt-2">Submit your first journal above!</p>
// // //                 </div>
// // //             ) : (
// // //                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// // //                     {submissions.map(submission => (
// // //                         <div key={submission._id} className="submission-card border rounded-lg p-4 hover:shadow-md transition-shadow">
// // //                             <h3 className="text-lg font-semibold text-blue-600">
// // //                                 {submission.title}
// // //                             </h3>
// // //                             <p className="text-gray-600 mt-2 line-clamp-2">{submission.abstract}</p>
// // //                             <div className="mt-2 text-sm text-gray-500">
// // //                                 Author: {submission.author}
// // //                             </div>
// // //                             <div className="actions mt-4 flex flex-wrap gap-2">
// // //                                 <button 
// // //                                     onClick={() => handleEdit(submission)} 
// // //                                     className="text-blue-500 hover:text-blue-700"
// // //                                 >
// // //                                     Edit
// // //                                 </button>
// // //                                 <button 
// // //                                     onClick={() => handleDelete(submission._id)} 
// // //                                     className="text-red-500 hover:text-red-700"
// // //                                 >
// // //                                     Delete
// // //                                 </button>
// // //                             </div>
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default JournalSubmission;

// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// // import api from '../services/api';
// // import './JournalSubmission.css';

// // const JournalSubmission = () => {
// //     const navigate = useNavigate();
// //     const [submissions, setSubmissions] = useState([]);
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         abstract: '',
// //         keywords: '',
// //         author: '',
// //         wordFile: null
// //     });
// //     const [editingId, setEditingId] = useState(null);
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         fetchSubmissions();
// //     }, []);

// //     const fetchSubmissions = async () => {
// //         setLoading(true);
// //         setError('');
// //         try {
// //             const response = await api.get('/submissions', {
// //                 params: { sortBy: 'createdAt', order: 'desc' }
// //             });
// //             setSubmissions(response.data.submissions || []);
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to fetch submissions');
// //             toast.error(error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleFileChange = (e) => {
// //         setFormData({ ...formData, wordFile: e.target.files[0] });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         try {
// //             const submissionData = new FormData();
// //             submissionData.append('title', formData.title);
// //             submissionData.append('abstract', formData.abstract);
// //             submissionData.append('keywords', formData.keywords);
// //             submissionData.append('author', formData.author);
// //             if (formData.wordFile) {
// //                 submissionData.append('wordFile', formData.wordFile);
// //             }

// //             if (editingId) {
// //                 await api.put(`/submissions/${editingId}`, submissionData, {
// //                     headers: { 'Content-Type': 'multipart/form-data' }
// //                 });
// //                 toast.success('Submission updated successfully');
// //             } else {
// //                 await api.post('/submissions', submissionData, {
// //                     headers: { 'Content-Type': 'multipart/form-data' }
// //                 });
// //                 toast.success('Journal submitted successfully');
// //             }
// //             setFormData({ title: '', abstract: '', keywords: '', author: '', wordFile: null });
// //             setEditingId(null);
// //             fetchSubmissions();
// //         } catch (err) {
// //             toast.error(err.response?.data?.message || 'Submission failed');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="journal-submission-container max-w-4xl mx-auto p-4">
// //             <h2 className="text-2xl font-bold mb-6">Journal Submissions</h2>
// //             {error && <div className="error-message">{error}</div>}
// //             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
// //                 <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded-md mb-4" />
// //                 <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract" required className="w-full p-2 border rounded-md h-32 mb-4" />
// //                 <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Keywords" required className="w-full p-2 border rounded-md mb-4" />
// //                 <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" required className="w-full p-2 border rounded-md mb-4" />
// //                 <input type="file" accept=".docx" onChange={handleFileChange} required={!editingId} className="w-full p-2 border rounded-md mb-4" />
// //                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{editingId ? 'Update' : 'Submit'}</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default JournalSubmission;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import './JournalSubmission.css';

// const JournalSubmission = () => {
//     const navigate = useNavigate();
//     const [submissions, setSubmissions] = useState([]);
//     const [formData, setFormData] = useState({
//         title: '',
//         abstract: '',
//         keywords: '',
//         authors: '',
//         file: null
//     });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchSubmissions();
//     }, []);

//     const fetchSubmissions = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await api.get('/submissions', {
//                 params: { sortBy: 'createdAt', order: 'desc' }
//             });
//             setSubmissions(response.data.submissions || []);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to fetch submissions');
//             toast.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, file: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const submissionData = new FormData();
//             submissionData.append('title', formData.title);
//             submissionData.append('abstract', formData.abstract);
//             submissionData.append('keywords', formData.keywords);
//             submissionData.append('authors', formData.authors);
//             if (formData.file) {
//                 submissionData.append('file', formData.file);
//             }

//             if (editingId) {
//                 await api.put(`/submissions/${editingId}`, submissionData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 toast.success('Submission updated successfully');
//             } else {
//                 await api.post('/submissions', submissionData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 toast.success('Journal submitted successfully');
//             }
//             setFormData({ 
//                 title: '', 
//                 abstract: '', 
//                 keywords: '', 
//                 authors: '', 
//                 file: null 
//             });
//             setEditingId(null);
//             fetchSubmissions();
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Submission failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="journal-submission-container max-w-4xl mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-6">Journal Submissions</h2>
//             {error && <div className="error-message">{error}</div>}
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded-md mb-4" />
//                 <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract" required className="w-full p-2 border rounded-md h-32 mb-4" />
//                 <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Keywords" required className="w-full p-2 border rounded-md mb-4" />
//                 <input type="text" name="authors" value={formData.authors} onChange={handleChange} placeholder="Authors" required className="w-full p-2 border rounded-md mb-4" />
//                 <input type="file" accept=".docx" onChange={handleFileChange} required={!editingId} className="w-full p-2 border rounded-md mb-4" />
//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{editingId ? 'Update' : 'Submit'}</button>
//             </form>
//         </div>
//     );
// };

// export default JournalSubmission;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import './JournalSubmission.css';

// const JournalSubmission = () => {
//     const navigate = useNavigate();
//     const [submissions, setSubmissions] = useState([]);
//     const [formData, setFormData] = useState({
//         title: '',
//         abstract: '',
//         keywords: '',
//         authors: '',
//         file: null
//     });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchSubmissions();
//     }, []);

//     const fetchSubmissions = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await api.get('/submissions', {
//                 params: { sortBy: 'createdAt', order: 'desc' }
//             });
//             setSubmissions(response.data.submissions || []);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to fetch submissions');
//             toast.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, file: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const submissionData = new FormData();
//             submissionData.append('title', formData.title);
//             submissionData.append('abstract', formData.abstract);
//             submissionData.append('keywords', formData.keywords);
//             submissionData.append('authors', formData.authors);
//             if (formData.file) {
//                 submissionData.append('file', formData.file);
//             }

//             if (editingId) {
//                 await api.put(`/submissions/${editingId}`, submissionData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 toast.success('Submission updated successfully');
//             } else {
//                 await api.post('/submissions', submissionData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 toast.success('Journal submitted successfully');
//             }
//             setFormData({ 
//                 title: '', 
//                 abstract: '', 
//                 keywords: '', 
//                 authors: '', 
//                 file: null 
//             });
//             setEditingId(null);
//             fetchSubmissions();
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Submission failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="journal-submission-container max-w-4xl mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-6">Journal Submissions</h2>
//             {error && <div className="error-message">{error}</div>}
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
//                 <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded-md mb-4" />
//                 <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract" required className="w-full p-2 border rounded-md h-32 mb-4" />
//                 <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Keywords" required className="w-full p-2 border rounded-md mb-4" />
//                 <input type="text" name="authors" value={formData.authors} onChange={handleChange} placeholder="Authors" required className="w-full p-2 border rounded-md mb-4" />
//                 <input type="file" accept=".docx" onChange={handleFileChange} required={!editingId} className="w-full p-2 border rounded-md mb-4" />
//                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{editingId ? 'Update' : 'Submit'}</button>
//             </form>
//         </div>
//     );
// };

// export default JournalSubmission;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import api from '../services/api';
// import './JournalSubmission.css';

// const JournalSubmission = () => {
//     const navigate = useNavigate();
//     const [submissions, setSubmissions] = useState([]);
//     const [formData, setFormData] = useState({
//         title: '',
//         abstract: '',
//         keywords: '',
//         authors: '',
//         file: null
//     });
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchSubmissions();
//     }, []);

//     const fetchSubmissions = async () => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await api.get('/submissions', {
//                 params: { sortBy: 'createdAt', order: 'desc' }
//             });
//             setSubmissions(response.data.submissions || []);
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || 'Failed to fetch submissions';
//             setError(errorMsg);
//             toast.error(errorMsg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFormData({ ...formData, file: e.target.files[0] });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const submissionData = new FormData();
//             submissionData.append('title', formData.title);
//             submissionData.append('abstract', formData.abstract);
            
//             // Process keywords as array
//             const keywordsList = formData.keywords
//                 .split(',')
//                 .map(keyword => keyword.trim())
//                 .filter(keyword => keyword);
//             keywordsList.forEach(keyword => {
//                 submissionData.append('keywords[]', keyword);
//             });
            
//             // Process authors as array
//             const authorsList = formData.authors
//                 .split(',')
//                 .map(author => author.trim())
//                 .filter(author => author);
//             authorsList.forEach(author => {
//                 submissionData.append('authors[]', author);
//             });
            
//             if (formData.file) {
//                 submissionData.append('file', formData.file);
//             }

//             if (editingId) {
//                 await api.put(`/submissions/${editingId}`, submissionData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 toast.success('Submission updated successfully');
//             } else {
//                 await api.post('/submissions', submissionData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 toast.success('Journal submitted successfully');
//             }
//             setFormData({ 
//                 title: '', 
//                 abstract: '', 
//                 keywords: '', 
//                 authors: '', 
//                 file: null 
//             });
//             document.querySelector('input[type="file"]').value = '';
//             setEditingId(null);
//             fetchSubmissions();
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message || 'Submission failed';
//             toast.error(errorMsg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleEdit = (submission) => {
//         setFormData({
//             title: submission.title,
//             abstract: submission.abstract,
//             keywords: Array.isArray(submission.keywords) ? submission.keywords.join(', ') : submission.keywords,
//             authors: Array.isArray(submission.authors) ? submission.authors.join(', ') : submission.authors,
//             file: null // Can't populate file input
//         });
//         setEditingId(submission._id);
//         window.scrollTo(0, 0);
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this submission?')) return;
        
//         try {
//             await api.delete(`/submissions/${id}`);
//             toast.success('Submission deleted successfully');
//             fetchSubmissions();
//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message || 'Delete failed';
//             toast.error(errorMsg);
//         }
//     };

//     return (
//         <div className="journal-submission-container max-w-4xl mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-6">Journal Submissions</h2>
//             {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            
//             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
//                 <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Submission' : 'New Submission'}</h3>
                
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Title</label>
//                     <input 
//                         type="text" 
//                         name="title" 
//                         value={formData.title} 
//                         onChange={handleChange} 
//                         placeholder="Enter journal title" 
//                         required 
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>
                
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Abstract</label>
//                     <textarea 
//                         name="abstract" 
//                         value={formData.abstract} 
//                         onChange={handleChange} 
//                         placeholder="Enter abstract" 
//                         required 
//                         className="w-full p-2 border rounded-md h-32" 
//                     />
//                 </div>
                
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Keywords (comma separated)</label>
//                     <input 
//                         type="text" 
//                         name="keywords" 
//                         value={formData.keywords} 
//                         onChange={handleChange} 
//                         placeholder="e.g. science, research, biology" 
//                         required 
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>
                
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Authors (comma separated)</label>
//                     <input 
//                         type="text" 
//                         name="authors" 
//                         value={formData.authors} 
//                         onChange={handleChange} 
//                         placeholder="e.g. John Smith, Jane Doe" 
//                         required 
//                         className="w-full p-2 border rounded-md" 
//                     />
//                 </div>
                
//                 <div className="mb-6">
//                     <label className="block text-gray-700 mb-2">Document (.docx)</label>
//                     <input 
//                         type="file" 
//                         accept=".docx" 
//                         onChange={handleFileChange} 
//                         required={!editingId} 
//                         className="w-full p-2 border rounded-md" 
//                     />
//                     {editingId && (
//                         <p className="text-sm text-gray-500 mt-1">
//                             Leave empty to keep the current file
//                         </p>
//                     )}
//                 </div>
                
//                 <div className="flex space-x-4">
//                     <button 
//                         type="submit" 
//                         disabled={loading} 
//                         className={`px-4 py-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
//                     >
//                         {loading ? 'Processing...' : (editingId ? 'Update Submission' : 'Submit Journal')}
//                     </button>
                    
//                     {editingId && (
//                         <button 
//                             type="button" 
//                             onClick={() => {
//                                 setEditingId(null);
//                                 setFormData({ title: '', abstract: '', keywords: '', authors: '', file: null });
//                                 document.querySelector('input[type="file"]').value = '';
//                             }} 
//                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//                         >
//                             Cancel Edit
//                         </button>
//                     )}
//                 </div>
//             </form>
            
//             <div className="my-submissions">
//                 <h3 className="text-xl font-semibold mb-4">Your Submissions</h3>
                
//                 {loading ? (
//                     <div className="text-center py-8">Loading submissions...</div>
//                 ) : submissions.length === 0 ? (
//                     <div className="bg-gray-50 p-8 text-center rounded-lg">
//                         <p className="text-gray-500">You haven't made any submissions yet.</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {submissions.map(submission => (
//                             <div key={submission._id} className="bg-white p-4 rounded-lg shadow-sm border">
//                                 <h4 className="font-bold">{submission.title}</h4>
//                                 <p className="text-sm text-gray-600 mt-1 line-clamp-2">{submission.abstract}</p>
                                
//                                 <div className="flex justify-between items-center mt-3">
//                                     <span className={`text-xs px-2 py-1 rounded-full ${
//                                         submission.status === 'Under Review' 
//                                             ? 'bg-yellow-100 text-yellow-800' 
//                                             : submission.status === 'Rejected'
//                                             ? 'bg-red-100 text-red-800'
//                                             : 'bg-green-100 text-green-800'
//                                     }`}>
//                                         {submission.status}
//                                     </span>
                                    
//                                     <div className="flex space-x-2">
//                                         <button 
//                                             onClick={() => handleEdit(submission)} 
//                                             className="text-blue-500 hover:text-blue-700"
//                                         >
//                                             Edit
//                                         </button>
//                                         <button 
//                                             onClick={() => handleDelete(submission._id)} 
//                                             className="text-red-500 hover:text-red-700"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default JournalSubmission;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import './JournalSubmission.css';

const JournalSubmission = () => {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        keywords: '',
        authors: '',
        file: null
    });
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/submissions', {
                params: { sortBy: 'createdAt', order: 'desc' }
            });
            setSubmissions(response.data.submissions || []);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch submissions';
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const submissionData = new FormData();
            submissionData.append('title', formData.title);
            submissionData.append('abstract', formData.abstract);
            
            // Process keywords as array
            const keywordsList = formData.keywords
                .split(',')
                .map(keyword => keyword.trim())
                .filter(keyword => keyword);
            keywordsList.forEach(keyword => {
                submissionData.append('keywords[]', keyword);
            });
            
            // Process authors as array
            const authorsList = formData.authors
                .split(',')
                .map(author => author.trim())
                .filter(author => author);
            authorsList.forEach(author => {
                submissionData.append('authors[]', author);
            });
            
            if (formData.file) {
                submissionData.append('file', formData.file);
            }

            if (editingId) {
                await api.put(`/submissions/${editingId}`, submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Submission updated successfully');
            } else {
                await api.post('/submissions', submissionData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success('Journal submitted successfully');
            }
            setFormData({ 
                title: '', 
                abstract: '', 
                keywords: '', 
                authors: '', 
                file: null 
            });
            document.querySelector('input[type="file"]').value = '';
            setEditingId(null);
            fetchSubmissions();
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Submission failed';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (submission) => {
        setFormData({
            title: submission.title,
            abstract: submission.abstract,
            keywords: Array.isArray(submission.keywords) ? submission.keywords.join(', ') : submission.keywords,
            authors: Array.isArray(submission.authors) ? submission.authors.join(', ') : submission.authors,
            file: null // Can't populate file input
        });
        setEditingId(submission._id);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this submission?')) return;
        
        try {
            await api.delete(`/submissions/${id}`);
            toast.success('Submission deleted successfully');
            fetchSubmissions();
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Delete failed';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="journal-submission-container max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Journal Submissions</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">{editingId ? 'Edit Submission' : 'New Submission'}</h3>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="Enter journal title" 
                        required 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Abstract</label>
                    <textarea 
                        name="abstract" 
                        value={formData.abstract} 
                        onChange={handleChange} 
                        placeholder="Enter abstract" 
                        required 
                        className="w-full p-2 border rounded-md h-32" 
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Keywords (comma separated)</label>
                    <input 
                        type="text" 
                        name="keywords" 
                        value={formData.keywords} 
                        onChange={handleChange} 
                        placeholder="e.g. science, research, biology" 
                        required 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Authors (comma separated)</label>
                    <input 
                        type="text" 
                        name="authors" 
                        value={formData.authors} 
                        onChange={handleChange} 
                        placeholder="e.g. John Smith, Jane Doe" 
                        required 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Document (.docx)</label>
                    <input 
                        type="file" 
                        accept=".docx" 
                        onChange={handleFileChange} 
                        required={!editingId} 
                        className="w-full p-2 border rounded-md" 
                    />
                    {editingId && (
                        <p className="text-sm text-gray-500 mt-1">
                            Leave empty to keep the current file
                        </p>
                    )}
                </div>
                
                <div className="flex space-x-4">
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className={`px-4 py-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                        {loading ? 'Processing...' : (editingId ? 'Update Submission' : 'Submit Journal')}
                    </button>
                    
                    {editingId && (
                        <button 
                            type="button" 
                            onClick={() => {
                                setEditingId(null);
                                setFormData({ title: '', abstract: '', keywords: '', authors: '', file: null });
                                document.querySelector('input[type="file"]').value = '';
                            }} 
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            
            <div className="my-submissions">
                <h3 className="text-xl font-semibold mb-4">Your Submissions</h3>
                
                {loading ? (
                    <div className="text-center py-8">Loading submissions...</div>
                ) : submissions.length === 0 ? (
                    <div className="bg-gray-50 p-8 text-center rounded-lg">
                        <p className="text-gray-500">You haven't made any submissions yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {submissions.map(submission => (
                            <div key={submission._id} className="bg-white p-4 rounded-lg shadow-sm border">
                                <h4 className="font-bold">{submission.title}</h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{submission.abstract}</p>
                                
                                <div className="flex justify-between items-center mt-3">
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        submission.status === 'Under Review' 
                                            ? 'bg-yellow-100 text-yellow-800' 
                                            : submission.status === 'Rejected'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {submission.status}
                                    </span>
                                    
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(submission)} 
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(submission._id)} 
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalSubmission;