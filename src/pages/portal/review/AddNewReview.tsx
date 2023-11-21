import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AddNewReviewFields from "../../../components/reviews/AddNewReviewFields";
import PortalLayout from "../../../layouts/PortalLayout";

const AddNewReview = () => (
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
            <Typography variant="h4">Add New Review</Typography>
          </div>
          <div>
            <AddNewReviewFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewReview;
