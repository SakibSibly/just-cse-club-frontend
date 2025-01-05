import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api";

const AdminRoute = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const verifyAdmin = () => {
            api.post("api/verify/admin/")
            .then(() => setAdmin(true))
            .catch(() => setAdmin(false));
        }
        verifyAdmin();
    }, []);
    
    if (admin === null) {
        return <div>Loading...</div>;
    }

    return admin ? children : <Navigate to="/" />;
};

export default AdminRoute;