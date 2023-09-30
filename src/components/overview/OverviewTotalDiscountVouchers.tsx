import React from 'react';
import ReceiptPercentIcon from '@heroicons/react/24/solid/ReceiptPercentIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

interface OverviewTotalDiscountVouchersProps {
  sx: {
    height: string;
    // Add any other properties from the `sx` object here if needed
  };
  value: number;
}

const OverviewTotalDiscountVouchers: React.FC<
  OverviewTotalDiscountVouchersProps
> = ({ sx, value }) => {
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
              Total Vouchers
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
              <ReceiptPercentIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewTotalDiscountVouchers;
