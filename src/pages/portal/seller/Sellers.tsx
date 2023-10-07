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
import SellersTable from '../../../components/sellers/SellersTable';
import SellersSearch from '../../../components/sellers/SellersSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetSellersQuery } from '../../../services/crud-seller';

const useSellers = (page, rowsPerPage, customersData) => {
  return useMemo(() => {
    return applyPagination(customersData, page, rowsPerPage);
  }, [page, rowsPerPage, customersData]);
};

const Sellers = () => {
  const { data: sellersData } = useGetSellersQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const sellers = useSellers(page, rowsPerPage, sellersData);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filterSellers = (data, query) => {
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

  const filteredSellers = useMemo(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, return all customers
      return sellers?.sort((a, b) => b.id - a.id);
    } else {
      // Filter customers based on the search query
      return filterSellers(sellers, searchQuery);
    }
  }, [sellers, searchQuery]);

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
                <Typography variant='h4'>Sellers</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/sellers/add'
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
                Add New Seller
              </Button>
            </Stack>
            <SellersSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <SellersTable
              count={filteredSellers?.length}
              items={filteredSellers}
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

export default Sellers;
