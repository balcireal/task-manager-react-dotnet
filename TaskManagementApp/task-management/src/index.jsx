import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from '@/App';
import '@/index.css';
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';

const theme = createTheme({
  spacing: 8,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <NotificationProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </NotificationProvider>
  </AuthProvider>
);
