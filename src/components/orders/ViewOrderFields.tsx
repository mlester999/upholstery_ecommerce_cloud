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
  useActivateOrderMutation,
  useDeactivateOrderMutation,
} from "../../services/crud-order";
import SeverityPill from "../SeverityPill";
import { DELIVERY_STATUS } from "../../constants/Enums";

const ViewOrderFields = (props) => {
  const { order } = props;
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [activateOrder, { isLoading: activateLoading }] =
    useActivateOrderMutation();
  const [deactivateOrder, { isLoading: deactivateLoading }] =
    useDeactivateOrderMutation();

  let orderedProducts = "";

  const parsedProducts = JSON.parse(order?.products);

  parsedProducts.map((el, i) => {
    if (i < parsedProducts.length - 1) {
      orderedProducts += `${el.quantity} pc(s) of ${el.name}, `;
    } else if (parsedProducts.length === 1) {
      orderedProducts += `${el.quantity} pc(s) of ${el.name}.`;
    } else {
      orderedProducts += `and ${el.quantity} pc(s) of ${el.name}.`;
    }
  });

  return (
    <Card>
      <CardHeader
        subheader="These are the information of the order that you are viewing."
        title="Order Information"
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
            Order ID:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {order?.order_id}
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
            Customer's Name:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {order?.customer?.first_name} {order?.customer?.last_name}
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
            Ordered Products:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {orderedProducts}
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
            Total Price:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            ₱
            {order?.total_price.toLocaleString("en-US", {
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
            Total Quantity:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {order?.total_quantity} item(s)
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
            Voucher Code:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {order?.voucher_code ?? "N/A"}
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
            Payment Method:
          </Typography>

          <Typography color="text.secondary" variant="body1">
            {order?.payment_method}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {order?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateOrder(orderId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/orders");

                  toast.success("Deactivated Order Successfully!", {
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
              activateOrder(orderId)
                .unwrap()
                .then((payload) => {
                  navigate("/portal/orders");

                  toast.success("Activated Order Successfully!", {
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

export default ViewOrderFields;
