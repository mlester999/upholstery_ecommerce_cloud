import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewReturnRefundFields from '../../../components/return-refunds/AddNewReturnRefundFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewReturnRefund = () => (
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
            <Typography variant='h4'>Add New Return / Refund</Typography>
          </div>
          <div>
            <AddNewReturnRefundFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewReturnRefund;
