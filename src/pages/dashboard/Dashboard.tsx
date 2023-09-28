import { Button, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';
import {
  useGetUserQuery,
  useLogoutMutation,
} from '../../services/authentication';

const Dashboard = () => {
  const { data: user, isLoading, isFetching, isError } = useGetUserQuery();
  const [logout] = useLogoutMutation();

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Navigate to='/login'></Navigate>;
  }

  const logoutUser = async () => {
    const log = await logout();
    console.log(log);
  };

  return (
    <div>
      <Typography variant='caption' fontSize='16px' textAlign={'inherit'}>
        Hello, {user.first_name}
      </Typography>
      This is Dashboard
      <Button onClick={logoutUser}>Logout</Button>
    </div>
  );
};

export default Dashboard;
