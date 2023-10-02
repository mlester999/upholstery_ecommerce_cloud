import { useCallback, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import TransactionsTable from '../../components/transactions/TransactionsTable';
import TransactionsSearch from '../../components/transactions/TransactionsSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { transactionsData } from '../../utils/mockedTransactionsData';

const useTransactions = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(transactionsData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const Transactions = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const transactions = useTransactions(page, rowsPerPage);

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
                <Typography variant='h4'>Transactions</Typography>
              </Stack>
            </Stack>
            <TransactionsSearch />
            <TransactionsTable
              count={transactionsData.length}
              items={transactions}
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

export default Transactions;
