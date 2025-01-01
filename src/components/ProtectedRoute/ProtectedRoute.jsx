import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../../api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../../constants';
import {useState, useEffect} from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth()
        .catch((error) => {
            console.log(error);
            setIsAuthorized(false);
        });
    }, [])

    const refreshToken = async () => {
        const refToken = localStorage.getItem(REFRESH_TOKEN)

        try {
            const response = await api.post("/api/token/refresh/ ", {
                refresh: refToken 
            });

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }
    
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;