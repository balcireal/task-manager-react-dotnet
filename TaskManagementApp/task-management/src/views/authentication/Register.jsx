import React from 'react';
import { Grid, Box, Card, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import PageContainer from '@/components/container/PageContainer';
import Logo from '@/layouts/full/shared/logo/Logo';
import AuthRegister from '@/views/authentication/auth/AuthRegister';
import BackgroundImage from '@/assets/images/backgrounds/task_management.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import LogoImage from '@/assets/images/logos/tasks.png';

const Register2 = () => (
  <PageContainer title="Kayıt Ol" description="Bu kayıt sayfasıdır">
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
        },
      }}
    >
      <ToastContainer />
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
          <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <img src={LogoImage} alt="Görev Yönetim Sistemi Logosu" width="150" height="150" />
            </Box>
            <AuthRegister
              subtext={
                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                  Görev Yönetim Sistemi Kayıt
                </Typography>
              }
              subtitle={
                <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Zaten hesabınız var mı?
                  </Typography>
                  <Typography
                    component={Link}
                    to="/authentication/login"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                    }}
                  >
                    Giriş Yapın
                  </Typography>
                </Stack>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default Register2;
