import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

const RoleUpdateDialog = ({ user, onClose }) => {
    console.log("User object:", user);
    const [role, setRole] = useState(user.role || '');

    const handleChange = (e) => {
        setRole(e.target.value);
    };


    const handleSubmit = async () => {
        try {
            const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

            await axios.put('http://localhost:7157/api/user', {
                UserId: user.userId,
                Username: user.username,
                Email: user.email,
                Password: user.password,
                CreatedAt: user.createdAt,

                Role: role,
                UpdatedAt: user.updatedAt
            });
            alert('Rol güncellendi!');
            onClose();
        } catch (error) {
            if (error.response) {
                console.error('Rol güncellenirken bir hata oluştu:', error.response.data.errors);
                alert(`Rol güncellenirken bir hata oluştu: ${JSON.stringify(error.response.data.errors)}`);
            } else {
                console.error('Rol güncellenirken bir hata oluştu:', error.message);
                alert('Rol güncellenirken bir hata oluştu.');
            }
        }
    };




    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{`${user.username} için Rolü Güncelle`}</DialogTitle>
            <DialogContent>
                <TextField
                    select
                    label="Rol"
                    value={role}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Kullanıcı">Kullanıcı</MenuItem>
                    {/* Diğer roller */}
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Güncelle
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoleUpdateDialog;
