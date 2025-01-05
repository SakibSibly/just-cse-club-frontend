import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api";
import { EMAIL } from "../../constants";

const AdminRoute = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const email = localStorage.getItem(EMAIL);

    useEffect(() => {
        if (email) {
            api.post("api/verify/admin/", { email })
                .then(() => setAdmin(true))
                .catch(() => setAdmin(false));
        } else {
            setAdmin(false);
        }
    }, [email]);
    
    if (admin === null) {
        return <div>Loading...</div>;
    }

    return admin ? children : <Navigate to="/" />;
};

export default AdminRoute;