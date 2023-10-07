import React, { useState, useCallback, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import { useGetUserQuery } from '../services/authentication';
import { styled } from '@mui/material/styles';
import { SIDE_NAV_WIDTH } from '../constants/BoxModel';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

const PortalLayout = ({ children }) => {
  const { isLoading, isFetching, isError } = useGetUserQuery();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    console.log(Cookies.get('is_authenticated'));
  }, []);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  // useEffect(() => {
  //   handlePathnameChange();
  // }, []);

  if (isLoading || isFetching) {
    return <Box sx={{ height: '100vh', backgroundColor: '#fff' }}></Box>;
  }

  if (isError) {
    return <Navigate to='/login'></Navigate>;
  }

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
      {/* <Button onClick={logoutUser}>Logout</Button> */}
    </>
  );
};

export default PortalLayout;
