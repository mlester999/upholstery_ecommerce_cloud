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

const SellersTable = (props) => {
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
                  First Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Middle Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Last Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Email Address
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Gender
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Birth Date
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Contact Number
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Region
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Province
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  City
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Barangay
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Zip Code
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Street Address
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Account Status
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
                    colSpan='12'
                    sx={{
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle2'>
                      No Sellers Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((seller) => {
                const isSelected = selected.includes(seller.id);

                const createdDate = new Date(seller.created_at);
                const createdAt = format(createdDate, 'yyyy-MM-dd');

                return (
                  <TableRow
                    onClick={() =>
                      navigate(`/portal/sellers/view/${seller.id}`)
                    }
                    hover
                    sx={{ cursor: 'pointer' }}
                    key={seller.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {seller.first_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        {seller.middle_name ? (
                          <Typography variant='subtitle2'>
                            {seller.middle_name}
                          </Typography>
                        ) : (
                          <Typography variant='subtitle3' color='gray'>
                            N/A
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {seller.last_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.user.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.gender}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.birth_date}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.contact_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.region}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.province}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.city}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.barangay}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.zip_code}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {seller.street_address}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={ACTIVE_STATUS[seller.user.is_active]}
                      >
                        {seller.user.is_active ? 'Activated' : 'Deactivated'}
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

SellersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default SellersTable;
