import React, { useContext } from 'react';
import { Menu, MenuItem, IconButton, Badge, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NotificationContext } from '@/context/NotificationContext';

const NotificationMenu = () => {
    const { notifications } = useContext(NotificationContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
                aria-controls="notification-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Badge badgeContent={notifications.length || 0} color="primary">
                    <FontAwesomeIcon icon={faBell} size="1x" />
                </Badge>
            </IconButton>
            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: '300px',
                    },
                }}
            >
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <MenuItem key={notification.notificationId}>
                            <Typography variant="body2">
                                {notification.message}
                            </Typography>
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem>Bildirim yok</MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default NotificationMenu;
