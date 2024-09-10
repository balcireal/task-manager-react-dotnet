import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card, CardContent, CardActions, Grid, Typography, Button, CircularProgress,
    IconButton, Tooltip, Modal, Box
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import MissionForm from '@/components/mission-management/MissionForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const MissionList = () => {
    const [missions, setMissions] = useState([]);
    const [selectedMission, setSelectedMission] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMissions();
    }, []);

    const fetchMissions = async () => {
        try {
            const response = await axios.get('http://localhost:7157/api/mission');
            if (Array.isArray(response.data)) {
                setMissions(response.data);
            } else if (response.data.data && Array.isArray(response.data.data)) {
                setMissions(response.data.data);
            } else {
                console.error('Görevler beklenen formatta değil:', response.data);
            }
        } catch (error) {
            console.error('Görevler yüklenemedi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (mission) => {
        setSelectedMission(mission);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Emin misiniz?',
            text: "Bu görevi silmek istediğinizden emin misiniz?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil!',
            cancelButtonText: 'İptal'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:7157/api/mission/${id}`);
                fetchMissions();
                Swal.fire(
                    'Silindi!',
                    'Görev başarıyla silindi.',
                    'success'
                );
            } catch (error) {
                console.error('Görev silinirken bir hata oluştu:', error);
                Swal.fire(
                    'Hata!',
                    'Görev silinirken bir hata oluştu.',
                    'error'
                );
            }
        }
    };

    const handleSave = () => {
        setShowForm(false);
        setSelectedMission(null);
        setShowEditModal(false);
        fetchMissions();
        toast.success(selectedMission ? 'Görev başarıyla güncellendi!' : 'Görev başarıyla eklendi!');
    };

    const handleNewMission = () => {
        setSelectedMission(null);
        setShowForm(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
        setSelectedMission(null);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
            <Typography variant="h4" gutterBottom align="center">Görev Yönetimi</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleNewMission}
                startIcon={<Add />}
                style={{ marginBottom: '20px' }}
            >
                Yeni Görev Ekle
            </Button>

            {showForm && (
                <MissionForm
                    selectedMission={selectedMission}
                    onSave={handleSave}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </div>
            ) : missions.length === 0 ? (
                <Typography variant="h6" align="center" color="textSecondary">
                    Veri bulunamadı.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {missions.map((mission) => (
                        <Grid item xs={12} sm={6} md={4} key={mission.missionId}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {mission.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Durum: {mission.status}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Öncelik: {mission.priority}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Kullanıcı ID: {mission.userId}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Tooltip title="Düzenle">
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(mission)}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Sil">
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleDelete(mission.missionId)}
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

            <Modal
                open={showEditModal}
                onClose={closeModal}
                aria-labelledby="edit-mission-modal"
                aria-describedby="edit-mission-form"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" id="edit-mission-modal" gutterBottom>
                        Görev Düzenle
                    </Typography>
                    <MissionForm
                        selectedMission={selectedMission}
                        onSave={handleSave}
                        onCancel={closeModal}
                    />
                </Box>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default MissionList;
