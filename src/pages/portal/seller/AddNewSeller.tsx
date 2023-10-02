import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewSellerFields from '../../../components/sellers/AddNewSellerFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewSeller = () => (
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
            <Typography variant='h4'>Add New Seller</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid>
                <AddNewSellerFields />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewSeller;
