import React, { useCallback } from 'react';
import Cookies from 'js-cookie';
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { useGetUserQuery, useLogoutMutation } from '../services/authentication';
import { useNavigate, Link } from 'react-router-dom';

interface AccountPopoverProps {
  anchorEl: HTMLDivElement | null;
  onClose: () => void;
  open: boolean;
}

const AccountPopover: React.FC<AccountPopoverProps> = ({
  anchorEl,
  onClose,
  open,
}) => {
  const { data: user } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    const log = await logout()
      .unwrap()
      .then(() => {
        Cookies.remove('is_authenticated');
        navigate('/login', { replace: true });
      })
      .catch((error) => console.log(error));

    return log;
  }, [navigate, logout]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant='overline'>Account</Typography>
        <Typography color='text.secondary' variant='body2'>
          {user?.first_name} {user?.last_name}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding dense>
        <MenuItem
          component={Link}
          to='/portal/account-details'
          sx={{ paddingY: '8px', paddingX: '16px' }}
        >
          Account Details
        </MenuItem>
        <MenuItem
          onClick={handleSignOut}
          sx={{ color: 'red', paddingY: '8px', paddingX: '16px' }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

export default AccountPopover;
