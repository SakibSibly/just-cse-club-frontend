import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const EventForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [venue, setVenue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !date || !venue) {
            setErrorMessage("All fields are required!");
            return;
        }

        try {
            await api.post("api/events/", { title, description, date, venue });
            navigate("/admin/events");
        } catch (error) {
            console.error(error);
            setErrorMessage("Failed to create event. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <button 
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
                🔙 Back
            </button>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold">Create Event</h2>

                {errorMessage && (
                    <p className="p-3 bg-red-100 text-red-600 rounded">{errorMessage}</p>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter event title"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter event details"
                        required
                        className="w-full p-3 border border-gray-300 rounded h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                    <input 
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                    <input 
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        placeholder="Enter venue location"
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Save Event
                </button>
            </form>
        </div>
    );
};

export default EventForm;