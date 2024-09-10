import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:7157/api/notification';

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [notificationIdToDelete, setNotificationIdToDelete] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(API_URL);
            setNotifications(response.data.data || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Bildirimler alınırken bir hata oluştu');
        }
    };

    const handleSendNotification = async () => {
        try {
            await axios.post(API_URL, {
                userId,
                message,
                isRead: false,
                createdAt: new Date().toISOString()
            });
            setMessage('');
            setUserId('');
            fetchNotifications();
            toast.success('Bildirim başarıyla gönderildi');
        } catch (error) {
            console.error('Error sending notification:', error);
            toast.error('Bildirim gönderilirken bir hata oluştu');
        }
    };

    const handleEditNotification = (notification) => {
        setSelectedNotification(notification);
        setMessage(notification.message);
        setIsEditMode(true);
    };

    const handleUpdateNotification = async () => {
        if (selectedNotification) {
            try {
                await axios.put(API_URL, {
                    notificationId: selectedNotification.notificationId,
                    userId: selectedNotification.userId,
                    message,
                    isRead: selectedNotification.isRead,
                    createdAt: selectedNotification.createdAt
                });
                setMessage('');
                setSelectedNotification(null);
                setIsEditMode(false);
                fetchNotifications();
                toast.success('Bildirim başarıyla güncellendi');
            } catch (error) {
                console.error('Error updating notification:', error);
                toast.error('Bildirim güncellenirken bir hata oluştu');
            }
        }
    };


    const handleDeleteNotification = async () => {
        if (notificationIdToDelete !== null) {
            try {
                await axios.delete(`${API_URL}/${notificationIdToDelete}`);
                fetchNotifications();
                setNotificationIdToDelete(null);
                setOpenDialog(false);
                toast.success('Bildirim başarıyla silindi');
            } catch (error) {
                console.error('Error deleting notification:', error);
                toast.error('Bildirim silinirken bir hata oluştu');
            }
        }
    };

    const openDeleteDialog = (id) => {
        setNotificationIdToDelete(id);
        setOpenDialog(true);
    };

    const closeDeleteDialog = () => {
        setOpenDialog(false);
        setNotificationIdToDelete(null);
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>Bildirim Yönetimi</Typography>
            <div>
                <TextField
                    label="Kullanıcı ID'si"
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Bildirim mesajı"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={isEditMode ? handleUpdateNotification : handleSendNotification}
                    startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                >
                    {isEditMode ? 'Bildirimi Güncelle' : 'Bildirim Gönder'}
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Mesaj</TableCell>
                            <TableCell>Oluşturma Tarihi</TableCell>
                            <TableCell>Okundu mu?</TableCell>
                            <TableCell>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notifications.map((notification) => (
                            <TableRow key={notification.notificationId}>
                                <TableCell>{notification.notificationId}</TableCell>
                                <TableCell>{notification.message}</TableCell>
                                <TableCell>{new Date(notification.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{notification.isRead ? 'Evet' : 'Hayır'}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditNotification(notification)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </IconButton>
                                    <IconButton onClick={() => openDeleteDialog(notification.notificationId)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openDialog}
                onClose={closeDeleteDialog}
            >
                <DialogTitle>Silme Onayı</DialogTitle>
                <DialogContent>
                    <Typography>Bu bildirimi silmek istediğinizden emin misiniz?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        İptal
                    </Button>
                    <Button onClick={handleDeleteNotification} color="secondary">
                        Sil
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NotificationPage;
