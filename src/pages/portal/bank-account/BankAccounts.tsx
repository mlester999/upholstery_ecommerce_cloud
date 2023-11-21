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
import BankAccountsTable from "../../../components/bank-accounts/BankAccountsTable";
import BankAccountsSearch from "../../../components/bank-accounts/BankAccountsSearch";
import { applyPagination } from "../../../utils/applyPagination";
import PortalLayout from "../../../layouts/PortalLayout";
import Colors from "../../../constants/Colors";
import { Link } from "react-router-dom";
import { useGetBankAccountsQuery } from "../../../services/crud-bank-account";

const useBankAccounts = (page, rowsPerPage, bankAccountsInfo, query) => {
  const dataReady = bankAccountsInfo && bankAccountsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === "") {
        const bankAccounts = applyPagination(
          bankAccountsInfo,
          page,
          rowsPerPage
        );

        const bankAccountsLength = bankAccountsInfo.length;

        return { bankAccounts, bankAccountsLength };
      } else {
        const latestBankAccounts = bankAccountsInfo.filter((item) => {
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

        const bankAccountsLength = latestBankAccounts.length;

        const bankAccounts = applyPagination(
          latestBankAccounts,
          page,
          rowsPerPage
        );

        return { bankAccounts, bankAccountsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { bankAccounts: [], bankAccountsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, bankAccountsInfo, dataReady, query]);
};

const BankAccounts = () => {
  const { data: bankAccountsData } = useGetBankAccountsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { bankAccounts, bankAccountsLength } = useBankAccounts(
    page,
    rowsPerPage,
    bankAccountsData?.slice().sort((a, b) => b.id - a.id),
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
                <Typography variant="h4">Bank Accounts</Typography>
              </Stack>

              <Button
                component={Link}
                to="/portal/bank-accounts/add"
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
                Add New Bank Account
              </Button>
            </Stack>
            <BankAccountsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <BankAccountsTable
              count={bankAccountsLength ?? 0}
              items={bankAccounts}
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

export default BankAccounts;
