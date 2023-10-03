import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import {
  useActivateCustomerMutation,
  useDeactivateCustomerMutation,
} from '../../services/crud-customer';

const ViewCustomerFields = (props) => {
  const { customer } = props;
  const navigate = useNavigate();
  const { customerId } = useParams();
  const [activateCustomer, { isLoading: activateLoading }] =
    useActivateCustomerMutation();
  const [deactivateCustomer, { isLoading: deactivateLoading }] =
    useDeactivateCustomerMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the customer that you are viewing.'
        title='Customer Information'
      />
      <CardContent sx={{ pt: 0 }}>
        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            First Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.first_name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Middle Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.middle_name || 'N/A'}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Last Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.last_name}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Gender:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.gender}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Birth Date:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.birth_date}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Email Address:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.user?.email}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Contact Number:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.contact_number}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Region:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.region}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Province:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.province}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            City:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.city}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Barangay:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.barangay}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Zip Code:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.zip_code}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingY: '5.5px',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
            height: 'max',
            gap: 1,
          }}
        >
          <Typography fontWeight={500} color='text.primary' variant='body1'>
            Street Address:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {customer?.street_address}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {customer?.user.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateCustomer(customerId)
                .unwrap()
                .then((payload) => navigate('/portal/customers'))
                .catch((error) => console.log(error))
            }
            loading={deactivateLoading}
            disableElevation
            variant='contained'
            sx={{
              backgroundColor: Colors.deactivateColor,
              '&:hover': { backgroundColor: Colors.deactivateHoverColor },
            }}
          >
            Deactivate
          </LoadingButton>
        ) : (
          <LoadingButton
            onClick={() =>
              activateCustomer(customerId)
                .unwrap()
                .then((payload) => navigate('/portal/customers'))
                .catch((error) => console.log(error))
            }
            loading={activateLoading}
            disableElevation
            variant='contained'
            sx={{
              backgroundColor: Colors.activateColor,
              '&:hover': { backgroundColor: Colors.activateHoverColor },
            }}
          >
            Activate
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ViewCustomerFields;
