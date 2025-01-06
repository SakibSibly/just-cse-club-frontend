import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

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
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Notices</h2>

            {error && <p className="bg-red-100 text-red-600 p-4 rounded mb-4">{error}</p>}
            {loading && <p className="text-gray-600 italic">Loading...</p>}
            
            <div className="flex justify-between items-center mb-6">
                <button 
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                    🔙 Back
                </button>

                <Link 
                    to="/admin/notices/new"
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
                >
                    ➕ Create New Notice
                </Link>
            </div>

            {!loading && notices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No notices available.</p>
            ) : (
                <ul className="space-y-4">
                    {notices.map((notice) => (
                        <li key={notice.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">{notice.title}</h3>
                                    <p className="text-gray-600 text-sm">
                                        📅 {new Date(notice.created_at).toLocaleDateString()} {new Date(notice.created_at).toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <Link 
                                        to={`/admin/notices/edit/${notice.id}`}
                                        className="px-3 py-1 bg-green-500 text-white hover:bg-green-600 rounded transition-colors"
                                    >
                                        ✏️ Edit
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(notice.id)}
                                        className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition-colors"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoticeList;