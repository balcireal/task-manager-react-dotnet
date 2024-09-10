import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField
} from '@mui/material';

const UserEditDialog = ({ open, user, onClose, onSave }) => {
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSave = () => {
        const updatedUser = { ...user, username, email };
        onSave(updatedUser);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Kullanıcıyı Düzenle</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="İsim"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>İptal</Button>
                <Button onClick={handleSave} color="primary">Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserEditDialog;
