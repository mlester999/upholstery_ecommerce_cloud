import { format, parseISO } from 'date-fns';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { useGetUserQuery } from '../../services/authentication';

const AccountProfile = () => {
  const { data: user } = useGetUserQuery();

  const createdAt = parseISO(user?.created_at);
  const formattedCreatedAt = format(createdAt, 'MMMM d, yyyy');

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: 'max',
          }}
        >
          <Avatar
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant='h5'>
            {user?.first_name} {user?.last_name}
          </Typography>

          <Typography color='text.secondary' variant='body2'>
            Created At: {formattedCreatedAt}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccountProfile;
