import React from 'react';
import TruckIcon from '@heroicons/react/24/solid/TruckIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

interface OverviewTotalDeliveriesProps {
  sx: {
    height: string;
    // Add any other properties from the `sx` object here if needed
  };
  value: number;
}

const OverviewTotalDeliveries: React.FC<OverviewTotalDeliveriesProps> = ({
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
              Total Deliveries
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
              <TruckIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewTotalDeliveries;
