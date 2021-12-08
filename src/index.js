import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalProvider from './Contexts/GlobalProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
