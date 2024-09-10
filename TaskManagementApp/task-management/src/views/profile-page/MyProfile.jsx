import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Card, CardContent, CircularProgress } from '@mui/material';
import ProfileImg from '@/assets/images/profiles/admin.jpeg';
import { useAuth } from '@/context/AuthContext';

const MyProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setProfile(user);
            setLoading(false);
        }
    }, [user]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            {loading ? (
                <CircularProgress />
            ) : (
                profile && (
                    <Card sx={{ maxWidth: 500 }}>
                        <CardContent>
                            <Box display="flex" justifyContent="center" mb={3}>
                                <Avatar
                                    src={profile.profileImage || ProfileImg}
                                    alt="Profile Image"
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Box>

                            <Typography variant="h4" align="center" gutterBottom>
                                {profile.username || 'Username not specified'}
                            </Typography>

                            <Typography variant="subtitle1" align="center" color="textSecondary">
                                {profile.email || 'Email not specified'}
                            </Typography>

                            <Typography variant="subtitle1" align="center" color="textSecondary">
                                {profile.role || 'Role not specified'}
                            </Typography>

                            <Typography variant="subtitle2" align="center" mt={2}>
                                {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Date not specified'} tarihinden beri üye.
                            </Typography>
                        </CardContent>
                    </Card>
                )
            )}
        </Box>
    );
};

export default MyProfile;
