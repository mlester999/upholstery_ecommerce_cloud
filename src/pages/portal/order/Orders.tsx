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

const useOrders = (page, rowsPerPage, ordersInfo, query) => {
  const dataReady = ordersInfo && ordersInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const orders = applyPagination(ordersInfo, page, rowsPerPage);

        const ordersLength = ordersInfo.length;

        return { orders, ordersLength };
      } else {
        const latestOrders = ordersInfo.filter((item) => {
          // Convert the item properties to lowercase strings and check if any of them contains the query
          for (const key in item) {
            if (typeof item[key] === 'object') {
              for (const objectKey in item[key]) {
                if (
                  item[key][objectKey] &&
                  item[key][objectKey]
                    .toString()
                    .toLowerCase()
                    .includes(query.toLowerCase())
                ) {
                  return true;
                }
              }
            } else {
              if (
                item[key] &&
                item[key].toString().toLowerCase().includes(query.toLowerCase())
              ) {
                return true;
              }
            }
          }
          return false;
        });

        const ordersLength = latestOrders.length;

        const orders = applyPagination(latestOrders, page, rowsPerPage);

        return { orders, ordersLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { orders: [], ordersLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, ordersInfo, dataReady, query]);
};

const Orders = () => {
  const { data: ordersData } = useGetOrdersQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { orders, ordersLength } = useOrders(
    page,
    rowsPerPage,
    ordersData,
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
              count={ordersLength}
              items={orders}
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
