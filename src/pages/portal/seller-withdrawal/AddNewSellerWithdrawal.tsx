import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AddNewSellerWithdrawalFields from "../../../components/seller-withdrawals/AddNewSellerWithdrawalFields";
import PortalLayout from "../../../layouts/PortalLayout";

const AddNewSellerWithdrawal = () => (
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
            <Typography variant="h4">Add New Seller Withdrawal</Typography>
          </div>
          <div>
            <AddNewSellerWithdrawalFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewSellerWithdrawal;
