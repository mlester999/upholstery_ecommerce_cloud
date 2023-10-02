import { useCallback, useMemo, useState } from 'react';
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
import { sellersData } from '../../../utils/mockedSellersData';
import { Link } from 'react-router-dom';

const useSellers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(sellersData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const Sellers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const sellers = useSellers(page, rowsPerPage);

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
            <SellersSearch />
            <SellersTable
              count={sellersData.length}
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
