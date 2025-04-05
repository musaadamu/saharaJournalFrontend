// // import React, { useState } from "react";
// // import "./JournalUpload.css";
// // import Footer from "./Footer";
// // import Navigation from "./Navigation";

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

// //     // Function to validate MongoDB ObjectId (24-character hex string)
// //     const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id.trim());

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

// //         // Validate and append authors
// //         const authorIds = formData.authors
// //             .split(",")
// //             .map((id) => id.trim())
// //             .filter((id) => isValidObjectId(id)); // Only keep valid ObjectIds

// //         if (authorIds.length === 0) {
// //             setError("Please enter at least one valid author ID (24-character hex).");
// //             setLoading(false);
// //             return;
// //         }

// //         authorIds.forEach((id) => formDataObj.append("authors[]", id));

// //         // Append keywords individually
// //         formData.keywords
// //             .split(",")
// //             .map((kw) => kw.trim())
// //             .filter((kw) => kw) // Remove empty values
// //             .forEach((kw) => formDataObj.append("keywords[]", kw));

// //         formDataObj.append("file", file);

// //         try {

            
// //             const response = await fetch("http://localhost:5000/api/journals", {
// //                 method: "POST",
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
// //                 },
// //                 body: formDataObj, // No need to manually set Content-Type
// //             });

// //             const data = await response.json();
// //             if (!response.ok) throw new Error(data.message || "Failed to upload journal");

// //             setSuccess("Journal uploaded successfully");
// //             setFormData({ title: "", abstract: "", authors: "", keywords: "" });
// //             setFile(null);
// //             document.getElementById("fileInput").value = ""; // Clear file input
// //         } catch (err) {
// //             setError(err.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <>
// //         <Navigation />

// //         <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
// //             <h2 className="text-xl font-bold mb-4">Upload Journal</h2>

// //             {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
// //             {success && <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>}

// //             <form onSubmit={handleSubmit} className="space-y-4">
// //                 {["title", "abstract", "authors", "keywords"].map((field) => (
// //                     <div key={field}>
// //                         <label className="block font-medium capitalize">{field}:</label>
// //                         <input
// //                             type="text"
// //                             name={field}
// //                             value={formData[field]}
// //                             onChange={handleChange}
// //                             required={field !== "keywords"}
// //                             className="w-full p-2 border rounded"
// //                         />
// //                         {field === "authors" && (
// //                             <p className="text-sm text-gray-500">
// //                                 Enter author IDs separated by commas (24-character hex).
// //                             </p>
// //                         )}
// //                     </div>
// //                 ))}

// //                 {/* File Upload Input */}
// //                 <div>
// //                     <label className="block font-medium">Upload Word Document (.docx):</label>
// //                     <input
// //                         type="file"
// //                         accept=".docx"
// //                         onChange={handleFileChange}
// //                         className="w-full p-2 border rounded"
// //                         id="fileInput"
// //                         required
// //                     />
// //                 </div>

// //                 <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className={`w-full p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
// //                 >
// //                     {loading ? "Uploading..." : "Upload Journal"}
// //                 </button>
// //             </form>
// //         </div>
// //         <Footer />
// //         </>
// //     );
// // };

// // export default JournalUpload;

// import React, { useState } from "react";
// import "./JournalUpload.css";
// import Footer from "./Footer";
// import Navigation from "./Navigation";

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

//         // Append authors as names
//         const authorNames = formData.authors
//             .split(",")
//             .map((name) => name.trim())
//             .filter((name) => name); // Only keep non-empty names

//         if (authorNames.length === 0) {
//             setError("Please enter at least one author name.");
//             setLoading(false);
//             return;
//         }

//         authorNames.forEach((name) => formDataObj.append("authors[]", name));

//         // Append keywords individually
//         formData.keywords
//             .split(",")
//             .map((kw) => kw.trim())
//             .filter((kw) => kw) // Remove empty values
//             .forEach((kw) => formDataObj.append("keywords[]", kw));

//         formDataObj.append("file", file);

//         try {
//             const response = await fetch("http://localhost:5000/api/journals", {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//                 },
//                 body: formDataObj, // No need to manually set Content-Type
//             });

//             const data = await response.json();
//             if (!response.ok) throw new Error(data.message || "Failed to upload journal");

//             setSuccess("Journal uploaded successfully");
//             setFormData({ title: "", abstract: "", authors: "", keywords: "" });
//             setFile(null);
//             document.getElementById("fileInput").value = ""; // Clear file input
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
        

//         <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Upload Journal</h2>

//             {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
//             {success && <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>}

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {["title", "abstract", "authors", "keywords"].map((field) => (
//                     <div key={field}>
//                         <label className="block font-medium capitalize">{field}:</label>
//                         <input
//                             type="text"
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             required={field !== "keywords"}
//                             className="w-full p-2 border rounded"
//                         />
//                         {field === "authors" && (
//                             <p className="text-sm text-gray-500">
//                                 Enter author names separated by commas.
//                             </p>
//                         )}
//                     </div>
//                 ))}

//                 {/* File Upload Input */}
//                 <div>
//                     <label className="block font-medium">Upload Word Document (.docx):</label>
//                     <input
//                         type="file"
//                         accept=".docx"
//                         onChange={handleFileChange}
//                         className="w-full p-2 border rounded"
//                         id="fileInput"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
//                 >
//                     {loading ? "Uploading..." : "Upload Journal"}
//                 </button>
//             </form>
//         </div>
//         <Footer />
//         </>
//     );
// };

// export default JournalUpload;

import React, { useState } from "react";
import "./JournalUpload.css";
import Footer from "./Footer";
import Navigation from "./Navigation";
import api from "../services/api";
import { toast } from "react-toastify";

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

        // Append authors as names
        const authorNames = formData.authors
            .split(",")
            .map((name) => name.trim())
            .filter((name) => name); // Only keep non-empty names

        if (authorNames.length === 0) {
            setError("Please enter at least one author name.");
            setLoading(false);
            return;
        }

        authorNames.forEach((name) => formDataObj.append("authors[]", name));

        // Append keywords individually
        formData.keywords
            .split(",")
            .map((kw) => kw.trim())
            .filter((kw) => kw) // Remove empty values
            .forEach((kw) => formDataObj.append("keywords[]", kw));

        formDataObj.append("file", file);

        try {
            const response = await api.post("/journals", formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            setSuccess("Journal uploaded successfully");
            toast.success("Journal uploaded successfully");
            setFormData({ title: "", abstract: "", authors: "", keywords: "" });
            setFile(null);
            document.getElementById("fileInput").value = ""; // Clear file input
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || "Failed to upload journal";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navigation />

        <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Upload Journal</h2>

            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}

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

                {/* File Upload Input */}
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