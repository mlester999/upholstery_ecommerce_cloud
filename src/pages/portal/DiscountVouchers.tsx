import { useCallback, useMemo, useState } from 'react';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  SvgIcon,
} from '@mui/material';
import DiscountVouchersTable from '../../components/discount-vouchers/DiscountVouchersTable';
import DiscountVouchersSearch from '../../components/discount-vouchers/DiscountVouchersSearch';
import { applyPagination } from '../../utils/applyPagination';
import PortalLayout from '../../layouts/PortalLayout';
import { discountVouchersData } from '../../utils/mockedDiscountVouchersData';
import Colors from '../../constants/Colors';

const useDiscountVouchers = (page, rowsPerPage) => {
  return useMemo(() => {
    return applyPagination(discountVouchersData, page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const DiscountVouchers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const discountVouchers = useDiscountVouchers(page, rowsPerPage);

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
                <Typography variant='h4'>Discount Vouchers</Typography>
              </Stack>

              <Button
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
                Add New Discount Voucher
              </Button>
            </Stack>
            <DiscountVouchersSearch />
            <DiscountVouchersTable
              count={discountVouchersData.length}
              items={discountVouchers}
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

export default DiscountVouchers;
