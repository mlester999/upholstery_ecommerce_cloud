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
import ActivityLogsTable from '../../../components/activity-logs/ActivityLogsTable';
import ActivityLogsSearch from '../../../components/activity-logs/ActivityLogsSearch';
import { applyPagination } from '../../../utils/applyPagination';
import PortalLayout from '../../../layouts/PortalLayout';
import Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';
import { useGetActivityLogsQuery } from '../../../services/crud-activity-log';

const useActivityLogs = (page, rowsPerPage, activityLogsInfo, query) => {
  const dataReady = activityLogsInfo && activityLogsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === '') {
        const activityLogs = applyPagination(activityLogsInfo, page, rowsPerPage);

        const activityLogsLength = activityLogsInfo.length;

        return { activityLogs, activityLogsLength };
      } else {
        const latestActivityLogs = activityLogsInfo.filter((item) => {
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

        const activityLogsLength = latestActivityLogs.length;

        const activityLogs = applyPagination(latestActivityLogs, page, rowsPerPage);

        return { activityLogs, activityLogsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { activityLogs: [], activityLogsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, activityLogsInfo, dataReady, query]);
};

const ActivityLogs = () => {
  const { data: activityLogsData } = useGetActivityLogsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const { activityLogs, activityLogsLength } = useActivityLogs(
    page,
    rowsPerPage,
    activityLogsData?.slice().sort((a, b) => b.id - a.id),
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
                <Typography variant='h4'>Activity Logs</Typography>
              </Stack>
            </Stack>
            <ActivityLogsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <ActivityLogsTable
              count={activityLogsLength ?? 0}
              items={activityLogs}
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

export default ActivityLogs;
