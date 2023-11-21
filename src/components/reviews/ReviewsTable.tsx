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
                  Review ID
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
                  Shop Name
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
                  Ratings
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
                    colspan="9"
                    sx={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle2">
                      No Reviews Found...
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              {items?.map((reviews) => {
                const isSelected = selected.includes(reviews.id);

                const createdDate = new Date(reviews.created_at);
                const createdAt = format(createdDate, "yyyy-MM-dd");

                return (
                  <TableRow
                    onClick={() =>
                      navigate(`/portal/reviews/view/${reviews.id}`)
                    }
                    hover
                    sx={{ cursor: "pointer" }}
                    key={reviews.id}
                    selected={isSelected}
                  >
                    <TableCell
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {reviews.review_id}
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
                          {reviews.order_id}
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
                          {reviews.shop.name}
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
                          {reviews.product.name}
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
                          {reviews.customer.first_name}{" "}
                          {reviews.customer.last_name}
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
                          {reviews.ratings}⭐
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <SeverityPill color={ACTIVE_STATUS[reviews.is_active]}>
                        {reviews.is_active ? "Activated" : "Deactivated"}
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

ReviewsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default ReviewsTable;
