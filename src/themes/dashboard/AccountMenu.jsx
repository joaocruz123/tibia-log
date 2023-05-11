import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button, Typography } from '@mui/material';
import Loading from '../../components/Loading';
// import { API_URL } from '../../config';

const AccountMenu = (props) => {
  const { name, email, logout, loading } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Box>
        <Loading isActive={loading} />
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Configurações de Conta">
            <Button onClick={handleClick} disableElevation sx={{ color: "#fff", textTransform: 'none' }}>
              <Avatar
                alt="Remy Sharp"
                src={``}
                sx={{ width: 42, height: 42, mr: 1 }}
              />
              {name}
            </Button>
          </Tooltip>

        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              width: 210,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ my: 2, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7f7f7f' }} noWrap>
              {email}
            </Typography>
          </Box>
          {/* <Divider />
          <Box sx={{ my: 1, px: 0 }}>
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
          </Box> */}
          <Divider />
          <Box sx={{ my: 1, px: 0 }}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Box>
        </Menu>
      </Box>
    </>

  );
}

export default AccountMenu;