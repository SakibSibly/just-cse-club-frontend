import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./NoticeList.css";

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("api/notices/")
            .then((response) => {
                setNotices(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load notices.");
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this notice?")) {
            try {
                await api.delete(`api/notices/${id}/`);
                setNotices(notices.filter(notice => notice.id !== id));
            } catch (error) {
                console.error("Error deleting notice:", error);
            }
        }
    };

    return (
        <div className="notice-container">
            <h2 className="notice-title">Manage Notices</h2>

            {error && <p className="error-message">{error}</p>}
            {loading && <p className="loading-message">Loading...</p>}
            <button className="back-btn" onClick={() => navigate(-1)}>🔙 Back</button>
            <Link to="/admin/notices/new" className="create-btn">➕ Create New Notice</Link>

            {!loading && notices.length === 0 ? (
                <p className="no-notices">No notices available.</p>
            ) : (
                <ul className="notice-list">
                    {notices.map((notice) => (
                        <li key={notice.id} className="notice-item">
                            <div className="notice-details">
                                <h3 className="notice-title-text">{notice.title}</h3>
                                <p className="notice-date">
                                    📅 {new Date(notice.created_at).toLocaleDateString()} {new Date(notice.created_at).toLocaleTimeString()}
                                </p>
                            </div>
                            <div className="notice-actions">
                                <Link to={`/admin/notices/edit/${notice.id}`} className="edit-btn">✏️ Edit</Link>
                                <button onClick={() => handleDelete(notice.id)} className="delete-btn">🗑️ Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoticeList;