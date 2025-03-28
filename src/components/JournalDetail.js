import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JournalDetails.css';

const JournalDetail = () => {
    const { id } = useParams(); // Get the journal ID from the URL
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/journals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch journal details');

                const data = await response.json();
                setJournal(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id]);

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{journal?.title || 'Untitled Journal'}</h2>
            
            <div className="space-y-3">
                <p><strong>Abstract:</strong> {journal?.abstract || 'No abstract available'}</p>
                <p><strong>Content:</strong> {journal?.content || 'No content available'}</p>

                {journal?.pdfUrl && (
                    <p>
                        <strong>PDF:</strong> 
                        <a 
                            href={journal.pdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:underline"
                        >
                            View PDF
                        </a>
                    </p>
                )}

                <p><strong>Keywords:</strong> {journal?.keywords?.join(', ') || 'No keywords'}</p>
                <p><strong>Status:</strong> {journal?.status || 'Unknown'}</p>
                <p><strong>Published Date:</strong> {journal?.publishedDate ? new Date(journal.publishedDate).toLocaleDateString() : 'Not published yet'}</p>
            </div>
        </div>
    );
};

export default JournalDetail;
