import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid,
    CircularProgress, Typography
} from '@mui/material';
import axios from 'axios';

const MissionForm = ({ selectedMission, onSave, onCancel }) => {
    const [missionId, setMissionId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Tamamlanmamış');
    const [priority, setPriority] = useState('Düşük');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formErrors, setFormErrors] = useState({});
    const [createdAt, setCreatedAt] = useState(new Date().toISOString());
    const [updatedAt, setUpdatedAt] = useState(new Date().toISOString());

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:7157/api/user');
                if (Array.isArray(response.data.data)) {
                    setUsers(response.data.data);
                } else {
                    console.error('Beklenen formatta değil:', response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Kullanıcılar yüklenemedi:', error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

        if (selectedMission) {
            setMissionId(selectedMission.missionId || null);
            setTitle(selectedMission.title || '');
            setDescription(selectedMission.description || '');
            setStatus(selectedMission.status || 'Tamamlanmamış');
            setPriority(selectedMission.priority || 'Düşük');
            setUserId(selectedMission.userId || '');
            setCreatedAt(selectedMission.createdAt || new Date().toISOString());
            setUpdatedAt(selectedMission.updatedAt || new Date().toISOString());
        }
    }, [selectedMission]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});

        const errors = {};
        if (!title) errors.title = 'Başlık gerekli';
        if (!description) errors.description = 'Açıklama gerekli';

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const missionData = {
            MissionId: missionId,
            title,
            description,
            status,
            priority,
            userId,
            createdAt,
            UpdatedAt: new Date().toISOString()
        };

        try {
            if (selectedMission) {
                await axios.put('http://localhost:7157/api/Mission', missionData);
            } else {
                await axios.post('http://localhost:7157/api/Mission', missionData);
            }
            onSave();
        } catch (error) {
            console.error('Görev kaydedilirken bir hata oluştu:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>Görev Formu</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Başlık"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        error={!!formErrors.title}
                        helperText={formErrors.title}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Açıklama"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        margin="normal"
                        error={!!formErrors.description}
                        helperText={formErrors.description}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Durum</InputLabel>
                        <Select
                            value={status || ''}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Tamamlanmış">Tamamlanmış</MenuItem>
                            <MenuItem value="Tamamlanmamış">Tamamlanmamış</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Öncelik</InputLabel>
                        <Select
                            value={priority || ''}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <MenuItem value="Düşük">Düşük</MenuItem>
                            <MenuItem value="Orta">Orta</MenuItem>
                            <MenuItem value="Yüksek">Yüksek</MenuItem>
                            <MenuItem value="Kritik">Kritik</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Kullanıcı Ata</InputLabel>
                        <Select
                            value={userId || ''}
                            onChange={(e) => setUserId(e.target.value)}
                            disabled={loading}
                        >
                            <MenuItem value=""><em>Seçin</em></MenuItem>
                            {loading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={24} />
                                </MenuItem>
                            ) : (
                                users.map(user => (
                                    <MenuItem key={user.userId} value={user.userId}>{user.username}</MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <div style={{ marginTop: '20px' }}>
                <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>Kaydet</Button>
                <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>İptal</Button>
            </div>
        </form>
    );
};

export default MissionForm;
