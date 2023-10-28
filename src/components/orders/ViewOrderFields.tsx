import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useActivateOrderMutation,
  useDeactivateOrderMutation,
} from '../../services/crud-order';
import SeverityPill from '../SeverityPill';
import { DELIVERY_STATUS } from '../../constants/Enums';

const ViewOrderFields = (props) => {
  const { order } = props;
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [activateOrder, { isLoading: activateLoading }] =
    useActivateOrderMutation();
  const [deactivateOrder, { isLoading: deactivateLoading }] =
    useDeactivateOrderMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the order that you are viewing.'
        title='Order Information'
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Order ID:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {order?.order_id}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Customer's Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {order?.customer?.first_name} {order?.customer?.last_name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Product's Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {order?.product?.name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Price:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            ₱
            {order?.product?.price.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Quantity:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {order?.quantity ?? 0} {order.quantity ? 'pcs' : 'pc'}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Shop's Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {order?.shop?.name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '10px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Delivery Status:
          </Typography>

          {order.status === 'Processing' && (
            <SeverityPill color={DELIVERY_STATUS.processing}>
              {order.status}
            </SeverityPill>
          )}

          {order.status === 'Packed' && (
            <SeverityPill color={DELIVERY_STATUS.packed}>
              {order.status}
            </SeverityPill>
          )}

          {order.status === 'Shipped' && (
            <SeverityPill color={DELIVERY_STATUS.shipped}>
              {order.status}
            </SeverityPill>
          )}

          {order.status === 'Out For Delivery' && (
            <SeverityPill color={DELIVERY_STATUS.delivery}>
              {order.status}
            </SeverityPill>
          )}

          {order.status === 'Delivered' && (
            <SeverityPill color={DELIVERY_STATUS.delivered}>
              {order.status}
            </SeverityPill>
          )}
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {order?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateOrder(orderId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/orders');

                  toast.success('Deactivated Order Successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: 'light',
                  });
                })
                .catch((error) => console.log(error))
            }
            loading={deactivateLoading}
            disableElevation
            variant='contained'
            sx={{
              backgroundColor: Colors.deactivateColor,
              '&:hover': { backgroundColor: Colors.deactivateHoverColor },
            }}
          >
            Deactivate
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={() =>
              activateOrder(orderId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/orders');

                  toast.success('Activated Order Successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: 'light',
                  });
                })
                .catch((error) => console.log(error))
            }
            loading={activateLoading}
            disableElevation
            variant='contained'
            sx={{
              backgroundColor: Colors.activateColor,
              '&:hover': { backgroundColor: Colors.activateHoverColor },
            }}
          >
            Activate
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ViewOrderFields;
