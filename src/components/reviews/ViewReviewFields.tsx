import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Colors from "../../constants/Colors";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SeverityPill from "../SeverityPill";
import {
  useActivateReviewMutation,
  useDeactivateReviewMutation,
} from "../../services/crud-review";

const ViewReviewFields = (props) => {
  const { review } = props;
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [activateReview, { isLoading: activateLoading }] =
    useActivateReviewMutation();
  const [deactivateReview, { isLoading: deactivateLoading }] =
    useDeactivateReviewMutation();

  return (
    <Card>
      <CardHeader
        subheader="These are the information of the review that you are viewing."
        title="Review Information"
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Review ID:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.review_id}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Order ID:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.order_id}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Shop Name:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.shop.name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Product Name:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.product.name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Customer Name:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.customer.first_name} {review?.customer.last_name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Comments:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.comments}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "5.5px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Ratings:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {review?.ratings}⭐
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {review?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateReview(reviewId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/seller-withdrawals");

                  toast.success("Deactivated Review Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
                .catch((error) => console.log(error))
            }
            loading={deactivateLoading}
            disableElevation
            variant="contained"
            sx={{
              backgroundColor: Colors.deactivateColor,
              "&:hover": { backgroundColor: Colors.deactivateHoverColor },
            }}
          >
            Deactivate
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={() =>
              activateReview(reviewId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/seller-withdrawals");

                  toast.success("Activated Review Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
                .catch((error) => console.log(error))
            }
            loading={activateLoading}
            disableElevation
            variant="contained"
            sx={{
              backgroundColor: Colors.activateColor,
              "&:hover": { backgroundColor: Colors.activateHoverColor },
            }}
          >
            Activate
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ViewReviewFields;
