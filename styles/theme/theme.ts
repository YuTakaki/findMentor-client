import { createTheme } from '@mui/material/styles';

const theme = (mode : 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#272727'
      },
      secondary: {
        main: '#ffde03'
      }
    }
  });
}

export default theme;