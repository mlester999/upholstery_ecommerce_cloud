import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AccountProfileChangePass from '../../components/account-details/AccountProfileChangePass';
import AccountProfileDetails from '../../components/account-details/AccountProfileDetails';
import PortalLayout from '../../layouts/PortalLayout';

const AccountDetails = () => (
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
            <Typography variant='h4'>Account Details</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={7}>
                <AccountProfileDetails />
              </Grid>
              <Grid xs={12} md={6} lg={5}>
                <AccountProfileChangePass />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AccountDetails;
