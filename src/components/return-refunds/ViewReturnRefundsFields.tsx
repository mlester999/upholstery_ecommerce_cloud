import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Colors from "../../constants/Colors";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useActivateReturnRefundMutation,
  useDeactivateReturnRefundMutation,
} from "../../services/crud-return-refund";

const ViewReturnRefundsFields = (props) => {
  const { returnRefund } = props;
  const navigate = useNavigate();
  const { returnRefundId } = useParams();
  const [activateReturnRefund, { isLoading: activateLoading }] =
    useActivateReturnRefundMutation();
  const [deactivateReturnRefund, { isLoading: deactivateLoading }] =
    useDeactivateReturnRefundMutation();

  return (
    <Card>
      <CardHeader
        subheader="These are the information of the return / refund that you are viewing."
        title="Return / Refund Information"
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            paddingY: "10px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Return / Refund ID:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {returnRefund?.return_refund_id}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
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
            {returnRefund?.order_id}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
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
            {returnRefund?.product.name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Price:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            ₱
            {returnRefund?.product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Quantity:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {returnRefund?.product.quantity ?? 0} item(s)
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
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
            {returnRefund?.customer.first_name}{" "}
            {returnRefund?.customer.last_name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
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
            {returnRefund?.product.shop.name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            height: "max",
            width: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Reason for Return:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {returnRefund?.reason}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: "10px",
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
            height: "max",
            width: "max",
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color="text.primary" variant="body1">
            Evidence Provided:
          </Typography>

          <Box
            component="img"
            src={returnRefund.image_file}
            sx={{
              borderRadius: 1,
              height: 250,
              width: 250,
            }}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {returnRefund?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateReturnRefund(returnRefundId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/return-refunds");

                  toast.success("Deactivated Return / Refund Successfully!", {
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
              activateReturnRefund(returnRefundId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/return-refunds");

                  toast.success("Activated Return / Refund Successfully!", {
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

export default ViewReturnRefundsFields;
