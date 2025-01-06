import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import api from "../../api";
import Notification from "../../components/Notification/Notification";
import img from "../../assets/images/logo/JUST_CSE_Club_logo_main.jpg"
const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminUser, setAdminUser] = useState(false);
    const [notification, setNotification] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setLoggedIn(false);
        setNotification("Logout successful! Redirecting...");

        setTimeout(() => {
            setAdminUser(false);
            navigate("/login");
        }, 1500);
    };

    return (
        <nav className="navbar justify-between">
            {notification && <Notification message={notification} onClose={() => setNotification("")} />}
            <div className="navbar-icon">
                <ul>
                    <li>
                        <Link to="/home">
                        <img className="h-16 w-16"
                            src={img}
                            alt={"JUST CSE Club"}
                        />
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="navbar-menu font-mono">
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
                <div className="">
                    <ul className="navbar-menu font-mono">
                        {adminUser && (
                            <li className="">
                                <Link to="/admin" className={location.pathname.startsWith("/admin") ? "active-link" : ""}>Admin Dashboard</Link>
                            </li>
                        )}
                        <li>
                            {loggedIn ? (
                                <button className="text-white font-semibold font-mono" onClick={handleLogout}>Logout</button>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
