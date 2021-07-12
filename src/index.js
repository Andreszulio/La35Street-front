import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Router from './router/Router';
import './styles/styles.css';

ReactDOM.render(
  <StrictMode>
    <Router />
  </StrictMode>,
  document.getElementById('root')
);

