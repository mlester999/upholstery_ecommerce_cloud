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
import CategoriesTable from '../../../components/categories/CategoriesTable';
import CategoriesSearch from '../../../components/categories/CategoriesSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../services/crud-category';

const useCategories = (page, rowsPerPage, categoriesInfo, query) => {
  const dataReady = categoriesInfo && categoriesInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const categories = applyPagination(categoriesInfo, page, rowsPerPage);

        const categoriesLength = categoriesInfo.length;

        return { categories, categoriesLength };
      } else {
        const latestCategories = categoriesInfo.filter((item) => {
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

        const categoriesLength = latestCategories.length;

        const categories = applyPagination(latestCategories, page, rowsPerPage);

        return { categories, categoriesLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { categories: [], categoriesLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, categoriesInfo, dataReady, query]);
};

const Categories = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { categories, categoriesLength } = useCategories(
    page,
    rowsPerPage,
    categoriesData,
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
                <Typography variant='h4'>Categories</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/categories/add'
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
                Add New Category
              </Button>
            </Stack>
            <CategoriesSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <CategoriesTable
              count={categoriesLength}
              items={categories}
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

export default Categories;
