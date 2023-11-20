import { useCallback, useEffect, useMemo, useState } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import SellerWithdrawalsTable from "../../../components/seller-withdrawals/SellerWithdrawalsTable";
import SellerWithdrawalsSearch from "../../../components/seller-withdrawals/SellerWithdrawalsSearch";
import { applyPagination } from "../../../utils/applyPagination";
import PortalLayout from "../../../layouts/PortalLayout";
import Colors from "../../../constants/Colors";
import { Link } from "react-router-dom";
import { useGetSellerWithdrawalsQuery } from "../../../services/crud-seller-withdrawal";

const useSellerWithdrawals = (
  page,
  rowsPerPage,
  sellerWithdrawalsInfo,
  query
) => {
  const dataReady = sellerWithdrawalsInfo && sellerWithdrawalsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === "") {
        const sellerWithdrawals = applyPagination(
          sellerWithdrawalsInfo,
          page,
          rowsPerPage
        );

        const sellerWithdrawalsLength = sellerWithdrawalsInfo.length;

        return { sellerWithdrawals, sellerWithdrawalsLength };
      } else {
        const latestSellerWithdrawals = sellerWithdrawalsInfo.filter((item) => {
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

        const sellerWithdrawalsLength = latestSellerWithdrawals.length;

        const sellerWithdrawals = applyPagination(
          latestSellerWithdrawals,
          page,
          rowsPerPage
        );

        return { sellerWithdrawals, sellerWithdrawalsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { sellerWithdrawals: [], sellerWithdrawalsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, sellerWithdrawalsInfo, dataReady, query]);
};

const SellerWithdrawals = () => {
  const { data: sellerWithdrawalsData } = useGetSellerWithdrawalsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { sellerWithdrawals, sellerWithdrawalsLength } = useSellerWithdrawals(
    page,
    rowsPerPage,
    sellerWithdrawalsData?.slice().sort((a, b) => b.id - a.id),
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
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Seller Withdrawals</Typography>
              </Stack>

              {/* <Button
                component={Link}
                to="/portal/discount-sellerWithdrawals/add"
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  backgroundColor: Colors.primaryColor,
                }}
              >
                Add New Seller Withdrawal
              </Button> */}
            </Stack>
            <SellerWithdrawalsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <SellerWithdrawalsTable
              count={sellerWithdrawalsLength ?? 0}
              items={sellerWithdrawals}
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

export default SellerWithdrawals;
