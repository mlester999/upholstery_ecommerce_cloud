import React from 'react';
import { Navigate } from 'react-router-dom';

interface CheckAuthProps {
  endpoint: string;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

const CheckAuth: React.FC<CheckAuthProps> = ({
  endpoint,
  isLoading,
  isFetching,
  isError,
}) => {
  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!isError) {
    return <Navigate to={endpoint}></Navigate>;
  }
};

export default CheckAuth;
