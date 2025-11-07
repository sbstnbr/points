import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './containers/Firebase';

const theme = createTheme({
  palette: {
    primary: red,
    secondary: red,
  },
  typography: {
    fontFamily: 'Raleway',
    h1: {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 18,
    },
    h2: {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 12,
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorker.register();
