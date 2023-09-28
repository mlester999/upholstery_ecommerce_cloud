import { Link, Navigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import {
  Divider,
  Container,
  Box,
  Grid,
  Typography,
  Stack,
  Card,
} from '@mui/material';
import Colors from '../../constants/Colors';
import AuthForgotPassword from '../../components/auth/AuthForgotPassword';
import { useGetUserQuery } from '../../services/authentication';

const ForgotPassword = () => {
  const { isLoading, isFetching, isError } = useGetUserQuery();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!isError) {
    return <Navigate to='/dashboard'></Navigate>;
  }

  return (
    <Box sx={{ bgcolor: Colors.backgroundColor, height: '100vh' }}>
      <Container maxWidth='sm' sx={{ padding: 8 }}>
        <Card sx={{ borderRadius: 2 }}>
          <Grid
            container
            bgcolor='#fff'
            alignItems='center'
            justifyContent='center'
            sx={{ padding: 4 }}
          >
            <Grid item sx={{ mb: 3 }}>
              <Link to='/login'>
                <Logo />
              </Link>
            </Grid>
            <Grid item xs={12} sx={{ mb: 6 }}>
              <Grid
                container
                direction={'row'}
                alignItems='center'
                justifyContent='center'
              >
                <Grid item>
                  <Stack
                    alignItems='center'
                    justifyContent='center'
                    spacing={1}
                  >
                    <Typography
                      gutterBottom
                      variant={'h5'}
                      sx={{ color: Colors.primaryColor }}
                    >
                      Did you forgot your password?
                    </Typography>
                    <Typography
                      variant='caption'
                      fontSize='14px'
                      textAlign={'inherit'}
                      sx={{ paddingX: 4 }}
                    >
                      Enter the email address associated with your account and
                      we'll send you a link to reset your password.
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AuthForgotPassword />
            </Grid>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Grid
                item
                container
                direction='column'
                alignItems='center'
                xs={12}
              >
                <Typography
                  component={Link}
                  to='/login'
                  variant='subtitle1'
                  sx={{ textDecoration: 'none', color: Colors.primaryColor }}
                >
                  Back to Login
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
