import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ThemeProvider } from 'styled-components';
import GlobalProvider from './Contexts/GlobalProvider';
import theme from './style/theme';

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
