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
import {
  useActivateBankAccountMutation,
  useDeactivateBankAccountMutation,
} from "../../services/crud-bank-account";
import SeverityPill from "../SeverityPill";

const ViewBankAccountFields = (props) => {
  const { bankAccount } = props;
  const navigate = useNavigate();
  const { bankAccountId } = useParams();
  const [activateBankAccount, { isLoading: activateLoading }] =
    useActivateBankAccountMutation();
  const [deactivateBankAccount, { isLoading: deactivateLoading }] =
    useDeactivateBankAccountMutation();

  return (
    <Card>
      <CardHeader
        subheader="These are the information of the bank account that you are viewing."
        title="Bank Account Information"
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
            Bank Account:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {bankAccount?.name}
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
            {bankAccount?.seller.first_name} {bankAccount?.seller.last_name}
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
            Account Number:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {bankAccount?.contact_number}
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
            Verification Status
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {bankAccount.contact_number_verified_at && (
              <SeverityPill color={"success"}>Verified</SeverityPill>
            )}

            {!bankAccount.contact_number_verified_at && (
              <SeverityPill color={"error"}>Not Verified</SeverityPill>
            )}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {bankAccount?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateBankAccount(bankAccountId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/bank-accounts");

                  toast.success("Deactivated Bank Account Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
                .catch((error) => {
                  toast.error(`${error.data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
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
              activateBankAccount(bankAccountId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/bank-accounts");

                  toast.success("Activated Bank Account Successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
                .catch((error) => {
                  toast.error(`${error.data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                  });
                })
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

export default ViewBankAccountFields;
