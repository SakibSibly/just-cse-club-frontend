import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import api from "../../api";


const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminUser, setAdminUser] = useState(false);
    const location = useLocation(); // Get current route

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            setLoggedIn(true);
        }
        const HandleAdminStatus = async () => {
            await api.post("api/verify/admin/")
            .then(() => setAdminUser(true))
            .catch((error) => {
                setAdminUser(false);
                console.error(error);
            });
        };
        HandleAdminStatus();
    }, []);

    const HandleUserStatus = () => {
        if (loggedIn) {
            return <Link to="/logout">Logout</Link>;
        } else {
            return <Link to="/login">Login</Link>;
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li>
                    <Link to="/home" className={location.pathname.startsWith("/home") || location.pathname === "/" ? "active-link" : ""}>Home</Link>
                </li>
                <li>
                    <Link to="/blogs" className={location.pathname.startsWith("/blogs") ? "active-link" : ""}>Blogs</Link>
                </li>
                <li>
                    <Link to="/events" className={location.pathname.startsWith("/events") ? "active-link" : ""}>Events</Link>
                </li>
                <li>
                    <Link to="/notices" className={location.pathname.startsWith("/notices") ? "active-link" : ""}>Notices</Link>
                </li>
                <li>
                    <Link to="/treasury" className={location.pathname.startsWith("/treasury") ? "active-link" : ""}>Treasury</Link>
                </li>
                <li>
                    <Link to="/about" className={location.pathname.startsWith("/about") ? "active-link" : ""}>About</Link>
                </li>
            </ul>
            <div>
                <ul className="navbar-menu">
                    {adminUser && (
                        <li>
                            <Link to="/admin" className={location.pathname.startsWith("/admin") ? "active-link" : ""}>Admin Dashboard</Link>
                        </li>
                    )}
                    <li>
                        <HandleUserStatus />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;