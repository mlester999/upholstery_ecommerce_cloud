import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewCustomerFields from '../../../components/customers/AddNewCustomerFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewCustomer = () => (
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
            <Typography variant='h4'>Add New Customer</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid>
                <AddNewCustomerFields />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewCustomer;
