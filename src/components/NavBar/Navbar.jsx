import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../../constants";
import api from "../../api";


const Navbar = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminUser, setAdminUser] = useState(false);

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
        }
        HandleAdminStatus();
    }
    , []);

    const HandleUserStatus = () => {
        if (loggedIn) {
            return (
                <div>
                    <Link to="/logout">Logout</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to="/login">Login</Link>
                </div>
            )
        }
    }

    return (
        <nav className="navbar">
                <ul className="navbar-menu">
                    <li>
                        <Link to="/home" >Home</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/notices">Notices</Link>
                    </li>
                    <li>
                        <Link to="/treasury">Treasury</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
                <div>
                    <ul className="navbar-menu">
                        {
                            adminUser &&
                            <li>
                            <Link to="/admin">Admin Dashboard</Link>
                            </li>
                        }
                        <li>
                            <HandleUserStatus />
                        </li>
                    </ul>
                </div>
        </nav>
    );
};

export default Navbar;