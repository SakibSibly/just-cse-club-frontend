import api from "../../api";
import { useState } from "react";
import "./FeedBack.css";

const FeedBack = () => {
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await api.post("/api/feedbacks/", {
                message: feedback,
            });
            if (response.status === 201) {
                setMessage("Successfully received your feedback.");
                setFeedback("");
            }
        } catch (error) {
            setError("Error submitting your feedback.");
        }
    };

    return (
        <div className="feedback-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="feedback-textarea"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    required
                />
                <button type="submit" className="feedback-button">
                    Submit Feedback
                </button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default FeedBack;
