import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NotFound from "../../../components/NotFound";
import EditSellerWithdrawalFields from "../../../components/seller-withdrawals/EditSellerWithdrawalFields";
import ViewSellerWithdrawalFields from "../../../components/seller-withdrawals/ViewSellerWithdrawalFields";
import PortalLayout from "../../../layouts/PortalLayout";
import { useGetSellerWithdrawalQuery } from "../../../services/crud-seller-withdrawal";

const ViewSellerWithdrawal = () => {
  const { sellerWithdrawalId } = useParams();
  const {
    data: sellerWithdrawal,
    isLoading,
    isFetching,
    isError,
  } = useGetSellerWithdrawalQuery(sellerWithdrawalId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!sellerWithdrawal || isError) {
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
              <Typography variant="h4">Seller Withdrawal Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewSellerWithdrawalFields
                    sellerWithdrawal={sellerWithdrawal}
                  />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditSellerWithdrawalFields
                    sellerWithdrawal={sellerWithdrawal}
                  />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewSellerWithdrawal;
