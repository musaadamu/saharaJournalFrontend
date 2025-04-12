import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Utility function to download files from the server
 * @param {string} url - The full URL to download the file from
 * @param {string} filename - The filename to save the file as
 * @param {string} fileType - The file type (e.g., 'pdf', 'docx')
 * @returns {Promise<boolean>} - True if download was successful, false otherwise
 */
export const downloadFile = async (url, filename, fileType) => {
    // Show loading toast
    const toastId = toast.loading(`Downloading ${fileType.toUpperCase()} file...`);
    
    try {
        // Get auth token
        const token = localStorage.getItem('authToken');
        
        // Make the request with axios
        const response = await axios({
            method: 'GET',
            url,
            responseType: 'blob',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Accept': '*/*'
            },
            timeout: 30000 // 30 seconds timeout
        });
        
        // Log response details for debugging
        console.log('Download response:', {
            status: response.status,
            headers: response.headers,
            contentType: response.headers['content-type'],
            contentLength: response.headers['content-length']
        });
        
        // Check if we got a valid response
        if (response.status !== 200) {
            throw new Error(`Server returned status ${response.status}`);
        }
        
        // Check if we got a valid blob
        if (!response.data || response.data.size === 0) {
            throw new Error('Received empty file');
        }
        
        // Create a download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            link.remove();
        }, 100);
        
        // Update toast
        toast.update(toastId, {
            render: `File downloaded as ${fileType.toUpperCase()}`,
            type: 'success',
            isLoading: false,
            autoClose: 3000
        });
        
        return true;
    } catch (err) {
        console.error(`Error downloading ${fileType} file:`, err);
        
        // Provide more detailed error message
        let errorMessage = `Failed to download ${fileType.toUpperCase()} file`;
        
        if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', {
                status: err.response.status,
                data: err.response.data,
                headers: err.response.headers
            });
            errorMessage = `Server error (${err.response.status}): ${err.response.data?.message || 'Unknown error'}`;
        } else if (err.request) {
            // The request was made but no response was received
            console.error('Error request:', err.request);
            errorMessage = 'No response from server. Check your network connection.';
        }
        
        // Update toast
        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000
        });
        
        return false;
    }
};

/**
 * Utility function to download journal files
 * @param {string} baseUrl - The base URL of the API
 * @param {string} journalId - The ID of the journal
 * @param {string} fileType - The file type (e.g., 'pdf', 'docx')
 * @param {string} title - The title to use for the filename
 * @returns {Promise<boolean>} - True if download was successful, false otherwise
 */
export const downloadJournalFile = async (baseUrl, journalId, fileType, title) => {
    const url = `${baseUrl}/journals/${journalId}/download/${fileType}`;
    const filename = `${title || 'journal'}.${fileType}`;
    return downloadFile(url, filename, fileType);
};

export default {
    downloadFile,
    downloadJournalFile
};
