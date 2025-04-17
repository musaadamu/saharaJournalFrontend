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

        // Log the download attempt
        console.log('Downloading file:', {
            url,
            filename,
            fileType,
            hasToken: !!token
        });

        // Make the request with axios
        // Remove problematic headers for CORS requests
        const headers = {
            'Authorization': token ? `Bearer ${token}` : '',
            'Accept': '*/*'
        };

        // Only add cache control headers for same-origin requests to avoid CORS issues
        const isSameOrigin = url.startsWith(window.location.origin);
        if (isSameOrigin) {
            headers['Cache-Control'] = 'no-cache';
            headers['Pragma'] = 'no-cache';
        }

        // For Render backend, ensure we're not sending credentials
        const isRenderBackend = url.includes('saharabackend-v190.onrender.com');
        const isDirectFileEndpoint = url.includes('/direct-file/');

        console.log('Request headers:', headers);
        console.log('Request details:', { isRenderBackend, isDirectFileEndpoint });

        // Configure axios request
        const axiosConfig = {
            method: 'GET',
            url,
            responseType: 'blob',
            headers,
            timeout: isRenderBackend ? 120000 : 60000, // Longer timeout for Render
            withCredentials: false, // Disable sending cookies for cross-origin requests
            maxRedirects: 5, // Allow redirects
            validateStatus: status => status < 400 // Accept any successful status
        };

        // For direct file endpoints, use simpler headers to avoid CORS issues
        if (isDirectFileEndpoint) {
            axiosConfig.headers = {
                'Accept': '*/*'
            };
        }

        console.log('Axios config:', axiosConfig);
        const response = await axios(axiosConfig);

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
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Clean up
        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
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
    // Log the download attempt
    console.log('Attempting to download journal file:', {
        baseUrl,
        journalId,
        fileType,
        title
    });

    // Determine if we're in production
    const isProduction = process.env.NODE_ENV === 'production' || baseUrl.includes('render.com') || window.location.hostname !== 'localhost';
    console.log('Environment:', { isProduction, NODE_ENV: process.env.NODE_ENV, hostname: window.location.hostname });

    // Create a filename for the download
    const filename = `${title || 'journal'}.${fileType}`;

    // Generate multiple URLs to try in order
    const urlsToTry = [];

    // Clean the base URL to get the backend root
    const backendRoot = baseUrl.replace('/api', '');
    const backendUrl = isProduction ? 'https://saharabackend-v190.onrender.com' : 'http://localhost:5000';

    // Determine if we're running locally or accessing the deployed backend
    const isLocalBackend = window.location.hostname === 'localhost';

    console.log('Environment details:', {
        isProduction,
        isLocalBackend,
        backendUrl,
        baseUrl,
        backendRoot,
        hostname: window.location.hostname
    });

    // Add URLs in order of preference based on environment
    if (!isLocalBackend) {
        // For production (Render backend)
        urlsToTry.push(
            // Direct file endpoint first (more reliable on Render)
            `https://saharabackend-v190.onrender.com/direct-file/journals/${journalId}.${fileType}`,
            // Then try the API endpoint
            `https://saharabackend-v190.onrender.com/api/journals/${journalId}/download/${fileType}`
        );
    } else {
        // For local development
        urlsToTry.push(
            // Primary endpoint for local development
            `http://localhost:5000/api/journals/${journalId}/download/${fileType}`,
            // Fallback direct API endpoint
            `http://localhost:5000/direct-file/journals/${journalId}.${fileType}`
        );
    }

    // Log the URLs we're going to try
    console.log('Download URLs to try:', urlsToTry);

    // Try each URL in sequence until one works
    let lastError = null;
    for (const url of urlsToTry) {
        try {
            console.log('Trying URL:', url);
            const success = await downloadFile(url, filename, fileType);
            if (success) {
                console.log('Download successful with URL:', url);
                return true;
            }
        } catch (error) {
            console.error(`Failed with URL ${url}:`, error);
            lastError = error;
            // Continue to the next URL
        }
    }

    // If we get here, all URLs failed
    console.error('All download attempts failed');
    if (lastError) {
        throw lastError;
    }
    return false;
};

export default {
    downloadFile,
    downloadJournalFile
};
