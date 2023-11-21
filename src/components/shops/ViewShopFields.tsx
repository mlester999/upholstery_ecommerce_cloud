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
  useActivateShopMutation,
  useDeactivateShopMutation,
} from '../../services/crud-shop';
import { toast } from 'react-toastify';

const ViewShopFields = (props) => {
  const { shop } = props;
  const navigate = useNavigate();
  const { shopId } = useParams();
  const [activateShop, { isLoading: activateLoading }] =
    useActivateShopMutation();
  const [deactivateShop, { isLoading: deactivateLoading }] =
    useDeactivateShopMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the shop that you are viewing.'
        title='Shop Information'
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
            Seller Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {shop?.seller.first_name} {shop?.seller.last_name}
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
            Shop Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {shop?.name}
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
            Description:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {shop?.description}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {shop?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateShop(shopId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/shops');

                  toast.success('Deactivated Shop Successfully!', {
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
              activateShop(shopId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/shops');

                  toast.success('Activated Shop Successfully!', {
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

export default ViewShopFields;
