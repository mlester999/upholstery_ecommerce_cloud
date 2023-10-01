import { useCallback, useMemo, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import ProductsTable from '../../components/products/ProductsTable';
import ProductsSearch from '../../components/products/ProductsSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { productsData } from '../../utils/mockedProductsData';

const useProducts = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(productsData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const products = useProducts(page, rowsPerPage);

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
                <Typography variant='h4'>Products</Typography>
              </Stack>
            </Stack>
            <ProductsSearch />
            <ProductsTable
              count={productsData.length}
              items={products}
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
