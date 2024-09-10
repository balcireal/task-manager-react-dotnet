import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserForm = ({ user, onClose }) => {
    const [formData, setFormData] = useState(user || { name: '', email: '', role: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{user ? 'Kullanıcıyı Düzenle' : 'Yeni Kullanıcı Ekle'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    name="name"
                    label="İsim"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Kaydet
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
