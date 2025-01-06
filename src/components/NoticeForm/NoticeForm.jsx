import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";

const NoticeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            setLoading(true);
            api.get(`api/notices/${id}/`)
                .then(response => {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setLoading(false);
                })
                .catch(error => {
                    setError("Failed to load notice details.");
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const data = { title, description };

        try {
            if (id) {
                await api.put(`api/notices/${id}/`, data);
            } else {
                await api.post("api/notices/", data);
            }
            navigate("/admin/notices");
        } catch (error) {
            setError("Failed to save notice. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* <div className="flex justify-between items-center mb-6"> */}
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                    🔙 Back
                </button>
                <h2 className="text-2xl font-bold">{id ? "Edit" : "Create"} Notice</h2>
            {/* </div> */}

            {error && <p className="bg-red-100 text-red-600 p-4 rounded mb-4">{error}</p>}
            {loading && <p className="text-gray-600 italic mb-4">Loading...</p>}

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Notice Title"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Notice Description"
                        required
                        className="w-full p-3 border border-gray-300 rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default NoticeForm;