import React, { useState, useEffect } from 'react';
import { CardContent, Typography, Grid, Chip, Tooltip, Fab, CircularProgress, Alert } from '@mui/material';
import { Stack } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import BlankCard from '@/components/shared/BlankCard';
import axios from 'axios';
import TaskDetailCard from './TaskDetailCard';

const TaskCard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'yüksek':
                return 'error.main';
            case 'orta':
                return 'warning.main';
            case 'kritik':
                return 'secondary.main';
            case 'düşük':
                return 'primary.main';
            default:
                return 'grey.500';
        }
    };

    const getStatusColor = (status) => {
        return status === 'Tamamlanmış' ? 'success.main' : 'error.main';
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:7157/api/Mission');
                const fetchedTasks = response.data.data;
                const mappedTasks = fetchedTasks.map((task) => ({
                    id: task.missionId,
                    title: task.title,
                    dueDate: new Date(task.createdAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    priority: task.priority,
                    priorityColor: getPriorityColor(task.priority),
                    status: task.status,
                    statusColor: getStatusColor(task.status),
                }));
                setTasks(mappedTasks);
                setLoading(false);
            } catch (err) {
                console.error('Görevler alınırken bir hata oluştu:', err);
                setError('Görevler getirilemedi. Lütfen daha sonra tekrar deneyiniz.');
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const handleOpenDetailDialog = (id) => {
        setSelectedTaskId(id);
        setDetailDialogOpen(true);
    };

    const handleCloseDetailDialog = () => {
        setSelectedTaskId(null);
        setDetailDialogOpen(false);
    };

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
                <Alert severity="error">{error}</Alert>
            </Grid>
        );
    }

    return (
        <Grid container spacing={3}>
            {tasks.map((task) => (
                <Grid item sm={12} md={6} lg={3} key={task.id}>
                    <BlankCard>
                        <Tooltip title="Görev Detayları">
                            <Fab
                                size="small"
                                color="primary"
                                sx={{ bottom: '75px', right: '15px', position: 'absolute' }}
                                onClick={() => handleOpenDetailDialog(task.id)}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                            </Fab>
                        </Tooltip>
                        <CardContent sx={{ p: 3, pt: 2 }}>
                            <Typography variant="h6">{task.title}</Typography>
                            <Typography color="textSecondary">{task.dueDate}</Typography>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1}>
                                <Chip label={task.priority} sx={{ backgroundColor: task.priorityColor, color: '#fff' }} />
                                <Chip label={task.status} sx={{ backgroundColor: task.statusColor, color: '#fff' }} />
                            </Stack>
                        </CardContent>
                    </BlankCard>
                </Grid>
            ))}
            <TaskDetailCard
                open={detailDialogOpen}
                onClose={handleCloseDetailDialog}
                taskId={selectedTaskId}
            />
        </Grid>
    );
};

export default TaskCard;
