import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EditVoucherFields from '../../../components/vouchers/EditVoucherFields';
import ViewVoucherFields from '../../../components/vouchers/ViewVoucherFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetVoucherQuery } from '../../../services/crud-voucher';

const ViewVoucher = () => {
  const { voucherId } = useParams();
  const {
    data: voucher,
    isLoading,
    isFetching,
  } = useGetVoucherQuery(voucherId);

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
              <Typography variant='h4'>Voucher Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewVoucherFields voucher={voucher} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditVoucherFields voucher={voucher} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewVoucher;
