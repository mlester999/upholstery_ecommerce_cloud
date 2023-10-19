import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EditAdminFields from '../../../components/admins/EditAdminFields';
import ViewAdminFields from '../../../components/admins/ViewAdminFields';
import NotFound from '../../../components/NotFound';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetAdminQuery } from '../../../services/crud-admin';

const ViewAdmin = () => {
  const { adminId } = useParams();
  const {
    data: admin,
    isLoading,
    isFetching,
    isError,
  } = useGetAdminQuery(adminId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!admin || isError) {
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
              <Typography variant='h4'>Admin Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewAdminFields admin={admin} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditAdminFields admin={admin} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewAdmin;
