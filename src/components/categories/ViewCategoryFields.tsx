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
  useActivateCategoryMutation,
  useDeactivateCategoryMutation,
} from '../../services/crud-category';
import { toast } from 'react-toastify';

const ViewCategoryFields = (props) => {
  const { category } = props;
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [activateCategory, { isLoading: activateLoading }] =
    useActivateCategoryMutation();
  const [deactivateCategory, { isLoading: deactivateLoading }] =
    useDeactivateCategoryMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the category that you are viewing.'
        title='Category Information'
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
            Title:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {category?.title}
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
            {category?.description}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {category?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateCategory(categoryId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/categories');

                  toast.success('Deactivated Category Successfully!', {
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
              activateCategory(categoryId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/categories');

                  toast.success('Activated Category Successfully!', {
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

export default ViewCategoryFields;
