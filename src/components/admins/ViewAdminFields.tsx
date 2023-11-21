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
  useActivateAdminMutation,
  useDeactivateAdminMutation,
} from '../../services/crud-admin';
import { toast } from 'react-toastify';

const ViewAdminFields = (props) => {
  const { admin } = props;
  const navigate = useNavigate();
  const { adminId } = useParams();
  const [activateAdmin, { isLoading: activateLoading }] =
    useActivateAdminMutation();
  const [deactivateAdmin, { isLoading: deactivateLoading }] =
    useDeactivateAdminMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the admin that you are viewing.'
        title='Admin Information'
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
            {admin?.first_name}
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
            {admin?.middle_name || 'N/A'}
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
            {admin?.last_name}
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
            {admin?.gender}
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
            {admin?.user?.email}
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
            {admin?.contact_number}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {admin?.user.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateAdmin(adminId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/admins');

                  toast.success('Deactivated Admin Successfully!', {
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
              activateAdmin(adminId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/admins');

                  toast.success('Activated Admin Successfully!', {
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

export default ViewAdminFields;
