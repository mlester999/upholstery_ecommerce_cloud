import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import Scrollbar from '../ScrollBar';
import SeverityPill from '../SeverityPill';
import { DELIVERY_STATUS } from '../../constants/Enums';
import { Link, useNavigate } from 'react-router-dom';

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const navigate = useNavigate();

  function limitString(str, maxLength) {
    if (str.length <= maxLength) {
      return str; // If the string is already shorter than the limit, return it as is
    }
    return str.substring(0, maxLength) + '...'; // Truncate and add "..."
  }

  return (
    <Card sx={sx}>
      <CardHeader title='Latest Orders' />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell sortDirection='desc'>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                ?.sort((a, b) => b.id - a.id)
                .slice(0, 6)
                .map((order) => {
                  const createdAt = format(
                    new Date(order.created_at),
                    'MM/dd/yyyy'
                  );

                  return (
                    <TableRow
                      onClick={() =>
                        navigate(`/portal/orders/view/${order.id}`)
                      }
                      hover
                      sx={{ cursor: 'pointer' }}
                      key={order.id}
                    >
                      <TableCell>{order.order_id}</TableCell>
                      <TableCell>
                        {limitString(order.product.name, 30)}
                      </TableCell>
                      <TableCell>{createdAt}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          component={Link}
          to='/portal/orders'
          color='inherit'
          endIcon={
            <SvgIcon fontSize='small'>
              <ArrowRightIcon />
            </SvgIcon>
          }
          size='small'
          variant='text'
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object,
};
