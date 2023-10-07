import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useActivateSellerMutation,
  useDeactivateSellerMutation,
} from '../../services/crud-seller';
import { toast } from 'react-toastify';

const ViewSellerFields = (props) => {
  const { seller } = props;
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const [activateSeller, { isLoading: activateLoading }] =
    useActivateSellerMutation();
  const [deactivateSeller, { isLoading: deactivateLoading }] =
    useDeactivateSellerMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the seller that you are viewing.'
        title='Seller Information'
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
            {seller?.first_name}
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
            {seller?.middle_name || 'N/A'}
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
            {seller?.last_name}
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
            {seller?.gender}
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
            {seller?.birth_date}
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
            {seller?.user?.email}
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
            {seller?.contact_number}
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
            {seller?.region}
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
            {seller?.province}
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
            {seller?.city}
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
            {seller?.barangay}
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
            {seller?.zip_code}
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
            {seller?.street_address}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {seller?.user.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateSeller(sellerId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/sellers');

                  toast.success('Deactivated Seller Successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: 'light',
                  });
                })
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
              activateSeller(sellerId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/sellers');

                  toast.success('Activated Seller Successfully!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: 'light',
                  });
                })
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

export default ViewSellerFields;
