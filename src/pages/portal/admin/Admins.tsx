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
import AdminsTable from '../../../components/admins/AdminsTable';
import AdminsSearch from '../../../components/admins/AdminsSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetAdminsQuery } from '../../../services/crud-admin';

const useAdmins = (page, rowsPerPage, adminsInfo, query) => {
  const dataReady = adminsInfo && adminsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const admins = applyPagination(adminsInfo, page, rowsPerPage);

        const adminsLength = adminsInfo.length;

        return { admins, adminsLength };
      } else {
        const latestAdmins = adminsInfo.filter((item) => {
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

        const adminsLength = latestAdmins.length;

        const admins = applyPagination(latestAdmins, page, rowsPerPage);

        return { admins, adminsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { admins: [], adminsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, adminsInfo, dataReady, query]);
};

const Admins = () => {
  const { data: adminsData } = useGetAdminsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { admins, adminsLength } = useAdmins(
    page,
    rowsPerPage,
    adminsData,
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
                <Typography variant='h4'>Admins</Typography>
              </Stack>

              <Button
                component={Link}
                to='/portal/admins/add'
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
                Add New Admin
              </Button>
            </Stack>
            <AdminsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <AdminsTable
              count={adminsLength ?? 0}
              items={admins}
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

export default Admins;
