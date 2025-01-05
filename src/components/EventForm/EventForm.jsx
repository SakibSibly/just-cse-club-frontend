import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./EventForm.css"; // Import CSS file

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
        <div className="event-form-container">
            <button className="back-btn" onClick={() => navigate(-1)}>🔙 Back</button>
            <form onSubmit={handleSubmit} className="event-form">
                <h2>Create Event</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter event title" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter event details" required />
                </div>

                <div className="form-group">
                    <label>Date & Time</label>
                    <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div className="form-group">
                    <label>Venue</label>
                    <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Enter venue location" required />
                </div>

                <button type="submit" className="submit-btn">Save Event</button>
            </form>
        </div>
    );
};

export default EventForm;
