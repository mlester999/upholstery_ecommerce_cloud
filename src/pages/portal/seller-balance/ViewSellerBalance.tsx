import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NotFound from "../../../components/NotFound";
import EditSellerBalanceFields from "../../../components/seller-balances/EditSellerBalanceFields";
import ViewSellerBalanceFields from "../../../components/seller-balances/ViewSellerBalanceFields";
import PortalLayout from "../../../layouts/PortalLayout";
import { useGetSellerBalanceQuery } from "../../../services/crud-seller-balance";

const ViewSellerBalance = () => {
  const { sellerBalanceId } = useParams();
  const {
    data: sellerBalance,
    isLoading,
    isFetching,
    isError,
  } = useGetSellerBalanceQuery(sellerBalanceId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!sellerBalance || isError) {
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
              <Typography variant="h4">Seller Balance Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewSellerBalanceFields sellerBalance={sellerBalance} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditSellerBalanceFields sellerBalance={sellerBalance} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewSellerBalance;
