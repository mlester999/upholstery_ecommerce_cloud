import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Scrollbar from '../ScrollBar';
import { STATUS } from '../../constants/Enums';
import SeverityPill from '../SeverityPill';

const DeliveriesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((delivery) => {
                const isSelected = selected.includes(delivery.id);
                const createdAt = format(delivery.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={delivery.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {delivery.order_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{delivery.customer}</TableCell>
                    <TableCell>{delivery.product}</TableCell>
                    <TableCell>₱{delivery.price}</TableCell>
                    <TableCell>{delivery.seller}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill color={STATUS[delivery.status]}>
                        {delivery.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component='div'
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DeliveriesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default DeliveriesTable;
