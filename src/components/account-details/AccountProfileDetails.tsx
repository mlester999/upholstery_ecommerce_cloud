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
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../services/authentication';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountProfileDetails = () => {
  const { data: user } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const initialValues = {
    firstName: user?.first_name,
    middleName: user?.middle_name,
    lastName: user?.last_name,
    email: user?.user.email,
    contactNumber: user?.contact_number,
    gender: user?.gender,
  };

  function findChangedProperties(
    oldObj,
    newObj,
    id: number | undefined,
    userId: number | undefined
  ) {
    const changedProperties = {};

    // Iterate through the keys of newObj
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        // Check if the key exists in oldObj and the values are different
        if (oldObj[key] !== newObj[key]) {
          changedProperties[key] = newObj[key];
        }
      }
    }

    changedProperties.id = id;
    changedProperties.user_id = userId;

    return changedProperties;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name is required'),
          middleName: Yup.string().notRequired(),
          lastName: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          contactNumber: Yup.string()
            .matches(/^(09\d{9})?$/, 'Invalid Contact Number')
            .required('Contact number is required'),
          gender: Yup.string()
            .oneOf(['Male', 'Female'], 'Invalid gender')
            .required('Gender is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          const updatedValues = findChangedProperties(
            initialValues,
            values,
            user?.id,
            user?.user.id
          );
          updateUser(updatedValues)
            .unwrap()
            .then((payload) => {
              toast.success('Updated Profile Successfully!', {
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
          isSubmitting,
          touched,
          values,
          dirty,
          isValid,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='These information can be edited.'
                title='My Profile'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.firstName && errors.firstName)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.firstName && errors.firstName)}
                          label='First Name'
                          name='firstName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.firstName}
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText error id='text-first-name'>
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.middleName && errors.middleName)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.middleName && errors.middleName
                          )}
                          label='Middle Name (Optional)'
                          name='middleName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.middleName}
                        />
                        {touched.middleName && errors.middleName && (
                          <FormHelperText error id='text-middle-name'>
                            {errors.middleName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.lastName && errors.lastName)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.lastName && errors.lastName)}
                          label='Last Name'
                          name='lastName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText error id='text-last-name'>
                            {errors.lastName}
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
                          touched.contactNumber && errors.contactNumber
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.contactNumber && errors.contactNumber
                          )}
                          label='Contact Number'
                          name='contactNumber'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.contactNumber}
                        />
                        {touched.contactNumber && errors.contactNumber && (
                          <FormHelperText error id='text-contact-number'>
                            {errors.contactNumber}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={12}>
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

export default AccountProfileDetails;
