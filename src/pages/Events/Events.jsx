import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { formatDateTime } from '../../shared/utils/dateTimeConverter';
import './Events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const { id } = useParams(); // For detailed view

    useEffect(() => {
        // Fetch events from the backend
        const fetchEvents = async () => {
            try {
                const response = await api.get('/api/events/'); // Replace with your backend endpoint
                const data = await response.data;
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    // If id exists, render a detailed view
    if (id) {
        const event = events.find(event => event.id === parseInt(id));
        return (
            <div className="event-detail">
                <h2>{event?.title}</h2>
                <p><strong>Date:</strong> {formatDateTime(event?.date)}</p>
                <p><strong>Venue:</strong> {event?.venue}</p>
                <p><strong>Description:</strong></p>
                <p>{event?.description}</p>
                <Link to="/events">Back to Events</Link>
            </div>
        );
    }

    // Render card view
    return (
        <div className="events">
            <h1>Upcoming Events</h1>
            <div className="event-cards">
                {events.map(event => (
                    <div className="event-card" key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description.substring(0, 100)}...</p>
                        <p><strong>Date:</strong> {formatDateTime(event.date)}</p>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <Link to={`/events/${event.id}`}>Read More</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;