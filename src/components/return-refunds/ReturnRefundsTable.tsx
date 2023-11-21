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
import { ACTIVE_STATUS, RETURN_REFUND_STATUS } from "../../constants/Enums";
import SeverityPill from "../SeverityPill";
import { useNavigate } from "react-router-dom";

const ReturnRefundsTable = (props) => {
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
    return str.substring(0, maxLength) + "..."; // Truncate and add "..."
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Product Image
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Return / Refund ID
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
                  Customer Name
                </TableCell>
                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Shop Name
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
                    colspan="12"
                    sx={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      No Return / Refunds Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((returnRefund) => {
                const isSelected = selected.includes(returnRefund.id);

                const createdDate = new Date(returnRefund.created_at);
                const createdAt = format(createdDate, "yyyy-MM-dd");

                return (
                  <TableRow
                    onClick={() =>
                      navigate(`/portal/return-refunds/view/${returnRefund.id}`)
                    }
                    hover
                    sx={{ cursor: "pointer" }}
                    key={returnRefund.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="row"
                        spacing={2}
                      >
                        <Box
                          component="img"
                          src={returnRefund.product.image_file}
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
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {returnRefund.return_refund_id}
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
                          {returnRefund.order_id}
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
                          {returnRefund.product.name}
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
                          {returnRefund.customer.first_name}{" "}
                          {returnRefund.customer.last_name}
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
                          {returnRefund.product.shop.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {returnRefund.status === "Pending" && (
                        <SeverityPill color={RETURN_REFUND_STATUS["pending"]}>
                          {returnRefund.status}
                        </SeverityPill>
                      )}
                      {returnRefund.status === "Approved" && (
                        <SeverityPill color={RETURN_REFUND_STATUS["approved"]}>
                          {returnRefund.status}
                        </SeverityPill>
                      )}
                      {returnRefund.status === "Refunded" && (
                        <SeverityPill color={RETURN_REFUND_STATUS["refunded"]}>
                          {returnRefund.status}
                        </SeverityPill>
                      )}
                      {returnRefund.status === "Rejected" && (
                        <SeverityPill color={RETURN_REFUND_STATUS["rejected"]}>
                          {returnRefund.status}
                        </SeverityPill>
                      )}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={ACTIVE_STATUS[returnRefund.is_active]}
                      >
                        {returnRefund.is_active ? "Activated" : "Deactivated"}
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

ReturnRefundsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default ReturnRefundsTable;
