import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";
import Notification from "../../components/Notification/Notification";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [notification, setNotification] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("api/token/", {
                email,
                password
            });
            
            if (response.data.access) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setNotification("Login successful! Redirecting..."); // Show notification

                setTimeout(() => {
                    window.location.href = "/";
                }, 1500);
            } else {
                setErrorMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="login-container">
            {notification && (
                <Notification message={notification} onClose={() => setNotification("")} />
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    Login
                </button>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
