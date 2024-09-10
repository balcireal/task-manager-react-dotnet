import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavItem = ({ item, pathDirect }) => {
  return (
    <ListItem
      button
      component={Link}
      to={item.href}
      selected={pathDirect === item.href}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItem>
  );
};

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  pathDirect: PropTypes.string.isRequired,
};

export default NavItem;
