import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { formatDateTime } from '../../shared/utils/dateTimeConverter';
import './Notices.css';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const { id } = useParams(); // For detailed view

    useEffect(() => {
        // Fetch notices from the backend
        const fetchNotices = async () => {
            try {
                const response = await api.get('/api/notices/');
                const data = await response.data;
                setNotices(data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };
        fetchNotices();
    }, []);

    // If id exists, render a detailed view
    if (id) {
        const notice = notices.find(notice => notice.id === parseInt(id));
        return (
            <div className="notice-detail">
                <h2>{notice?.title}</h2>
                <p><strong>Created At:</strong> {formatDateTime(notice?.created_at)}</p>
                <p><strong>Last Updated:</strong> {formatDateTime(notice?.updated_at)}</p>
                <p><strong>Description:</strong></p>
                <p>{notice?.description}</p>
                <Link to="/notices">Back to Notices</Link>
            </div>
        );
    }

    // Render card view
    return (
        <div className="notices">
            <h1>Notices</h1>
            <div className="notice-cards">
                {notices.map(notice => (
                    <div className="notice-card" key={notice.id}>
                        <h2>{notice.title}</h2>
                        <p>{notice.description.substring(0, 100)}...</p>
                        <p><strong>Created At:</strong> {formatDateTime(notice.created_at)}</p>
                        <Link to={`/notices/${notice.id}`}>Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notices;
