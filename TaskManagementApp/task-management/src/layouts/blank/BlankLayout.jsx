import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const BlankLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default BlankLayout;
