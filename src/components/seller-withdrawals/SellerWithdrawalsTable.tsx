import PropTypes from "prop-types";
import { format } from "date-fns";
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
} from "@mui/material";
import Scrollbar from "../ScrollBar";
import { ACTIVE_STATUS } from "../../constants/Enums";
import SeverityPill from "../SeverityPill";
import { useNavigate } from "react-router-dom";

const SellerWithdrawalsTable = (props) => {
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Seller Withdrawal ID
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Seller Name
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Amount
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Withdrawal Status
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Active Status
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
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
                    colspan="6"
                    sx={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      No Seller Withdrawals Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((sellerWithdrawal) => {
                const isSelected = selected.includes(sellerWithdrawal.id);

                const createdDate = new Date(sellerWithdrawal.created_at);
                const createdAt = format(createdDate, "yyyy-MM-dd");

                return (
                  <TableRow
                    onClick={() =>
                      navigate(
                        `/portal/seller-withdrawals/view/${sellerWithdrawal.id}`
                      )
                    }
                    hover
                    sx={{ cursor: "pointer" }}
                    key={sellerWithdrawal.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {sellerWithdrawal.seller_withdrawal_id}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {sellerWithdrawal.seller.first_name}{" "}
                          {sellerWithdrawal.seller.last_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₱
                      {sellerWithdrawal.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sellerWithdrawal.status === "Pending Withdrawal" && (
                        <SeverityPill color={"warning"}>
                          {sellerWithdrawal.status}
                        </SeverityPill>
                      )}

                      {sellerWithdrawal.status === "Processed Withdrawal" && (
                        <SeverityPill color={"success"}>
                          {sellerWithdrawal.status}
                        </SeverityPill>
                      )}
                    </TableCell>

                    <TableCell>
                      <SeverityPill
                        color={ACTIVE_STATUS[sellerWithdrawal.is_active]}
                      >
                        {sellerWithdrawal.is_active
                          ? "Activated"
                          : "Deactivated"}
                      </SeverityPill>
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
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
        component="div"
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

SellerWithdrawalsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default SellerWithdrawalsTable;
