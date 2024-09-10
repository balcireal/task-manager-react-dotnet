import React, { useState, useEffect } from 'react';
import { styled, Container, Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '@/layouts/full/header/Header';
import Sidebar from '@/layouts/full/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const MainWrapper = styled('div')(() => ({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
}));

const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    paddingBottom: '60px',
    flexDirection: 'column',
    zIndex: 1,
    backgroundColor: 'transparent',
}));

const FullLayout = () => {
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        if (isLgUp) {
            setSidebarOpen(false);
        } else {
            setSidebarOpen(false);
        }
    }, [isLgUp]);

    return (
        <MainWrapper className="mainwrapper">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
            />
            <PageWrapper className="page-wrapper">
                <Header
                    toggleSidebar={() => setSidebarOpen(prev => !prev)}
                    toggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />
                <Container
                    sx={{
                        paddingTop: '20px',
                        maxWidth: '1600px',
                    }}
                >
                    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
                        <Outlet />
                    </Box>
                </Container>
            </PageWrapper>
        </MainWrapper>
    );
};

export default FullLayout;
