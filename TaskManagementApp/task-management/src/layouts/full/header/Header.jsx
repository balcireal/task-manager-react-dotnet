import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Profile from '@/layouts/full/header/Profile';
import NotificationMenu from '@/components/notification-management/NotificationMenu';

const Header = (props) => {
    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        boxShadow: 'none',
        background: theme.palette.background.paper,
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
        [theme.breakpoints.up('lg')]: {
            minHeight: '70px',
        },
    }));

    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        color: theme.palette.text.secondary,
    }));

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>

                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={props.toggleMobileSidebar}
                    sx={{
                        display: {
                            lg: "none",
                            xs: "inline",
                        },
                    }}
                >
                    <FontAwesomeIcon icon={faBars} width="20" height="20" />
                </IconButton>


                <IconButton
                    color="inherit"
                    aria-label="menu"
                    onClick={props.toggleSidebar}
                    sx={{
                        display: {
                            lg: "inline",
                            xs: "none",
                        },
                    }}
                >
                    <FontAwesomeIcon icon={faBars} width="20" height="20" />
                </IconButton>


                <NotificationMenu />

                <Box flexGrow={1} />

                <Stack spacing={1} direction="row" alignItems="center">
                    <Button>Log Out</Button>
                    <Profile />
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

Header.propTypes = {
    sx: PropTypes.object,
    toggleSidebar: PropTypes.func.isRequired,
    toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
