import Logo from '../../components/Logo';
import {
  Divider,
  Container,
  Box,
  Grid,
  Typography,
  Stack,
  Card,
  Skeleton,
} from '@mui/material';
import Colors from '../../constants/Colors';
import AuthLogin from '../../components/auth/AuthLogin';
import { Navigate } from 'react-router-dom';
import { useGetUserQuery } from '../../services/authentication';

const Login = () => {
  const { isLoading, isFetching, isError } = useGetUserQuery();

  console.log(isError);

  if (isLoading || isFetching) {
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
                <Skeleton
                  variant='circular'
                  width={100}
                  height={100}
                  animation='wave'
                />
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
                      spacing={3}
                    >
                      <Typography
                        gutterBottom
                        variant={'h4'}
                        sx={{ color: Colors.primaryColor }}
                      >
                        <Skeleton
                          variant='rectangular'
                          width={300}
                          height={30}
                          animation='wave'
                        />
                      </Typography>
                      <Typography
                        variant='caption'
                        fontSize='16px'
                        textAlign={'inherit'}
                      >
                        <Skeleton
                          variant='rectangular'
                          width={200}
                          height={20}
                          animation='wave'
                        />
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Stack justifyContent='center' spacing={5}>
                  <Skeleton
                    variant='rounded'
                    width='100%'
                    height={50}
                    animation='wave'
                  />
                  <Skeleton
                    variant='rounded'
                    width='100%'
                    height={50}
                    animation='wave'
                  />

                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    spacing={2}
                  >
                    <Stack direction='row' spacing={2}>
                      <Skeleton
                        variant='rectangular'
                        width={20}
                        height={20}
                        animation='wave'
                      />
                      <Skeleton
                        variant='rectangular'
                        width={80}
                        height={20}
                        animation='wave'
                      />
                    </Stack>
                    <Skeleton
                      variant='rectangular'
                      width={120}
                      height={20}
                      animation='wave'
                    />
                  </Stack>
                  <Skeleton
                    variant='rounded'
                    width='100%'
                    height={45}
                    animation='wave'
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
    );
  }

  if (!isError) {
    return <Navigate to='/portal/dashboard'></Navigate>;
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
