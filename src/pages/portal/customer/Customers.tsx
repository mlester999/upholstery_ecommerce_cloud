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
import CustomersTable from '../../../components/customers/CustomersTable';
import CustomersSearch from '../../../components/customers/CustomersSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetCustomersQuery } from '../../../services/crud-customer';

const useCustomers = (page, rowsPerPage, customersInfo, query) => {
  const dataReady = customersInfo && customersInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const customers = applyPagination(customersInfo, page, rowsPerPage);

        const customersLength = customersInfo.length;

        return { customers, customersLength };
      } else {
        const latestCustomers = customersInfo.filter((item) => {
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

        const customersLength = latestCustomers.length;

        const customers = applyPagination(latestCustomers, page, rowsPerPage);

        return { customers, customersLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { customers: [], customersLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, customersInfo, dataReady, query]);
};

const Customers = () => {
  const { data: customersData } = useGetCustomersQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { customers, customersLength } = useCustomers(
    page,
    rowsPerPage,
    customersData?.slice().sort((a, b) => b.id - a.id),
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
                <Typography variant='h4'>Customers</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/customers/add'
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
                Add New Customer
              </Button>
            </Stack>
            <CustomersSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <CustomersTable
              count={customersLength ?? 0}
              items={customers}
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

export default Customers;
