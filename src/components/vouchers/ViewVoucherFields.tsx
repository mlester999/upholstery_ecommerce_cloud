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
  useActivateVoucherMutation,
  useDeactivateVoucherMutation,
} from '../../services/crud-voucher';
import { toast } from 'react-toastify';

const ViewVoucherFields = (props) => {
  const { voucher } = props;
  const navigate = useNavigate();
  const { voucherId } = useParams();
  const [activateVoucher, { isLoading: activateLoading }] =
    useActivateVoucherMutation();
  const [deactivateVoucher, { isLoading: deactivateLoading }] =
    useDeactivateVoucherMutation();

  return (
    <Card>
      <CardHeader
        subheader='These are the information of the voucher that you are viewing.'
        title='Voucher Information'
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
            Voucher Code:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {voucher?.voucher_code}
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
            Title:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {voucher?.title}
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
            {voucher?.description}
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
            Amount:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {voucher?.amount}
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
            Mode:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {voucher?.mode}
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
            Type:
          </Typography>

          <Typography color='text.secondary' variant='body1'>
            {voucher?.type}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {voucher?.is_active ? (
          <LoadingButton
            onClick={() =>
              deactivateVoucher(voucherId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/discount-vouchers');

                  toast.success('Deactivated Voucher Successfully!', {
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
              activateVoucher(voucherId)
                .unwrap()
                .then((payload) => {
                  navigate('/portal/discount-vouchers');

                  toast.success('Activated Voucher Successfully!', {
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

export default ViewVoucherFields;
