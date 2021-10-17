import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "animate.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles';
import store from './store/index'
import { theme } from './theme'

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

