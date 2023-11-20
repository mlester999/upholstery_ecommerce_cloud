import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import NotFound from "../../../components/NotFound";
import EditReviewFields from "../../../components/reviews/EditReviewFields";
import ViewReviewFields from "../../../components/reviews/ViewReviewFields";
import PortalLayout from "../../../layouts/PortalLayout";
import { useGetReviewQuery } from "../../../services/crud-review";

const ViewReview = () => {
  const { reviewId } = useParams();
  const {
    data: review,
    isLoading,
    isFetching,
    isError,
  } = useGetReviewQuery(reviewId);

  if (isLoading || isFetching) {
    return <div></div>;
  }

  if (!review || isError) {
    return <NotFound />;
  }

  return (
    <PortalLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">Review Details</Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} lg={6}>
                  <ViewReviewFields review={review} />
                </Grid>
                <Grid xs={12} lg={6}>
                  <EditReviewFields review={review} />
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </PortalLayout>
  );
};

export default ViewReview;
