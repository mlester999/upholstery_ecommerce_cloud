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
import OrdersTable from '../../../components/orders/OrdersTable';
import OrdersSearch from '../../../components/orders/OrdersSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../../services/crud-order';

const useOrders = (page, rowsPerPage, ordersData) => {
  return useMemo(() => {
    return applyPagination(ordersData, page, rowsPerPage);
  }, [page, rowsPerPage, ordersData]);
};

const Orders = () => {
  const { data: ordersData } = useGetOrdersQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const orders = useOrders(page, rowsPerPage, ordersData);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filterOrders = (data, query) => {
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

  const filteredOrders = useMemo(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, return all customers
      return orders?.sort((a, b) => b.id - a.id);
    } else {
      // Filter customers based on the search query
      return filterOrders(orders, searchQuery);
    }
  }, [orders, searchQuery]);

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
                <Typography variant='h4'>Orders</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/orders/add'
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
                Add New Order
              </Button>
            </Stack>
            <OrdersSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <OrdersTable
              count={filteredOrders?.length}
              items={filteredOrders}
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

export default Orders;
