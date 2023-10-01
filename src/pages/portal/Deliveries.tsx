import { useCallback, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import DeliveriesTable from '../../components/deliveries/DeliveriesTable';
import DeliveriesSearch from '../../components/deliveries/DeliveriesSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { deliveriesData } from '../../utils/mockedDeliveriesData';

const useDeliveries = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(deliveriesData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const Deliveries = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const deliveries = useDeliveries(page, rowsPerPage);

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
                <Typography variant='h4'>Deliveries</Typography>
              </Stack>
            </Stack>
            <DeliveriesSearch />
            <DeliveriesTable
              count={deliveriesData.length}
              items={deliveries}
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

export default Deliveries;
