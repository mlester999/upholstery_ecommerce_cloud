import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NotFound from "../../../components/NotFound";
import EditBankAccountFields from "../../../components/bank-accounts/EditBankAccountFields";
import ViewBankAccountFields from "../../../components/bank-accounts/ViewBankAccountFields";
import PortalLayout from "../../../layouts/PortalLayout";
import { useGetBankAccountQuery } from "../../../services/crud-bank-account";

const ViewBankAccount = () => {
  const { bankAccountId } = useParams();
  const {
    data: bankAccount,
    isLoading,
    isFetching,
    isError,
  } = useGetBankAccountQuery(bankAccountId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!bankAccount || isError) {
    return <NotFound />;
  }

  return (
    <PortalLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Bank Account Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewBankAccountFields bankAccount={bankAccount} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditBankAccountFields bankAccount={bankAccount} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewBankAccount;
