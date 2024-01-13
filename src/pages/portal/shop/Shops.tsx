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
import ShopsTable from '../../../components/shops/ShopsTable';
import ShopsSearch from '../../../components/shops/ShopsSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetShopsQuery } from '../../../services/crud-shop';

const useShops = (page, rowsPerPage, shopsInfo, query) => {
  const dataReady = shopsInfo && shopsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const shops = applyPagination(shopsInfo, page, rowsPerPage);

        const shopsLength = shopsInfo.length;

        return { shops, shopsLength };
      } else {
        const latestShops = shopsInfo.filter((item) => {
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

        const shopsLength = latestShops.length;

        const shops = applyPagination(latestShops, page, rowsPerPage);

        return { shops, shopsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { shops: [], shopsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, shopsInfo, dataReady, query]);
};

const Shops = () => {
  const { data: shopsData } = useGetShopsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { shops, shopsLength } = useShops(
    page,
    rowsPerPage,
    shopsData?.slice().sort((a, b) => b.id - a.id),
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
                <Typography variant='h4'>Shops</Typography>
              </Stack>

{/*               <Button
                component={Link}
                to='/portal/shops/add'
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
                Add New Shop
              </Button> */}
            </Stack>
            <ShopsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <ShopsTable
              count={shopsLength ?? 0}
              items={shops}
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

export default Shops;
