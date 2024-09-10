import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Menu, Button, IconButton, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import ProfileImg from '@/assets/images/profiles/admin.jpeg';
import { useAuth } from '@/context/AuthContext';
import { getUserById } from '@/services/apiService';

const Profile = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (userId) {
                try {
                    const response = await getUserById(userId);
                    setUserProfile(response.data);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };
        fetchUserProfile();
    }, [userId]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton
                size="large"
                color="inherit"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar
                    src={userProfile?.profileImage || ProfileImg}
                    alt="Profile Image"
                    sx={{ width: 35, height: 35 }}
                />
            </IconButton>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                sx={{ '& .MuiMenu-paper': { width: '200px' } }}
            >
                <MenuItem component={Link} to="/myprofile">
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faUser} />
                    </ListItemIcon>
                    <ListItemText primary="Profilim" />
                </MenuItem>
                <MenuItem component={Link} to="/mytasks">
                    <ListItemIcon>
                        <FontAwesomeIcon icon={faListCheck} />
                    </ListItemIcon>
                    <ListItemText primary="Görevlerim" />
                </MenuItem>
                <Box mt={1} py={1} px={2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        component={Link}
                        to="/authentication/login"
                        fullWidth
                    >
                        Çıkış Yap
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Profile;
