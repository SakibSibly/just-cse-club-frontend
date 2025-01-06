import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

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
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Events</h2>

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
                    to="/admin/events/new"
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
                >
                    ➕ Create New Event
                </Link>
            </div>

            <ul className="space-y-4">
                {events.length === 0 && !loading ? (
                    <p className="text-gray-500 text-center py-8">No events found.</p>
                ) : (
                    events.map(event => (
                        <li key={event.id} className="bg-white shadow rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow">
                            <div className="space-y-2">
                                <span className="text-lg font-semibold block">{event.title}</span>
                                <span className="text-gray-600 text-sm">
                                    📅 {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="flex gap-3">
                                <Link 
                                    to={`/admin/events/edit/${event.id}`}
                                    className="px-3 py-1 bg-green-500 text-white hover:bg-green-600 rounded transition-colors"
                                >
                                    Edit
                                </Link>
                                <button 
                                    onClick={() => handleDelete(event.id)}
                                    className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded transition-colors"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default EventList;