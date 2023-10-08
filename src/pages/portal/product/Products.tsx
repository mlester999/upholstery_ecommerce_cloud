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
import ProductsTable from '../../../components/products/ProductsTable';
import ProductsSearch from '../../../components/products/ProductsSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../../services/crud-product';

const useProducts = (page, rowsPerPage, productsData) => {
  return useMemo(() => {
    return applyPagination(productsData, page, rowsPerPage);
  }, [page, rowsPerPage, productsData]);
};

const Products = () => {
  const { data: productsData } = useGetProductsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const products = useProducts(page, rowsPerPage, productsData);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filterProducts = (data, query) => {
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

  const filteredProducts = useMemo(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, return all customers
      return products?.sort((a, b) => b.id - a.id);
    } else {
      // Filter customers based on the search query
      return filterProducts(products, searchQuery);
    }
  }, [products, searchQuery]);

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
                <Typography variant='h4'>Products</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/products/add'
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
                Add New Product
              </Button>
            </Stack>
            <ProductsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <ProductsTable
              count={filteredProducts?.length}
              items={filteredProducts}
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

export default Products;
