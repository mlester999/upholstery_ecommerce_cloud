import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AddNewSellerBalanceFields from "../../../components/seller-balances/AddNewSellerBalanceFields";
import PortalLayout from "../../../layouts/PortalLayout";

const AddNewSellerBalance = () => (
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
            <Typography variant="h4">Add New Seller Balance</Typography>
          </div>
          <div>
            <AddNewSellerBalanceFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewSellerBalance;
