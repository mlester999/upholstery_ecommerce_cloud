import { useCallback, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import ReviewsTable from '../../components/reviews/ReviewsTable';
import ReviewsSearch from '../../components/reviews/ReviewsSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { reviewsData } from '../../utils/mockedReviewsData';

const useReviews = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(reviewsData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const Reviews = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const reviews = useReviews(page, rowsPerPage);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <PortalLayout>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={3}>
            <Stack direction='row' justifyContent='space-between' spacing={4}>
              <Stack spacing={1}>
                <Typography variant='h4'>Reviews</Typography>
              </Stack>
            </Stack>
            <ReviewsSearch />
            <ReviewsTable
              count={reviewsData.length}
              items={reviews}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default Reviews;
