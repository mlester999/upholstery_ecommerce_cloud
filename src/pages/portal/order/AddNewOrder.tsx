import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewOrderFields from '../../../components/orders/AddNewOrderFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewOrder = () => (
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
            <Typography variant='h4'>Add New Order</Typography>
          </div>
          <div>
            <AddNewOrderFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewOrder;
