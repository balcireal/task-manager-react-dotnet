import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomTextField from '@/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { register } from '@/services/apiService';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await register({ username, email, password });
            if (response) {
                toast.success('Kayıt başarılı! Lütfen giriş yapınız.', {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate('/authentication/login');
            } else {
                setError('Kayıt başarısız. Lütfen tekrar deneyin.');
            }
        } catch (err) {
            console.error('Kayıt başarısız:', err);
            setError('Kayıt başarısız. Lütfen tekrar deneyin.');
        }
    };

    return (
        <>
            {title && (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            )}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='name' mb="5px">
                        Kullanıcı Adı
                    </Typography>
                    <CustomTextField id="name" variant="outlined" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">
                        E-posta Adresi
                    </Typography>
                    <CustomTextField id="email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">
                        Şifre
                    </Typography>
                    <CustomTextField id="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                </Stack>

                {error && <Typography color="error" variant="body2">{error}</Typography>}

                <Button color="primary" variant="contained" size="large" fullWidth onClick={handleRegister}>
                    Kayıt Ol
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
