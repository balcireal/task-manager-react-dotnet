import React from 'react';
import { Box, List } from '@mui/material';
import NavItem from '@/layouts/full/sidebar/NavItem/NavItem';
import NavGroup from '@/layouts/full/sidebar/NavGroup/NavGroup';
import Menuitems from '@/layouts/full/sidebar/MenuItems';

const SidebarItems = ({ currentPath }) => {
  const pathDirect = currentPath || '';

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
