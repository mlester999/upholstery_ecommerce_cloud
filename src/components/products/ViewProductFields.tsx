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
import { toast } from 'react-toastify';
import {
  useActivateProductMutation,
  useDeactivateProductMutation,
} from '../../services/crud-product';

const ViewProductFields = (props) => {
  const { product } = props;
  const navigate = useNavigate();
  const { productId } = useParams();
  const [activateProduct, { isLoading: activateLoading }] =
    useActivateProductMutation();
  const [deactivateProduct, { isLoading: deactivateLoading }] =
    useDeactivateProductMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the product that you are viewing.'
        title='Product Information'
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
            Product Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {product?.name}
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
            {product?.description}
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
            Price:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {product?.price}
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
            Category:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {product?.category.title}
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
            Seller's Name:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {product?.seller?.first_name} {product?.seller?.last_name}
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
            Image File:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {product?.image_file}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {product?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateProduct(productId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/products');

                  toast.success('Deactivated Product Successfully!', {
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
              activateProduct(productId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/products');

                  toast.success('Activated Product Successfully!', {
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

export default ViewProductFields;
