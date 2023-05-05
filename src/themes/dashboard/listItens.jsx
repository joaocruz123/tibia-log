import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, Tooltip } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

const styleCustom = {
  fontFamily: 'Graviola Soft',
  color: "#707070",
  '&:hover': {
    color: "#707070",
    textDecoration: "none"
  },
}

export const mainListItems = (
  <React.Fragment>
    <Link
      href="/"
      underline="none"
      sx={styleCustom}
    >
      <Tooltip title="Inicio" placement="right-start" arrow>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </Tooltip>
    </Link>
    <Link
      href="/tasks"
      underline="none"
      sx={styleCustom}
    >
      <Tooltip title="Tasks" placement="right-start" arrow>
        <ListItemButton>
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItemButton>
      </Tooltip>
    </Link>
  </React.Fragment>
);