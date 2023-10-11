import * as React from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const EmptyTextarea = (props) => {
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };

  const error = {
    lightest: '#FEF3F2',
    light: '#FEE4E2',
    main: '#F04438',
    dark: '#B42318',
    darkest: '#7A271A',
    contrastText: '#FFFFFF',
  };

const indigo = {
    lightest: '#F5F7FF',
    light: '#EBEEFE',
    main: '#6366F1',
    dark: '#4338CA',
    darkest: '#312E81',
    contrastText: '#FFFFFF',
  };

  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: ${props.error ? '3.5px' : '1px'} solid ${
      props.error ? error.main : grey[200]
    };
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[700] : indigo.main
      };
    }



    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  return (
    <StyledTextarea
      aria-label={props.label}
      minRows={3}
      placeholder={props.placeholder}
      {...props}
    />
  );
};

export default EmptyTextarea;
