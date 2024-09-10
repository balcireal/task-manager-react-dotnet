import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchNotifications = async () => {
            if (user?.userId) {
                try {
                    const response = await axios.get(`http://localhost:7157/api/notification/user/${user.userId}`);
                    console.log('Fetched Notifications:', response.data?.data);
                    setNotifications(response.data?.data || []);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            } else {
                console.warn('No user ID found in local storage.');
            }
        };

        fetchNotifications();

        const intervalId = setInterval(fetchNotifications, 10000);


        return () => clearInterval(intervalId);
    }, [user?.userId]);

    return (
        <NotificationContext.Provider value={{ notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
