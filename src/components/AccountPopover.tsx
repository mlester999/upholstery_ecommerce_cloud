import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { useGetUserQuery, useLogoutMutation } from '../services/authentication';
import { useNavigate } from 'react-router-dom';

const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const { data: user } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const log = await logout()
      .unwrap()
      .then((payload) => {
        navigate('/login');
        navigate(0);
      })
      .catch((error) => console.log(error));

    return log;
  };

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
          {user.first_name} {user.last_name}
        </Typography>
      </Box>
      <Divider />
      <MenuList disablePadding dense>
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

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

export default AccountPopover;
