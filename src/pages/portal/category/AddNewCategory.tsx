import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewCategoryFields from '../../../components/categories/AddNewCategoryFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewCategory = () => (
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
            <Typography variant='h4'>Add New Category</Typography>
          </div>
          <div>
            <AddNewCategoryFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewCategory;
