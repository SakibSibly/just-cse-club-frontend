import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { EMAIL, ID } from "../../constants";

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (id) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        try {
            const response = await api.get(`api/blogs/${id}/`);
            setTitle(response.data.title);
            setDescription(response.data.description);
        } catch (error) {
            console.error("Error fetching blog:", error);
            setErrorMessage("Failed to load blog details.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setErrorMessage("Both fields are required.");
            return;
        }

        setLoading(true);

        const data = { title, description };

        try {
            if (id) {
                await api.put(`api/blogs/${id}/`, data);
            } else {
                await api.post("api/blogs/", data);
            }
            navigate("/admin/blogs");
        } catch (error) {
            console.error("Error saving blog:", error);
            setErrorMessage("Failed to save blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <button 
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
                🔙 Back
            </button>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">
                    {id ? "Edit" : "Create"} Blog
                </h2>

                {errorMessage && (
                    <p className="mb-4 p-3 bg-red-100 text-red-600 rounded">
                        {errorMessage}
                    </p>
                )}

                <div className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                        className="w-full p-3 border border-gray-300 rounded h-48 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;