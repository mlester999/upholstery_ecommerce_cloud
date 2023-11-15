import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import EditReturnRefundFields from '../../../components/return-refunds/EditReturnRefundFields';
import ViewReturnRefundFields from '../../../components/return-refunds/ViewReturnRefundFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetReturnRefundQuery } from '../../../services/crud-return-refund';

const ViewReturnRefund = () => {
  const { returnRefundId } = useParams();
  const {
    data: returnRefund,
    isLoading,
    isFetching,
    isError,
  } = useGetReturnRefundQuery(returnRefundId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!returnRefund || isError) {
    return <NotFound />;
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
              <Typography variant='h4'>Return / Refund Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewReturnRefundFields returnRefund={returnRefund} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditReturnRefundFields returnRefund={returnRefund} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewReturnRefund;
