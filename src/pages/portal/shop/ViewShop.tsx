import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import EditShopFields from '../../../components/shops/EditShopFields';
import ViewShopFields from '../../../components/shops/ViewShopFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetShopQuery } from '../../../services/crud-shop';

const ViewShop = () => {
  const { shopId } = useParams();
  const {
    data: shop,
    isLoading,
    isFetching,
    isError,
  } = useGetShopQuery(shopId);

  if (isLoading) {
    return <div></div>;
  }

  if (!shop || isError) {
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
              <Typography variant='h4'>Shop Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewShopFields shop={shop} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditShopFields shop={shop} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewShop;
