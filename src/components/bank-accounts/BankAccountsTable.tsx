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
  ListItemAvatar,
  Typography,
} from "@mui/material";
import Scrollbar from "../ScrollBar";
import { ACTIVE_STATUS } from "../../constants/Enums";
import SeverityPill from "../SeverityPill";
import { useNavigate } from "react-router-dom";

const BankAccountsTable = (props) => {
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
                  Name
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
                  Contact Number
                </TableCell>

                <TableCell
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  Verification Status
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
                      No Bank Accounts Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((bankAccount) => {
                const isSelected = selected.includes(bankAccount.id);

                const createdDate = new Date(bankAccount.created_at);
                const createdAt = format(createdDate, "yyyy-MM-dd");

                return (
                  <TableRow
                    onClick={() =>
                      navigate(`/portal/bank-accounts/view/${bankAccount.id}`)
                    }
                    hover
                    sx={{ cursor: "pointer" }}
                    key={bankAccount.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <ListItemAvatar>
                          <Box
                            component="img"
                            src={`/assets/${bankAccount.name
                              .replace(/\s/g, "")
                              .toLowerCase()}.png`}
                            sx={{
                              borderRadius: 1,
                              height: 40,
                              width: 40,
                            }}
                          />
                        </ListItemAvatar>

                        <Typography variant="subtitle2">
                          {bankAccount.name}
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
                          {bankAccount.seller.first_name}{" "}
                          {bankAccount.seller.last_name}
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
                          {bankAccount.contact_number}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      {bankAccount.contact_number_verified_at && (
                        <SeverityPill color={"success"}>Verified</SeverityPill>
                      )}

                      {!bankAccount.contact_number_verified_at && (
                        <SeverityPill color={"error"}>
                          Not Verified
                        </SeverityPill>
                      )}
                    </TableCell>

                    <TableCell>
                      <SeverityPill
                        color={ACTIVE_STATUS[bankAccount.is_active]}
                      >
                        {bankAccount.is_active ? "Activated" : "Deactivated"}
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

BankAccountsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default BankAccountsTable;
