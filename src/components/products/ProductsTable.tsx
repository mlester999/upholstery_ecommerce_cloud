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
import { ACTIVE_STATUS } from '../../constants/Enums';
import SeverityPill from '../SeverityPill';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  function limitString(str, maxLength) {
    if (str.length <= maxLength) {
      return str; // If the string is already shorter than the limit, return it as is
    }
    return str.substring(0, maxLength) + '...'; // Truncate and add "..."
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Product Image
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Shop's Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Product Status
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 && (
                <TableRow>
                  <TableCell
                    colspan='12'
                    sx={{
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle2'>
                      No Products Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((product) => {
                const isSelected = selected.includes(product.id);

                const createdDate = new Date(product.created_at);
                const createdAt = format(createdDate, 'yyyy-MM-dd');

                return (
                  <TableRow
                    onClick={() =>
                      navigate(`/portal/products/view/${product.id}`)
                    }
                    hover
                    sx={{ cursor: 'pointer' }}
                    key={product.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack
                        alignItems='center'
                        justifyContent='center'
                        direction='row'
                        spacing={2}
                      >
                        <Box
                          component='img'
                          src={product?.image_file}
                          sx={{
                            borderRadius: 1,
                            height: 48,
                            width: 48,
                          }}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {limitString(product.name, 40)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {limitString(product.description, 30)}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          ₱
                          {product.price.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                          })}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {product.quantity ?? 0}{' '}
                          {product.quantity ? 'pcs' : 'pc'}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.category.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.shop.name}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={ACTIVE_STATUS[product.is_active]}>
                        {product.is_active ? 'Activated' : 'Deactivated'}
                      </SeverityPill>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {createdAt}
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

ProductsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default ProductsTable;
