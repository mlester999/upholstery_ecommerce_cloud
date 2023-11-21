import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Colors from '../constants/Colors';

const NotFound = () => (
  <>
    <Box
      component='main'
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100vh',
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center',
            }}
          >
            <img
              alt='404 Not Found Image'
              src='/assets/error-404.png'
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400,
              }}
            />
          </Box>
          <Typography align='center' sx={{ mb: 3 }} variant='h3'>
            404: Page Not Found
          </Typography>
          <Typography align='center' color='text.secondary' variant='body1'>
            Oops! The page you're looking for isn't here. Let's go back to the
            dashboard. 😊🏡
          </Typography>
          <Button
            component={Link}
            to='/portal/dashboard'
            startIcon={
              <SvgIcon fontSize='small'>
                <ArrowLeftIcon />
              </SvgIcon>
            }
            variant='contained'
            sx={{
              mt: 3,
              backgroundColor: Colors.primaryColor,
            }}
          >
            Go back to dashboard
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
