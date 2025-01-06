import { useState, useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, 1500);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    return <div className="notification">{message}</div>;
};

export default Notification;
