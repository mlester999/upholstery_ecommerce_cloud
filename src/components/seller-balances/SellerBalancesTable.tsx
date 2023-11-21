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

const SellerBalancesTable = (props) => {
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
                  Seller Balance ID
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Order ID
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Product Name
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
                  Status
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
                    colspan="8"
                    sx={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      No Seller Balances Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((sellerBalance) => {
                const isSelected = selected.includes(sellerBalance.id);

                const createdDate = new Date(sellerBalance.created_at);
                const createdAt = format(createdDate, "yyyy-MM-dd");

                return (
                  <TableRow
                    onClick={() =>
                      navigate(
                        `/portal/seller-balances/view/${sellerBalance.id}`
                      )
                    }
                    hover
                    sx={{ cursor: "pointer" }}
                    key={sellerBalance.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {sellerBalance.seller_balance_id}
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
                          {sellerBalance.order_id}
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
                          {sellerBalance.product.name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sellerBalance.shop.seller.first_name}{" "}
                      {sellerBalance.shop.seller.last_name}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₱
                      {sellerBalance.amount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sellerBalance.status === "Pending" && (
                        <SeverityPill color={"info"}>
                          {sellerBalance.status}
                        </SeverityPill>
                      )}

                      {sellerBalance.status === "Cancelled" && (
                        <SeverityPill color={"error"}>
                          {sellerBalance.status}
                        </SeverityPill>
                      )}

                      {sellerBalance.status === "Completed" && (
                        <SeverityPill color={"primary"}>
                          {sellerBalance.status}
                        </SeverityPill>
                      )}

                      {sellerBalance.status === "Pending Withdrawal" && (
                        <SeverityPill color={"warning"}>
                          {sellerBalance.status}
                        </SeverityPill>
                      )}

                      {sellerBalance.status === "Processed Withdrawal" && (
                        <SeverityPill color={"success"}>
                          {sellerBalance.status}
                        </SeverityPill>
                      )}
                    </TableCell>

                    <TableCell>
                      <SeverityPill
                        color={ACTIVE_STATUS[sellerBalance.is_active]}
                      >
                        {sellerBalance.is_active ? "Activated" : "Deactivated"}
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

SellerBalancesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default SellerBalancesTable;
