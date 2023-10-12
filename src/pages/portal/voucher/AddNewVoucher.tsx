import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewVoucherFields from '../../../components/vouchers/AddNewVoucherFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewVoucher = () => (
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
            <Typography variant='h4'>Add New Voucher</Typography>
          </div>
          <div>
            <AddNewVoucherFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewVoucher;
