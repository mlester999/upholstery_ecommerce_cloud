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

const ProductsTable = (props) => {
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
                <TableCell>Product Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Seller Name</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product) => {
                const isSelected = selected.includes(product.id);
                const createdAt = format(product.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={product.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {product.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>₱{product.price}</TableCell>
                    <TableCell>{product.seller}</TableCell>
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

ProductsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default ProductsTable;
