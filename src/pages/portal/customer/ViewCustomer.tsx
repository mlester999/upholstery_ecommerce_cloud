import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EditCustomerFields from '../../../components/customers/EditCustomerFields';
import ViewCustomerFields from '../../../components/customers/ViewCustomerFields';
import NotFound from '../../../components/NotFound';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetCustomerQuery } from '../../../services/crud-customer';

const ViewCustomer = () => {
  const { customerId } = useParams();
  const {
    data: customer,
    isLoading,
    isFetching,
    isError,
  } = useGetCustomerQuery(customerId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!customer || isError) {
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
              <Typography variant='h4'>Customer Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewCustomerFields customer={customer} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditCustomerFields customer={customer} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewCustomer;
