import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import {
  Box,
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
import { useUpdatePassMutation } from '../../services/authentication';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountProfileChangePass = () => {
  const [updatePass, { isLoading }] = useUpdatePassMutation();
  const navigate = useNavigate();

  const initialValues = {
    current_password: '',
    new_password: '',
    confirm_new_password: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          current_password: Yup.string().required(
            'Current Password is required'
          ),
          new_password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('New Password is required'),
          confirm_new_password: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
            .required('Confirm New Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          updatePass(values)
            .unwrap()
            .then((payload) => {
              Cookies.remove('is_authenticated');

              navigate('/login', { replace: true });

              toast.success(
                'Updated Password Successfully. Please log in again with your new credentials.',
                {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  progress: undefined,
                  theme: 'light',
                }
              );
            })
            .catch((error) =>
              setErrors({ current_password: error.data?.message })
            );
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          dirty,
          isValid,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Please put your old password and your new password.'
                title='Change Password'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.current_password && errors.current_password
                        )}
                      >
                        <TextField
                          type='password'
                          fullWidth
                          error={Boolean(
                            touched.current_password && errors.current_password
                          )}
                          label='Current Password'
                          name='current_password'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.current_password}
                        />
                        {touched.current_password &&
                          errors.current_password && (
                            <FormHelperText error id='text-current-pass'>
                              {errors.current_password}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.new_password && errors.new_password
                        )}
                      >
                        <TextField
                          type='password'
                          fullWidth
                          error={Boolean(
                            touched.new_password && errors.new_password
                          )}
                          label='New Password'
                          name='new_password'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.new_password}
                        />
                        {touched.new_password && errors.new_password && (
                          <FormHelperText error id='text-new-pass'>
                            {errors.new_password}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.confirm_new_password &&
                            errors.confirm_new_password
                        )}
                      >
                        <TextField
                          type='password'
                          fullWidth
                          error={Boolean(
                            touched.confirm_new_password &&
                              errors.confirm_new_password
                          )}
                          label='Confirm New Password'
                          name='confirm_new_password'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.confirm_new_password}
                        />
                        {touched.confirm_new_password &&
                          errors.confirm_new_password && (
                            <FormHelperText error id='text-confirm-new-pass'>
                              {errors.confirm_new_password}
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
                  Reset Password
                </LoadingButton>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AccountProfileChangePass;
