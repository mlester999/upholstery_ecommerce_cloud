import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import PortalLayout from "../../layouts/PortalLayout";
import OverviewTotalSellers from "../../components/overview/OverviewTotalSellers";
import { OverviewLatestOrders } from "../../components/overview/OverviewLatestOrders";
import { OverviewLatestProducts } from "../../components/overview/OverviewLatestProducts";
import OverviewTotalProducts from "../../components/overview/OverviewTotalProducts";
import OverviewTotalCustomers from "../../components/overview/OverviewTotalCustomers";
import OverviewTotalOrders from "../../components/overview/OverviewTotalOrders";
import OverviewTotalDiscountVouchers from "../../components/overview/OverviewTotalDiscountVouchers";
import OverviewTotalReturnsRefunds from "../../components/overview/OverviewTotalReturnsRefunds";
import OverviewTotalReviews from "../../components/overview/OverviewTotalReviews";
import OverviewTotalLogs from "../../components/overview/OverviewTotalLogs";
import { useGetProductsQuery } from "../../services/crud-product";
import { useGetSellersQuery } from "../../services/crud-seller";
import { useGetCustomersQuery } from "../../services/crud-customer";
import { useGetOrdersQuery } from "../../services/crud-order";
import { useGetVouchersQuery } from "../../services/crud-voucher";
import { useGetReturnRefundsQuery } from "../../services/crud-return-refund";
import { useGetActivityLogsQuery } from "../../services/crud-activity-log";
import { useGetReviewsQuery } from "../../services/crud-review";

const now = new Date();

const Main = () => {
  const { data: sellersData } = useGetSellersQuery();
  const { data: customersData } = useGetCustomersQuery();
  const { data: productsData } = useGetProductsQuery();
  const { data: ordersData } = useGetOrdersQuery();
  const { data: vouchersData } = useGetVouchersQuery();
  const { data: returnRefundsData } = useGetReturnRefundsQuery();
  const { data: reviewsData } = useGetReviewsQuery();
  const { data: activityLogsData } = useGetActivityLogsQuery();

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
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalSellers
                sx={{ height: "100%" }}
                value={sellersData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                sx={{ height: "100%" }}
                value={customersData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProducts
                sx={{ height: "100%" }}
                value={productsData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalOrders
                sx={{ height: "100%" }}
                value={ordersData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalDiscountVouchers
                sx={{ height: "100%" }}
                value={vouchersData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalReturnsRefunds
                sx={{ height: "100%" }}
                value={returnRefundsData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalReviews
                sx={{ height: "100%" }}
                value={reviewsData?.length}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalLogs
                sx={{ height: "100%" }}
                value={activityLogsData?.length}
              />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={productsData?.slice()}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={ordersData?.slice()}
                sx={{ height: "100%" }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default Main;
