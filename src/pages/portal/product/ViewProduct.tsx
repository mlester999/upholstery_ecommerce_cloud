import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EditProductFields from '../../../components/products/EditProductFields';
import ViewProductFields from '../../../components/products/ViewProductFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetProductQuery } from '../../../services/crud-product';

const ViewProduct = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isFetching,
  } = useGetProductQuery(productId);

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
              <Typography variant='h4'>Product Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewProductFields product={product} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditProductFields product={product} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewProduct;
