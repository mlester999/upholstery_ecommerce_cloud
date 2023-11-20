import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import AddNewBankAccountFields from "../../../components/bank-accounts/AddNewBankAccountFields";
import PortalLayout from "../../../layouts/PortalLayout";

const AddNewBankAccount = () => (
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
            <Typography variant="h4">Add New Bank Account</Typography>
          </div>
          <div>
            <AddNewBankAccountFields />
          </div>
        </Stack>
      </Container>
    </Box>
  </PortalLayout>
);

export default AddNewBankAccount;
