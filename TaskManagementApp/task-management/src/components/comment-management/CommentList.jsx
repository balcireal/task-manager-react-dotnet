import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card, CardContent, CardActions, Grid, Typography, Button, CircularProgress,
    IconButton, Tooltip, Modal, Box, TextField
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import Swal from 'sweetalert2';

const CommentList = () => {
    const [comments, setComments] = useState([]);
    const [selectedComment, setSelectedComment] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:7157/api/comment');
            const commentsData = response.data.data;

            const missions = await Promise.all(commentsData.map(comment =>
                axios.get(`http://localhost:7157/api/mission/${comment.missionId}`)
            ));
            const users = await Promise.all(commentsData.map(comment =>
                axios.get(`http://localhost:7157/api/user/${comment.userId}`)
            ));

            const enrichedComments = commentsData.map((comment, index) => ({
                ...comment,
                mission: missions[index].data.data,
                user: users[index].data.data
            }));

            setComments(enrichedComments);
        } catch (error) {
            console.error('Yorumlar yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (comment) => {
        setSelectedComment(comment);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        console.log('Silinecek Yorum ID:', id);

        if (!id) {
            console.error('Yorum ID eksik.');
            return;
        }

        const result = await Swal.fire({
            title: 'Emin misiniz?',
            text: "Bu yorumu silmek istediğinizden emin misiniz?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'İptal'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:7157/api/comment/${id}`);
                fetchComments();
                Swal.fire(
                    'Silindi!',
                    'Yorum başarıyla silindi.',
                    'success'
                );
            } catch (error) {
                console.error('Yorum silinirken bir hata oluştu:', error);
                Swal.fire(
                    'Hata!',
                    'Yorum silinirken bir hata oluştu.',
                    'error'
                );
            }
        }
    };

    const handleSave = async (comment) => {
        try {
            if (comment.commentId) {
                await axios.put('http://localhost:7157/api/comment', comment);
            } else {
                await axios.post('http://localhost:7157/api/comment', comment);
            }
            setShowForm(false);
            setSelectedComment(null);
            fetchComments();
            Swal.fire(
                'Başarılı!',
                `Yorum ${comment.commentId ? 'güncellendi' : 'eklendi'}!`,
                'success'
            );
        } catch (error) {
            console.error('Yorum kaydedilirken bir hata oluştu:', error);
            Swal.fire(
                'Hata!',
                'Yorum kaydedilirken bir hata oluştu.',
                'error'
            );
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h4" gutterBottom align="center">Yorum Yönetimi</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setShowForm(true)}
                startIcon={<Add />}
                style={{ marginBottom: '20px' }}
            >
                Yeni Yorum Ekle
            </Button>

            {showForm && (
                <CommentForm
                    selectedComment={selectedComment}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </div>
            ) : comments.length === 0 ? (
                <Typography variant="h6" align="center" color="textSecondary">
                    Veri bulunamadı.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {comments.map((comment) => (
                        <Grid item xs={12} sm={6} md={4} key={comment.commentId}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {comment.content}
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Görev: {comment.mission.title}
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Kullanıcı: {comment.user.username}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Tooltip title="Düzenle">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(comment)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Sil">
                                        <IconButton
                                            color="secondary"
                                            onClick={() => {
                                                console.log('Silme Butonuna Tıklandı. Yorum:', comment);
                                                console.log('Silme Butonuna Tıklandı. Yorum ID:', comment.commentId);
                                                handleDelete(comment.commentId);
                                            }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            )}
        </div>
    );
};

const CommentForm = ({ selectedComment, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        commentId: '',
        content: '',
        missionId: '',
        userId: '',
        createdAt: ''
    });

    useEffect(() => {
        if (selectedComment) {
            setFormData({
                ...selectedComment,
                createdAt: selectedComment.createdAt || new Date().toISOString()
            });
        } else {
            setFormData({
                commentId: '',
                content: '',
                missionId: '',
                userId: '',
                createdAt: new Date().toISOString()
            });
        }
    }, [selectedComment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            open={true}
            onClose={onCancel}
            aria-labelledby="form-modal-title"
            aria-describedby="form-modal-description"
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    margin: 'auto',
                    mt: 5,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {formData.commentId ? 'Yorumu Güncelle' : 'Yeni Yorum Ekle'}
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    name="content"
                    label="İçerik"
                    multiline
                    rows={4}
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="missionId"
                    label="Görev ID"
                    type="number"
                    value={formData.missionId}
                    onChange={handleChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="userId"
                    label="Kullanıcı ID"
                    type="number"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ mt: 2 }}
                >
                    Kaydet
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={onCancel}
                    sx={{ mt: 2, ml: 2 }}
                >
                    İptal
                </Button>
            </Box>
        </Modal>
    );
};

export default CommentList;
