import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import AddNewProductFields from '../../../components/products/AddNewProductFields';
import PortalLayout from '../../../layouts/PortalLayout';

const AddNewProduct = () => (
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
            <Typography variant='h4'>Add New Product</Typography>
          </div>
          <div>
            <AddNewProductFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewProduct;
