import { useCallback, useEffect, useMemo, useState } from "react";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ReviewsTable from "../../../components/reviews/ReviewsTable";
import ReviewsSearch from "../../../components/reviews/ReviewsSearch";
import { applyPagination } from "../../../utils/applyPagination";
import PortalLayout from "../../../layouts/PortalLayout";
import Colors from "../../../constants/Colors";
import { Link } from "react-router-dom";
import { useGetReviewsQuery } from "../../../services/crud-review";

const useReviews = (page, rowsPerPage, reviewsInfo, query) => {
  const dataReady = reviewsInfo && reviewsInfo.length > 0;

  return useMemo(() => {
    if (dataReady) {
      if (query.trim() === "") {
        const reviews = applyPagination(reviewsInfo, page, rowsPerPage);

        const reviewsLength = reviewsInfo.length;

        return { reviews, reviewsLength };
      } else {
        const latestReviews = reviewsInfo.filter((item) => {
          // Convert the item properties to lowercase strings and check if any of them contains the query
          for (const key in item) {
            if (
              item[key] &&
              item[key].toString().toLowerCase().includes(query.toLowerCase())
            ) {
              return true;
            }
          }
          return false;
        });

        const reviewsLength = latestReviews.length;

        const reviews = applyPagination(latestReviews, page, rowsPerPage);

        return { reviews, reviewsLength };
      }
    } else {
      // Handle loading state or return an empty array
      return { reviews: [], reviewsLength: null }; // You can return an empty array or a loading state placeholder
    }
  }, [page, rowsPerPage, reviewsInfo, dataReady, query]);
};

const Reviews = () => {
  const { data: reviewsData } = useGetReviewsQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { reviews, reviewsLength } = useReviews(
    page,
    rowsPerPage,
    reviewsData?.slice().sort((a, b) => b.id - a.id),
    searchQuery
  );

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  return (
    <PortalLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Reviews</Typography>
              </Stack>

              <Button
                component={Link}
                to="/portal/reviews/add"
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  backgroundColor: Colors.primaryColor,
                }}
              >
                Add New Review
              </Button>
            </Stack>
            <ReviewsSearch
              onChange={handleSearchChange}
              searchQuery={searchQuery}
            />
            <ReviewsTable
              count={reviewsLength ?? 0}
              items={reviews}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default Reviews;
