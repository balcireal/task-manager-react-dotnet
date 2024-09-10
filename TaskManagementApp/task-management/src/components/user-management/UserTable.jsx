import React, { useEffect, useState } from 'react';
import {
    Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
} from '@mui/material';
import { Edit, Delete, Security } from '@mui/icons-material';
import RoleUpdateDialog from '@/components/user-management/RoleUpdateDialog';
import UserEditDialog from '@/components/user-management/UserEditDialog';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:7157/api/user')
            .then(response => {
                const fetchedUsers = response.data.data;
                setUsers(fetchedUsers);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleRoleUpdate = (user) => {
        setSelectedUser(user);
        setRoleDialogOpen(true);
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`http://localhost:7157/api/user/${userId}`)
            .then(response => {
                setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
                toast.success('Kullanıcı başarıyla silindi!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                toast.error('Kullanıcı silinirken bir hata oluştu.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditDialogOpen(true);
    };

    const handleSaveUser = (updatedUser) => {
        axios.put(`http://localhost:7157/api/user`, updatedUser)
            .then(response => {
                setUsers(prevUsers => prevUsers.map(user =>
                    user.userId === updatedUser.userId ? updatedUser : user
                ));
                setEditDialogOpen(false);
                toast.success('Kullanıcı başarıyla güncellendi!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(error => {
                console.error('Error updating user:', error);
                toast.error('Kullanıcı güncellenirken bir hata oluştu.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Kullanıcı Listesi
            </Typography>
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>İsim</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Aksiyonlar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.userId} sx={{ '&:nth-of-type(even)': { backgroundColor: '#fafafa' } }}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditUser(user)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleRoleUpdate(user)}>
                                        <Security />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteUser(user.userId)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {editDialogOpen && (
                <UserEditDialog
                    open={editDialogOpen}
                    user={selectedUser}
                    onClose={() => setEditDialogOpen(false)}
                    onSave={handleSaveUser}
                />
            )}

            {roleDialogOpen && (
                <RoleUpdateDialog
                    user={selectedUser}
                    onClose={() => setRoleDialogOpen(false)}
                />
            )}
        </Box>
    );
};

export default UserTable;
