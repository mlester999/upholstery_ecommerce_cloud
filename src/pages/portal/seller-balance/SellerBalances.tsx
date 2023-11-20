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
import SellerBalancesTable from "../../../components/seller-balances/SellerBalancesTable";
import SellerBalancesSearch from "../../../components/seller-balances/SellerBalancesSearch";
import { applyPagination } from "../../../utils/applyPagination";
import PortalLayout from "../../../layouts/PortalLayout";
import Colors from "../../../constants/Colors";
import { Link } from "react-router-dom";
import { useGetSellerBalancesQuery } from "../../../services/crud-seller-balance";

const useSellerBalances = (page, rowsPerPage, sellerBalancesInfo, query) => {
  const dataReady = sellerBalancesInfo && sellerBalancesInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === "") {
        const sellerBalances = applyPagination(
          sellerBalancesInfo,
          page,
          rowsPerPage
        );

        const sellerBalancesLength = sellerBalancesInfo.length;

        return { sellerBalances, sellerBalancesLength };
      } else {
        const latestSellerBalances = sellerBalancesInfo.filter((item) => {
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

        const sellerBalancesLength = latestSellerBalances.length;

        const sellerBalances = applyPagination(
          latestSellerBalances,
          page,
          rowsPerPage
        );

        return { sellerBalances, sellerBalancesLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { sellerBalances: [], sellerBalancesLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, sellerBalancesInfo, dataReady, query]);
};

const SellerBalances = () => {
  const { data: sellerBalancesData } = useGetSellerBalancesQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { sellerBalances, sellerBalancesLength } = useSellerBalances(
    page,
    rowsPerPage,
    sellerBalancesData?.slice().sort((a, b) => b.id - a.id),
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
                <Typography variant="h4">Seller Balances</Typography>
              </Stack>

              {/* <Button
                component={Link}
                to="/portal/discount-sellerBalances/add"
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
                Add New Seller Balance
              </Button> */}
            </Stack>
            <SellerBalancesSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <SellerBalancesTable
              count={sellerBalancesLength ?? 0}
              items={sellerBalances}
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

export default SellerBalances;
