import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UserTable from '@/components/user-management/UserTable';
import UserForm from '@/components/user-management/UserForm';

const UserManagementPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsFormOpen(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" mb={3}>Kullanıcı Yönetimi</Typography>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
                Yeni Kullanıcı Ekle
            </Button>
            <UserTable onEditUser={handleEditUser} />
            {isFormOpen && <UserForm user={selectedUser} onClose={() => setIsFormOpen(false)} />}
        </Box>
    );
};

export default UserManagementPage;
