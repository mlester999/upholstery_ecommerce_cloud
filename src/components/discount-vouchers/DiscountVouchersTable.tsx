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

const DiscountVouchersTable = (props) => {
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
                <TableCell>Voucher ID</TableCell>
                <TableCell>Voucher Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price Discount</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Shipping Discount</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((discountVoucher) => {
                const isSelected = selected.includes(discountVoucher.id);
                const createdAt = format(
                  discountVoucher.createdAt,
                  'dd/MM/yyyy'
                );

                return (
                  <TableRow
                    hover
                    key={discountVoucher.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {discountVoucher.voucher_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{discountVoucher.name}</TableCell>
                    <TableCell>{discountVoucher.description}</TableCell>
                    <TableCell>{discountVoucher.price_discount}</TableCell>
                    <TableCell>{discountVoucher.price_discount_mode}</TableCell>
                    <TableCell>{discountVoucher.shipping_discount}</TableCell>
                    <TableCell>
                      {discountVoucher.shipping_discount_mode}
                    </TableCell>
                    <TableCell>{createdAt}</TableCell>
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

DiscountVouchersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default DiscountVouchersTable;
