import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get("api/blogs/");
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
            setErrorMessage("Failed to load blogs. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await api.delete(`api/blogs/${id}/`);
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
            setErrorMessage("Failed to delete blog. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Blogs</h2>
            <div className="flex justify-between mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    🔙 Back
                </button>
                <Link 
                    to="/admin/blogs/new"
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors"
                >
                    ➕ Create New Blog
                </Link>
            </div>

            {errorMessage && (
                <p className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
                    {errorMessage}
                </p>
            )}

            <ul className="space-y-4">
                {blogs.map((blog) => (
                    <li 
                        key={blog.id} 
                        className="flex justify-between items-center p-4 bg-white shadow rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="flex-1">
                            <strong className="text-lg">{blog.title}</strong>
                            <span className="text-gray-600 ml-2">- {blog.author}</span>
                        </div>
                        <div className="flex gap-3">
                            <Link 
                                to={`/admin/blogs/edit/${blog.id}`}
                                className="px-3 py-1 bg-green-500 text-white hover:bg-green-600 rounded transition-colors"
                            >
                                ✏️ Edit
                            </Link>
                            <button 
                                onClick={() => handleDelete(blog.id)}
                                className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition-colors"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
