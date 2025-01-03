import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./NoticeList.css";

const NoticeList = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        api.get("api/notices/")
            .then((response) => setNotices(response.data))
            .catch((error) => console.error(error));
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
            <Link to="/admin/notices/new" className="create-btn">➕ Create New Notice</Link>
            {notices.length > 0 ? (
                <ul className="notice-list">
                    {notices.map((notice) => (
                        <li key={notice.id} className="notice-item">
                            <div className="notice-details">
                                <h3>{notice.title}</h3>
                                <span>
                                    <p className="notice-date">
                                        📅 {new Date(notice.created_at).toLocaleDateString()}
                                    </p>
                                </span>
                            </div>
                            <div className="notice-actions">
                                <Link to={`/admin/notices/edit/${notice.id}`} className="edit-btn">✏️ Edit</Link>
                                <button onClick={() => handleDelete(notice.id)} className="delete-btn">🗑️ Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-notices">No notices available.</p>
            )}
        </div>
    );
};

export default NoticeList;
