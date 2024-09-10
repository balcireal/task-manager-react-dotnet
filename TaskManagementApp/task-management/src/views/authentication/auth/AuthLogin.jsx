import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { login as loginAPI } from '@/services/apiService';

const AuthLogin = ({ subtext, subtitle }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Kullanıcı adı ve şifre alanları boş bırakılamaz.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await loginAPI(username, password);
            if (response && response.userId) {
                login(response);
                navigate('/dashboard');
            } else {
                setError('Giriş başarısız. Lütfen tekrar deneyin.');
            }
        } catch (err) {
            setError('Giriş başarısız. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {subtext}
            <TextField
                label="Kullanıcı Adı"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Şifre"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error" variant="body2">{error}</Typography>}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Giriş'}
            </Button>
            {subtitle}
        </div>
    );
};

export default AuthLogin;
