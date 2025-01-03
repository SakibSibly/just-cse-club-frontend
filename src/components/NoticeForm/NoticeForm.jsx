import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./NoticeForm.css"; // Import CSS file

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
        <div className="notice-form-container">
            <h2 className="notice-form-title">{id ? "Edit" : "Create"} Notice</h2>

            {error && <p className="error-message">{error}</p>}
            {loading && <p className="loading-message">Loading...</p>}

            <form onSubmit={handleSubmit} className="notice-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Notice Title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter Notice Description"
                        required
                    />
                </div>

                <button type="submit" className="save-btn" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
};

export default NoticeForm;
