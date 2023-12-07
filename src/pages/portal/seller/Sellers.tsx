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

const useSellers = (page, rowsPerPage, sellersInfo, query) => {
  const dataReady = sellersInfo && sellersInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const sellers = applyPagination(sellersInfo, page, rowsPerPage);

        const sellersLength = sellersInfo.length;

        return { sellers, sellersLength };
      } else {
        const latestSellers = sellersInfo.filter((item) => {
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

        const sellersLength = latestSellers.length;

        const sellers = applyPagination(latestSellers, page, rowsPerPage);

        return { sellers, sellersLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { sellers: [], sellersLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, sellersInfo, dataReady, query]);
};

const Sellers = () => {
  const { data: sellersData } = useGetSellersQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { sellers, sellersLength } = useSellers(
    page,
    rowsPerPage,
    sellersData?.slice().sort((a, b) => b.id - a.id),
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
                <Typography variant='h4'>Sellers</Typography>
              </Stack>

{/*               <Button
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
              </Button> */}
            </Stack>
            <SellersSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <SellersTable
              count={sellersLength ?? 0}
              items={sellers}
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
