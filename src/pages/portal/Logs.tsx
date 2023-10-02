import { useCallback, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import LogsTable from '../../components/logs/LogsTable';
import LogsSearch from '../../components/logs/LogsSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { logsData } from '../../utils/mockedLogsData';

const useLogs = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(logsData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const Logs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const logs = useLogs(page, rowsPerPage);

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
                <Typography variant='h4'>Logs</Typography>
              </Stack>
            </Stack>
            <LogsSearch />
            <LogsTable
              count={logsData.length}
              items={logs}
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

export default Logs;
