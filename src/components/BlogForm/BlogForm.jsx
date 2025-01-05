import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./BlogForm.css";
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
                await api.post("api/blogs/", data );
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
        <div className="blog-form-container">
            <button className="back-btn" onClick={() => navigate(-1)}>🔙 Back</button>

            <form onSubmit={handleSubmit} className="blog-form">
                <h2>{id ? "Edit" : "Create"} Blog</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
