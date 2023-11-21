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
  useActivateSellerWithdrawalMutation,
  useDeactivateSellerWithdrawalMutation,
} from "../../services/crud-seller-withdrawal";
import { toast } from "react-toastify";
import SeverityPill from "../SeverityPill";

const ViewSellerWithdrawalFields = (props) => {
  const { sellerWithdrawal } = props;
  const navigate = useNavigate();
  const { sellerWithdrawalId } = useParams();
  const [activateSellerWithdrawal, { isLoading: activateLoading }] =
    useActivateSellerWithdrawalMutation();
  const [deactivateSellerWithdrawal, { isLoading: deactivateLoading }] =
    useDeactivateSellerWithdrawalMutation();

  return (
    <Card>
      <CardHeader
        subheader="These are the information of the seller withdrawal that you are viewing."
        title="Seller Withdrawal Information"
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
            Seller Withdrawal ID:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {sellerWithdrawal?.seller_withdrawal_id}
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
            Seller Name:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {sellerWithdrawal?.seller.first_name}
            {sellerWithdrawal?.seller.last_name}
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
            {sellerWithdrawal?.amount.toLocaleString("en-US", {
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
            Withdrawal Status:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {sellerWithdrawal?.status === "Pending Withdrawal" && (
              <SeverityPill color={"warning"}>
                {sellerWithdrawal?.status}
              </SeverityPill>
            )}

            {sellerWithdrawal?.status === "Processed Withdrawal" && (
              <SeverityPill color={"success"}>
                {sellerWithdrawal?.status}
              </SeverityPill>
            )}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {sellerWithdrawal?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateSellerWithdrawal(sellerWithdrawalId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/seller-withdrawals");

                  toast.success("Deactivated Seller Withdrawal Successfully!", {
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
              activateSellerWithdrawal(sellerWithdrawalId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/seller-withdrawals");

                  toast.success("Activated Seller Withdrawal Successfully!", {
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

export default ViewSellerWithdrawalFields;
