import { useCallback, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import ReturnsAndRefundsTable from '../../components/returns-and-refunds/ReturnsAndRefundsTable';
import ReturnsAndRefundsSearch from '../../components/returns-and-refunds/ReturnsAndRefundsSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { returnsAndRefundsData } from '../../utils/mockedReturnsAndRefundsData';

const useReturnsAndRefunds = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(returnsAndRefundsData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const ReturnsAndRefunds = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const returnsAndRefunds = useReturnsAndRefunds(page, rowsPerPage);

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
                <Typography variant='h4'>Returns / Refunds</Typography>
              </Stack>
            </Stack>
            <ReturnsAndRefundsSearch />
            <ReturnsAndRefundsTable
              count={returnsAndRefundsData.length}
              items={returnsAndRefunds}
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

export default ReturnsAndRefunds;
