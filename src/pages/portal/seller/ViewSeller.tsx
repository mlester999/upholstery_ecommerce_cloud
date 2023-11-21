import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import EditSellerFields from '../../../components/sellers/EditSellerFields';
import ViewSellerFields from '../../../components/sellers/ViewSellerFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetSellerQuery } from '../../../services/crud-seller';

const ViewSeller = () => {
  const { sellerId } = useParams();
  const {
    data: seller,
    isLoading,
    isFetching,
    isError,
  } = useGetSellerQuery(sellerId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!seller || isError) {
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
              <Typography variant='h4'>Seller Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewSellerFields seller={seller} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditSellerFields seller={seller} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewSeller;
