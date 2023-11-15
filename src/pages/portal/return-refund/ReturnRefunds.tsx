import { useCallback, useEffect, useMemo, useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import ReturnRefundsTable from '../../../components/return-refunds/ReturnRefundsTable';
import ReturnRefundsSearch from '../../../components/return-refunds/ReturnRefundsSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetReturnRefundsQuery } from '../../../services/crud-return-refund';

const useReturnRefunds = (page, rowsPerPage, returnRefundsInfo, query) => {
  const dataReady = returnRefundsInfo && returnRefundsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const returnRefunds = applyPagination(returnRefundsInfo, page, rowsPerPage);

        const returnRefundsLength = returnRefundsInfo.length;

        return { returnRefunds, returnRefundsLength };
      } else {
        const latestReturnRefunds = returnRefundsInfo.filter((item) => {
          // Convert the item properties to lowercase strings and check if any of them contains the query
          for (const key in item) {
            if (
              item[key] &&
              item[key].toString().toLowerCase().includes(query.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });

        const returnRefundsLength = latestReturnRefunds.length;

        const returnRefunds = applyPagination(latestReturnRefunds, page, rowsPerPage);

        return { returnRefunds, returnRefundsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { returnRefunds: [], returnRefundsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, returnRefundsInfo, dataReady, query]);
};

const ReturnRefunds = () => {
  const { data: returnRefundsData } = useGetReturnRefundsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { returnRefunds, returnRefundsLength } = useReturnRefunds(
    page,
    rowsPerPage,
    returnRefundsData?.slice().sort((a, b) => b.id - a.id),
    searchQuery
  );

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
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
                <Typography variant='h4'>Return / Refunds</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/return-refunds/add'
                startIcon={
                  <SvgIcon fontSize='small'>
                    <PlusIcon />
                  </SvgIcon>
                }
                variant='contained'
                sx={{
                  backgroundColor: Colors.primaryColor,
                }}
              >
                Add New Return / Refund
              </Button>
            </Stack>
            <ReturnRefundsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <ReturnRefundsTable
              count={returnRefundsLength ?? 0}
              items={returnRefunds}
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

export default ReturnRefunds;
