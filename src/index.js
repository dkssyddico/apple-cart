import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import { Provider } from './context/MyContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
