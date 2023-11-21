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
import {
  useActivateSellerBalanceMutation,
  useDeactivateSellerBalanceMutation,
} from "../../services/crud-seller-balance";
import { toast } from "react-toastify";
import SeverityPill from "../SeverityPill";

const ViewSellerBalanceFields = (props) => {
  const { sellerBalance } = props;
  const navigate = useNavigate();
  const { sellerBalanceId } = useParams();
  const [activateSellerBalance, { isLoading: activateLoading }] =
    useActivateSellerBalanceMutation();
  const [deactivateSellerBalance, { isLoading: deactivateLoading }] =
    useDeactivateSellerBalanceMutation();

  return (
    <Card>
      <CardHeader
        subheader="These are the information of the seller balance that you are viewing."
        title="Seller Balance Information"
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
            Seller Balance ID:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {sellerBalance?.seller_balance_id}
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
            {sellerBalance.order_id}
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
            {sellerBalance?.product.name}
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
            {sellerBalance?.shop.name}
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
            Amount:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            ₱
            {sellerBalance?.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
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
            Status:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {sellerBalance?.status === "Pending" && (
              <SeverityPill color={"info"}>
                {sellerBalance?.status}
              </SeverityPill>
            )}

            {sellerBalance?.status === "Cancelled" && (
              <SeverityPill color={"error"}>
                {sellerBalance?.status}
              </SeverityPill>
            )}

            {sellerBalance?.status === "Completed" && (
              <SeverityPill color={"primary"}>
                {sellerBalance?.status}
              </SeverityPill>
            )}

            {sellerBalance?.status === "Pending Withdrawal" && (
              <SeverityPill color={"warning"}>
                {sellerBalance?.status}
              </SeverityPill>
            )}

            {sellerBalance?.status === "Processed Withdrawal" && (
              <SeverityPill color={"success"}>
                {sellerBalance?.status}
              </SeverityPill>
            )}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {sellerBalance?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateSellerBalance(sellerBalanceId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/seller-balances");

                  toast.success("Deactivated Seller Balance Successfully!", {
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
              activateSellerBalance(sellerBalanceId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/seller-balances");

                  toast.success("Activated Seller Balance Successfully!", {
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

export default ViewSellerBalanceFields;
