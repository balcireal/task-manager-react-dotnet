import React from 'react';
import { useMediaQuery, Box, Drawer } from '@mui/material';
import SidebarItems from '@/layouts/full/sidebar/SidebarItems';
import ProgressTracker from '@/layouts/full/sidebar/ProgressTracker';
import LogoImage from '@/assets/images/logos/tasks.png';

const Sidebar = (props) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const sidebarWidth = isDesktop ? '270px' : '240px';

  const completedTasks = 5;
  const totalTasks = 10;

  return (
    <Drawer
      anchor="left"
      open={props.isSidebarOpen || props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant={isDesktop ? 'persistent' : 'temporary'}
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
          boxSizing: 'border-box',
        },
      }}
      sx={{
        '.MuiDrawer-paper': {
          width: sidebarWidth,
        }
      }}
    >
      <Box
        sx={{
          height: '100%',
        }}
      >
        <Box
          px={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
          }}
        >
          <img src={LogoImage} alt="Logo" style={{ width: '50%' }} />
        </Box>
        <Box>
          <SidebarItems />
          <ProgressTracker completedTasks={completedTasks} totalTasks={totalTasks} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
