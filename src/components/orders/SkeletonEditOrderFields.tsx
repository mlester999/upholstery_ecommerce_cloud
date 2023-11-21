import {
  Card,
  Divider,
  Typography,
  Skeleton,
  Stack,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import Colors from '../../constants/Colors';

const SkeletonEditOrderFields = () => {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <Grid container bgcolor='#fff' sx={{ padding: 3 }}>
        <Grid item='true'>
          <Stack>
            <Typography
              gutterBottom
              variant={'h4'}
              sx={{ color: Colors.primaryColor }}
            >
              <Skeleton
                variant='rectangular'
                width={250}
                height={25}
                animation='wave'
              />
            </Typography>
            <Typography
              gutterBottom
              variant={'h4'}
              sx={{ color: Colors.primaryColor }}
            >
              <Skeleton
                variant='rectangular'
                width={400}
                height={20}
                animation='wave'
              />
            </Typography>
          </Stack>
        </Grid>

        <Grid item='true' xs={12}>
          <Stack justifyContent='center' spacing={3}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={160}
                height={50}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={160}
                height={50}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={160}
                height={50}
                animation='wave'
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-around'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
              <Skeleton
                variant='rounded'
                width={250}
                height={55}
                animation='wave'
              />
            </Stack>

            <Stack
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
              spacing={3}
            >
              <Skeleton
                variant='rounded'
                width={140}
                height={50}
                animation='wave'
              />
            </Stack>
          </Stack>
        </Grid>

        <Grid item='true' xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Card>
  );
};

export default SkeletonEditOrderFields;
