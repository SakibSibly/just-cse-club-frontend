import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./EventList.css"; // Import CSS file

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("api/events/")
            .then((response) => {
                setEvents(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load events.");
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await api.delete(`api/events/${id}/`);
                setEvents(events.filter(event => event.id !== id));
            } catch (error) {
                console.error("Error deleting event:", error);
            }
        }
    };

    return (
        <div className="event-list-container">
            <h2 className="event-list-title">Manage Events</h2>

            {error && <p className="error-message">{error}</p>}
            {loading && <p className="loading-message">Loading...</p>}
            <button className="back-btn" onClick={() => navigate(-1)}>🔙 Back</button>

            <div className="event-actions">
                <Link to="/admin/events/new" className="create-btn">➕ Create New Event</Link>
            </div>

            <ul className="event-list">
                {events.length === 0 && !loading ? (
                    <p className="no-events">No events found.</p>
                ) : (
                    events.map(event => (
                        <li key={event.id} className="event-item">
                            <div>
                                <span className="event-title">{event.title}</span>
                                <span className="event-date">
                                    <p className="event-date">
                                    📅 {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}
                                    </p>
                                </span>
                            </div>
                            <div className="event-actions">
                                <Link to={`/admin/events/edit/${event.id}`} className="edit-btn">Edit</Link>
                                <button onClick={() => handleDelete(event.id)} className="delete-btn">🗑️ Delete</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default EventList;
