// // // import React, { useState } from "react";
// // // import "./JournalUpload.css";
// // // import Footer from "./Footer";
// // // import Navigation from "./Navigation";

// // // const JournalUpload = () => {
// // //     const [formData, setFormData] = useState({
// // //         title: "",
// // //         abstract: "",
// // //         authors: "",
// // //         keywords: "",
// // //     });
// // //     const [file, setFile] = useState(null);
// // //     const [error, setError] = useState("");
// // //     const [success, setSuccess] = useState("");
// // //     const [loading, setLoading] = useState(false);

// // //     const handleChange = (e) => {
// // //         setFormData({ ...formData, [e.target.name]: e.target.value });
// // //     };

// // //     const handleFileChange = (e) => {
// // //         setFile(e.target.files[0]);
// // //     };

// // //     const handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         setError("");
// // //         setSuccess("");
// // //         setLoading(true);

// // //         if (!file) {
// // //             setError("Please upload a Word document (.docx).");
// // //             setLoading(false);
// // //             return;
// // //         }

// // //         const formDataObj = new FormData();
// // //         formDataObj.append("title", formData.title);
// // //         formDataObj.append("abstract", formData.abstract);

// // //         // Append authors as names
// // //         const authorNames = formData.authors
// // //             .split(",")
// // //             .map((name) => name.trim())
// // //             .filter((name) => name); // Only keep non-empty names

// // //         if (authorNames.length === 0) {
// // //             setError("Please enter at least one author name.");
// // //             setLoading(false);
// // //             return;
// // //         }

// // //         authorNames.forEach((name) => formDataObj.append("authors[]", name));

// // //         // Append keywords individually
// // //         formData.keywords
// // //             .split(",")
// // //             .map((kw) => kw.trim())
// // //             .filter((kw) => kw) // Remove empty values
// // //             .forEach((kw) => formDataObj.append("keywords[]", kw));

// // //         formDataObj.append("file", file);

// // //         try {
// // //             const response = await fetch("http://localhost:5000/api/journals", {
// // //                 method: "POST",
// // //                 headers: {
// // //                     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
// // //                 },
// // //                 body: formDataObj, // No need to manually set Content-Type
// // //             });

// // //             const data = await response.json();
// // //             if (!response.ok) throw new Error(data.message || "Failed to upload journal");

// // //             setSuccess("Journal uploaded successfully");
// // //             setFormData({ title: "", abstract: "", authors: "", keywords: "" });
// // //             setFile(null);
// // //             document.getElementById("fileInput").value = ""; // Clear file input
// // //         } catch (err) {
// // //             setError(err.message);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     return (
// // //         <>
// // //         <Navigation />

// // //         <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
// // //             <h2 className="text-xl font-bold mb-4">Upload Journal</h2>

// // //             {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
// // //             {success && <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>}

// // //             <form onSubmit={handleSubmit} className="space-y-4">
// // //                 {["title", "abstract", "authors", "keywords"].map((field) => (
// // //                     <div key={field}>
// // //                         <label className="block font-medium capitalize">{field}:</label>
// // //                         <input
// // //                             type="text"
// // //                             name={field}
// // //                             value={formData[field]}
// // //                             onChange={handleChange}
// // //                             required={field !== "keywords"}
// // //                             className="w-full p-2 border rounded"
// // //                         />
// // //                         {field === "authors" && (
// // //                             <p className="text-sm text-gray-500">
// // //                                 Enter author names separated by commas.
// // //                             </p>
// // //                         )}
// // //                     </div>
// // //                 ))}

// // //                 {/* File Upload Input */}
// // //                 <div>
// // //                     <label className="block font-medium">Upload Word Document (.docx):</label>
// // //                     <input
// // //                         type="file"
// // //                         accept=".docx"
// // //                         onChange={handleFileChange}
// // //                         className="w-full p-2 border rounded"
// // //                         id="fileInput"
// // //                         required
// // //                     />
// // //                 </div>

// // //                 <button
// // //                     type="submit"
// // //                     disabled={loading}
// // //                     className={`w-full p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
// // //                 >
// // //                     {loading ? "Uploading..." : "Upload Journal"}
// // //                 </button>
// // //             </form>
// // //         </div>
// // //         <Footer />
// // //         </>
// // //     );
// // // };

// // // // export default JournalUpload;
// // import React, { useState } from "react";
// // import axios from "axios";
// // import "./JournalUpload.css";
// // import Footer from "./Footer";
// // import Navigation from "./Navigation";

// // const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// // const JournalUpload = () => {
// //     const [formData, setFormData] = useState({
// //         title: "",
// //         abstract: "",
// //         authors: "",
// //         keywords: "",
// //     });
// //     const [file, setFile] = useState(null);
// //     const [error, setError] = useState("");
// //     const [success, setSuccess] = useState("");
// //     const [loading, setLoading] = useState(false);

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleFileChange = (e) => {
// //         setFile(e.target.files[0]);
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError("");
// //         setSuccess("");
// //         setLoading(true);

// //         if (!file) {
// //             setError("Please upload a Word document (.docx).");
// //             setLoading(false);
// //             return;
// //         }

// //         const formDataObj = new FormData();
// //         formDataObj.append("title", formData.title);
// //         formDataObj.append("abstract", formData.abstract);

// //         // Process authors
// //         const authorNames = formData.authors
// //             .split(",")
// //             .map((name) => name.trim())
// //             .filter(Boolean);

// //         if (authorNames.length === 0) {
// //             setError("Please enter at least one author name.");
// //             setLoading(false);
// //             return;
// //         }
// //         authorNames.forEach((name) => formDataObj.append("authors[]", name));

// //         // Process keywords
// //         formData.keywords
// //             .split(",")
// //             .map((kw) => kw.trim())
// //             .filter(Boolean)
// //             .forEach((kw) => formDataObj.append("keywords[]", kw));

// //         formDataObj.append("file", file);

// //         try {
// //             const response = await axios.post(`${API_BASE_URL}/journals`, formDataObj, {
// //                 headers: {
// //                     "Content-Type": "multipart/form-data",
// //                 },
// //             });

// //             if (!response.data) {
// //                 throw new Error("No data received from server");
// //             }

// //             setSuccess("Journal uploaded successfully");
// //             resetForm();
// //         } catch (err) {
// //             console.error("Upload error:", err);
// //             let errorMsg = "Failed to upload journal";
            
// //             if (err.response) {
// //                 errorMsg = err.response.data?.message || 
// //                          (err.response.status === 401 ? "Please login to upload journals" : 
// //                          "Server error occurred");
// //             } else if (err.request) {
// //                 errorMsg = "Network error - unable to reach server";
// //             } else {
// //                 errorMsg = err.message || "Error uploading journal";
// //             }

// //             setError(errorMsg);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const resetForm = () => {
// //         setFormData({ title: "", abstract: "", authors: "", keywords: "" });
// //         setFile(null);
// //         document.getElementById("fileInput").value = "";
// //     };

// //     return (
// //         <>
// //             <Navigation />
// //             <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
// //                 <h2 className="text-xl font-bold mb-4">Upload Journal</h2>

// //                 {error && (
// //                     <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
// //                         {error}
// //                     </div>
// //                 )}
// //                 {success && (
// //                     <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
// //                         {success}
// //                     </div>
// //                 )}

// //                 <form onSubmit={handleSubmit} className="space-y-4">
// //                     {["title", "abstract", "authors", "keywords"].map((field) => (
// //                         <div key={field}>
// //                             <label className="block font-medium capitalize">
// //                                 {field}:
// //                             </label>
// //                             <input
// //                                 type="text"
// //                                 name={field}
// //                                 value={formData[field]}
// //                                 onChange={handleChange}
// //                                 required={field !== "keywords"}
// //                                 className="w-full p-2 border rounded"
// //                             />
// //                             {field === "authors" && (
// //                                 <p className="text-sm text-gray-500">
// //                                     Enter author names separated by commas.
// //                                 </p>
// //                             )}
// //                         </div>
// //                     ))}

// //                     <div>
// //                         <label className="block font-medium">
// //                             Upload Word Document (.docx):
// //                         </label>
// //                         <input
// //                             type="file"
// //                             accept=".docx"
// //                             onChange={handleFileChange}
// //                             className="w-full p-2 border rounded"
// //                             id="fileInput"
// //                             required
// //                         />
// //                     </div>

// //                     <button
// //                         type="submit"
// //                         disabled={loading}
// //                         className={`w-full p-2 text-white rounded ${
// //                             loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
// //                         }`}
// //                     >
// //                         {loading ? "Uploading..." : "Upload Journal"}
// //                     </button>
// //                 </form>
// //             </div>
// //             <Footer />
// //         </>
// //     );
// // };

// // export default JournalUpload;
// import React, { useState } from "react";
// import axios from "axios";
// import "./JournalUpload.css";
// import Footer from "./Footer";
// import Navigation from "./Navigation";

// const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// const JournalUpload = () => {
//     const [formData, setFormData] = useState({
//         title: "",
//         abstract: "",
//         authors: "",
//         keywords: "",
//     });
//     const [file, setFile] = useState(null);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");
//         setLoading(true);

//         if (!file) {
//             setError("Please upload a Word document (.docx).");
//             setLoading(false);
//             return;
//         }

//         const formDataObj = new FormData();
//         formDataObj.append("title", formData.title);
//         formDataObj.append("abstract", formData.abstract);

//         // Process authors
//         const authorNames = formData.authors
//             .split(",")
//             .map((name) => name.trim())
//             .filter(Boolean);

//         if (authorNames.length === 0) {
//             setError("Please enter at least one author name.");
//             setLoading(false);
//             return;
//         }
//         authorNames.forEach((name) => formDataObj.append("authors[]", name));

//         // Process keywords
//         formData.keywords
//             .split(",")
//             .map((kw) => kw.trim())
//             .filter(Boolean)
//             .forEach((kw) => formDataObj.append("keywords[]", kw));

//         formDataObj.append("file", file);

//         try {
//             const response = await axios.post(`${API_BASE_URL}/journals`, formDataObj, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });

//             if (!response.data) {
//                 throw new Error("No data received from server");
//             }

//             setSuccess("Journal uploaded successfully");
//             resetForm();
//         } catch (err) {
//             console.error("Upload error:", err);
//             let errorMsg = "Failed to upload journal";
            
//             if (err.response) {
//                 errorMsg = err.response.data?.message || 
//                          (err.response.status === 401 ? "Please login to upload journals" : 
//                          "Server error occurred");
//             } else if (err.request) {
//                 errorMsg = "Network error - unable to reach server";
//             } else {
//                 errorMsg = err.message || "Error uploading journal";
//             }

//             setError(errorMsg);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const resetForm = () => {
//         setFormData({ title: "", abstract: "", authors: "", keywords: "" });
//         setFile(null);
//         document.getElementById("fileInput").value = "";
//     };

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navigation />
            
//             <main className="flex-grow bg-gray-50 py-8">
//                 <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//                         <div className="p-6 sm:p-8">
//                             <div className="flex justify-between items-center mb-6">
//                                 <h2 className="text-2xl font-bold text-gray-800">Upload Journal</h2>
//                             </div>

//                             {error && (
//                                 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
//                                     <div className="flex">
//                                         <div className="flex-shrink-0">
//                                             <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                                             </svg>
//                                         </div>
//                                         <div className="ml-3">
//                                             <p className="text-sm text-red-700">{error}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             {success && (
//                                 <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
//                                     <div className="flex">
//                                         <div className="flex-shrink-0">
//                                             <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                                             </svg>
//                                         </div>
//                                         <div className="ml-3">
//                                             <p className="text-sm text-green-700">{success}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}

//                             <form onSubmit={handleSubmit} className="space-y-6">
//                                 <div className="grid grid-cols-1 gap-6">
//                                     {["title", "abstract", "authors", "keywords"].map((field) => (
//                                         <div key={field}>
//                                             <label className="block text-sm font-medium text-gray-700 capitalize">
//                                                 {field}
//                                             </label>
//                                             <div className="mt-1">
//                                                 <input
//                                                     type="text"
//                                                     name={field}
//                                                     value={formData[field]}
//                                                     onChange={handleChange}
//                                                     required={field !== "keywords"}
//                                                     className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                                                 />
//                                             </div>
//                                             {field === "authors" && (
//                                                 <p className="mt-2 text-sm text-gray-500">
//                                                     Enter author names separated by commas.
//                                                 </p>
//                                             )}
//                                         </div>
//                                     ))}

//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             Upload Word Document (.docx)
//                                         </label>
//                                         <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                                             <div className="space-y-1 text-center">
//                                                 <svg
//                                                     className="mx-auto h-12 w-12 text-gray-400"
//                                                     stroke="currentColor"
//                                                     fill="none"
//                                                     viewBox="0 0 48 48"
//                                                     aria-hidden="true"
//                                                 >
//                                                     <path
//                                                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                                                         strokeWidth={2}
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                     />
//                                                 </svg>
//                                                 <div className="flex text-sm text-gray-600">
//                                                     <label
//                                                         htmlFor="fileInput"
//                                                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
//                                                     >
//                                                         <span>Upload a file</span>
//                                                         <input
//                                                             id="fileInput"
//                                                             name="file"
//                                                             type="file"
//                                                             accept=".docx"
//                                                             onChange={handleFileChange}
//                                                             className="sr-only"
//                                                             required
//                                                         />
//                                                     </label>
//                                                     <p className="pl-1">or drag and drop</p>
//                                                 </div>
//                                                 <p className="text-xs text-gray-500">DOCX up to 10MB</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-end space-x-4">
//                                     <button
//                                         type="button"
//                                         onClick={resetForm}
//                                         className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                     >
//                                         Reset
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         disabled={loading}
//                                         className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                                             loading ? "opacity-70 cursor-not-allowed" : ""
//                                         }`}
//                                     >
//                                         {loading ? (
//                                             <span className="flex items-center">
//                                                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                                 </svg>
//                                                 Uploading...
//                                             </span>
//                                         ) : (
//                                             "Upload Journal"
//                                         )}
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default JournalUpload;

import React, { useState } from "react";
import "./JournalUpload.css";
import Footer from "./Footer";
import Navigation from "./Navigation";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const JournalUpload = () => {
    const [formData, setFormData] = useState({ 
        title: "",
        abstract: "",
        authors: "",
        keywords: "",
    });
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (!file) {
            setError("Please upload a Word document (.docx).");
            setLoading(false);
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("abstract", formData.abstract);

        // Process authors
        const authorNames = formData.authors
            .split(",")
            .map((name) => name.trim())
            .filter(Boolean);

        if (authorNames.length === 0) {
            setError("Please enter at least one author name.");
            setLoading(false);
            return;
        }
        authorNames.forEach((name) => formDataObj.append("authors[]", name));

        // Process keywords
        formData.keywords
            .split(",")
            .map((kw) => kw.trim())
            .filter(Boolean)
            .forEach((kw) => formDataObj.append("keywords[]", kw));

        formDataObj.append("file", file);

        try {
            const response = await fetch(`${API_BASE_URL}/journals`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: formDataObj, // No need to manually set Content-Type
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to upload journal");

            setSuccess("Journal uploaded successfully");
            resetForm();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: "", abstract: "", authors: "", keywords: "" });
        setFile(null);
        document.getElementById("fileInput").value = "";
    };

    return (
        <>
            <Navigation />
            <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-4">Upload Journal</h2>

                {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {["title", "abstract", "authors", "keywords"].map((field) => (
                        <div key={field}>
                            <label className="block font-medium capitalize">{field}:</label>
                            <input
                                type="text"
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required={field !== "keywords"}
                                className="w-full p-2 border rounded"
                            />
                            {field === "authors" && (
                                <p className="text-sm text-gray-500">
                                    Enter author names separated by commas.
                                </p>
                            )}
                        </div>
                    ))}

                    <div>
                        <label className="block font-medium">Upload Word Document (.docx):</label>
                        <input
                            type="file"
                            accept=".docx"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded"
                            id="fileInput"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                    >
                        {loading ? "Uploading..." : "Upload Journal"}
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default JournalUpload;