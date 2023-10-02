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

const ReviewsTable = (props) => {
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
                <TableCell>Review ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Ratings</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((review) => {
                const isSelected = selected.includes(review.id);
                const createdAt = format(review.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={review.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {review.review_id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{review.customer}</TableCell>
                    <TableCell>{review.comments}</TableCell>
                    <TableCell>{review.product}</TableCell>
                    <TableCell>{review.ratings}</TableCell>
                    <TableCell>{review.seller}</TableCell>
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

ReviewsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default ReviewsTable;
