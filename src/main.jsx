import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from './GlobalStyle.js';
import { GlobalContextProvider } from './context/global.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);
