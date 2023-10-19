import { Formik } from 'formik';
import * as Yup from 'yup';
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
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { useCreateAdminMutation } from '../../services/crud-admin';
import { toast } from 'react-toastify';

const AddNewAdminFields = () => {
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const navigate = useNavigate();

  const initialValues = {
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    gender: '',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          first_name: Yup.string().required('First Name is required'),
          middle_name: Yup.string().notRequired(),
          last_name: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email Address is required'),
          contact_number: Yup.string()
            .matches(/^(09\d{9})?$/, 'Invalid Contact Number')
            .required('Contact Number is required'),
          gender: Yup.string()
            .oneOf(['Male', 'Female'], 'Invalid gender')
            .required('Gender is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          createAdmin(values)
            .unwrap()
            .then((payload) => {
              navigate('/portal/admins');

              toast.success('Added Admin Successfully!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: 'light',
              });
            })
            .catch((error) => setErrors({ email: error.data?.message }));
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
                subheader='Please fill in the input fields to add a admin.'
                title='Admin Information'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.first_name && errors.first_name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.first_name && errors.first_name
                          )}
                          label='First Name'
                          name='first_name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.first_name}
                        />
                        {touched.first_name && errors.first_name && (
                          <FormHelperText error id='text-first-name'>
                            {errors.first_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.middle_name && errors.middle_name
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.middle_name && errors.middle_name
                          )}
                          label='Middle Name (Optional)'
                          name='middle_name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.middle_name}
                        />
                        {touched.middle_name && errors.middle_name && (
                          <FormHelperText error id='text-middle-name'>
                            {errors.middle_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.last_name && errors.last_name)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.last_name && errors.last_name)}
                          label='Last Name'
                          name='last_name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.last_name}
                        />
                        {touched.last_name && errors.last_name && (
                          <FormHelperText error id='text-last-name'>
                            {errors.last_name}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          label='Email Address'
                          name='email'
                          type='email'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id='text-email-address'>
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.contact_number && errors.contact_number
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.contact_number && errors.contact_number
                          )}
                          label='Contact Number'
                          name='contact_number'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.contact_number}
                        />
                        {touched.contact_number && errors.contact_number && (
                          <FormHelperText error id='text-contact-number'>
                            {errors.contact_number}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.gender && errors.gender)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.gender && errors.gender)}
                          label='Select Gender'
                          name='gender'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.gender}
                        >
                          <option value='' disabled hidden></option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                        </TextField>
                        {touched.gender && errors.gender && (
                          <FormHelperText error id='text-gender'>
                            {errors.gender}
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

export default AddNewAdminFields;
