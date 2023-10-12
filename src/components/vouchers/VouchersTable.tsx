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

const VouchersTable = (props) => {
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
                  Voucher Code
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Title
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
                  Amount
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Mode
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Type
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Voucher Status
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
                    colspan='8'
                    sx={{
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant='subtitle2'>
                      No Vouchers Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((voucher) => {
                const isSelected = selected.includes(voucher.id);

                const createdDate = new Date(voucher.created_at);
                const createdAt = format(createdDate, 'yyyy-MM-dd');

                return (
                  <TableRow
                    onClick={() =>
                      navigate(`/portal/discount-vouchers/view/${voucher.id}`)
                    }
                    hover
                    sx={{ cursor: 'pointer' }}
                    key={voucher.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack alignItems='center' direction='row' spacing={2}>
                        <Typography variant='subtitle2'>
                          {voucher.voucher_code}
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
                          {voucher.title}
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
                          {voucher.description}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {voucher.amount}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {voucher.mode}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {voucher.type}
                    </TableCell>

                    <TableCell>
                      <SeverityPill color={ACTIVE_STATUS[voucher.is_active]}>
                        {voucher.is_active ? 'Activated' : 'Deactivated'}
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

VouchersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default VouchersTable;
