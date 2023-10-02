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

const TransactionsTable = (props) => {
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
                <TableCell>Seller Name</TableCell>
                <TableCell>Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((transaction) => {
                const isSelected = selected.includes(transaction.id);
                const createdAt = format(transaction.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={transaction.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {transaction.transaction_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>{transaction.product}</TableCell>
                    <TableCell>{transaction.seller}</TableCell>
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

TransactionsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default TransactionsTable;
