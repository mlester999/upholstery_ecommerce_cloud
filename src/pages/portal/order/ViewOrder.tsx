import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EditOrderFields from '../../../components/orders/EditOrderFields';
import ViewOrderFields from '../../../components/orders/ViewOrderFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetOrderQuery } from '../../../services/crud-order';

const ViewOrder = () => {
  const { orderId } = useParams();
  const { data: order, isLoading, isFetching } = useGetOrderQuery(orderId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  return (
    <PortalLayout>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Stack spacing={3}>
            <div>
              <Typography variant='h4'>Order Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewOrderFields order={order} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditOrderFields order={order} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewOrder;
