import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import store from './store/index'

let theme;

theme = createTheme({
  palette: {
    primary: {
      main: '#f67777',
      contrastText: '#fff'
    },
    secondary: {
      main: 'rgba(250, 181, 181, 0.3)',
      contrastText: '#000',
    },

  },
  typography: {
    fontFamily: 'Roboto',
    color: '#2222',
    subtitle1: {
      fontSize: '14px',
      color: '#757575',
    },
    subtitle2: {
      fontSize: '14px',
      color: 'rgba(0,0,0,.4)',
    },

  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

