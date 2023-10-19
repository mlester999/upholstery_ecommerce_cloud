import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewAdminFields from '../../../components/admins/AddNewAdminFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewAdmin = () => (
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
            <Typography variant='h4'>Add New Admin</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid>
                <AddNewAdminFields />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewAdmin;
