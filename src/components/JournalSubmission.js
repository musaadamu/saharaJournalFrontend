import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './JournalSubmission.css';

const JournalSubmission = () => {
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

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

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
            
            const authorNames = formData.authors
                .split(',')
                .map(name => name.trim())
                .filter(Boolean);
            submissionData.append('authors', JSON.stringify(authorNames));
            
            const keywords = formData.keywords
                .split(',')
                .map(kw => kw.trim())
                .filter(Boolean);
            submissionData.append('keywords', JSON.stringify(keywords));
            
            if (formData.file) {
                submissionData.append('file', formData.file);
            }

            await axios.post(`${API_URL}/submissions`, submissionData);
            toast.success('Journal submitted successfully');
            setFormData({ 
                title: '', 
                abstract: '', 
                keywords: '', 
                authors: '', 
                file: null 
            });
        } catch (err) {
            toast.error('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="journal-submission-container max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Journal Submissions</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded-md mb-4" />
                <textarea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract" required className="w-full p-2 border rounded-md h-32 mb-4" />
                <input type="text" name="keywords" value={formData.keywords} onChange={handleChange} placeholder="Keywords" required className="w-full p-2 border rounded-md mb-4" />
                <input type="text" name="authors" value={formData.authors} onChange={handleChange} placeholder="Authors" required className="w-full p-2 border rounded-md mb-4" />
                <input type="file" accept=".docx" onChange={handleFileChange} required={!editingId} className="w-full p-2 border rounded-md mb-4" />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">{editingId ? 'Update' : 'Submit'}</button>
            </form>
        </div>
    );
};

export default JournalSubmission;
