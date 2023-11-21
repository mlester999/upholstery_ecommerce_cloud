import { Formik } from 'formik';
import * as Yup from 'yup';
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
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateVoucherMutation } from '../../services/crud-voucher';

const AddNewVoucherFields = () => {
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();
  const navigate = useNavigate();

  const initialValues = {
    voucher_code: '',
    title: '',
    description: '',
    amount: null,
    mode: '',
    type: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          voucher_code: Yup.string().required('Voucher Code is required'),
          title: Yup.string().required('Title is required'),
          description: Yup.string().required('Description is required'),
          amount: Yup.number().required('Amount is required'),
          mode: Yup.string().required('Mode is required'),
          type: Yup.string().required('Type is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          createVoucher(values)
            .unwrap()
            .then((payload) => {
              navigate('/portal/discount-vouchers');

              toast.success('Added Voucher Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
              });
            })
            .catch((error) => console.log(error));
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
          dirty,
          isValid,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Please fill in the input fields to add a voucher.'
                title='Voucher Information'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.voucher_code && errors.voucher_code
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.voucher_code && errors.voucher_code
                          )}
                          label='Voucher Code'
                          name='voucher_code'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const trimmedValue = e.target.value.trim();
                            setFieldValue('voucher_code', trimmedValue, true);
                          }}
                          required
                          value={values.voucher_code}
                        />
                        {touched.voucher_code && errors.voucher_code && (
                          <FormHelperText error id='text-voucher-code'>
                            {errors.voucher_code}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.title && errors.title)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.title && errors.title)}
                          label='Title'
                          name='title'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.title}
                        />
                        {touched.title && errors.title && (
                          <FormHelperText error id='text-title'>
                            {errors.title}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.description && errors.description
                        )}
                      >
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          label='Description'
                          name='description'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.description}
                        />
                        {touched.description && errors.description && (
                          <FormHelperText error id='text-description'>
                            {errors.description}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.mode && errors.mode)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.mode && errors.mode)}
                          label='Select Mode'
                          name='mode'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            if (e.target.value === 'Percentage') {
                              setFieldValue(
                                'amount',
                                Number(values.amount) > 100
                                  ? 100
                                  : values.amount
                              );
                            }
                            setFieldValue('mode', e.target.value);
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.mode}
                        >
                          <option value='' disabled hidden></option>
                          <option value='Price'>Price</option>
                          <option value='Percentage'>Percentage</option>
                        </TextField>
                        {touched.mode && errors.mode && (
                          <FormHelperText error id='text-mode'>
                            {errors.mode}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.amount && errors.amount)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.amount && errors.amount)}
                          label='Amount'
                          name='amount'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            if (Math.sign(e.target.value) === 1) {
                              if (values.mode === 'Percentage') {
                                const discountVal = Number(e.target.value);

                                setFieldValue(
                                  'amount',
                                  discountVal > 100 ? 100 : discountVal
                                );
                              } else {
                                setFieldValue('amount', e.target.value);
                              }
                            } else {
                              setFieldValue('amount', 1);
                            }
                          }}
                          required
                          value={values.amount}
                          type='number'
                          inputProps={{ min: 1, max: 100 }}
                        />
                        {touched.amount && errors.amount && (
                          <FormHelperText error id='text-product-amount'>
                            {errors.amount}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.type && errors.type)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.type && errors.type)}
                          label='Select Type'
                          name='type'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.type}
                        >
                          <option value='' disabled hidden></option>
                          <option value='Price Discount'>Price Discount</option>
                          <option value='Shipping Discount'>
                            Shipping Discount
                          </option>
                        </TextField>
                        {touched.type && errors.type && (
                          <FormHelperText error id='text-type'>
                            {errors.type}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LoadingButton
                  loading={isLoading}
                  disableElevation
                  disabled={isSubmitting || !dirty || !isValid}
                  type='submit'
                  variant='contained'
                  sx={{ backgroundColor: Colors.primaryColor }}
                >
                  Save details
                </LoadingButton>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddNewVoucherFields;
