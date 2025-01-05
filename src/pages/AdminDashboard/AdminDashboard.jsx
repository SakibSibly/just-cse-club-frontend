import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <aside className="sidebar">
                <h2>JUST CSE Club Admin</h2>
                <nav>
                    <ul>
                        <li><Link to="/admin/blogs">📝 Manage Blogs</Link></li>
                        <li><Link to="/admin/events">📅 Manage Events</Link></li>
                        <li><Link to="/admin/notices">📢 Manage Notices</Link></li>
                    </ul>
                </nav>
            </aside>
            <main className="dashboard-content">
                <h1>Welcome, Admin</h1>
                <p>Select an option from the sidebar to manage club activities.</p>
                <div className="admin-cards">
                    <Link to="/admin/blogs" className="admin-card">
                        <h3>📝 Blogs</h3>
                        <p>Manage club blogs and announcements.</p>
                    </Link>
                    <Link to="/admin/events" className="admin-card">
                        <h3>📅 Events</h3>
                        <p>Organize and update upcoming events.</p>
                    </Link>
                    <Link to="/admin/notices" className="admin-card">
                        <h3>📢 Notices</h3>
                        <p>Post important club announcements.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
