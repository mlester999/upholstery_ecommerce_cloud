import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
import AuthLogin from '../../components/auth/AuthLogin';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../../services/authentication';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [skipFetching, setSkipFetching] = useState(true);
  const { isLoading, isFetching, isError } = useGetUserQuery(undefined, {
    skip: skipFetching,
  });

  useEffect(() => {
    if (Cookies.get('is_authenticated')) {
      setSkipFetching(false);
    }

    setLoading(false);
  }, [skipFetching]);

  if (!skipFetching) {
    if (isLoading || isFetching) {
      return <div></div>;
    }

    if (!isError) {
      return <Navigate to='/portal/dashboard'></Navigate>;
    }
  }

  if (loading) return <div></div>;

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
              <a href='#'>
                <Logo />
              </a>
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
                      variant={'h4'}
                      sx={{ color: Colors.primaryColor }}
                    >
                      Welcome to CCLDO
                    </Typography>

                    <Typography
                      variant='caption'
                      fontSize='16px'
                      textAlign={'inherit'}
                    >
                      Enter your credentials to continue
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AuthLogin />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
