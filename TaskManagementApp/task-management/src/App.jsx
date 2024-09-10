import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import RouterConfig from '@/routes/Router';
import { baselightTheme } from '@/theme/DefaultColors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
  const routing = useRoutes(RouterConfig);
  return routing;
};

const App = () => {
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
