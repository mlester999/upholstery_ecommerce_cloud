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

const useCategories = (page, rowsPerPage, categoriesData) => {
  return useMemo(() => {
    return applyPagination(categoriesData, page, rowsPerPage);
  }, [page, rowsPerPage, categoriesData]);
};

const Categories = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const categories = useCategories(page, rowsPerPage, categoriesData);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filterCategories = (data, query) => {
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

  const filteredCategories = useMemo(() => {
    if (searchQuery.trim() === '') {
      // If the search query is empty, return all customers
      return categories?.sort((a, b) => b.id - a.id);
    } else {
      // Filter customers based on the search query
      return filterCategories(categories, searchQuery);
    }
  }, [categories, searchQuery]);

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
              count={filteredCategories?.length}
              items={filteredCategories}
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
