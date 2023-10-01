import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import PortalLayout from '../../layouts/PortalLayout';
import OverviewTotalSellers from '../../components/overview/OverviewTotalSellers';
import { OverviewLatestOrders } from '../../components/overview/OverviewLatestOrders';
import { OverviewLatestProducts } from '../../components/overview/OverviewLatestProducts';
import OverviewTotalProducts from '../../components/overview/OverviewTotalProducts';
import OverviewTotalCustomers from '../../components/overview/OverviewTotalCustomers';
import OverviewTotalDeliveries from '../../components/overview/OverviewTotalDeliveries';
import OverviewTotalDiscountVouchers from '../../components/overview/OverviewTotalDiscountVouchers';
import OverviewTotalTransactions from '../../components/overview/OverviewTotalTransactions';
import OverviewTotalReviews from '../../components/overview/OverviewTotalReviews';
import OverviewTotalLogs from '../../components/overview/OverviewTotalLogs';

const now = new Date();

const Main = () => {
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
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalSellers sx={{ height: '100%' }} value={58} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers sx={{ height: '100%' }} value={492} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProducts sx={{ height: '100%' }} value={214} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalDeliveries sx={{ height: '100%' }} value={53} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalDiscountVouchers
                sx={{ height: '100%' }}
                value={8}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalTransactions sx={{ height: '100%' }} value={85} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalReviews sx={{ height: '100%' }} value={13} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalLogs sx={{ height: '100%' }} value={111} />
            </Grid>

            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts
                products={[
                  {
                    id: '5ece2c077e39da27658aa8a9',
                    image: '../../assets/logo.jpg',
                    name: 'Healthcare Erbology',
                    updatedAt: subHours(now, 6).getTime(),
                  },
                  {
                    id: '5ece2c0d16f70bff2cf86cd8',
                    image: '../../assets/logo.jpg',
                    name: 'Makeup Lancome Rouge',
                    updatedAt: subDays(subHours(now, 8), 2).getTime(),
                  },
                  {
                    id: 'b393ce1b09c1254c3a92c827',
                    image: '../../assets/logo.jpg',
                    name: 'Skincare Soja CO',
                    updatedAt: subDays(subHours(now, 1), 1).getTime(),
                  },
                  {
                    id: 'a6ede15670da63f49f752c89',
                    image: '../../assets/logo.jpg',
                    name: 'Makeup Lipstick',
                    updatedAt: subDays(subHours(now, 3), 3).getTime(),
                  },
                  {
                    id: 'bcad5524fe3a2f8f8620ceda',
                    image: '../../assets/logo.jpg',
                    name: 'Healthcare Ritual',
                    updatedAt: subDays(subHours(now, 5), 6).getTime(),
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova',
                    },
                    createdAt: 1555016400000,
                    status: 'processing',
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu',
                    },
                    createdAt: 1555016400000,
                    status: 'delivered',
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson',
                    },
                    createdAt: 1554930000000,
                    status: 'shipped',
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer',
                    },
                    createdAt: 1554757200000,
                    status: 'delivered',
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert',
                    },
                    createdAt: 1554670800000,
                    status: 'delivered',
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov',
                    },
                    createdAt: 1554670800000,
                    status: 'processing',
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default Main;
