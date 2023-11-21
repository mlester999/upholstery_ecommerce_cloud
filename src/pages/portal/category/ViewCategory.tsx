import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import EditCategoryFields from '../../../components/categories/EditCategoryFields';
import ViewCategoryFields from '../../../components/categories/ViewCategoryFields';
import NotFound from '../../../components/NotFound';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetCategoryQuery } from '../../../services/crud-category';

const ViewCategory = () => {
  const { categoryId } = useParams();
  const {
    data: category,
    isLoading,
    isFetching,
    isError,
  } = useGetCategoryQuery(categoryId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!category || isError) {
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
              <Typography variant='h4'>Category Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewCategoryFields category={category} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditCategoryFields category={category} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewCategory;
