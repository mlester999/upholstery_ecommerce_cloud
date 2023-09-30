import React from 'react';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

interface OverviewTotalProductsProps {
  sx: {
    height: string;
    // Add any other properties from the `sx` object here if needed
  };
  value: number;
}

const OverviewTotalProducts: React.FC<OverviewTotalProductsProps> = ({
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
            <Typography color='text.secondary' gutterBottom variant='overline'>
              Total Products
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
              <ShoppingBagIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewTotalProducts;
