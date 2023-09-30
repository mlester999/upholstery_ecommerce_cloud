import React from 'react';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

interface OverviewTotalCustomersProps {
  sx: {
    height: string;
    // Add any other properties from the `sx` object here if needed
  };
  value: number;
}

const OverviewTotalCustomers: React.FC<OverviewTotalCustomersProps> = ({
  sx,
  value,
}) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems='flex-start'
          direction='row'
          justifyContent='space-between'
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              Total Customers
            </Typography>
            <Typography variant='h4'>{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'info.darkest',
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <UserGroupIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewTotalCustomers;
