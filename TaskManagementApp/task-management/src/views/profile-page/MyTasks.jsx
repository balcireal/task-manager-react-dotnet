import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Card, CardContent } from '@mui/material';
import { getMissionsByUserId } from '@/services/apiService';
import { useAuth } from '@/context/AuthContext';

const MyTasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchUserTasks = async () => {
            if (user && user.userId) {
                const tasksData = await getMissionsByUserId(user.userId);
                console.log(tasksData);
                setTasks(tasksData?.data || []);
                console.log(tasksData?.data);
            }
        };
        fetchUserTasks();
    }, [user]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Card sx={{ width: '100%', maxWidth: 600 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Görevlerim
                    </Typography>
                    <List>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <ListItem key={task.missionId}>
                                    <ListItemText
                                        primary={task.title}
                                        secondary={`Oluşturma tarihi: ${new Date(task.createdAt).toLocaleDateString()}`}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <Typography>Atanmış görev yok.</Typography>
                        )}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default MyTasks;
