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

const useCustomers = (page, rowsPerPage, customersData) => {
  return useMemo(() => {
    return applyPagination(customersData, page, rowsPerPage);
  }, [page, rowsPerPage, customersData]);
};

const Customers = () => {
  const { data: customersData } = useGetCustomersQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const customers = useCustomers(page, rowsPerPage, customersData);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filterCustomers = (data, query) => {
    return data.filter((item) => {
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
  };

  const filteredCustomers = useMemo(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, return all customers
      return customers?.sort((a, b) => b.id - a.id);
    } else {
      // Filter customers based on the search query
      return filterCustomers(customers, searchQuery);
    }
  }, [customers, searchQuery]);

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
              count={filteredCustomers?.length}
              items={filteredCustomers}
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
