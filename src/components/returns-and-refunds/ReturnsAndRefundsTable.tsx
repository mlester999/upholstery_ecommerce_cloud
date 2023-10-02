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
import { RETURN_REFUND_STATUS } from '../../constants/Enums';
import SeverityPill from '../SeverityPill';

const ReturnsAndRefundsTable = (props) => {
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
                <TableCell>Customer Name</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((returnRefund) => {
                const isSelected = selected.includes(returnRefund.id);
                const createdAt = format(returnRefund.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={returnRefund.id} selected={isSelected}>
                    <TableCell>{returnRefund.customer}</TableCell>
                    <TableCell>{returnRefund.product}</TableCell>
                    <TableCell>{returnRefund.comments}</TableCell>
                    <TableCell>{returnRefund.seller}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={RETURN_REFUND_STATUS[returnRefund.status]}
                      >
                        {returnRefund.status}
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

ReturnsAndRefundsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default ReturnsAndRefundsTable;
