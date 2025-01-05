import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./BlogList.css"; // Import CSS file

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
        <div className="blog-list-container">
            <h2>Manage Blogs</h2>
            <button className="back-btn" onClick={() => navigate(-1)}>🔙 Back</button>

            <Link to="/admin/blogs/new" className="create-btn">➕ Create New Blog</Link>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            { console.log(blogs) }
            <ul className="blog-list">
                {blogs.map((blog) => (
                    <li key={blog.id} className="blog-item">
                        <div className="blog-info">
                            <strong>{blog.title}</strong> - <span className="blog-author">{blog.author}</span>
                        </div>
                        <div className="blog-actions">
                            <Link to={`/admin/blogs/edit/${blog.id}`} className="edit-btn">✏️ Edit</Link>
                            <button onClick={() => handleDelete(blog.id)} className="delete-btn">🗑️ Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
