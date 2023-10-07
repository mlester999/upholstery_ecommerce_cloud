import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Typography,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Colors from '../../constants/Colors';
import { useLoginMutation } from '../../services/authentication';

const AuthLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          await login({ email: values.email, password: values.password })
            .unwrap()
            .then((payload) => {
              Cookies.set('is_authenticated', true);
              navigate('/portal/dashboard');
            })
            .catch((error) => setErrors({ email: error.data.message }));
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
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
            >
              <InputLabel htmlFor='email-login'>Email Address</InputLabel>
              <OutlinedInput
                id='email-login'
                type='email'
                value={values.email}
                name='email'
                onBlur={handleBlur}
                onChange={handleChange}
                label='Email Address'
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id='text-email-login'>
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ marginTop: 4, marginBottom: 4 }}
            >
              <InputLabel htmlFor='password-login'>Password</InputLabel>
              <OutlinedInput
                id='password-login'
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name='password'
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                      size='large'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label='Password'
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id='standard-weight-helper-text-password-login'
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name='checked'
                    color='primary'
                  />
                }
                label='Remember me'
              />
              <Typography
                component={Link}
                to='/forgot-password'
                variant='subtitle1'
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                  color: Colors.primaryColor,
                }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <LoadingButton
                loading={isLoading}
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size='large'
                type='submit'
                variant='contained'
                sx={{ backgroundColor: Colors.primaryColor }}
              >
                Sign in
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
