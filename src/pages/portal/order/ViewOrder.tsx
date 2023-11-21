import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../../components/NotFound';
import EditOrderFields from '../../../components/orders/EditOrderFields';
import ViewOrderFields from '../../../components/orders/ViewOrderFields';
import PortalLayout from '../../../layouts/PortalLayout';
import { useGetOrderQuery } from '../../../services/crud-order';

const ViewOrder = () => {
  const { orderId } = useParams();
  const {
    data: order,
    isLoading,
    isFetching,
    isError,
  } = useGetOrderQuery(orderId);

  const [customer, setCustomer] = useState('');
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [settingState, setSettingState] = useState(true);

  useEffect(() => {
    if (order) {
      const parseProducts = JSON.parse(order.products);

      setCustomer(order.customer.id);

      const getShopsId = parseProducts.map((el) => {
        return el.shop.id;
      });

      setShops(getShopsId);

      const getProductsId = parseProducts.map((el) => {
        return el.id;
      });

      setProducts(getProductsId);

      const getStatus = parseProducts.map((el) => {
        return el.status;
      });

      setStatus(getStatus);

      const getQuantity = parseProducts.map((el) => {
        return el.quantity;
      });

      setQuantity(getQuantity);
    }

    setSettingState(false);
  }, [order]);

  if (isLoading || isFetching || settingState) {
    return <div></div>;
  }

  if (!order || isError) {
    return <NotFound />;
  }

  return (
    <PortalLayout>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='lg'>
          <Stack spacing={3}>
            <div>
              <Typography variant='h4'>Order Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewOrderFields order={order} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditOrderFields
                    orderId={order.id}
                    orderCustomer={customer}
                    orderShops={shops}
                    orderProducts={products}
                    orderStatus={status}
                    orderQuantity={quantity}
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

export default ViewOrder;
