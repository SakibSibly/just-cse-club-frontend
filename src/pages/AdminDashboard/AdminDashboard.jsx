import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-links">
                <Link to="/admin/blogs">Manage Blogs</Link>
                <Link to="/admin/events">Manage Events</Link>
                <Link to="/admin/notices">Manage Notices</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
