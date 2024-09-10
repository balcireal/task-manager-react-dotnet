import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import PageContainer from '@/components/container/PageContainer';
import AuthLogin from '@/views/authentication/auth/AuthLogin';
import LogoImage from '@/assets/images/logos/tasks.png';
import BackgroundImage from '@/assets/images/backgrounds/task_management.jpg';

const Login2 = () => {
  const cardSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 170, friction: 20 },
  });

  const logoSpring = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.8',
            zIndex: -1,
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <animated.div style={cardSpring}>
              <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <animated.img src={LogoImage} alt="Logo" style={{ width: '100px', ...logoSpring }} />
                </Box>
                <AuthLogin
                  subtext={
                    <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                      Görev Yönetim Sistemi Giriş
                    </Typography>
                  }
                  subtitle={
                    <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                      <Typography color="textSecondary" variant="h6" fontWeight="500">
                        Yeni misin?
                      </Typography>
                      <Typography
                        component={Link}
                        to="/user/register"
                        fontWeight="500"
                        sx={{
                          textDecoration: 'none',
                          color: 'primary.main',
                        }}
                      >
                        Kayıt ol
                      </Typography>
                    </Stack>
                  }
                  renderInputs={({ register }) => (
                    <>
                      <TextField
                        {...register('username')}
                        label="kullanıcı Adı"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 2,
                        }}
                      />
                      <TextField
                        {...register('password')}
                        label="Şifre"
                        type="password"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mb: 2,
                        }}
                      />
                    </>
                  )}
                />
              </Card>
            </animated.div>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
